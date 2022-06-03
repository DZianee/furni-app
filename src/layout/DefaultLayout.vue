<template>
  <div class="header">
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
        <li class="item" @click="Route('dashboardView')">Management</li>
      </ul>
      <div class="header-user">
        <img
          class="header-user-image"
          alt="user avatar"
          data-bs-target="#loginForm"
          data-bs-toggle="modal"
          src="../assets/img/hinh-nen-vit-avatar-anh-vit-cute-ngoc-nghech-1.jpg"
        />
      </div>
      <div class="cart-icon">
        <i class="bx bx-cart bx-md"></i>
        <div class="num-item-cart" @click="Route('shoppingListView')">(12)</div>
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
  <LoginForm />

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
      <p @click="Route('companyView')">About Us</p>
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
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
      // console.log(value);
    },
  },
  // mounted() {
  //   const x = document.querySelector(".header");
  //   window.onscroll = () => {
  //     let top = window.scrollY;
  //     if (top > 120) {
  //       x.classList.add("active");
  //     } else {
  //       x.classList.remove("active");
  //     }
  //   };
  // },
};
</script>

<style scoped>
.header {
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  background: white;
}
.logo-slogan {
  padding: 0 40px;
}
.logo-slogan h1 {
  color: #b767ff;
  font-size: 60px;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
}
.logo-slogan P {
  font-weight: 500;
  letter-spacing: 0.7px;
}
.header-logo-image {
  border: solid;
  width: 10%;
}
.header-content {
  position: absolute;
  width: fit-content;
  display: flex;
  right: 10px;
  bottom: 15px;
}
.header-content ul {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-right: 10px;
  height: fit-content;
}
.item {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 20px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.7px;
  font-size: 18px;
  color: black;
}
.item:hover {
  cursor: pointer;
}
/* .item.active {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.7px;
  font-size: 20px;
  color: black;
} */
.header-user {
  width: fit-content;
  margin-right: 20px;
}
.header-user-image {
  max-width: 40px;
  border-radius: 30px;
  transform: translateY(10%);
}
.cart-icon {
  position: relative;
}
.cart-icon i {
  transform: translateY(12%);
  margin-right: 20px;
  color: #851de0;
}
.cart-icon .num-item-cart {
  position: absolute;
  right: 5px;
  bottom: 10px;
}
.cart-icon .num-item-cart:hover {
  cursor: pointer;
  bottom: 10px;
}
footer {
  /* margin-top: 50px; */
  display: flex;
  padding: 50px;
  gap: 120px;
  flex-wrap: wrap;
  background: #ffc5e6;
}
.furniture-slogan h1 {
  color: #b767ff;
  font-size: 60px;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
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
.furniture-about p:hover {
  cursor: pointer;
}
.furniture-stores ul li {
  list-style: none;
  text-align: left;
}
</style>
