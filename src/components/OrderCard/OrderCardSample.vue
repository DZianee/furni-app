<template>
  <transition>
    <div class="order-card_sample">
      <div class="wrapper">
        <div class="empty-order-list" v-if="orderUserList.length < 1">
          <img src="./Stuck-at-Home-Mailing-List.png" alt="" />
          <p>Oops! Empty order</p>
        </div>
        <div
          class="card all-order-item"
          v-else
          v-for="item in orderUserList"
          :key="item.index"
        >
          <div class="header-info">
            <div class="created-info">
              <div class="order-code">
                Code <span>{{ item.orderId }}</span>
              </div>
              <div class="date-create">
                Date <span>{{ item.dateCreate }}</span>
              </div>
              <div class="number-products">
                Size <span>{{ item.cart.length }}</span>
              </div>
            </div>
            <div class="given-info">
              <div class="status">
                Status
                <span :style="orderStatusColor(item.process)">
                  {{ orderStatus(item.process) }}</span
                >
              </div>
              <div class="estimate_delivery-time">
                Estimated delivery date <span>13/05/2022</span>
              </div>
            </div>
          </div>
          <div class="item-in-order">
            <div
              class="product-in-cart"
              v-for="product in item.cart"
              :key="product.index"
            >
              <div class="item-img">
                <img
                  src="https://www.ikea.com/nl/en/images/products/gladstad-upholstered-bed-2-storage-boxes-kabusa-light-grey__1012080_pe828858_s5.jpg?f=xl"
                  alt="product-img"
                />
              </div>
              <div class="item-overview">
                <div class="item-name">
                  {{ product.name }}
                  (<label class="color">
                    <input type="radio" name="productColor" disabled />
                    <span
                      class="checkmark"
                      :style="{ backgroundColor: product.color }"
                    ></span> </label
                  >)
                </div>
                <div class="item-quantity">x {{ product.quantity }}</div>
                <div class="item-price">{{ product.amount }} VND</div>
              </div>
            </div>
          </div>
          <div class="item-total_price-cancel">
            <div class="item-total_price">
              Total bill:
              <span style="color: red">{{ item.totalBill }} VND</span>
            </div>
            <div class="cancel-order">
              <button v-if="hiddenBtn(item.process)">Cancel order</button>
            </div>
          </div>
        </div>
      </div>
    </div></transition
  >
</template>

<script>
export default {
  name: "OrderCardSample",
  data() {
    return {
      newOrderUserList: [],
    };
  },
  props: {
    orderUserList: Array,
  },
  methods: {
    hiddenBtn(value) {
      if (value != "New") {
        return false;
      } else {
        return true;
      }
    },
    orderStatusColor(value) {
      if (value === "New") {
        return "color: #f50057; font-weight: 600; font-size: 16px";
      } else if (value === "Checked") {
        return "color: #ffab00; font-weight: 600; font-size: 16px";
      } else if (value === "Delivery") {
        return "color: #2962ff; font-weight: 600; font-size: 16px";
      } else if (value === "Completed") {
        return "color: green; font-weight: 600; font-size: 16px";
      } else {
        return "color: red; font-weight: 600; font-size: 16px";
      }
    },
    orderStatus(value) {
      if (value === "New") {
        return "Waiting for checking";
      } else if (value === "Checked") {
        return "Received order";
      } else if (value === "Delivery") {
        return "In delivery";
      } else if (value === "Completed") {
        return "Completed";
      } else {
        return "Cancelled";
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.order-card_sample {
  padding: 2% 0;
  padding-left: 6%;
}
/* -- empty list --- */
.empty-order-list {
  text-align: center;
}
.empty-order-list p {
  font-size: 20px;
  padding: 10px;
  font-style: italic;
}
.empty-order-list img {
  width: 30%;
}

/* -- wrapper -- */
.wrapper {
  height: 740px;
  overflow-y: auto;
  /* background: rgb(212, 210, 210); */
}

.card {
  /* width: 100%; */
  border: none;
  border-radius: 5px;
}
/* -- header card info -- */
.header-info {
  background: #fffde7;
  display: flex;
  justify-content: space-between;
}

.header-info .created-info div,
.header-info .given-info div {
  padding: 10px;
  font-size: 14px;
  width: 280px;
}

.header-info .created-info div span,
.header-info .given-info div span {
  font-size: 15px;
  font-weight: 500;
  padding-left: 2%;
}

/* -- item in order --- */
.item-in-order {
  height: 220px;
  overflow-y: auto;
}

.product-in-cart {
  padding: 0 50px;
  /* border-top: 1px solid rgb(163, 161, 161); */
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  column-gap: 40px;
}

.item-img img {
  width: 70%;
  /* height: 100%; */
}

.item-overview {
  padding: 10px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}

.item-overview div {
  padding: 7px;
}

.item-overview .item-name {
  font-size: 17px;
  font-weight: 500;
}

.item-total_price-cancel {
  border-top: 1px solid;
  padding: 7px 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.item-total_price-cancel span {
  font-weight: 500;
}
/* cancel btn */
.cancel-order button {
  color: white;
  font-weight: 500;
  background: #d50000;
  padding: 5px 10px;
  border: none;
  border-radius: 7px;
  font-size: 15px;
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
</style>
