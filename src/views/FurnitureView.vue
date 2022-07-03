<template>
  <div class="furniture-view container">
    <CategoryListBar />
    <ProductList :cateId="cateId" :cateProductList="cateProductList" />
  </div>
</template>

<script>
import CategoryListBar from "../components/CategoryListBar.vue";
import ProductList from "../components/ProductList.vue";
export default {
  name: "FurnitureView",
  components: { CategoryListBar, ProductList },
  data() {
    return {
      categoryDetails: {},
      cateProductList: [],
      cateId: "",
    };
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
    async getCateDetails() {
      try {
        if (this.$route.params.id === "all") {
          this.cateId = "all";
        } else {
          this.cateId = "typeCate";
          this.$store.dispatch("accessToken");
          const res = await this.$axios.get(
            `api/Category/cateDetails/${this.$route.params.id}`,
            this.$axios.defaults.headers["Authorization"]
          );
          this.categoryDetails = res.data.data;
          console.log(res);
          console.log(this.categoryDetails);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCateDetails();
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
