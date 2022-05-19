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
        <li class="item">Home</li>
        <li class="item" @click="Route">Furniture</li>
        <li class="item">Services</li>
        <li class="item">Company</li>
        <li class="item">Management</li>
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
</template>

<script>
export default {
  methods: {
    Route() {
      this.$router.push({ name: "furnitureView" });
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
</style>
