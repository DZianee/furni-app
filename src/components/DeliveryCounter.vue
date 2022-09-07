<template>
  <div class="delivery-counter">
    <div class="card new-orders">
      <div class="name-counter">
        <h6>New orders</h6>
        <p>{{ dateNow }}</p>
      </div>
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
    <div class="card unchecked-orders">
      <div class="name-counter">
        <h6>Unchecked orders</h6>
      </div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="128"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
    <div class="card month-orders">
      <div class="name-counter">
        <h6>This month orders</h6>
        <p>{{ monthNow }}</p>
      </div>
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
  </div>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "DeliveryCounter",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  props: {
    counterNewOrders: Number,
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
      console.log(value);
      const dateTime = new Date(value.dateCreate);
      let convertedResult = dateTime.getMonth() + 1;
      value.dateCreate = convertedResult;
    },
    countOrdersInMonth() {
      let result;
      const dateNow = new Date(Date.now());
      const currMonth = dateNow.getMonth() + 1;
      console.log(this.orderList);
      const thisMonth = this.orderList.filter(
        (item) => item.dateCreate == currMonth
      );
      result = thisMonth.length;
      console.log(result);
      return result;
    },
    async getAllOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/getAll`,
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
  watch: {
    counterNewOrders() {
      this.countNew = this.counterNewOrders;
    },
  },
  mounted() {
    this.getNewOrders();
    this.getAllOrders();
  },
};
</script>

<style scope>
.delivery-counter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 100px;
  padding: 10px;
}

/* --- Card --- */
.delivery-counter .card {
  border-radius: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.name-counter {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  text-align: center;
}
.counter {
  text-align: center;
  font-size: 40px;
  margin-top: 10px;
}
.delivery-counter .new-orders {
  background: linear-gradient(to top, #9f51ff, #faf096, #faf7e6);
}
.delivery-counter .unchecked-orders {
  background: linear-gradient(to top, #9f51ff, #fbb6b6, #faf7e6);
}
.delivery-counter .month-orders {
  background: linear-gradient(to top, #9f51ff, #b7fbff, #effffd);
}
.name-counter h6 {
  font-weight: 600;
}
.name-counter p {
  font-weight: 500;
}
</style>
