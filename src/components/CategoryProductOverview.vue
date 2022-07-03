<template>
  <div class="category-product-overview">
    <div class="category-overview">
      <!-- <img
        src="https://images.pexels.com/photos/4857784/pexels-photo-4857784.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="overview-cate-img"
      /> -->
      <div class="content">
        <h6 class="cate-name">{{ cateDetails.name }}</h6>
        <div class="cate-info">
          <div class="cate-code">
            <p style="font-weight: 500">Product Code:</p>
            <p>{{ cateDetails.code }}</p>
          </div>
          <div class="cate-quantity">
            <p style="font-weight: 500">Total Quantity:</p>
            <p>{{ totalProduct }}</p>
          </div>
          <div class="cate-place">
            <p style="font-weight: 500">Destination:</p>
            <p>District 3, Ho Chi Minh city</p>
          </div>
        </div>
      </div>
      <div class="cate-item-overview">
        <div
          class="card chairs"
          style="background: linear-gradient(to top, #be79df, #f5fbf1)"
        >
          <p>Chair's item:</p>
          <p class="num-of-chair">
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="12"
              prefix=""
              suffix=""
              separator=""
              decimalSeparator="."
              :autoinit="true"
            />
          </p>
        </div>
        <div
          class="card armchairs"
          style="background: linear-gradient(to top, #26baee, #f5fbf1)"
        >
          <p>Armchair's item:</p>
          <p class="num-of-armchair">
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="12"
              prefix=""
              suffix=""
              separator=""
              decimalSeparator="."
              :autoinit="true"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "CateProductOverview",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  props: {
    cateDetails: Object,
    totalProduct: Number,
    subItemTotal: Array,
  },
};
</script>

<style scoped>
/* - - - overview Cate - - - */
.category-overview {
  margin-top: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  column-gap: 30px;
}
.category-overview img {
  width: 70%;
}
.cate-name {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  background: #f0f0f0;
}
.cate-code,
.cate-quantity,
.cate-place {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  padding: 4px 10px;
}
/* - - - overview Cate item- - - */
.cate-item-overview {
  display: flex;
  flex-flow: column;
  gap: 20px;
  align-items: center;
}
.card {
  width: 60%;
  height: 100px;
  display: grid;
  grid-template-columns: 0.7fr 0.5fr;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border: none;
}
.card p {
  padding: 10px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  margin: auto;
}
.card .num-of-chair,
.card .num-of-armchair {
  font-size: 45px;
}
</style>
