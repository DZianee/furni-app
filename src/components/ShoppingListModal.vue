<template>
  <div class="shopping-list-modal">
    <div
      class="modal fade shoplist-modal"
      id="shoplistModal"
      tabindex="-1"
      aria-labelledby="shoplistModal"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5>Shopping List</h5>
          </div>
          <div class="modal-body">
            <div class="order-info">
              <div class="order-id">
                <label for="orderId">Order ID:</label>
                <input type="text" readonly value="3452524" />
              </div>
              <div class="order-date">
                <label for="orderDate">Date created:</label>
                <input type="text" readonly value="21/12/2021" />
              </div>
            </div>
            <p class="shop-title">List items</p>
            <div class="table-responsive">
              <table class="table">
                <tr>
                  <td>
                    <img
                      src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
                      alt="item-img"
                    />
                  </td>
                  <td class="item-name">
                    <h6>Rosa testing testing testing only dfdf</h6>
                    <div>
                      <i
                        class="bx bx-square"
                        style="color: red; background: red"
                      ></i>
                    </div>
                  </td>
                  <td class="item-quantity">x 4</td>
                  <td class="item-price">123.234.542 VND</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
                      alt="item-img"
                    />
                  </td>
                  <td class="item-name">
                    <h6>Rosa testing testing testing only dfdf</h6>
                  </td>
                  <td class="item-quantity">x 4</td>
                  <td class="item-price">123.234.542 VND</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
                      alt="item-img"
                    />
                  </td>
                  <td class="item-name">
                    <h6>Rosa testing testing testing only dfdf</h6>
                  </td>
                  <td class="item-quantity">x 4</td>
                  <td class="item-price">123.234.542 VND</td>
                </tr>
              </table>
            </div>
            <hr />
            <div class="table-responsive ship">
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
          <div class="btn btn-close-modal" data-bs-dismiss="modal">Close</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* --- modal --- */
.modal-header {
  display: flex;
  justify-content: center;
}
.modal-body {
  margin-top: 10px;
}
.shop-title {
  font-weight: 500;
  font-size: 18px;
  padding: 10px;
  margin-top: 10px;
}
/* --- table --- */
.table-responsive {
  height: 390px;
  border-top: 1px solid lightgrey;
  padding: 0 25px;
}
.order-info {
  display: flex;
  gap: 30px;
  justify-content: center;
}
.order-id,
.order-date {
  padding: 10px;
  padding-left: 60px;
  display: grid;
  /* gap: 20px; */
  grid-template-columns: 1fr 1fr;
}

label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  letter-spacing: 0.3px;
}
input {
  border: none;
  font-size: 15px;
}
.item-name,
.item-quantity,
.item-price {
  transform: translateY(30%);
}
.item-quantity {
  text-align: center;
}

.table img {
  width: 120px;
  /* transform: translateX(35%); */
}
.cart_stable-price-title,
.shopping-cart_stable-price {
  padding: 20px;
}
/* --- shipping table --- */
.table-responsive.ship {
  padding: 0 25px;
  height: fit-content;
  border: none;
}
.table.shipping-total {
  padding: 0 25px;
}
.shipping-fee-name,
.total-order-name {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.7px;
}

/* --- btn close modal --- */
.btn-close-modal {
  background-color: #c673f3;
  color: white;
  width: 90%;
  margin: 25px auto;
  font-weight: 500;
}
.btn-close-modal:hover {
  background-color: #bb53f3;
  color: white;
}
</style>
