<template>
  <div class="delivery-checked-table">
    <component
      :is="'order-table'"
      :type="'checked'"
      :orderList="orderList"
      :displaySingleFeature="true"
      :displayGroupFeatures="false"
      :displayBin="false"
      @sort-orders="sortTable"
      @load-orders-update="loadOrdersUpdate"
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
      totalCheckedOrders: 0,
      kindOf: 1,
      features: {
        sortName: "dateCreate",
      },
    };
  },
  methods: {
    async getCheckedOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/checkedOrders`,
          {
            params: {
              kindOf: this.kindOf,
              sortName: this.features.sortName,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.totalCheckedOrders = res.data.totalOrders;
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
      this.getCheckedOrders();
    },
    loadOrdersUpdate() {
      this.$router.go();
    },
  },
  watch: {
    totalCheckedOrders() {
      this.$emit("total-checked-orders", this.totalCheckedOrders);
    },
    kindOf() {
      this.getCheckedOrders();
    },
  },
  mounted() {
    this.getCheckedOrders();
  },
};
</script>

<style scoped></style>
