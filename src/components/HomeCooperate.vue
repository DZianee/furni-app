<template>
  <div class="home-cooperate">
    <div class="cooperate-body container">
      <div class="title">
        <h1>Trustworthy Friends and Partners</h1>
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap");

.home-cooperate {
  margin-top: 150px;
  background: #f4eeff;
  padding: 60px;
  font-family: "Poppins", sans-serif;
}
.title {
  margin: auto;
}
.title h1 {
  letter-spacing: 0.7px;
  line-height: 60px;
  font-size: 50px;
}
.cooperate-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  margin-top: 50px;
  column-gap: 10px;
}
.cooperate-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  row-gap: 100px;
}
img {
  width: 40%;
}
</style>
