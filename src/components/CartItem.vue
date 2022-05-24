<template>
  <div class="cart-item container" v-if="showCartItem">
    <div class="title">
      <h4>Your shopping cart (12 items)</h4>
      <hr />
    </div>
    <div class="table-responsive">
      <table class="table">
        <tr>
          <td>
            <img
              src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
              alt="item-img"
            />
          </td>
          <td class="item-name">
            <h6>Rosa testing testing testing only dfdf</h6>
          </td>
          <td class="item-quantity">hfdwbfhfghufg</td>
          <td class="item-price">bfhbdfbf</td>
          <td class="remove-item-icon">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              class="icon icon_delete"
            >
              <i class="bx bx-md bx-x"></i>
            </button>
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td>
            <img
              src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
              alt="item-img"
            />
          </td>
          <td class="item-name">
            <h6>Rosa testing testing testing only dfdf</h6>
          </td>
          <td class="item-quantity">hfdwbfhfghufg</td>
          <td class="item-price">bfhbdfbf</td>
          <td class="remove-item-icon">
            <i class="bx bx-md bx-x"></i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src="https://www.ikea.com/qa/en/images/products/aepplaryd-2-seat-sofa-lejde-light-grey__0992863_pe820294_s5.jpg?f=xl"
              alt="item-img"
            />
          </td>
          <td class="item-name">
            <h6>Rosa testing testing testing only dfdf</h6>
          </td>
          <td class="item-quantity">hfdwbfhfghufg</td>
          <td class="item-price">bfhbdfbf</td>
          <td class="remove-item-icon">
            <i class="bx bx-md bx-x"></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="cart_stable-price-title">
            <h5>Total</h5>
          </td>
          <td class="shopping-cart_stable-price">122232</td>
        </tr>
      </table>
    </div>
    <!-- <button type="submit" class="btn move-to-order_info" @click="toNextStep">
      Continue <i class="bx bx-right-arrow-alt bx-fw"></i>
    </button> -->
    <RemoveModal />
  </div>
</template>

<script>
import RemoveModal from "./RemoveModal.vue";
export default {
  name: "CartItem",
  props: {
    showCartItem: Boolean,
  },
  components: {
    RemoveModal,
  },
  methods: {
    toNextStep() {
      this.$emit("to-order-info", true, false, "#fff395");
    },
  },
};
</script>

<style scoped>
.cart-item {
  /* border: solid; */
  margin-top: 40px;
  /* padding: 10px 20px; */
  width: 90%;
}
.item-name,
.item-quantity,
.item-price {
  transform: translateY(35%);
}
.table-responsive {
  height: 400px;
}
.table img {
  width: 120px;
  /* transform: translateX(35%); */
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
</style>
