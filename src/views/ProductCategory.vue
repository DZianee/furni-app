<template>
  <div class="product-in-category container">
    <div class="title">
      <h3>Chairs & Armchairs in Stock</h3>
    </div>
    <CateProductOverview />
    <hr />
    <ProductCateTable />
  </div>
</template>

<script>
import CateProductOverview from "../components/CategoryProductOverview.vue";
import ProductCateTable from "../components/ProductCateTable.vue";
export default {
  name: "ProductCategoryView",
  components: { CateProductOverview, ProductCateTable },
};
</script>

<style scoped>
.container {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
}
</style>
