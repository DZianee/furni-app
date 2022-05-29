<template>
  <div class="product-in-category container">
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="Route('storageView')">Storage</li>
        <li class="breadcrumb-item active" aria-current="page">
          Product Category
        </li>
      </ol>
    </nav>
    <div class="title">
      <h4>Chairs & Armchairs in Stock</h4>
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
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
  },
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
.breadcrumb-item:hover {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.breadcrumb-item.active {
  color: rgb(174, 67, 255);
  font-weight: 500;
}
</style>
