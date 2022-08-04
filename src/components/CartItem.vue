<template>
  <div class="cart-item container">
    <div class="title">
      <h4>Your shopping cart ({{ countProductInList }} items)</h4>
      <hr />
    </div>
    <div v-if="productInList.length < 1" class="empty-content-message">
      <div>
        <i class="bx bxs-cart-alt bx-lg" style="color: #cfcfcf"></i>
      </div>
      <p>There is no content in the shopping list yet</p>
    </div>
    <div class="table-responsive" v-else>
      <table class="table">
        <tr v-for="item in productInList" :key="item.index">
          <td>
            <img :src="`http://localhost:2371/${item.img}`" :alt="item.img" />
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
          <td class="item-quantity">
            <div>
              <input
                type="text"
                name="quantity"
                :value="item.quantityProduct"
                min="1"
              />
              <button
                class="decrease"
                @click="decreaseQuantity(item.quantityProduct, item.product_id)"
              >
                -
              </button>
              <button
                class="increase"
                @click="increaseQuantity(item.quantityProduct, item.product_id)"
              >
                +
              </button>
            </div>
          </td>
          <td class="item-price">
            {{ totalPrice(item.price, item.quantityProduct) }} VND
          </td>
          <td class="remove-item-icon">
            <button
              data-bs-toggle="modal"
              data-bs-target="#removeModal"
              class="icon icon_delete"
              @click="openRemoveModal(item.product_id)"
            >
              <i class="bx bx-md bx-x"></i>
            </button>
          </td>
        </tr>
        <tr></tr>
        <!-- <tr>
          <td></td>
          <td></td>
          <td class="cart_stable-price-title">
            <h5>Total</h5>
          </td>
          <td class="shopping-cart_stable-price">{{ totalBillCart() }} VND</td>
        </tr> -->
      </table>
    </div>
    <!-- <button type="submit" class="btn move-to-order_info" @click="toNextStep">
      Continue <i class="bx bx-right-arrow-alt bx-fw"></i>
    </button> -->
    <component :is="'remove-modal'" @delete-confirm="deleteConfirm"></component>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  data() {
    return {
      removeId: null,
    };
  },
  props: {
    showCartItem: Boolean,
  },
  computed: {
    countProductInList() {
      let result = JSON.parse(this.$store.state.shoppingList);
      if (result == null) {
        result = 0;
      } else {
        result = result.length;
      }
      return result;
    },
    productInList() {
      this.$store.dispatch("getShoppingList");
      const result = JSON.parse(this.$store.state.shoppingList);
      if (result != null) {
        this.$emit("fill-color", "cart", true);
      }
      return result;
    },
  },
  methods: {
    totalPrice(value, quantity) {
      let count = 0;
      count = value * quantity;
      return count;
    },
    increaseQuantity(value, id) {
      value += 1;
      const shopList = JSON.parse(this.$store.state.shoppingList);
      const product = shopList.find((item) => item.product_id == id);
      product.quantityProduct = value;
      this.$store.dispatch("storeShoppingList", shopList);
    },
    decreaseQuantity(value, id) {
      if (value == 1) {
        value = 1;
      } else {
        value -= 1;
      }
      const shopList = JSON.parse(this.$store.state.shoppingList);
      const product = shopList.find((item) => item.product_id == id);
      product.quantityProduct = value;
      this.$store.dispatch("storeShoppingList", shopList);
    },
    openRemoveModal(value) {
      this.removeId = value;
      console.log(value);
    },
    deleteConfirm() {
      const shoppingList = JSON.parse(this.$store.state.shoppingList);
      const result = shoppingList.filter(
        (item) => item.product_id != this.removeId
      );
      this.$store.dispatch("storeShoppingList", result);
    },
    activateFunc() {
      this.$emit("fill-color", "cart", false);
    },
  },
  watch: {
    productInList() {
      if (this.productInList.length < 1) {
        this.activateFunc();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.cart-item {
  margin-top: 40px;
  width: 90%;
}
/* .item-name,
.item-quantity,
.item-price {
  transform: translateY(35%);
} */

/* -- table -- */
.empty-content-message {
  margin-top: 20px;
  text-align: center;
  /* transform: translateX(200px); */
  color: rgb(155, 151, 151);
  font-style: italic;
}
.table-responsive {
  height: 400px;
}

.table img {
  width: 170px;
}
/* -- quantity --- */
.item-quantity div {
  display: flex;
  justify-content: space-between;
  width: 85%;
}
.decrease,
.increase {
  background: #c7b6f7;
  font-weight: 500;
  font-size: 20px;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 7px;
}

.item-quantity input {
  width: 50px;
  height: 30px;
  text-align: center;
}

.cart_stable-price-title,
.shopping-cart_stable-price {
  padding: 20px;
}
.btn {
  background: #000;
  color: white;
  font-weight: 500;
  font-size: 16px;
  float: right;
  width: 150px;
}
.btn:hover {
  background: rgb(103, 101, 101);
}
.icon_delete {
  background: white;
  border: none;
}

/* --- Custom checkbox --- */
.item-color {
  width: 20%;
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
</style>
