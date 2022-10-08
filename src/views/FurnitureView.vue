<template>
  <div class="wrapper">
    <div class="furniture-view container">
      <CategoryListBar
        :test="test"
        @cate-title-id="getCateId"
        @cate-title-all="getCateAll"
      />
      <ProductList :cateId="cateId" />
    </div>
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
      cateId: this.$route.params.id,
      test: "",
    };
  },
  // watch: {
  //   cateId() {
  //     console.log(this.cateId);
  //   },
  // },
  methods: {
    async getCateDetails() {
      try {
        if (this.$route.params.id != "all") {
          this.$store.dispatch("accessToken");
          const res = await this.$axios.get(
            `api/Category/cateDetails/${this.$route.params.id}`
          );
          this.test = res.data.data.content.name;
        }
      } catch (error) {
        // console.log(error);
      }
    },
    getCateAll(value) {
      this.cateId = value;
    },
    getCateId(value) {
      this.cateId = value;
    },
  },

  mounted() {
    this.getCateDetails();
  },
};
</script>

<style scoped>
/* .wrapper {
  background: rgb(239, 239, 239);
} */
.container {
  padding-top: 4%;
  /* background: white; */
  text-align: center;
  /* font-family: "Poppins", sans-serif; */
  padding-bottom: 50px;
}
</style>
