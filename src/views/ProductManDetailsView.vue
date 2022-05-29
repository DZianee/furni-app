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
    <div class="details-container">
      <div class="details-content">
        <div class="product-info">
          <h5>Information overview</h5>
          <div class="product_code-name">
            <div class="product-code">
              <label for="productCode">Product Code:</label>
              <input type="text" readonly class="form-control" />
            </div>
            <div class="product-name">
              <label for="productName">Product name:</label>
              <input type="text" required class="form-control" />
            </div>
          </div>
          <div class="product_price-quantity">
            <div class="product-price">
              <label for="productPrice">Price:</label>
              <input type="text" required class="form-control" />
            </div>
            <div class="product-quantity">
              <label for="productQuantity">Quantity:</label>
              <input type="text" required class="form-control" />
            </div>
          </div>
        </div>
        <div class="technical-info">
          <h5>Technical Info</h5>
          <div class="measurement">
            <div class="height">
              <label for="">H</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="width">
              <label for="">W</label>
              <input type="text" class="form-control" required />
            </div>
            <div class="depth">
              <label for="">D</label>
              <input type="text" class="form-control" />
            </div>
            <div class="length">
              <label for="">L</label>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div class="product-details">
          <h5>Details Information</h5>
          <div class="product-des">
            <label for="productDes">Product description:</label>
            <QuillEditor :heightEditor="120" />
          </div>
          <div class="product-about">
            <label for="productAbout">About product (Company):</label>
            <QuillEditor :heightEditor="120" />
          </div>
        </div>
      </div>
      <div class="details-color-img">
        <div class="product-color">
          <label for="productColor">Color:</label>
          <div class="color-check">
            <div v-for="color in colorStore" :key="color">
              <label class="color">
                <input type="checkbox" />
                <span
                  class="checkmark"
                  :style="{ backgroundColor: color }"
                ></span>
              </label>
            </div>
          </div>
        </div>
        <div class="product-img">
          <h5>Illustrate image</h5>
          <!-- <img
                src="https://images.pexels.com/photos/4857784/pexels-photo-4857784.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
                alt="product-img"
              /> -->
          <input type="file" />
        </div>
      </div>
    </div>
    <div class="btn submit-btn">Submit changes</div>
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
        "#f44336",
        "#ff80ab",
        "#4527a0",
        "#8c9eff",
        "#f4ff81",
        "#be79df",
        "#50d890",
        "#ff8080",
        "white",
        "grey",
        "lightgrey",
        "#fff0f0",
      ],
    };
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
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
  top: 20px;
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
  margin-top: 40px;
  padding: 20px;
  border-radius: 30px;
  border: solid lightblue;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
}
.details-color-img {
  margin-top: 50px;
}
label {
  font-size: 15px;
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
.product-color {
  display: flex;
}
.color-check {
  margin-left: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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

/* -- btn --- */
.btn {
  background: #aa40e3;
  color: white;
  float: right;
  margin: 30px 40px 60px 0;
}
</style>
