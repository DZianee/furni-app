<template>
  <div class="delivery-cancelled-table">
    <component
      :is="'order-table'"
      :type="'cancelled'"
      :orderList="orderList"
      :displaySingleFeature="true"
      :displayBin="true"
      :displayGroupFeatures="false"
      @sort-orders="sortTable"
      @load-orders="loadOrders"
    ></component>
  </div>
</template>

<script>
export default {
  name: "DeliveryNewTable",
  data() {
    return {
      orderList: [],
      totalCancelledOrders: 0,
      kindOf: 1,
      features: {
        sortName: "dateCreate",
      },
    };
  },
  methods: {
    async getCancelledOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/cancelledOrders`,
          {
            params: {
              kindOf: this.kindOf,
              sortName: this.features.sortName,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.totalCancelledOrders = res.data.totalOrders;
        this.orderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        // console.log(error);
      }
    },
    convertDateTime(value) {
      const result = new Date(value.dateCreate);
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      value.dateCreate = month + "-" + day + "-" + year;
    },
    sortTable(value) {
      this.kindOf = value;
    },
    loadOrders() {
      this.getCancelledOrders();
    },
  },
  watch: {
    totalCancelledOrders() {
      this.$emit("total-cancelled-orders", this.totalCancelledOrders);
    },
    kindOf() {
      this.getCancelledOrders();
    },
  },
  mounted() {
    this.getCancelledOrders();
  },
};
</script>

<style scoped></style>
