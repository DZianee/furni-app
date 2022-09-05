<template>
  <div class="order-overview-content">
    <div class="card">
      <div class="current-month-order">
        <div class="order-circle-statistic">
          <p class="counter">
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="countOrdersInMonth()"
              prefix=""
              suffix=""
              separator=""
              decimalSeparator="."
              :autoinit="true"
            />
          </p>
        </div>
        <div class="order-annotate">
          <h6>Month Orders</h6>
          <p>{{ monthNow }}</p>
        </div>
      </div>
      <div class="today-order">
        <div class="order-circle-statistic">
          <p class="counter">
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="countNew"
              prefix=""
              suffix=""
              separator=""
              decimalSeparator="."
              :autoinit="true"
            />
          </p>
        </div>
        <div class="order-annotate">
          <h6>New Orders</h6>
          <p>{{ dateNow }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "DashOrderOverview",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      countNew: 0,
      totalAllOrders: 0,
      orderList: [],
      orderMonthList: [],
    };
  },
  computed: {
    dateNow() {
      const currDate = new Date(Date.now());
      var year = currDate.getFullYear();
      var month = ("0" + (currDate.getMonth() + 1)).slice(-2);
      var day = ("0" + currDate.getDate()).slice(-2);
      return day + "/" + month + "/" + year;
    },
    monthNow() {
      const currMonth = new Date(Date.now());
      var year = currMonth.getFullYear();
      var month = ("0" + (currMonth.getMonth() + 1)).slice(-2);
      return month + "/" + year;
    },
  },
  methods: {
    async getNewOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/newOrders`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.countNew = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    convertDateTime(value) {
      const dateTime = new Date(value.dateCreate);
      let convertedResult = dateTime.getMonth() + 1;
      value.dateCreate = convertedResult;
    },
    countOrdersInMonth() {
      let result;
      const dateNow = new Date(Date.now());
      const currMonth = dateNow.getMonth() + 1;
      const thisMonth = this.orderList.filter(
        (item) => item.dateCreate == currMonth
      );
      result = thisMonth.length;
      return result;
    },
    async getAllOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.countAllOrders = res.data.totalOrders;
        this.orderList = res.data.data;
        this.orderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getNewOrders();
    this.getAllOrders();
  },
};
</script>

<style scoped>
.card {
  /* border: solid; */
  border-radius: 5px;
}

/* -- month-order -- */
.current-month-order {
  /* border: solid red; */
  padding: 30px 20px;
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 0.5fr;
}

/* -- month-order -- */
.today-order {
  /* border: solid blue; */
  padding: 30px 20px;
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 0.5fr;
}

/* -- common properties */
.order-circle-statistic {
  /* border: solid pink; */
  height: 200px;
  width: 100%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b983ff;
}
.order-circle-statistic p {
  border-radius: 100%;
  width: 100%;
  height: 74%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  font-size: 38px;
}
.order-annotate {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
