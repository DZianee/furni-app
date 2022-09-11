<template>
  <div class="home-product-overview container">
    <div class="overview">
      <h1>What's New</h1>
      <div class="overview-content">
        Over 100+ modern and fresh new furnitures are ready to show up and
        experience
      </div>
      <div class="view-btn" @click="Route('furnitureView', 'all')">
        View more
      </div>
    </div>
    <div class="product-summary">
      <div class="card chair-armchair" @click="Route('furnitureView', 'all')">
        <img
          src="https://images.pexels.com/photos/6707630/pexels-photo-6707630.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="armchair/chair"
        />
        <div class="img-text">Chair/Armchair</div>
      </div>
      <div class="card shelves" @click="Route('furnitureView', 'all')">
        <img
          src="https://images.pexels.com/photos/8989419/pexels-photo-8989419.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        />
        <div class="img-text">Shelves</div>
      </div>
      <div class="card other-stuffs" @click="Route('furnitureView', 'all')">
        <img
          src="https://images.pexels.com/photos/7393989/pexels-photo-7393989.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="other-stuffs"
        />
        <div class="img-text">Others</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeProductOverview",
  methods: {
    Route(val, id) {
      this.$router.push({ name: val, params: { id: id } });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap");

.container {
  /* border: solid; */
  margin-top: 16%;
}
img {
  width: 100%;
}
.overview {
  text-align: center;
}
.overview h1 {
  font-size: 4rem;
  letter-spacing: 0.3px;
  font-family: "Open Sans", sans-serif;
}
.overview .overview-content {
  font-size: 1.2rem;
  letter-spacing: 0.3px;
}
.overview .view-btn {
  background: #000;
  color: white;
  width: 12%;
  font-size: 1rem;
  margin: auto;
  margin-top: 3%;
  padding: 7px;
  letter-spacing: 0.3px;
  border-radius: 20px;
}
.overview .view-btn:hover {
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.product-summary {
  display: grid;
  overflow-x: auto;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 5%;
  column-gap: 40px;
  overflow-y: hidden;
  scroll-behavior: smooth;
}
.product-summary {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.product-summary::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.chair-armchair,
.shelves,
.other-stuffs {
  text-align: center;
  /* width: 100%; */
  /* border-radius: 10px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.img-text {
  position: absolute;
  width: 0;
  height: 100%;
  left: -20px;
  opacity: 0;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9162e4;
  transition: 0.7s all;
}
.chair-armchair:hover .img-text,
.shelves:hover .img-text,
.other-stuffs:hover .img-text {
  left: 0;
  width: 100%;
  opacity: 0.8;
  transition: 0.7s all;
  cursor: pointer;
}

/* ------ Responsive ----- */
@media screen and (max-width: 1400px) {
}
@media screen and (max-width: 1025px) {
  .overview h1 {
    font-size: 4rem;
  }
}
@media screen and (max-width: 993px) {
  .chair-armchair,
  .shelves,
  .other-stuffs {
    width: 283px;
  }
  .overview .view-btn {
    width: 20%;
  }
  .overview .overview-content {
    font-size: 1rem;
  }
}
@media screen and (max-width: 780px) {
  .chair-armchair,
  .shelves,
  .other-stuffs {
    width: 300px;
  }
  .overview h1 {
    font-size: 3.5rem;
  }
  .overview .view-btn {
    width: 25%;
  }
  .overview .overview-content {
    font-size: 15px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .overview h1 {
    font-size: 1.7rem;
  }
  .overview .view-btn {
    width: 30%;
    margin-top: 6%;
  }
  .container {
    margin-top: 25%;
  }
  .product-summary {
    margin-top: 10%;
  }
  .overview .overview-content {
    font-size: 14px;
  }
}
</style>
