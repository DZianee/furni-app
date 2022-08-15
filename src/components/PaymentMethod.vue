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
        <table class="table table-borderless table-item">
          <tr
            class="summary-item"
            v-for="item in productInList"
            :key="item.index"
          >
            <td class="item-name">
              <p>
                {{ item.name }}
                (<label class="color">
                  <input type="radio" name="productColor" disabled />
                  <span
                    class="checkmark"
                    :style="{ backgroundColor: item.color }"
                  ></span> </label
                >)
              </p>
            </td>
            <td class="item-quantity">
              <p>x {{ item.quantityProduct }}</p>
            </td>
            <td class="item-price">
              <p>{{ totalPrice(item.price, item.quantityProduct) }} VND</p>
            </td>
          </tr>
        </table>
        <hr />
        <table class="table shipping-total">
          <tr class="total-bill_before">
            <td class="bill-before-name">
              <p>Before shipping</p>
            </td>
            <td></td>
            <td class="bill-before">
              <p style="text-align: center">{{ totalBeforeShipping() }} VND</p>
            </td>
          </tr>
          <tr class="shipping-fee">
            <td class="shipping-fee-name">
              <p>Shipping fee</p>
            </td>
            <td></td>
            <td class="fee">
              <p style="text-align: center; color: blue">
                + {{ shippingFee() }} VND
              </p>
            </td>
          </tr>
          <tr class="total-order-bill">
            <td class="total-order-name">
              <p>Total's bill</p>
            </td>
            <td></td>
            <td class="total-bill">
              <p style="text-align: center; font-weight: 500">
                {{ totalBill() }} VND
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="payment-method-option">
      <h6>Payment method</h6>
      <div class="chosen-method">
        <p
          data-bs-toggle="modal"
          data-bs-target="#paymentModal"
          v-if="displayPaymentLink"
        >
          Choose the payment method
        </p>
        <p v-if="displayChosenPayment">
          You have chosen
          <span :style="stylePaymentType(paymentType)"> {{ paymentType }}</span>
        </p>
      </div>
    </div>
    <p class="confirm-message">
      By <span style="font-weight: 500">"Complete the order"</span>, you have
      agreed our
      <span style="color: blue; text-decoration: underline; cursor: pointer"
        >Terms and Conditions</span
      >
      for the shopping online service.
    </p>
    <button type="submit" class="btn" @click="sendOrder">
      Complete the Order
    </button>
  </div>
  <PaymentMethodModal
    :transactionID="transactionID"
    @chosen-payment="chosenPayment"
  />
  <component
    :is="'notifi-modal'"
    :openModal="displayWarning"
    @close-modal="closeWarning"
  >
    Oops! It seems like the payment method has still been empty</component
  >
</template>

<script>
import PaymentMethodModal from "./PaymentMethodModal.vue";
export default {
  name: "PaymentMethod",
  components: {
    PaymentMethodModal,
  },
  data() {
    return {
      totalPriceList: [],
      paymentType: "",
      displayPaymentLink: true,
      displayChosenPayment: false,
      displayWarning: false,
    };
  },
  computed: {
    productInList() {
      const result = JSON.parse(this.$store.state.shoppingList);
      return result;
    },
    transactionID() {
      const code =
        this.getDateTime() +
        "CZL" +
        Math.floor(Math.random() * 10) +
        (Math.floor(Math.random() * 99) + 10);
      return code;
    },
  },
  methods: {
    closeWarning() {
      this.displayWarning = false;
    },
    Route(value) {
      this.$router.push({ name: value });
    },
    stylePaymentType(value) {
      if (value == "MOMO") {
        return "color: #ad1457; font-weight: 600; font-size: 17px";
      } else if (value == "ZALO") {
        return "color: #0091ea; font-weight: 600; font-size: 17px";
      } else if (value == "CASH") {
        return "color: #4caf50; font-weight: 600; font-size: 17px";
      }
    },
    chosenPayment(value) {
      this.paymentType = value;
    },
    getDateTime() {
      const result = new Date(Date.now());
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      return month + day + year;
    },
    async sendOrder() {
      if (this.paymentType == "") {
        this.displayWarning = true;
      } else {
        try {
          const shopList = JSON.parse(this.$store.state.shoppingList);
          const orderID =
            "DLFZ2" +
            this.getDateTime() +
            (Math.floor(Math.random() * 99) + 10) +
            (Math.floor(Math.random() * 9) + 1);
          const user = JSON.parse(this.$store.state.user);

          const tempOrder = {
            totalBill: this.totalBill(),
            transactionID: this.transactionID,
            paymentMethod: this.paymentType,
            user: user.id,
            orderId: orderID,
            dateCreate: new Date(Date.now()),
            cart: [],
          };
          shopList.forEach((item) => {
            let cart = {
              product: "",
              quantity: 1,
              amount: 0,
              color: "",
              productImg: "",
              name: "",
            };
            cart.product = item.id;
            cart.quantity = item.quantityProduct;
            cart.amount = item.price;
            cart.color = item.color;
            cart.productImg = item.img;
            cart.name = item.name;
            tempOrder.cart.push(cart);
          });
          this.$store.dispatch("accessToken");
          const res = await this.$axios.post(
            `api/Order/newOrder/`,
            tempOrder,
            this.$axios.defaults.headers["Authorization"]
          );
          if (res.status == 200) {
            console.log(res);
            this.$router.push({ name: "successOrderView" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    totalPrice(value, quantity) {
      let count = 0;
      count = value * quantity;
      return count;
    },
    totalBeforeShipping() {
      let sum = 0;
      let tempArr = [];
      const shopList = JSON.parse(this.$store.state.shoppingList);
      shopList.forEach((element) => {
        let count = element.quantityProduct * element.price;
        tempArr.push(count);
      });
      tempArr.forEach((item) => {
        sum = sum + item;
      });
      return sum;
    },
    totalBill() {
      return this.shippingFee() + this.totalBeforeShipping();
    },
    shippingFee() {
      let fee = 0;
      if (this.productInList.length < 1) {
        return fee;
      } else {
        fee = 200000;
        return fee;
      }
    },
  },
  watch: {
    productInList() {
      this.shippingFee();
    },
    paymentType() {
      if (this.paymentType != "") {
        this.displayPaymentLink = false;
        this.displayChosenPayment = true;
        this.$emit("fill-color", "pay", true);
      } else {
        this.displayPaymentLink = true;
        this.displayChosenPayment = false;
        this.$emit("fill-color", "pay", false);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 7%;
  padding: 20px 20px;
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
/* .table-item {
  height: 300px;
} */
.table-responsive {
  height: 510px;
  overflow-y: auto;
}
.table-item tr {
  margin-bottom: 20px;
}
.item-name p {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
}
.item-name {
  width: 65%;
}
.item-price p,
.item-quantity p {
  font-size: 14px;
}
.shipping-fee-name,
.total-order-name {
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.7px;
}
.payment-method-option {
  /* padding: 15px; */
  margin-top: 2%;
  border-top: solid 1px silver;
  border-bottom: solid 1px silver;
  display: flex;
  justify-content: space-between;
}

.payment-method-option h6 {
  padding: 10px;
}
.chosen-method {
  padding: 10px;
  cursor: pointer;
  /* color: blue; */
  padding-right: 10%;
}
.chosen-method:hover {
  /* color: #d500f9; */
  color: blue;
  text-decoration: underline;
  font-weight: 500;
}

.confirm-message {
  padding: 20px 0;
}
/* -- custom radio */
.color {
  position: relative;
  padding-right: 10px;
}

/* Hide the browser's default checkbox */
.color input {
  visibility: hidden;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  left: 0;
  height: 20px;
  width: 20px;
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

.btn {
  background: #cc6bfd;
  color: white;
  font-weight: 500;
  font-size: 18px;
  border-radius: 7px;
  margin-left: 4%;
  width: 90%;
  padding: 12px;
  margin: 30px 0;
}
.btn:hover {
  color: white;
}
</style>
