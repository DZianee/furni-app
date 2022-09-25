<template>
  <div class="product-detail-info">
    <div class="product-info">
      <div class="product-name">
        <h4>{{ productDetails.name }}</h4>
      </div>
      <div class="product-price">
        {{ formatPrice(productDetails.price) }} VND -
        {{ status }}
      </div>
      <div class="product-color">
        <label for="productColor">Color:</label>
        <div class="color-check">
          <div v-for="color in productDetails.color" :key="color">
            <label class="color">
              <input
                type="radio"
                @click="getColor(color)"
                name="productColor"
              />
              <span
                class="checkmark"
                :style="{ backgroundColor: color }"
              ></span>
            </label>
          </div>
        </div>
      </div>
      <div class="product-quantity">
        <label for="quantity">Quanity: </label>
        <div class="control-wrapper">
          <button
            class="decrease"
            @click="decreaseQuantity(productDetails._id)"
          >
            -
          </button>
          <input
            type="text"
            name="quantity"
            min="0"
            :value="productTempQuantity"
            readonly
          />
          <button
            class="increase"
            @click="increaseQuantity(productDetails._id)"
            :disabled="status == 'OUT OF STOCK'"
          >
            +
          </button>
        </div>
      </div>
      <div class="error-message" v-if="showOutStock">
        <p style="color: red">PRODUCT is not available now</p>
      </div>
      <div class="error-message" v-if="showError">
        <p style="color: red">Please ensure the color has been chosen</p>
      </div>
      <div class="btn btn_add-cart" v-if="displayBtnCart()">Add to Cart</div>
      <div
        class="btn btn_add-cart"
        @click="getProductToCart(productDetails)"
        v-else
      >
        Add to Cart
      </div>
    </div>
  </div>
  <component
    :is="'notifi-modal'"
    @close-modal="closeWarning"
    :openModal="displayWarning"
  >
    Oops! Please Sign In to experience this</component
  >
</template>

<script>
export default {
  name: "ProductDetailsInfo",
  data() {
    return {
      displayWarning: false,
      tempShoppingList: [],
      checkedColor: "",
      checkStatus: true,
      showError: false,
      showOutStock: false,
      productId: this.$route.params.id,
      productTempQuantity: 0,
      status: "",
    };
  },
  props: {
    productDetails: Object,
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toString();
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // .slice(",", 2);
    },
    async getProductDetails() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productId}`
        );
        this.status = res.data.data.status;
      } catch (error) {
        console.log(error);
      }
    },
    async decreaseQuantity(id) {
      if (this.productTempQuantity == 0) {
        this.productTempQuantity = 0;
      } else {
        this.productTempQuantity--;
      }
      if (this.productTempQuantity > 0) {
        const exportQuantity = {
          exportQuantity: 1,
          type: "decrease",
        };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Product/updateProductPrice/${id}`,
          exportQuantity,
          this.$axios.defaults.headers["Authorization"]
        );
        const result = res.data.data.status;
        if (result === "IN STOCK") {
          this.status = "IN STOCK";
        }
      }
    },
    async increaseQuantity(id) {
      const exportQuantity = {
        exportQuantity: 1,
        type: "increase",
      };
      this.$store.dispatch("accessToken");
      const res = await this.$axios.put(
        `api/Product/updateProductPrice/${id}`,
        exportQuantity,
        this.$axios.defaults.headers["Authorization"]
      );
      const result = res.data.data.status;
      if (result === "OUT OF STOCK") {
        this.status = "OUT OF STOCK";
      } else {
        this.productTempQuantity++;
      }
    },
    displayBtnCart() {
      if (this.productDetails.status === "OUT OF STOCK") {
        this.showOutStock = true;
        return true;
      } else {
        this.showOutStock = false;
        if (this.checkedColor == "") {
          this.showError = true;
          return true;
        } else {
          this.showError = false;
          return false;
        }
      }
    },
    closeWarning() {
      this.displayWarning = false;
      // this.$router.go();
    },
    getColor(value) {
      this.checkedColor = value;
    },
    async getProductToCart(value) {
      if (this.$store.state.user == null) {
        this.displayWarning = true;
      } else {
        this.$store.dispatch("getShoppingList");
        let storeShoppping = JSON.parse(this.$store.state.shoppingList);
        let product = {
          id: value._id,
          name: value.name,
          img: value.productImg,
          price: value.price,
          color: this.checkedColor,
          quantityProduct: this.productTempQuantity,
          product_id: "",
        };
        if (storeShoppping == null || storeShoppping == "") {
          this.tempShoppingList.push(product);
          this.tempShoppingList[0].product_id = "101";
          this.$store.dispatch("storeShoppingList", this.tempShoppingList);
        } else {
          let option;
          storeShoppping.forEach((item) => {
            if (item.color == product.color && item.id == product.id) {
              option = 1;
            }
          });
          switch (option) {
            case 1:
              storeShoppping.forEach((item) => {
                item.color == product.color && item.id == product.id;
                item.quantityProduct =
                  item.quantityProduct + product.quantityProduct;
              });
              break;
            default:
              storeShoppping.push(product);
              storeShoppping.forEach((item, index) => {
                item.product_id = "1" + index;
              });
              break;
          }
          this.$store.dispatch("storeShoppingList", storeShoppping);
        }
        // const exportQuantity = {
        //   exportQuantity: this.productTempQuantity,
        //   type: "increase",
        // };
        // this.$store.dispatch("accessToken");
        // const res = await this.$axios.put(
        //   `api/Product/updateProductPrice/${product.id}`,
        //   exportQuantity,
        //   this.$axios.defaults.headers["Authorization"]
        // );
        // console.log(res);
        // if (res.data.data.status == "OUT OF STOCK") {
        // }
        this.$emit("open-waiting-list", true);
        this.productTempQuantity = 1;
      }
    },
  },
  watch: {},
  mounted() {
    this.getProductDetails();
  },
};
</script>

<style scoped>
.product-info {
  padding: 2% 2%;
}
.product-name h4 {
  font-size: 1.3rem;
}

.product-price {
  padding: 10px 0;
  font-size: 1.7rem;
  color: red;
  font-weight: 500;
}
.product-color {
  display: grid;
  width: 500px;
  grid-template-columns: 0.1fr 1fr;
  margin-bottom: 30px;
  margin-top: 2%;
}
.product-color label,
.product-quantity label {
  font-size: 16px;
  font-weight: 500;
}
.color-check {
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.color {
  position: relative;
  cursor: pointer;
}

/* Hide the browser's default checkbox */
.color input {
  visibility: hidden;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 30px;
}
.checkmark:hover {
  border: solid 1px;
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

/* --- product quantity --- */
.product-quantity {
  margin-bottom: 4%;
  display: flex;
  gap: 20px;
}
.product-quantity button {
  width: 30px;
  border: solid 1px;
}
.product-quantity input {
  width: 40px;
  text-align: center;
}
.btn {
  background: #000;
  color: white;
  padding: 9px 0;
  width: 80%;
  font-weight: 500;
  border-radius: 5px;
}
.btn_add-cart:hover {
  color: white;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .btn {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .color-check {
    grid-template-columns: repeat(4, 1fr);
  }
  .product-color {
    width: 250px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .color-check {
    grid-template-columns: repeat(4, 1fr);
  }
  .product-color {
    width: 250px;
  }
}
</style>
