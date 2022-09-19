<template>
  <div class="delivery-view container">
    <div class="title">
      <h4>Delivery Order</h4>
      <p>Gather and manage all the making orders over store in HCM city</p>
    </div>
    <DeliveryCounter :counterNewOrders="counterNewOrders" />
    <DeliveryRouteBar
      @open-orders-tab="openOrderRoute"
      :allOrders="totalAllOrders"
      :newOrders="totalNewOrders"
      :checkedOrders="totalCheckedOrders"
      :cancelledOrders="totalCancelledOrders"
      :deliveryOrders="totalDeliveryOrders"
    />
    <DeliveryAllTable
      v-if="routeId === 'all'"
      @total-products="getTotalProducts"
    />
    <DeliveryNewTable
      v-if="routeId === 'new'"
      @total-new-orders="getTotalOrders"
      @count-new-order="countNewOrders"
    />
    <DeliveryDeliveringTable
      v-if="routeId === 'delivering'"
      @total-delivery-orders="getDeliveryOrders"
    />
    <DeliveryCheckedTable
      v-if="routeId === 'checked'"
      @total-checked-orders="getCheckedOrders"
    />
    <DeliveryCancelledTable
      v-if="routeId === 'cancelled'"
      @total-cancelled-orders="getCancelledOrders"
    />
  </div>
</template>

<script>
import DeliveryCounter from "../components/DeliveryCounter.vue";
import DeliveryNewTable from "../components/DeliveryNewTable.vue";
import DeliveryAllTable from "../components/DeliveryAllTable.vue";
import DeliveryDeliveringTable from "../components/DeliveryDeliveringTable.vue";
import DeliveryCheckedTable from "../components/DeliveryCheckedTable.vue";
import DeliveryCancelledTable from "../components/DeliveryCancelledTable.vue";
import DeliveryRouteBar from "../components/DeliveryRouteBar.vue";
export default {
  name: "DeliveryView",
  components: {
    DeliveryCounter,
    DeliveryNewTable,
    DeliveryCancelledTable,
    DeliveryCheckedTable,
    DeliveryDeliveringTable,
    DeliveryAllTable,
    DeliveryRouteBar,
  },
  data() {
    return {
      choice: "",
      totalAllOrders: 0,
      totalNewOrders: 0,
      totalCheckedOrders: 0,
      totalCancelledOrders: 0,
      totalDeliveryOrders: 0,
      counterNewOrders: 0,
    };
  },
  computed: {
    routeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    countNewOrders(value) {
      console.log(value);
      this.counterNewOrders = value;
    },
    openOrderRoute(value) {
      this.choice = value;
    },
    getTotalProducts(value) {
      this.totalAllOrders = value;
    },
    getTotalOrders(value) {
      this.totalNewOrders = value;
    },
    getCheckedOrders(value) {
      this.totalCheckedOrders = value;
    },
    getDeliveryOrders(value) {
      this.totalDeliveryOrders = value;
    },
    getCancelledOrders(value) {
      this.totalCancelledOrders = value;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.delivery-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
  letter-spacing: 0.3px;
}
.title p {
  color: rgb(116, 112, 112);
  font-size: 14px;
}

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .delivery-view {
    right: -3%;
    width: calc(100% - 200px);
  }
}
@media screen and (max-width: 1250px) {
  .delivery-view {
    right: -2.5%;
    width: calc(100% - 145px);
  }
}
@media screen and (max-width: 1200px) {
  .delivery-view {
    right: -1.5%;
    width: calc(100% - 125px);
  }
}
/* @media screen and (max-width: 786px) {
  .delivery-view {
    right: -1.5%;
    width: calc(100% - 125px);
  }
} */
@media screen and (max-width: 768px) {
  .delivery-view {
    grid-template-columns: 100%;
    row-gap: 80px;
    padding: 10px 0;
    right: 0;
    width: 100%;
    margin-bottom: 20%;
  }
  .title {
    padding-left: 2%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  /* .delivery-view {
    margin-bottom: 28%;
  } */
}
</style>
