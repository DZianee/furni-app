<template>
  <div class="product-details-view container">
    <ShoppingWaitingList :open="choice" @close="closeWaitingList" />
    <div class="product-img">
      <img
        src="https://deba.vn/wp-content/uploads/2017/05/shop-15.jpg"
        alt="product-img"
      />
    </div>
    <div class="product-details-info">
      <ProductDetailsInfo @open-waiting-list="openWaitingList" />
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
    <ProductDescriptionInfo />
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
      open: false,
    };
  },
  components: {
    ProductDetailsInfo,
    ProductDescriptionInfo,
    RelatedProduct,
    ShoppingWaitingList,
  },
  methods: {
    openWaitingList(item) {
      this.choice = item;
    },
    closeWaitingList(item) {
      this.choice = item;
    },
  },
};
</script>

<style scoped>
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
</style>
