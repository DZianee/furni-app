<template>
  <div class="related-product">
    <div class="title">
      <h3>Related Product</h3>
    </div>
    <div class="product-img-container">
      <div class="product-item-related">
        <img
          src="https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202109/0682/cline-bistro-dining-chair-c.jpg"
          alt="related-product-img"
        />
        <p class="product-related-name">testing product 0</p>
      </div>
      <div class="product-item-related">
        <img
          src="https://cordlessphoneworld.2dimg.com/1/1491745437_0773.jpg"
          alt="related-product-img"
        />
        <p class="product-related-name">testing product 1</p>
      </div>
      <div class="product-item-related">
        <img
          src="https://www.ikea.com/qa/en/images/products/mammut-childrens-chair-in-outdoor-red__0727924_pe735940_s5.jpg?f=xs"
          alt="related-product-img"
        />
        <p class="product-related-name">testing product 2</p>
      </div>
      <div class="product-item-related">
        <img
          src="https://www.ikea.com/qa/en/images/products/mammut-childrens-stool-in-outdoor-yellow__0727954_pe735970_s5.jpg?f=xl"
          alt="related-product-img"
        />
        <p class="product-related-name">testing product 3</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelatedProduct",
};
</script>

<style scoped>
.related-product {
  margin-top: 70px;
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
  width: fit-content;
  height: fit-content;
  padding: 10px 0;
}
.product-item-related:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.product-item-related img {
  width: 60%;
  transform: translateX(32%);
}
.product-related-name {
  padding: 30px;
  text-align: center;
  font-weight: 500;
}
</style>
