<template>
  <div class="shopping-waiting-list" v-if="open">
    <span class="backdrop"> </span>
    <div class="waiting-list_sidebar">
      <div class="sidebar-header">
        <i class="bx bx-x bx-md" @click="close()" />
        <br />
        <h5 class="header-list">Your current cart</h5>
      </div>
      <hr />
      <div class="item-current-container">
        <div class="item_current">
          <img
            src="https://deba.vn/wp-content/uploads/2017/05/shop-15.jpg"
            alt="product-item"
          />
          <p class="item-name">testing 01 the thhu hfgsg yudgsdfg</p>
        </div>
        <div class="item_current">
          <img
            src="https://deba.vn/wp-content/uploads/2017/05/shop-15.jpg"
            alt="product-item"
          />
          <p class="item-name">testing 01 the thhu hfgsg yudgsdfg</p>
        </div>
        <div class="item_current">
          <img
            src="https://deba.vn/wp-content/uploads/2017/05/shop-15.jpg"
            alt="product-item"
          />
          <p class="item-name">testing 01 the thhu hfgsg yudgsdfg</p>
        </div>
      </div>
      <div class="total-item">Total items: 3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingWaitingList",
  data() {
    return {
      showWaitingItem: false,
    };
  },
  props: { open: Boolean },
  methods: {
    close() {
      this.$emit("close", false);
    },
  },
};
</script>

<style scoped>
.shopping-waiting-list {
  display: flex;
  position: fixed;
  justify-content: flex-end;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  transition: all 0.5s;
}
.backdrop {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  transition: all 0.5s;
}
.waiting-list_sidebar {
  width: 270px;
  z-index: 210;
  background: #fff0f0;
  top: -1px;
  padding: 10px;
  transition: all 0.5s;
}
.sidebar-header {
  /* display: flex; */
  padding: 4px;
}
.sidebar-header i {
  float: right;
}
.sidebar-header i:hover {
  cursor: pointer;
}
.header-list {
  text-align: center;
  letter-spacing: 0.7px;
}
.item-current-container {
  height: 80%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.item_current {
  display: flex;
  gap: 20px;
  margin-top: 25px;
}
.item_current img {
  width: 30%;
}
.item_current .item-name {
  font-size: 15px;
}
.total-item {
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
}
</style>
