<template>
  <div class="home-cooperate">
    <div class="cooperate-body container">
      <div class="title">
        <h1>Trustworthy Friends & Partners</h1>
      </div>
      <div class="cooperate-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Ikea-logo.png"
          alt="partner-logo"
        />
        <img
          src="https://i.pinimg.com/originals/22/d0/ff/22d0ff3672b049efa2385dd47b456938.png"
          alt="partner-logo"
        />
        <img
          src="https://danhkhoireal.vn/wp-content/uploads/2020/07/logo-vinhomes.jpg"
          alt="partner-logo"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdLDfJV-mOvj0cbwKo5O7AhR3l9EkNAPec7g&usqp=CAU"
          alt="partner-logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCooperate",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap");

/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */
.home-cooperate {
  margin-top: 15%;
  background: #f4eeff;
  padding: 5%;
}
.title {
  margin: auto;
}
.title h1 {
  letter-spacing: 0.3px;
  line-height: 6rem;
  font-size: 4rem;
  font-family: "Open Sans", sans-serif;
}
.cooperate-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  column-gap: 30px;
}
.cooperate-container {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  row-gap: 100px;
}
img {
  width: 40%;
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
    font-size: 3rem;
  }
} */
@media screen and (max-width: 993px) {
  .title h1 {
    /* font-size: 3.8rem; */
  }
  .home-cooperate {
    padding: 5% 0;
  }
  .cooperate-body {
    display: grid;
    grid-template-columns: 100%;
  }
  .cooperate-container {
    margin-top: 5%;
    display: grid;
    column-gap: 50px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  img {
    width: 100%;
  }
}

@media screen and (max-width: 780px) {
  .title h1 {
    font-size: 2.5rem;
  }
  .cooperate-container {
    column-gap: 20px;
  }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .title h1 {
    font-size: 1.5rem;
    line-height: 4rem;
  }
}
</style>
