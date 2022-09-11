<template>
  <div class="home-benefits container">
    <div class="title">
      <h1>Why <span>US</span> is a better choice?</h1>
    </div>
    <div class="benefit-body">
      <div class="card item dark-color">
        <i class="bx bx-wrench bx-md"></i>
        <h4>Maintenance</h4>
        <p>
          Good support in <span>Maintenance</span> up to 1,5 years. Free
          exchange the damaged or error products after 1 month
        </p>
      </div>
      <div class="card item">
        <i class="bx bx-dollar bx-md"></i>
        <h4>Cost</h4>
        <p>Appropriate <span>Cost</span> compared to the current market</p>
      </div>
      <div class="card item dark-color">
        <i class="bx bx-spreadsheet bx-md"></i>
        <h4>Materials</h4>
        <p>
          All the product development processes and <span>Materials</span> for
          the products are strictly chosen and censored completely by the
          professional team.
        </p>
      </div>
      <div class="card item dark-color">
        <i class="bx bx-check-double bx-md"></i>
        <h4>Quality</h4>
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap");

.container {
  margin-top: 16%;
}
.title h1 {
  text-align: center;
  font-size: 4rem;
  letter-spacing: 0.3px;
  font-family: "Open Sans", sans-serif;
}
.title h1 span {
  font-size: 4.5rem;
  color: #b983ff;
  font-weight: 600;
  font-family: "Dancing Script", cursive;
}
.benefit-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5%;
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
.card h4 {
  font-weight: 600;
}
.card p span {
  font-weight: 500;
  font-size: 18px;
}

/* ----- Responsive ------ */
@media screen and (max-width: 1400px) {
  .title h1 {
    font-size: 3.5rem;
  }
}
@media screen and (max-width: 1250px) {
  .title h1 {
    font-size: 3rem;
  }
}
/* @media screen and (max-width: 1025px) {
  .title h1 {
    font-size: 4rem;
  }
} */
/* @media screen and (max-width: 993px) {
  .title h1 {
    font-size: 4rem;
  }
} */

@media screen and (max-width: 780px) {
  .title h1 {
    font-size: 2.5rem;
  }
  .title h1 span {
    font-size: 3.5rem;
  }
  .benefit-body {
    margin-top: 7%;
  }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .title h1 {
    font-size: 1.5rem;
  }
  .title h1 span {
    font-size: 2.8rem;
  }
  .benefit-body {
    margin-top: 10%;
  }
  .card p span {
    font-size: 1rem;
  }
  .card h4 {
    font-size: 1.2rem;
  }
}
</style>
