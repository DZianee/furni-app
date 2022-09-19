<template>
  <div class="card-content">
    <div class="card total-orders" style="border-bottom: 7px solid #7dce13">
      <div
        class="icon-img"
        style="border: 2px solid #7dce13; box-shadow: 0 0 10px 12px #b5fe83"
      >
        <i class="bx bx-receipt bx-sm"></i>
      </div>
      <div class="label">Total orders</div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="totalAllOrders"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
    <div class="card total-revenues" style="border-bottom: 7px solid #eae509">
      <div
        class="icon-img"
        style="border: 2px solid #eae509; box-shadow: 0 0 10px 12px #fff89a"
      >
        <i class="bx bx-dollar-circle bx-sm"></i>
      </div>
      <div class="label">Total Revenues (VND)</div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="434343"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
    <div class="card total-users" style="border-bottom: 7px solid #ff9f29">
      <div
        class="icon-img"
        style="border: 2px solid #ff9f29; box-shadow: 0 0 10px 12px #ffdba4"
      >
        <i class="bx bx-group bx-sm"></i>
      </div>
      <div class="label">Total Customers</div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="totalAllCus"
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
  name: "DashCounter",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      countNew: 0,
      totalAllOrders: 0,
      totalAllCus: 0,
    };
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
    async getAllOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.totalAllOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    async getCus() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/User/Customer/62ac075d3a5d293c62b3b12b/`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.totalAllCus = res.data.totalCustomers;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getNewOrders();
    this.getAllOrders();
    this.getCus();
  },
};
</script>

<style scoped>
/* --- card content --- */
.card-content {
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
}
.card-content .card {
  width: 30%;
  height: 30%;
  padding: 10px 0;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

/* ** card ** */
.card .icon-img {
  margin: auto;
  text-align: center;
  /* margin-top: 5%; */
  margin: auto;
  border: 2px solid;
  border-radius: 50px;
  padding: 12px 0;
  width: 60px;
}
.card .label {
  text-align: center;
  padding: 10px 0;
  margin-top: 4%;
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 14px;
}
.card .counter {
  font-size: 30px;
}
/* --- Responsive --- */
@media screen and (max-width: 1250px) {
  .card-content .card {
    width: 32%;
    height: 32%;
  }
  .card .counter {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  .card-content .card {
    width: 32%;
    height: 30%;
  }
  .card .icon-img {
    margin: auto;
    text-align: center;
    margin: auto;
    border: 2px solid;
    border-radius: 50px;
    padding: 8px 0;
    width: 50px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .card .label {
    font-size: 13px;
  }
}
</style>
