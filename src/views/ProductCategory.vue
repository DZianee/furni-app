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
      <h4>{{ cateDetails.name }}</h4>
    </div>
    <CateProductOverview
      :cateDetails="cateDetails"
      :subItemTotal="SubItemTotal"
      :totalProduct="totalProduct"
    />
    <hr />
    <ProductCateTable :cateCode="cateDetails.code" />
  </div>
</template>

<script>
import CateProductOverview from "../components/CategoryProductOverview.vue";
import ProductCateTable from "../components/ProductCateTable.vue";
export default {
  name: "ProductCategoryView",
  components: { CateProductOverview, ProductCateTable },
  data() {
    return {
      cateDetails: {},
      totalProduct: 0,
      subItemTotal: [],
    };
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/Category/cateDetails/${this.$route.params.id}`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.$store.dispatch("storeCateId", res.data.data.content._id);
      this.cateDetails = res.data.data.content;
      this.totalProduct = res.data.data.totalProduct;
      this.subItemTotal = res.data.total;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
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
