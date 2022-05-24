<template>
  <div class="furniture-view container">
    <CategoryListBar />
    <ProductList />
  </div>
</template>

<script>
import CategoryListBar from "../components/CategoryListBar.vue";
import ProductList from "../components/ProductList.vue";
export default {
  name: "FurnitureView",
  components: { CategoryListBar, ProductList },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap");

.container {
  margin-top: 60px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin-bottom: 50px;
}
</style>
