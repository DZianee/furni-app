<template>
  <div class="shopping-list-view">
    <PaymentStep :success="successStep" />
    <!-- <div class="cart-list-component"></div> -->
    <div>
      <CartItem @to-order-info="toNextStep" :showCartItem="showCartItem" />
      <FillOrderInfo />
      <PaymentMethod />
      <button type="submit" class="btn" @click="Route('successOrderView')">
        Complete the Order
      </button>
    </div>
  </div>
</template>

<script>
import PaymentStep from "../components/PaymentStep.vue";
import CartItem from "../components/CartItem.vue";
import FillOrderInfo from "../components/FillOrderInfo.vue";
import PaymentMethod from "../components/PaymentMethod.vue";
export default {
  name: "ShoppingListView",
  components: { PaymentStep, CartItem, FillOrderInfo, PaymentMethod },
  data() {
    return {
      showCartItem: true,
      showOrderInfo: false,
      showPayment: false,
      successStep: "",
    };
  },
  methods: {
    // toNextStep(val1, val2, valColor) {
    //   this.showCartItem = val2;
    //   this.showOrderInfo = val1;
    //   this.successStep = valColor;
    // },
    Route(value) {
      this.$router.push({ name: value });
    },
  },
};
</script>

<style scoped>
.shopping-list-view {
  display: grid;
  column-gap: 30px;
  grid-template-columns: 0.2fr 1fr;
}
.btn {
  background: #000;
  color: white;
  font-weight: 500;
  font-size: 16px;
  /* float: right; */
  margin-left: 4%;
  width: 90%;
  padding: 10px;
  margin-bottom: 30px;
}
.btn:hover {
  color: white;
}
</style>
