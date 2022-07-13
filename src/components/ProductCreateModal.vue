<template>
  <div class="product-create-modal">
    <div
      class="modal fade"
      id="createProductModal"
      tabindex="-1"
      aria-labelledby="createProductModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Product</h5>
          </div>
          <form enctype="multipart/form-data">
            <div class="modal-body">
              <div class="product-info">
                <h6>Information overview</h6>
                <div class="product-type">
                  <label for="productType">Type:</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    v-model="newProduct.type"
                  />
                </div>
                <div class="product-name">
                  <label for="productName">Product name:</label>
                  <input
                    type="text"
                    minlength="10"
                    required
                    class="form-control"
                    v-model="newProduct.name"
                  />
                </div>
                <div class="product_price-quantity">
                  <div class="product-price">
                    <label for="productPrice">Price:</label>
                    <input
                      type="number"
                      required
                      class="form-control"
                      v-model="newProduct.price"
                    />
                  </div>
                  <div class="product-quantity">
                    <label for="productQuantity">Quantity:</label>
                    <input
                      type="number"
                      required
                      class="form-control"
                      v-model="newProduct.importQuantity"
                    />
                  </div>
                </div>

                <div class="product-color">
                  <label for="productColor">Color:</label>
                  <div class="color-check">
                    <div v-for="color in colorStore" :key="color">
                      <label class="color">
                        <input type="checkbox" @click="getColor(color)" />
                        <span
                          class="checkmark"
                          :style="{ backgroundColor: color }"
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="technical-info">
                <h6>Technical Info</h6>
                <div class="measurement">
                  <div class="height">
                    <label for="height">H</label>
                    <input
                      type="number"
                      class="form-control"
                      required
                      v-model="newProduct.height"
                    />
                  </div>
                  <div class="width">
                    <label for="width">W</label>
                    <input
                      type="number"
                      class="form-control"
                      required
                      v-model="newProduct.width"
                    />
                  </div>
                  <div class="depth">
                    <label for="depth">D</label>
                    <input
                      required
                      type="number"
                      class="form-control"
                      v-model="newProduct.depth"
                    />
                  </div>
                  <div class="length">
                    <label for="length">L</label>
                    <input
                      required
                      type="number"
                      class="form-control"
                      v-model="newProduct.length"
                    />
                  </div>
                </div>
              </div>
              <div class="product-img">
                <h6>Illustrate image</h6>
                <input type="file" accept="image/*" @change="selectImg" />
              </div>
              <div class="product-details">
                <h6>Details Information</h6>
                <div class="product-des">
                  <label for="productDes">Product description:</label>
                  <QuillEditor
                    :heightEditor="'120'"
                    :contentEdit="newProduct.description"
                    :editorCase="1"
                    @handleInput="handleInput"
                  />
                </div>
                <div class="product-about">
                  <label for="productAbout">About product (Company):</label>
                  <QuillEditor
                    :heightEditor="'120'"
                    :contentEdit="newProduct.about"
                    :editorCase="2"
                    @handleInput="handleInput"
                  />
                </div>
              </div>
            </div>
            <div class="confirm-btn">
              <button
                type="button"
                class="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn"
                style="background: #aa40e3; color: white"
                @click="createProduct"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuillEditor from "./QuillEditor.vue";

export default {
  name: "ProductCreateModal",
  components: {
    QuillEditor,
  },
  data() {
    return {
      colorStore: [
        "white",
        "#fff0f0",
        "#f4ff81",
        "#ff8080",
        "#f44336",
        "#be79df",
        "#50d890",
        "#8c9eff",
        "#4527a0",
        "grey",
        "black",
      ],
      newProduct: {
        name: "",
        code: "",
        price: 0,
        importQuantity: 0,
        color: [],
        type: "",
        description: "",
        about: "",
        width: 0,
        height: 0,
        length: 0,
        depth: 0,
        category: "",
        productImg: "",
      },
      colors: ["dd", "fdfdf"],
    };
  },
  props: {
    cateId: String,
    cateCode: String,
  },
  methods: {
    handleInput(value, caseOption) {
      console.log(caseOption);
      if (caseOption == "1") {
        this.newProduct.description = value;
      } else if (caseOption == "2") {
        this.newProduct.about = value;
      }
    },
    selectImg(e) {
      this.newProduct.productImg = e.target.files[0];
      console.log(this.newProduct.productImg);
    },
    getColor(col) {
      let color = col;
      this.newProduct.color.push(color);
      this.eliminateColor(color);
      console.log(this.newProduct.color);
    },
    eliminateColor(value) {
      const test = this.newProduct.color.filter((item) => item === value);
      if (test.length > 1) {
        let tests;
        tests = this.newProduct.color.filter((item) => item != value);
        this.newProduct.color = tests;
        console.log(this.newProduct.color);
        console.log(typeof this.newProduct.color);
      }
    },

    async createProduct() {
      try {
        console.log(this.newProduct);
        const result = new Date(Date.now());
        var year = result.getFullYear();
        var month = ("0" + (result.getMonth() + 1)).slice(-2);
        var day = ("0" + result.getDate()).slice(-2);
        const dmy = day + month + year;
        const productCode =
          this.cateCode +
          dmy +
          (Math.floor(Math.random() * 9) + 1) +
          (Math.floor(Math.random() * 99) + 10) +
          Math.floor(Math.random() * 9);

        const product = new FormData();
        product.append("name", this.newProduct.name);
        product.append("code", productCode);
        product.append("productImg", this.newProduct.productImg);
        product.append("price", this.newProduct.price);
        product.append("importQuantity", this.newProduct.importQuantity);
        product.append("color", this.newProduct.color);
        product.append("type", this.newProduct.type);
        product.append("description", this.newProduct.description);
        product.append("about", this.newProduct.about);
        product.append("width", this.newProduct.width);
        product.append("height", this.newProduct.height);
        product.append("length", this.newProduct.length);
        product.append("depth", this.newProduct.depth);
        product.append("category", this.cateId);

        this.$store.dispatch("accessToken");
        const res = await this.$axios.post(
          `api/Product/newProduct`,
          product,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        if (res.status == 200) {
          console.log(this.newProduct.color);
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}

/* ---  */
.product-name,
.product-type,
.product_price-quantity,
.measurement,
.product-image,
.product-des,
.product-about,
.product-color {
  padding: 7px 30px;
}
.product-des,
.product-about {
  padding: 10px 30px;
}

.product-img,
.technical-info,
.product-details {
  margin-top: 40px;
}

.product-type {
  width: 40%;
  display: flex;
}
.product-name input {
  width: 95%;
}
.modal-body h6 {
  background: #f0f0f0;
  padding: 10px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
input {
  width: 90%;
  margin: 0 18px;
  padding: 8px;
  font-size: 15px;
}

.product_price-quantity,
.measurement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}

/* --- Custom checkbox --- */
.product-color {
  display: flex;
}
.color-check {
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
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
  border: solid 1px grey;
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

/* --- Button ---*/
.confirm-btn {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
}
.confirm-btn button {
  width: 50%;
  font-weight: 500;
  letter-spacing: 0.3px;
  padding: 8px 0;
  font-size: 16px;
}
.cancel-btn {
  background: rgb(167, 160, 160);
  color: white;
}
</style>
