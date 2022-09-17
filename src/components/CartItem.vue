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
    <div class="cart-list" v-else>
      <div
        class="card item-in-list"
        v-for="item in productInList"
        :key="item.index"
      >
        <div class="item-img">
          <img :src="`http://localhost:2371/${item.img}`" :alt="item.img" />
        </div>
        <div class="item-info wrapper">
          <h6>{{ item.name }}</h6>
          <div class="color-quantity">
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
            <div class="item-quantity">
              <input
                type="text"
                name="quantity"
                :value="item.quantityProduct"
                min="1"
                readonly
              />
              <button
                class="decrease"
                @click="
                  decreaseQuantity(
                    item.quantityProduct,
                    item.product_id,
                    item.id
                  )
                "
              >
                -
              </button>
              <button
                class="increase"
                @click="
                  increaseQuantity(
                    item.quantityProduct,
                    item.product_id,
                    item.id
                  )
                "
              >
                +
              </button>
            </div>
          </div>

          <div class="item-price">
            {{ totalPrice(item.price, item.quantityProduct) }} VND
          </div>
        </div>
        <div class="remove-item-icon">
          <button
            data-bs-toggle="modal"
            data-bs-target="#removeModal"
            class="icon icon_delete"
            @click="openRemoveModal(item.product_id, item.id)"
          >
            <i class="bx bx-md bx-x"></i>
          </button>
        </div>
      </div>
      <!-- <tr>
          <td></td>
          <td></td>
          <td class="cart_stable-price-title">
            <h5>Total</h5>
          </td>
          <td class="shopping-cart_stable-price">{{ totalBillCart() }} VND</td>
        </tr> -->
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
      updateQId: "",
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
    async increaseQuantity(value, id, _id) {
      console.log(id);
      value += 1;
      const shopList = JSON.parse(this.$store.state.shoppingList);
      const product = shopList.find((item) => item.product_id == id);
      product.quantityProduct = value;
      this.$store.dispatch("storeShoppingList", shopList);

      const exportQuantity = {
        exportQuantity: 1,
        type: "increase",
      };
      this.$store.dispatch("accessToken");
      await this.$axios.put(
        `api/Product/updateProductPrice/${_id}`,
        exportQuantity,
        this.$axios.defaults.headers["Authorization"]
      );
    },
    async decreaseQuantity(value, id, _id) {
      if (value == 1) {
        value = 1;
      } else {
        value -= 1;
      }
      const shopList = JSON.parse(this.$store.state.shoppingList);
      const product = shopList.find((item) => item.product_id == id);
      product.quantityProduct = value;
      this.$store.dispatch("storeShoppingList", shopList);
      if (value > 1) {
        const exportQuantity = {
          exportQuantity: 1,
          type: "decrease",
        };
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/updateProductPrice/${_id}`,
          exportQuantity,
          this.$axios.defaults.headers["Authorization"]
        );
      }
    },
    openRemoveModal(value, _id) {
      this.removeId = value;
      this.updateQId = _id;
    },
    async deleteConfirm() {
      const shoppingList = JSON.parse(this.$store.state.shoppingList);
      const result = shoppingList.filter(
        (item) => item.product_id != this.removeId
      );
      this.$store.dispatch("storeShoppingList", result);

      const exportQuantity = {
        exportQuantity: 1,
        type: "decrease",
      };
      this.$store.dispatch("accessToken");
      await this.$axios.put(
        `api/Product/updateProductPrice/${this.updateQId}`,
        exportQuantity,
        this.$axios.defaults.headers["Authorization"]
      );
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
  margin-top: 4%;
  width: 90%;
}
/* .item-name,
.item-quantity,
.item-price {
  transform: translateY(35%);
} */

/* -- empty-list -- */
.empty-content-message {
  margin-top: 2%;
  text-align: center;
  /* transform: translateX(200px); */
  color: rgb(155, 151, 151);
  font-style: italic;
}

/* --- limit cart list --- */
.cart-list {
  height: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.cart-list {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.cart-list::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
/* ---- card ---- */
.card {
  margin-bottom: 2%;
  padding: 1% 0;
  border: none;
  border-bottom: solid 2px;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.2fr;
  column-gap: 40px;
}
.card .item-img img {
  width: 80%;
}
.card .item-info div {
  padding: 1%;
}

/* -- quantity - price - color - name --- */
h6 {
  line-height: 32px;
}
.color-quantity {
  display: flex;
  justify-content: space-between;
}
.item-price {
  font-size: 1.2rem;
  float: right;
}
.item-quantity {
  display: flex;
  justify-content: space-between;
  width: 150px;
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

/* --- Responsive --- */
@media screen and (max-width: 1410px) {
  .cart-item {
    margin-top: 10%;
    width: 100%;
  }
}
@media screen and (max-width: 993px) {
  .item-quantity {
    width: 40%;
  }
  .card .item-img img {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  /* .item-quantity {
    width: 63%;
  } */
  .card .item-img img {
    width: 100%;
  }
  .card {
    grid-template-columns: 1fr 1fr 0.2fr;
    column-gap: 10px;
  }
  .item-price {
    font-size: 1.1rem;
  }
  .item-quantity {
    display: flex;
    justify-content: space-between;
    width: 136px;
    margin: auto;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .item-quantity input {
    width: 29px;
    height: 29px;
  }
  .item-quantity {
    display: flex;
    justify-content: space-between;
    width: 104px;
    margin: auto;
  }
  .item-price {
    border-top: solid 2px silver;
  }
  /* h4 {
    font-size: 18px;
  } */
  /* .decrease,
  .increase {
    font-size: 16px;
    height: 23px;
    width: 25px;
  } */
}
</style>
