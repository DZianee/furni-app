<template>
  <div class="payment-step">
    <div class="item-in-cart icon">
      <i class="bx bx-cart-alt bx-lg" style="background-color: #fff395"></i>
      <h6>Your cart item</h6>
      <p class="line" id="test"></p>
    </div>
    <div class="order-info icon">
      <i class="bx bx-user-pin bx-lg"></i>
      <h6>Order's information</h6>
    </div>
    <div class="payment-method icon">
      <i class="bx bx-credit-card-alt bx-lg"></i>
      <h6>Payment method</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentStep",
  props: {
    success: String,
  },
  methods: {},
};
</script>

<style scoped>
.payment-step {
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: space-evenly;
  background: #deccf6;
  border-right: 1px solid rgb(195, 193, 193);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.payment-step .icon {
  text-align: center;
  padding: 10px;
}
.payment-step .icon i {
  /* border: solid 1px; */
  padding: 35px;
  border-radius: 80px;
  /* background: #fff395; */
  background: #ffff;
}
.payment-step .icon h6 {
  font-weight: 600;
  margin-top: 15px;
}
</style>
