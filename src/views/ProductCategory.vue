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
    document.title = "Category Details";
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/Category/cateDetails/${this.$route.params.id}`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.$store.dispatch("storeCateId", res.data.data.content._id);
      this.cateDetails = res.data.data.content;
      this.totalProduct = res.data.data.totalProduct;
    } catch (error) {
      // console.log(error);
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
.product-in-category {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 2%;
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

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .product-in-category {
    right: -3%;
    width: calc(100% - 200px);
  }
}
@media screen and (max-width: 1250px) {
  .product-in-category {
    right: -2.5%;
    width: calc(100% - 145px);
  }
}
@media screen and (max-width: 1200px) {
  .product-in-category {
    right: -1.5%;
    width: calc(100% - 125px);
  }
}
/* @media screen and (max-width: 786px) {
  .product-in-category {
    right: -1.5%;
    width: calc(100% - 125px);
  }
} */
@media screen and (max-width: 768px) {
  .product-in-category {
    grid-template-columns: 100%;
    row-gap: 80px;
    padding: 10px 0;
    right: 0;
    width: 100%;
    margin-bottom: 5%;
  }
  h4 {
    padding-left: 2%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  /* .product-in-category {
    margin-bottom: 28%;
  } */
}
</style>
