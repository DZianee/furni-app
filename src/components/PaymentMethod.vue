<template>
  <div class="payment-method container">
    <div class="title">
      <h4>Your payment method for the order</h4>
      <p style="color: grey; font-size: 15px">
        This is the final step, please view the information and choose your
        payment method to complete the order
      </p>
      <hr />
    </div>
    <div class="card bill-order">
      <h5>Order's bill</h5>
      <hr />
      <div class="table-responsive">
        <table class="table table-borderless">
          <tr class="summary-item">
            <td class="item-name">
              <p>Rosa testing testing testing only dfdf</p>
            </td>
            <td class="item-quantity">
              <p>x4</p>
            </td>
            <td class="item-price">
              <p>7000000</p>
            </td>
          </tr>
          <tr class="summary-item">
            <td class="item-name">
              <p>Rosa testing testing testing only dfdf</p>
            </td>
            <td class="item-quantity">
              <p>x4</p>
            </td>
            <td class="item-price">
              <p>7878789</p>
            </td>
          </tr>
          <tr class="summary-item">
            <td class="item-name">
              <p>Rosa testing testing testing only dfdf</p>
            </td>
            <td class="item-quantity">
              <p>x4</p>
            </td>
            <td class="item-price">
              <p>7000000</p>
            </td>
          </tr>
        </table>
        <hr />
        <table class="table shipping-total">
          <tr class="shipping-fee">
            <td class="shipping-fee-name">
              <p>Shipping fee</p>
            </td>
            <td></td>
            <td class="fee">
              <p style="text-align: center">2343 VND</p>
            </td>
          </tr>
          <tr class="total-order-bill">
            <td class="total-order-name">
              <p>Total's bill</p>
            </td>
            <td></td>
            <td class="total-bill">
              <p style="text-align: center">2343 VND</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="payment-method-option">
      <div class="card e-pay">
        <h5>E-payment Momo</h5>
        <p>Purchase the order before delivery</p>
      </div>
      <div class="card cash-pay">
        <div style="display: flex; gap: 20px; align-items: center">
          <input type="checkbox" style="width: 50px" />
          <h5>Cash</h5>
        </div>
        <p>Purchase the order after delivery</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentMethod",
};
</script>

<style scoped>
.container {
  margin-top: 7%;
  padding: 20px 50px;
  width: 90%;
}
.bill-order {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  width: 40%;
  margin: auto;
  padding: 20px;
}
.bill-order h5 {
  text-align: center;
}
.item-name p {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.shipping-fee-name,
.total-order-name {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.7px;
}
.payment-method-option {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 2%;
}
.e-pay {
  padding: 20px 40px;
  margin: auto;
  color: white;
  background: #fa26a0;
  border-radius: 10px;
}
.e-pay:hover {
  cursor: pointer;
  background: #d527b7;
}
.cash-pay {
  padding: 20px 40px;
  margin: auto;
  border-radius: 10px;
  background: #28df99;
}
</style>
