<template>
  <div class="product-detail-info">
    <div class="product-info">
      <div class="product-name">
        <h4>{{ productDetails.name }}</h4>
      </div>
      <div class="product-price">{{ productDetails.price }} VND</div>
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
      <!-- <div class="product-size">
          <ul class="size-check">
            <li>
              <input type="checkbox" />
              <span class="checkmark"></span>
            </li>
          </ul>
        </div> -->
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
    };
  },
  props: {
    productDetails: Object,
  },
  methods: {
    displayBtnCart() {
      if (this.checkedColor == "") {
        this.showError = true;
        return true;
      } else {
        this.showError = false;
        return false;
      }
    },
    closeWarning() {
      this.displayWarning = false;
      // this.$router.go();
    },
    getColor(value) {
      this.checkedColor = value;
    },
    getProductToCart(value) {
      if (this.$store.state.user == null) {
        this.displayWarning = true;
      } else {
        this.$store.dispatch("getShoppingList");
        let storeShoppping = JSON.parse(this.$store.state.shoppingList);
        const product = {
          id: value._id,
          name: value.name,
          img: value.productImg,
          price: value.price,
          color: this.checkedColor,
          quantityProduct: 1,
          product_id: "",
        };
        if (storeShoppping == null) {
          this.tempShoppingList.push(product);
          this.tempShoppingList[0].product_id = "101";
          this.$store.dispatch("storeShoppingList", this.tempShoppingList);
        } else {
          storeShoppping.push(product);
          storeShoppping.forEach((item, index) => {
            item.product_id = "1" + index;
          });
          this.$store.dispatch("storeShoppingList", storeShoppping);
        }
        this.$emit("open-waiting-list", true);
      }
    },
  },
  watch: {},
  mounted() {
    console.log(this.productDetails);
  },
};
</script>

<style scoped>
.product-info {
  padding: 10px 20px;
}
.product-name h4 {
  font-size: 20px;
}
h4 {
  font-size: 21px;
}
.product-price {
  padding: 10px 0;
  font-size: 25px;
  color: red;
  font-weight: 500;
}
.product-color {
  display: grid;
  width: 500px;
  grid-template-columns: 0.1fr 1fr;
  margin-bottom: 30px;
  margin-top: 20px;
}
.product-color label {
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
  background: #000;
  color: white;
  width: 80%;
  font-weight: 500;
}
.btn_add-cart:hover {
  color: white;
}
</style>
