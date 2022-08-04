<template>
  <div class="order-activities-profile-view">
    <p class="profile-message">
      Order activity lets you know where your orders stage to completely done
    </p>
    <div class="order-container-content">
      <div class="content-container">
        <AllOrders v-if="orderType === 'allorders' || orderType == ''" />
        <NewOrders v-if="orderType === 'neworders'" />
        <CheckedOrders v-if="orderType === 'receivedorders'" />
        <DeliveryOrders v-if="orderType === 'deliveryorders'" />
        <CompletedOrders v-if="orderType === 'completedorders'" />
        <CancelledOrders v-if="orderType === 'cancelledorders'" />
      </div>
      <div class="order-activity-bar">
        <nav>
          <ul>
            <li @click="Route('allorders')" class="bar active">
              All your orders
            </li>
            <li @click="Route('neworders')" class="bar">Waititng orders</li>
            <li @click="Route('receivedorders')" class="bar">
              Received orders
            </li>
            <li @click="Route('deliveryorders')" class="bar">In delivery</li>
            <li @click="Route('completedorders')" class="bar">
              Completed orders
            </li>
            <li @click="Route('cancelledorders')" class="bar">
              Cancelled orders
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import AllOrders from "./OrderAll.vue";
import NewOrders from "./OrderNew.vue";
import CheckedOrders from "./OrderChecked.vue";
import CompletedOrders from "./OrderCompleted.vue";
import DeliveryOrders from "./OrderDelivery.vue";
import CancelledOrders from "./OrderCancelled.vue";
export default {
  name: "OrderActivities",
  components: {
    AllOrders,
    NewOrders,
    CheckedOrders,
    CompletedOrders,
    DeliveryOrders,
    CancelledOrders,
  },
  props: {
    routeName: String,
    routeId: String,
  },
  data() {
    return {
      orderType: "",
    };
  },
  methods: {
    Route(value) {
      this.orderType = value;
      console.log(value);
      this.$router.push({
        path: `/profile-view/${this.routeId}/${this.routeName}/${value}`,
      });
    },
  },
  mounted() {
    const navItems = document.querySelectorAll(".bar");

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("click", function () {
        var current = document.querySelector(".active");
        if (current) {
          current.classList.remove("active");
        }
        this.classList.add("active");
      });
    }
  },
};
</script>

<style scoped>
.order-container-content {
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  column-gap: 20px;
}
.profile-message {
  font-weight: 500;
  font-size: 15px;
  padding: 1% 0 0 3%;
  color: rgb(129, 118, 118);
}
/* -- bar -- */
.order-activity-bar {
  border-left: 1px solid rgb(221, 218, 218);
  height: 600px;
}
ul {
  padding-left: 0;
}

.bar {
  list-style: none;
  padding: 12px 0;
  font-size: 14px;
  color: rgb(161, 159, 159);
}
.bar.active {
  list-style: none;
  letter-spacing: 0.5px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  color: #aa00ff;
}
.bar:hover {
  color: black;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
}
</style>
