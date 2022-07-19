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
    <UserReview :productId="productId" :reviewList="reviewList" />
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
  },
};
</script>

<style scoped>
.product-technical-info {
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}
.title h4 {
  padding: 10px 20px;
  font-size: 21px;
}
th {
  font-weight: 500;
}
.about-content p {
  line-height: 32px;
  letter-spacing: 0.7px;
  padding: 0 30px;
}
table {
  width: 90%;
  margin-left: 20px;
}
</style>
