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
                Delivery <span>Within a week</span>
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
                  :src="`http://localhost:2371/${product.productImg}`"
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
                <div class="item-quantity">
                  x {{ formatPrice(product.quantity) }}
                </div>
                <div class="item-price" style="font-weight: 500">
                  {{ formatPrice(product.amount) }} VND
                </div>
              </div>
            </div>
          </div>
          <div class="item-total_price-cancel">
            <div class="item-total_price">
              Total bill:
              <span style="color: red; font-size: 18px"
                >{{ formatPrice(item.totalBill) }} VND</span
              >
            </div>
            <div class="cancel-order">
              <button
                v-if="hiddenBtn(item.process, item.dateClose)"
                @click="cancelOpen(item._id)"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
              >
                Cancel order
              </button>
              <p
                style="color: red; font-size: 14px; padding: 10px"
                v-if="hiddenBtn(item.process, item.dateClose)"
              >
                Within 24 hours, Cancel Order will be closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <component :is="'remove-modal'" @delete-confirm="deleteConfirm"></component>
</template>

<script>
export default {
  name: "OrderCardSample",
  data() {
    return {
      newOrderUserList: [],
      removeId: "",
    };
  },
  props: {
    orderUserList: Array,
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toString();
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    hiddenBtn(value, dateCloseCancel) {
      console.log(dateCloseCancel);
      let currentDate = new Date(Date.now());
      let dayCurrent = currentDate.getDate();
      let hourCurrent = currentDate.getHours();
      // let minCurrent = currentDate.getMinutes();

      let dateClose = new Date(dateCloseCancel);
      let dayClose = dateClose.getDate();
      let hourClose = dateClose.getHours();
      // let minClose = dateClose.getMinutes();

      const dayResult = dayClose - dayCurrent;
      const hourResult = hourClose - hourCurrent;
      // const minResult = minClose - minCurrent;

      if (
        (value === "New" && dayResult == 0 && hourResult == 0) ||
        value != "New"
      ) {
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
    cancelOpen(value) {
      this.removeId = value;
    },
    async deleteConfirm() {
      try {
        const order = {
          status: "Unactive",
          process: "Cancelled",
        };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Order/updateOrder/${this.removeId}`,
          order,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$emit("load-page");
        }
      } catch (error) {
        // console.log(error);
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
  font-size: 18px;
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
  overflow-x: hidden;
  /* background: rgb(212, 210, 210); */
}
.wrapper {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.wrapper::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.card {
  /* width: 100%; */
  border: none;
  border-radius: 5px;
}
/* -- header card info -- */
.header-info {
  background: #fffde7;
  display: grid;
  /* justify-content: space-between; */
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

.header-info .created-info div,
.header-info .given-info div {
  padding: 10px;
  font-size: 14px;
  /* width: 280px; */
}

.header-info .created-info div span,
.header-info .given-info div span {
  font-size: 15px;
  font-weight: 500;
  padding-left: 2%;
}

/* -- item in order --- */
.item-in-order {
  height: 260px;
  overflow-y: auto;
}

.product-in-cart {
  padding: 0;
  /* border-top: 1px solid rgb(163, 161, 161); */
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  column-gap: 40px;
}

.item-img img {
  margin-top: 7%;
  width: 100%;
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
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.item-total_price {
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

/* ---- Responsive ---- */
@media screen and (max-width: 1440px) {
  .item-in-order {
    height: 200px;
  }
}
@media screen and (max-width: 768px) {
  .item-in-order {
    height: 160px;
  }
  .order-card_sample {
    padding: 2% 0;
    padding-left: 0;
  }
  .item-overview .item-name {
    font-size: 16px;
  }
}
</style>
