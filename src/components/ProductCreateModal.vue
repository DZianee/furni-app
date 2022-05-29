<template>
  <div class="product-create-modal">
    <div
      class="modal fade"
      id="createProductModal"
      tabindex="-1"
      aria-labelledby="createProductModalLabel"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Product</h5>
          </div>
          <div class="modal-body">
            <div class="product-info">
              <h6>Information overview</h6>
              <div class="product-name">
                <label for="productName">Product name:</label>
                <input type="text" required class="form-control" />
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
            </div>
            <div class="technical-info">
              <h6>Technical Info</h6>
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
            <div class="product-img">
              <h6>Illustrate image</h6>
              <!-- <img
                src="https://images.pexels.com/photos/4857784/pexels-photo-4857784.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
                alt="product-img"
              /> -->
            </div>
            <div class="product-details">
              <h6>Details Information</h6>
              <div class="product-des">
                <label for="productDes">Product description:</label>
                <QuillEditor :heightEditor="100" />
              </div>
              <div class="product-about">
                <label for="productAbout">About product (Company):</label>
                <QuillEditor :heightEditor="100" />
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
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuillEditor from "../components/QuillEditor.vue";

export default {
  name: "ProductCreateModal",
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
};
</script>

<style scoped>
.modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}

/* ---  */
.product-name,
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

.modal-body h6 {
  background: #f0f0f0;
  padding: 10px;
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
  grid-template-columns: repeat(12, 1fr);
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
}
.cancel-btn {
  background: rgb(167, 160, 160);
  color: white;
}
</style>
