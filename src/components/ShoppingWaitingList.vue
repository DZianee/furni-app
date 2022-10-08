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
        <div
          class="item_current"
          v-for="item in productInList"
          :key="item.index"
        >
          <img :src="`http://localhost:2371/${item.img}`" :alt="item.name" />
          <div class="item-current-info">
            <p class="item-name" style="font-weight: 500">{{ item.name }}</p>
            <div class="quantity-price">
              <p class="item-quantity">x {{ item.quantityProduct }}</p>
              <p class="item-price" style="font-weight: 500">
                {{ item.price }} VND
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="total-item">Total items: {{ countProductInList }}</div>
      <div class="check-out" @click="Route('shoppingListView')">
        <button>Check out</button>
      </div>
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
  computed: {
    productInList() {
      const result = JSON.parse(this.$store.state.shoppingList);
      return result;
    },
    countProductInList() {
      const result = JSON.parse(this.$store.state.shoppingList).length || 0;
      return result;
    },
  },
  methods: {
    close() {
      this.$emit("close", false);
      // this.$router.go();
    },
    Route(value) {
      this.$router.push({ name: value });
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
  width: 300px;
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
  max-height: 75%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.item_current {
  display: flex;
  gap: 20px;
  margin-top: 25px;
}
.item_current img {
  width: 35%;
  height: 90%;
}
.item_current .item-name {
  font-size: 15px;
}
.quantity-price {
  display: flex;
  justify-content: space-between;
}
.total-item {
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
}
/* .check-out {
  float: right;
} */
.check-out button {
  padding: 9px 10px;
  width: 100%;
  background: rgb(185, 11, 11);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 2%;
}
</style>
