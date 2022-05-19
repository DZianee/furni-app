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
  <footer>
    <div class="furniture-slogan">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>
    <div class="furniture-about">
      <h5>Company</h5>
      <p>About Us</p>
    </div>
    <div class="furniture-stores">
      <h5>Stores</h5>
      <ul>
        <li style="font-weight: 600">Ha Noi:</li>
        <li>12 Cau Giay, Cau Giay District, Quan Hoa Ward</li>
      </ul>
      <ul>
        <li style="font-weight: 600">TP.HCM:</li>
        <li>44 Vo Thi Sau, District 3, Ward 1</li>
      </ul>
    </div>
    <div class="furniture-contact">
      <h5>Contact Us</h5>
      <p>
        <span style="font-weight: 600">Email: </span>
        furniTMCoffical@hotmail.com
      </p>
      <p><span style="font-weight: 600">Phone:</span> +12679453</p>
    </div>
  </footer>
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
footer {
  display: flex;
  padding: 50px;
  gap: 120px;
  flex-wrap: wrap;
  background: #ffc5e6;
}
.furniture-slogan h1 {
  color: #b767ff;
  font-size: 60px;
}
.furniture-slogan p {
  font-weight: 500;
}
h5 {
  font-weight: 600;
}
.furniture-about,
.furniture-stores {
  text-align: center;
}
.furniture-stores ul li {
  list-style: none;
  text-align: left;
}
</style>
