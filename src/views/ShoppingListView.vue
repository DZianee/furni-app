<template>
  <div class="shopping-list-view">
    <PaymentStep
      :successPay="successPay"
      :successCart="successCart"
      :successInfo="successInfo"
    />
    <!-- <div class="cart-list-component"></div> -->
    <div>
      <CartItem :showCartItem="showCartItem" @fill-color="fillColor" />
      <FillOrderInfo @fill-color="fillColor" />
      <PaymentMethod @fill-color="fillColor" />
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
      successCart: false,
      successPay: false,
      successInfo: false,
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
    fillColor(text, val) {
      if (text === "info") {
        this.successInfo = val;
      } else if (text === "cart") {
        this.successCart = val;
      } else {
        this.successPay = val;
      }
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
@media screen and (max-width: 1250px) {
  .shopping-list-view {
    column-gap: 0;
    grid-template-columns: 100%;
  }
}
</style>
