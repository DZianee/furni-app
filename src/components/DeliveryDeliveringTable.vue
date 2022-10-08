<template>
  <div class="delivery-delivery-table">
    <component
      :is="'order-table'"
      :type="'delivery'"
      :orderList="orderList"
      :displaySingleFeature="false"
      :displayBin="false"
      :displayGroupFeatures="true"
      @load-orders="loadOrders"
      @load-orders-update="loadOrdersUpdate"
    ></component>
  </div>
</template>

<script>
export default {
  name: "DeliveryNewTable",
  data() {
    return {
      features: {
        sortName: "dateCreate",
        search: "",
        kindOf: 1,
      },
      orderList: [],
      totalDeliveryOrders: 0,
    };
  },
  methods: {
    async getDeliveryOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/deliveryOrders`,
          {
            params: {
              kindOf: this.features.kindOf,
              sortName: this.features.sortName,
              search: this.features.search,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.totalDeliveryOrders = res.data.totalOrders;
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
      value.dateCreate = day + "-" + month + "-" + year;
    },
    loadOrders(value) {
      this.features.sortName = value.sortName;
      this.features.kindOf = value.kindOf;
      this.features.search = value.search;
      this.getDeliveryOrders();
    },
    loadOrdersUpdate() {
      this.getDeliveryOrders();
    },
  },
  watch: {
    totalDeliveryOrders() {
      this.$emit("total-delivery-orders", this.totalDeliveryOrders);
    },
  },
  mounted() {
    this.getDeliveryOrders();
  },
};
</script>

<style scoped></style>
