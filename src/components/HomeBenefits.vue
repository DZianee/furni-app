<template>
  <div class="home-benefits container">
    <div class="title">
      <h1>Why <span>US</span> is a better choice?</h1>
    </div>
    <div class="benefit-body">
      <div class="card item dark-color">
        <i class="bx bx-wrench bx-lg"></i>
        <h3>Maintenance</h3>
        <p>
          Good support in <span>Maintenance</span> up to 1,5 years. Free
          exchange the damaged or error products after 1 month
        </p>
      </div>
      <div class="card item">
        <i class="bx bx-dollar bx-lg"></i>
        <h3>Cost</h3>
        <p>Appropriate <span>Cost</span> compared to the current market</p>
      </div>
      <div class="card item dark-color">
        <i class="bx bx-spreadsheet bx-lg"></i>
        <h3>Materials</h3>
        <p>
          All the product development processes and <span>Materials</span> for
          the products are strictly chosen and censored completely by the
          professional team.
        </p>
      </div>
      <div class="card item dark-color">
        <i class="bx bx-check-double bx-lg"></i>
        <h3>Quality</h3>
        <p>
          Ensure provide
          <span
            >100% high quality products, bright licenses and trustworthy
            co-operative companies</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBenefits",
};
</script>

<style scoped>
.container {
  margin-top: 150px;
}
.title h1 {
  text-align: center;
  font-size: 55px;
  letter-spacing: 0.7px;
}
.title h1 span {
  font-size: 60px;
  color: #b983ff;
  font-weight: 600;
}
.benefit-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}
.card {
  width: 400px;
  text-align: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 50px 0px;
}
.card.dark-color {
  background: #b8b5ff;
  outline: none;
}
.card i,
.card p {
  padding: 10px;
}
.card h3 {
  font-weight: 600;
}
.card p span {
  font-weight: 500;
  font-size: 18px;
}
</style>
