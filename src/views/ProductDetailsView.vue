<template>
  <div class="product-details-view container">
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" @click="Route('furnitureView', cateId)">
          Furniture
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Product details
        </li>
      </ol>
    </nav>
    <ShoppingWaitingList :open="choice" @close="closeWaitingList" />
    <div class="product-img">
      <img
        :src="`http://localhost:2371/${productDetails.productImg}`"
        alt="product-img"
      />
    </div>
    <div class="product-details-info">
      <ProductDetailsInfo
        @open-waiting-list="openWaitingList"
        :productDetails="productDetails"
      />
      <div class="product-des">
        <h4>Descriptions</h4>
        <hr />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
    <ProductDescriptionInfo
      :technicalInfo="technicalInfo"
      :productId="productId"
      :reviewList="reviewList"
      :totalReviews="totalReviews"
    />
    <RelatedProduct />
  </div>
</template>

<script>
import ProductDetailsInfo from "../components/ProductDetailInfo.vue";
import ProductDescriptionInfo from "../components/ProductDescriptionInfo.vue";
import RelatedProduct from "../components/RelatedProduct.vue";
import ShoppingWaitingList from "../components/ShoppingWaitingList.vue";
export default {
  name: "ProductDetailsView",
  data() {
    return {
      choice: false,
      productId: this.$route.params.id,
      productDetails: {},
      technicalInfo: {},
      cateId: "",
      reviewList: [],
      totalLikes: 0,
      totalReviews: 0,
    };
  },
  components: {
    ProductDetailsInfo,
    ProductDescriptionInfo,
    RelatedProduct,
    ShoppingWaitingList,
  },
  methods: {
    async getProductDetails() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productId}`
        );
        this.productDetails = res.data.data;
        this.cateId = this.productDetails.category;
        this.reviewList = this.productDetails.review;
        this.totalReviews = this.productDetails.countReviews;
        this.technicalInfo = this.productDetails.technicalInfo;
      } catch (error) {
        console.log(error);
      }
    },
    openWaitingList(item) {
      this.choice = item;
    },
    closeWaitingList(item) {
      this.choice = item;
    },
    Route(val, id) {
      if (this.$route.params.cateType === "all") {
        this.$router.push({ name: val, params: { id: "all" } });
      } else {
        this.$router.push({ name: val, params: { id: id } });
      }
    },
  },

  mounted() {
    this.getProductDetails();
  },
};
</script>

<style scoped>
.breadcrumb-item:hover {
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
}
.breadcrumb-item.active {
  color: rgb(174, 67, 255);
  font-weight: 500;
}
.container {
  /* border: solid; */
}
.product-img img {
  width: 50%;
  /* border: solid; */
  padding: 30px 0;
  transform: translateX(50%);
}
.product-details-info {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}
.product-des {
  letter-spacing: 0.7px;
  line-height: 32px;
  padding: 0 12px;
}
.product-des h4 {
  font-size: 21px;
}
</style>
