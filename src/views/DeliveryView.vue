<template>
  <div class="delivery-view container">
    <div class="title">
      <h4>Delivery Order</h4>
      <p>Gather and manage all the making orders over store in HCM city</p>
    </div>
    <DeliveryCounter />
    <DeliveryRouteBar @open-orders-tab="openOrderRoute" />
    <DeliveryAllTable v-if="choice === 'all' || choice == ''" />
    <DeliveryNewTable v-if="choice === 'new'" />
  </div>
</template>

<script>
import DeliveryCounter from "../components/DeliveryCounter.vue";
import DeliveryNewTable from "../components/DeliveryNewTable.vue";
import DeliveryAllTable from "../components/DeliveryAllTable.vue";
import DeliveryRouteBar from "../components/DeliveryRouteBar.vue";
export default {
  name: "DeliveryView",
  components: {
    DeliveryCounter,
    DeliveryNewTable,
    DeliveryAllTable,
    DeliveryRouteBar,
  },
  data() {
    return {
      choice: "",
    };
  },
  methods: {
    openOrderRoute(value) {
      this.choice = value;
    },
  },
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
</style>
