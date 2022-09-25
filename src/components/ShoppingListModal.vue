<template>
  <div class="shopping-list-modal">
    <div
      class="modal fade shoplist-modal"
      id="shoplistModal"
      tabindex="-1"
      data-bs-backdrop="static"
      aria-labelledby="shoplistModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <!-- <div class="modal-header">
            <h5>Shopping List</h5>
          </div> -->
          <div class="modal-body">
            <h5>Shopping List</h5>

            <div class="order-info">
              <div class="order-date">
                <label for="orderDate">Date created:</label>
                <input type="text" readonly :value="dateCreated" />
              </div>
              <div class="order-id">
                <label for="orderId">Order ID:</label>
                <input type="text" readonly :value="orderDetails.orderId" />
              </div>
            </div>
            <p class="shop-title">List items</p>
            <div class="table-responsive">
              <table class="table">
                <tr v-for="item in cartDetails" :key="item.index">
                  <td>
                    <img
                      :src="`http://localhost:2371/${item.productImg}`"
                      alt="item-img"
                    />
                  </td>
                  <td class="item-name">
                    <h6>{{ item.name }}</h6>
                    <div class="item-color">
                      <div class="color-check">
                        <div>
                          <label class="color">
                            <input type="radio" name="productColor" disabled />
                            <span
                              class="checkmark"
                              :style="{ backgroundColor: item.color }"
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="item-quantity">x {{ item.quantity }}</td>
                  <td class="item-price">
                    {{ totalPerProduct(item.quantity, item.amount) }} VND
                  </td>
                </tr>
              </table>
            </div>
            <hr />
            <div class="table-responsive ship">
              <table class="table shipping-total">
                <!-- <tr class="shipping-fee">
                  <td class="shipping-fee-name">
                    <p>Shipping fee</p>
                  </td>
                  <td></td>
                  <td class="fee">
                    <p style="text-align: center">2343 VND</p>
                  </td>
                </tr> -->
                <tr class="total-order-bill">
                  <td class="total-order-name">
                    <p>Total's bill</p>
                  </td>
                  <td></td>
                  <td class="total-bill">
                    <p style="text-align: center; font-weight: 500">
                      {{ formatPrice(orderDetails.totalBill) }} VND (<span
                        style="color: red"
                        >*</span
                      >)
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <div class="note" style="padding: 7px 35px">
              <p style="color: red; font-size: 14px">
                * Note: This has already included the shipping fee 20.000 VND in
                bill.
              </p>
            </div>
          </div>
          <div class="btn btn-close-modal" data-bs-dismiss="modal">Close</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shoppingListModal",
  props: {
    cartDetails: Array,
    orderDetails: Object,
  },
  computed: {
    dateCreated() {
      const dateTime = new Date(this.orderDetails.dateCreate);
      var year = dateTime.getFullYear();
      var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
      var day = ("0" + dateTime.getDate()).slice(-2);
      return day + "-" + month + "-" + year;
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toString();
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    totalPerProduct(quantity, value) {
      let count = 0;
      count = quantity * value;
      return this.formatPrice(count);
    },
  },
};
</script>

<style scoped>
/* --- modal --- */
/* .modal-header {
  display: flex;
  justify-content: center;
} */
.modal-body {
  margin-top: 10px;
}
.modal-body h5 {
  color: #9c13e5;
}
.shop-title {
  font-weight: 500;
  font-size: 18px;
  padding: 10px;
  margin-top: 10px;
  /* color: #9612dd; */
}
/* --- table --- */
.table-responsive {
  max-height: 390px;
  border-top: 1px solid lightgrey;
  padding: 0 25px;
  overflow-y: auto;
}
.table-responsive {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.table-responsive::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.table {
  width: 716px;
}
.order-info {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  padding-right: 20px;
}
.order-id,
.order-date {
  padding: 10px 0;
  display: flex;
  gap: 20px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  letter-spacing: 0.3px;
}
input {
  border: none;
  font-size: 14px;
}
.item-name {
  width: 40%;
  font-size: 14px;
}
.item-name h6 {
  line-height: 32px;
}
.item-quantity {
  padding: 0 12px;
}

.table img {
  width: 150px;
}
/* .cart_stable-price-title,
.shopping-cart_stable-price {
  padding: 20px;
} */
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
  padding: 7px 0;
  border-radius: 7px;
  margin: 25px auto;
  font-weight: 500;
  font-size: 18px;
}
.btn-close-modal:hover {
  background-color: #bb53f3;
  color: white;
}

/* --- Custom checkbox --- */
.item-color {
  width: 20%;
  margin-top: -7%;
}
.color-check {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.color {
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
}

/* Hide the browser's default checkbox */
.color input {
  visibility: hidden;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 7px;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 30px;
  /* border: solid 1px grey; */
}

/* On mouse-over, add a grey background color */
.color:hover input ~ .checkmark {
  background-color: rgb(197, 197, 197);
}

/* When the checkbox is checked, add a blue background */
/* .color input:checked ~ .checkmark {
  background-color: #2196f3;
} */

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.color input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.color .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .order-info {
    align-items: flex-start;
  }
}
</style>
