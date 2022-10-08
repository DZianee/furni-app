<template>
  <div class="product-manage-details-view container">
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="Route('productCategoryView')">
          Product Category
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Product details info
        </li>
      </ol>
    </nav>
    <div class="title">
      <h3 style="text-align: center">Details information of Product</h3>
    </div>
    <hr />
    <form enctype="multipart/form-data" @submit.prevent="updateProduct">
      <div class="details-container">
        <div class="details-content">
          <div class="product-info">
            <h5>Information overview</h5>
            <div class="product_code-name">
              <div class="product-code" style="margin-bottom: 15px">
                <label for="productCode">Product Code:</label>
                <input
                  type="text"
                  readonly
                  class="form-control"
                  v-model="productDetails.code"
                />
              </div>
              <div class="product-code">
                <label for="productCode"></label>
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="productDetails.type"
                /> -->
              </div>
              <div class="product-name">
                <label for="productName">Product name:</label>
                <input
                  type="text"
                  minlength="10"
                  required
                  class="form-control"
                  v-model="productDetails.name"
                />
              </div>
              <div class="product-code">
                <label for="productCode">Type:</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="productDetails.type"
                />
              </div>
            </div>
            <div class="product_price-quantity">
              <div class="product-price">
                <label for="productPrice">Price:</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="any"
                  class="form-control"
                  v-model="productDetails.price"
                />
              </div>
              <div class="product-quantity">
                <label for="productQuantity">Quantity:</label>
                <input
                  type="number"
                  minlength="1"
                  required
                  class="form-control"
                  v-model="productDetails.importQuantity"
                />
              </div>
            </div>
          </div>
          <div class="technical-info">
            <h5>Technical Info</h5>
            <div class="measurement">
              <div class="height">
                <label for="height">H</label>
                <input
                  type="number"
                  class="form-control"
                  required
                  v-model="technicalInfo.height"
                />
              </div>
              <div class="width">
                <label for="width">W</label>
                <input
                  type="number"
                  class="form-control"
                  required
                  v-model="technicalInfo.width"
                />
              </div>
              <div class="depth">
                <label for="depth">D</label>
                <input
                  type="number"
                  required
                  class="form-control"
                  v-model="technicalInfo.depth"
                />
              </div>
              <div class="length">
                <label for="length">L</label>
                <input
                  type="number"
                  required
                  class="form-control"
                  v-model="technicalInfo.length"
                />
              </div>
            </div>
          </div>
          <div class="product-details">
            <h5>Details Information</h5>
            <div class="product-des">
              <label for="description">Product description:</label>
              <span v-if="productDetails.description != null">
                <QuillEditor
                  :heightEditor="'120'"
                  :contentEdit="productDetails.description"
                  :editorCase="1"
                  @handleInput="handleInput"
                />
              </span>
            </div>
            <div class="product-about">
              <label for="productAbout">About product (Company):</label>
              <span v-if="productDetails.about != null">
                <QuillEditor
                  :heightEditor="'120'"
                  :contentEdit="productDetails.about"
                  :editorCase="2"
                  @handleInput="handleInput"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="details-color-img">
          <div class="product-color">
            <label for="productColor">Color:</label>
            <div class="color-check">
              <div class="checked-color">
                <label
                  class="color"
                  v-for="color in productDetails.color"
                  :key="color.index"
                >
                  <input
                    type="checkbox"
                    @click="changeColor(color)"
                    checked
                    required
                  />
                  <span
                    class="checkmark"
                    :style="{ backgroundColor: color }"
                  ></span>
                </label>
              </div>
              <div class="add-color">
                <label class="color" v-for="color in colorStore" :key="color">
                  <input type="checkbox" @click="getColor(color)" />
                  <span
                    class="checkmarks"
                    :style="{ backgroundColor: color }"
                  ></span>
                </label>
              </div>
            </div>
          </div>
          <div class="product-img">
            <h5>Illustrate image</h5>
            <img
              :src="`http://localhost:2371/${productDetails.productImg}`"
              alt="product-img"
            />
            <input type="file" accept="image/*" @change="selectImg" />
          </div>
          <div class="product_3d-img" v-if="user === 'Admin'">
            <h5>Illustrate 3D image</h5>
            <p v-if="productDetails.imgCloudinary != ''">
              {{ productDetails.imgCloudinary }}
            </p>
            <input type="file" @change="select3DImg" />
            <div>
              <button @click="update3DImg" v-if="productDetails.imgCloudinary">
                Update change
              </button>
              <button @click="upload3DImg" v-else>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn submit-btn" type="submit">Submit changes</button>
    </form>
  </div>
</template>

<script>
import QuillEditor from "../components/QuillEditor.vue";
export default {
  name: "ProductManageDetailsView",
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
      cateId: "",
      productId: this.$route.params.id,
      productDetails: {},
      product: {
        img: "",
        img_3d: "",
      },
      technicalInfo: {
        height: 0,
        width: 0,
        length: 0,
        depth: 0,
      },
    };
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/Product/productDetails/${this.productId}`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.productDetails = res.data.data;
      // const test = this.colorStore.filter(
      //   (item) => !this.productDetails.color.includes(item)
      // );
      // this.colorStore = test;
      // this.product.color = test;
      // console.log(this.product.color);
      this.technicalInfo.width = res.data.data.technicalInfo.width;
      this.technicalInfo.depth = res.data.data.technicalInfo.depth;
      this.technicalInfo.length = res.data.data.technicalInfo.length;
      this.technicalInfo.height = res.data.data.technicalInfo.height;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    user() {
      const role = JSON.parse(this.$store.state.user).role.name;
      return role;
    },
  },
  methods: {
    async updateProduct() {
      try {
        const updateProduct = new FormData();
        updateProduct.append("name", this.productDetails.name);
        updateProduct.append("productImg", this.product.img);
        updateProduct.append("price", this.productDetails.price);
        updateProduct.append(
          "importQuantity",
          this.productDetails.importQuantity
        );
        updateProduct.append("color", this.productDetails.color);
        updateProduct.append("type", this.productDetails.type);
        updateProduct.append("description", this.productDetails.description);
        updateProduct.append("about", this.productDetails.about);
        updateProduct.append("width", this.technicalInfo.width);
        updateProduct.append("height", this.technicalInfo.height);
        updateProduct.append("length", this.technicalInfo.length);
        updateProduct.append("depth", this.technicalInfo.depth);
        updateProduct.append("imgCloudinary", this.product.img_3d);
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/updateProduct/${this.productId}`,
          updateProduct,
          this.$axios.defaults.headers["Authorization"]
        );
        this.$store.dispatch("getCateId");
        this.cateId = this.$store.state.cateId;
        this.$router.push({
          name: "productCategoryView",
          params: { id: this.cateId },
        });
      } catch (error) {
        console.log(error);
      }
    },
    async upload3DImg() {
      try {
        const upload3DImg = new FormData();
        upload3DImg.append("imgCloudinary", this.product.img_3d);
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/productDetails/${this.productId}/uploadThreeDImg`,
          upload3DImg,
          this.$axios.defaults.headers["Authorization"]
        );
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async update3DImg() {
      try {
        const update3DImg = new FormData();
        update3DImg.append("imgCloudinary", this.product.img_3d);
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/productDetails/${this.productId}/updateThreeDImg`,
          update3DImg,
          this.$axios.defaults.headers["Authorization"]
        );
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    Route(value) {
      this.$store.dispatch("getCateId");
      this.cateId = this.$store.state.cateId;
      this.$router.push({ name: value, params: { id: this.cateId } });
    },
    handleInput(value, caseOption) {
      if (caseOption == "1") {
        this.productDetails.description = value;
      } else if (caseOption == "2") {
        this.productDetails.about = value;
      }
    },
    selectImg(e) {
      this.product.img = e.target.files[0];
      console.log(this.product.img);
    },
    select3DImg(e) {
      this.product.img_3d = e.target.files[0];
      console.log(this.product.img_3d);
    },
    getColor(col) {
      const test = this.productDetails.color.filter((item) => item === col);
      if (test.length > 0) {
        return;
      } else {
        this.productDetails.color.push(col);
      }
      this.eliminateColor(col);
    },
    changeColor(col) {
      this.productDetails.color.push(col);
      this.eliminateColor(col);
    },
    eliminateColor(value) {
      const test = this.productDetails.color.filter((item) => item === value);
      if (test.length > 1) {
        const tests = this.productDetails.color.filter((item) => item != value);
        this.productDetails.color = tests;
      }
    },
  },
};
</script>

<style scoped>
.product-manage-details-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 6%;
}
.breadcrumb-item:hover {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.breadcrumb-item.active {
  color: rgb(174, 67, 255);
  font-weight: 500;
}
.details-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  column-gap: 50px;
  margin-top: 4%;
  padding: 20px;
  /* border-radius: 30px;
  border: solid lightblue; */
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px; */
}
.details-color-img {
  margin-top: 50px;
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
  font-size: 15px;
}
.product-img,
.technical-info,
.product-details {
  margin-top: 30px;
}
.product_3d-img {
  margin-top: 45px;
}
.product_3d-img p {
  width: 70%;
  word-break: break-all;
}
.product_3d-img div button {
  margin: 15px;
  padding: 7px;
  width: 100%;
  color: white;
  background: #0096ff;
  font-weight: 500;
  border: none;
  border-radius: 5px;
}
.product_code-name,
.product_price-quantity,
.measurement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  padding: 10px;
}
.product-des:not(label),
.product-about:not(label) {
  padding: 10px 30px;
}

img {
  width: 40%;
  margin-bottom: 20px;
}

.product-color {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
}
.color-check {
  margin-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}
.checked-color {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.add-color {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.checkmark,
.checkmarks {
  position: absolute;
  top: 7px;
  left: 0;
  height: 25px;
  width: 25px;
  border: solid 1px grey;
}

/* On mouse-over, add a grey background color */
.color:hover input ~ .checkmark,
.color:hover input ~ .checkmarks {
  background-color: rgb(197, 197, 197);
}

/* When the checkbox is checked, add a blue background */
/* .color input:checked ~ .checkmark {
  background-color: #2196f3;
} */

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after,
.checkmarks:after {
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

/* -- btn --- */
.btn {
  background: #aa40e3;
  color: white;
  float: right;
  margin: 30px 40px 60px 0;
  font-weight: 500;
}
.btn:hover {
  color: white;
}

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .product-manage-details-view {
    right: -3%;
    width: calc(100% - 200px);
  }
}
@media screen and (max-width: 1250px) {
  .product-manage-details-view {
    right: -2.5%;
    width: calc(100% - 145px);
  }
}
@media screen and (max-width: 1200px) {
  .product-manage-details-view {
    right: -1.5%;
    width: calc(100% - 125px);
  }
  .details-container {
    display: grid;
    grid-template-columns: 100%;
    column-gap: 50px;
    margin-top: 4%;
    padding: 20px;
  }
  .checked-color,
  .add-color {
    width: 80%;
  }
}

@media screen and (max-width: 768px) {
  .product-manage-details-view {
    grid-template-columns: 100%;
    row-gap: 80px;
    padding: 10px 0;
    right: 0;
    width: 100%;
    margin-bottom: 36%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  /* .product-manage-details-view {
    margin-bottom: 28%;
  } */
  .color-check label {
    padding: 10px 0;
  }
}
</style>
