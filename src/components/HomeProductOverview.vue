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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap");

.container {
  /* border: solid; */
  margin-top: 150px;
}
.overview {
  text-align: center;
}
.overview h1 {
  font-size: 60px;
  letter-spacing: 0.7px;
  font-family: "Poppins", sans-serif;
}
.overview .overview-content {
  font-size: 20px;
  letter-spacing: 0.5px;
}
.overview .view-btn {
  background: #000;
  color: white;
  width: 150px;
  margin: auto;
  margin-top: 30px;
  padding: 7px;
  letter-spacing: 0.7px;
}
.overview .view-btn:hover {
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.product-summary {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 60px;
}
.chair-armchair,
.shelves,
.other-stuffs {
  text-align: center;
  max-width: 30%;
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
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 1.2px;
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
</style>
