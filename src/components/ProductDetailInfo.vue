<template>
  <div class="product-detail-info">
    <div class="product-info">
      <div class="product-name">
        <h4>Product name is unknown at present</h4>
      </div>
      <div class="product-price">250.000 VND</div>
      <div class="product_color-size_picker">
        <div class="product-color">
          <ul class="color-check">
            <li>
              <input type="checkbox" checked="checked" />
              <span class="checkmark"></span>
            </li>
          </ul>
        </div>
        <div class="product-size">
          <ul class="size-check">
            <li>
              <input type="checkbox" />
              <span class="checkmark"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn btn_add-cart" @click="openWaitingList()">Add to Cart</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailsInfo",
  data() {
    return {};
  },
  methods: {
    openWaitingList() {
      this.$emit("open-waiting-list", true);
    },
  },
};
</script>

<style scoped>
.product-info {
  padding: 10px 20px;
}
.product-price {
  padding: 10px 0;
}
.color-check {
  display: flex;
  gap: 15px;
  position: relative;
}
.color-check li input {
  position: absolute;
  opacity: 0;
  margin-left: 10px;
}
.color-check li .checkmark {
  position: absolute;
  height: 25px;
  width: 25px;
  background: red;
  border: solid;
}
.color-check li .checkmark:hover {
  opacity: 0.8;
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
