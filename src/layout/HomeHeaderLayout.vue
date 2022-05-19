<template>
  <div class="home-header-layout header">
    <!-- <img
      class="header-logo-image"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/YG_Entertainment_Logo.svg/800px-YG_Entertainment_Logo.svg.png"
    /> -->
    <div class="logo-slogan">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>

    <div class="header-content">
      <ul>
        <li class="item" @click="Route('home')">Home</li>
        <li class="item" @click="Route('furnitureView')">Furniture</li>
        <li class="item" @click="Route('servicesView')">Services</li>
        <li class="item" @click="Route('companyView')">Company</li>
        <li class="item" @click="Route('managementView')">Management</li>
      </ul>
      <div class="header-user">
        <img
          class="header-user-image"
          alt="user avatar"
          src="../assets/img/hinh-nen-vit-avatar-anh-vit-cute-ngoc-nghech-1.jpg"
        />
      </div>
    </div>

    <!-- <div class="header-user">
      <img
        class="header-user-image"
        alt="user avatar"
        src="../assets/img/hinh-nen-vit-avatar-anh-vit-cute-ngoc-nghech-1.jpg"
      />

      <ul class="header-user-info">
        <li class="user-emails">tet</li>
        <li @click="showProfile">
          <i class="bx bx-user-pin bx-sm bx-fw" />
          My Profile
        </li>
        <li class="header-user-logout" @click="logout">
          <i class="bx bx-log-out bx-sm bx-fw" />
          Logout
        </li>
      </ul>
    </div> -->
  </div>
  <div class="router-view">
    <slot />
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
  methods: {
    Route(value) {
      this.$router.push({ name: value });
      // console.log(value);
    },
  },
  mounted() {
    const x = document.querySelector(".header");
    const y = document.querySelectorAll(".item");
    window.onscroll = () => {
      let top = window.scrollY;
      if (top > 120) {
        x.classList.add("active");
        y.forEach((item) => item.classList.add("active"));
      } else {
        x.classList.remove("active");
        y.forEach((item) => item.classList.remove("active"));
      }
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  position: fixed;
  width: 100%;
  transition: all 0.5s;
  z-index: 100;
}
.header.active {
  display: flex;
  position: fixed;
  width: 100%;
  background: white;
  z-index: 100;
  transition: all 0.7s;
  letter-spacing: 0.7px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}
.logo-slogan {
  padding: 0 40px;
}
.logo-slogan h1 {
  color: #b767ff;
  font-size: 60px;
}
.logo-slogan P {
  font-weight: 500;
}
.header-logo-image {
  border: solid;
  width: 10%;
}
.header-content {
  position: absolute;
  width: fit-content;
  display: flex;
  right: 0;
  bottom: 15px;
}
ul {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-right: 100px;
  height: fit-content;
}
.item {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.7px;
  font-size: 20px;
  color: white;
}
.item.active {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.7px;
  font-size: 20px;
  color: black;
}
.header-user {
  width: fit-content;
  margin-right: 20px;
}
.header-user-image {
  max-width: 40px;
  border-radius: 30px;
  transform: translateY(10%);
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
