<template>
  <div class="product-technical-info">
    <div class="about-product">
      <div class="title">
        <h4>About Product</h4>
        <hr />
      </div>
      <div class="about-content">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div class="technical-info">
          <p><b>Product Technical Infomation</b></p>
          <table class="table table-bordered details-info">
            <tbody>
              <tr>
                <th scope="row">Width (cm)</th>
                <td>{{ technicalInfo.width }}</td>
              </tr>
              <tr>
                <th scope="row">Depth (cm)</th>
                <td>{{ technicalInfo.depth }}</td>
              </tr>
              <tr>
                <th scope="row">Length of sitting (cm)</th>
                <td>{{ technicalInfo.length }}</td>
              </tr>
              <tr>
                <th scope="row">Heigh of sitting back (cm)</th>
                <td>{{ technicalInfo.height }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <UserReview
      :productId="productId"
      :reviewList="reviewList"
      :countReviews="totalReviews"
    />
  </div>
</template>

<script>
import UserReview from "./UserReview.vue";
export default {
  name: "TechnicalInfo",
  components: { UserReview },
  props: {
    technicalInfo: Object,
    productId: String,
    reviewList: Array,
    totalReviews: Number,
  },
};
</script>

<style scoped>
.product-technical-info {
  margin-top: 7%;
}
.about-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}
.title h4 {
  padding: 1% 2%;
  font-size: 21px;
  letter-spacing: 0.3px;
}
th {
  font-weight: 500;
}
.about-content p {
  line-height: 32px;
  letter-spacing: 0.3px;
  padding: 0 12px;
}
table {
  width: 90%;
  margin-left: 2%;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .about-content {
    grid-template-columns: 100%;
    row-gap: 10%;
  }
  .product-technical-info {
    margin-top: 10%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .product-technical-info {
    margin-top: 18%;
  }
}
</style>
