<template>
  <div class="payment-step">
    <div class="item-in-cart icon">
      <i
        class="bx bx-cart-alt bx-lg"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-cart-alt bx-md"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-cart-alt bx-sm"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <h6>Your list item in cart</h6>
      <p class="line" id="test"></p>
    </div>
    <div class="order-info icon">
      <i
        class="bx bx-user-pin bx-lg"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-user-pin bx-md"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-user-pin bx-sm"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <h6>Order's information</h6>
    </div>
    <div class="payment-method icon">
      <i
        class="bx bx-credit-card-alt bx-lg"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-credit-card-alt bx-md"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <i
        class="bx bx-credit-card-alt bx-sm"
        :style="[
          successCart
            ? { backgroundColor: '#ffffa8' }
            : { backgroundColor: '' },
        ]"
      ></i>
      <h6>Payment method</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentStep",
  props: {
    successInfo: Boolean,
    successCart: Boolean,
    successPay: Boolean,
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
  border-radius: 50%;
  background: #ffff;
  margin: auto;
}
.payment-step .icon h6 {
  font-weight: 500;
  margin-top: 15px;
}
.bx-lg {
  padding: 35px;
}
.bx-md {
  padding: 30px;
  width: 98px;
  display: none;
}
.bx-sm {
  display: none;
  padding: 17px;
  width: 60px;
}

/* --- Responsive --- */
@media screen and (max-width: 1250px) {
  .payment-step {
    position: sticky;
    padding: 6px 0;
    flex-direction: row;
    gap: 10px;
    border-right: none;
  }
  .bx-lg {
    /* padding: 30px; */
    display: none;
  }
  .bx-md {
    /* padding: 50vw; */
    display: block;
  }
  .payment-step .icon {
    padding: 10px;
  }
}

/* @media screen and (max-width: 769px) {
  .bx-lg {
    padding: 25px;
  }
} */
@media screen and (min-width: 320px) and (max-width: 480px) {
  .bx-md {
    display: none;
  }
  .bx-sm {
    display: block;
  }
  .payment-step .icon h6 {
    font-size: 14px;
    margin-top: 10%;
  }
}
</style>
