<template>
  <div class="related-product">
    <div class="title">
      <h3>New Product</h3>
    </div>
    <div class="product-img-container">
      <div
        class="product-item-related"
        v-for="item in productList"
        :key="item.index"
      >
        <img
          :src="`http://localhost:2371/${item.productImg}`"
          alt="related-product-img"
        />
        <!-- <p class="product-related-name">testing product 0</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelatedProduct",
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    async getProduct() {
      try {
        // this.$store.dispatch("accessToken");
        const res = await this.$axios.get(`api/Product/relatedProduct`);
        this.productList = res.data.data;
      } catch (error) {
        // console.log(error);
      }
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.related-product {
  margin-top: 7%;
  margin-bottom: 7%;
}
.title h3 {
  text-align: center;
  font-size: 21px;
}
.product-img-container {
  display: grid;
  gap: 20px;
  grid-auto-columns: 30%;
  grid-auto-flow: column;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  height: fit-content;
  padding: 10px 0;
}
.product-item-related {
  width: 80%;
  height: fit-content;
  /* padding: 10px 0; */
}
.product-item-related:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.product-item-related img {
  width: 100%;
  /* transform: translateX(32%); */
}
.product-related-name {
  padding: 30px;
  text-align: center;
  font-weight: 500;
}

/* --- Responsive --- */
@media screen and (max-width: 768px) {
  .product-item-related {
    width: 100%;
  }
  .related-product {
    margin-top: 10%;
    margin-bottom: 7%;
  }
}
</style>
