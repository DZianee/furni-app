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
      <figure
        class="zoom"
        :style="`background:url(http://localhost:2371/${productDetails.productImg})`"
      >
        <img
          :src="`http://localhost:2371/${productDetails.productImg}`"
          alt="product-img"
        />
      </figure>
    </div>
    <div class="product-details-info">
      <ProductDetailsInfo
        @open-waiting-list="openWaitingList"
        :productDetails="productDetails"
      />
      <div class="product-des">
        <h4>Descriptions</h4>
        <hr />
        <p v-html="productDetails.description"></p>
      </div>
    </div>
    <ProductDescriptionInfo
      :technicalInfo="technicalInfo"
      :productId="productId"
      :reviewList="reviewList"
      :totalReviews="totalReviews"
      :productDetails="productDetails"
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
  created() {
    document.title = "Product Details";
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
        // console.log(error);
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
    const imageContainer = document.querySelector(".zoom");
    imageContainer.onmousemove = (event) => {
      zoom(event);
    };
    let offsetX,
      offsetY,
      x,
      y = 0;

    const zoom = (e) => {
      let imageZoom = e.currentTarget;
      e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
      e.offsetY ? (offsetY = e.offsetY) : (offsetY = e.touches[0].pageY);
      x = (offsetX / imageZoom.offsetWidth) * 100;
      y = (offsetY / imageZoom.offsetHeight) * 100;
      imageZoom.style.backgroundPosition = x + "% " + y + "%";
    };
  },
};
</script>

<style scoped>
figure.zoom {
  background-position: 40% 40%;
  position: relative;
  width: 50%;
  overflow: hidden;
  cursor: zoom-in;
}

figure.zoom img:hover {
  opacity: 0;
}

figure.zoom img {
  transition: opacity 0.5s;
  display: block;
  width: 100%;
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

.product-img {
  display: flex;
  justify-content: center;
}
/* .product-img img {
  width: 70%;
  padding-bottom: 3%;
} */
.product-details-info {
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}
.product-des {
  margin-top: 6%;
  letter-spacing: 0.3px;
  line-height: 32px;
  padding: 0 12px;
}
.product-des h4 {
  font-size: 21px;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .product-details-info {
    grid-template-columns: 100%;
    row-gap: 10%;
  }
}
@media screen and (max-width: 768px) {
  .product-img img {
    width: 100%;
  }
}
</style>
