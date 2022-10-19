<template>
  <div class="home-header-layout header">
    <div class="logo-slogan">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>

    <div class="header-content">
      <ul>
        <li class="item" @click="Route('home')">Home</li>
        <li class="item" @click="RouteFurni('furnitureView')">Furniture</li>
        <li class="item" @click="Route('servicesView')">Services</li>
        <li class="item" @click="Route('companyView')">Company</li>
        <!-- <li class="item" v-if="user == null"></li> -->
        <li
          class="item"
          v-if="user != null && user.role.name != 'Default User'"
          @click="Route('dashboardView')"
        >
          Management
        </li>
      </ul>
      <div class="header-user">
        <div>
          <div class="avatar-user" v-if="login">
            <img
              class="header-user-image"
              alt="user avatar"
              :src="`${user.avatar}`"
              @click="showLogout = !showLogout"
            />
            <div class="logout" v-if="showLogout">
              <p
                @click="Route('profileView', user.id, 'profile')"
                class="view-profile"
              >
                View profile
              </p>
              <p @click="logout">Log-out</p>
            </div>
            <span class="text-welcome">
              Hello
              <span @click="Route('profileView', user.id, 'profile')">
                {{ user.email }}</span
              >
            </span>
          </div>
          <div class="icon-user" v-else>
            <i
              class="bx bx-user-circle bx-sm"
              data-bs-target="#loginForm"
              data-bs-toggle="modal"
              alt="user avatar"
            />
          </div>
        </div>

        <div class="cart-icon" @click="Route('shoppingListView')">
          <i class="bx bx-cart bx-sm"></i>
          <div class="num-item-cart">({{ totalProductsInCart }})</div>
        </div>
      </div>
      <div class="menu-ham">
        <i class="bx bx-menu bx-md" @click="showMenuHam = !showMenuHam"></i>
        <ul v-if="showMenuHam">
          <li @click="Route('home')">Home</li>
          <li @click="RouteFurni('furnitureView')">Furniture</li>
          <li @click="Route('servicesView')">Services</li>
          <li @click="Route('companyView')">Company</li>
          <li
            v-if="user != null && user.role.name != 'Default User'"
            @click="Route('dashboardView')"
          >
            Management
          </li>
        </ul>
      </div>
    </div>
  </div>
  <LoginForm @login-verified="loginVerified" />
  <div class="router-view">
    <slot />
  </div>
  <footer>
    <div class="furniture-slogan">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>
    <div class="footer-content">
      <div class="furniture-about">
        <h6>Company</h6>
        <p @click="Route('companyView')">About Us</p>
      </div>
      <div class="furniture-stores">
        <h6>Stores in Vietnam</h6>
        <ul>
          <li style="font-weight: 500">Ha Noi:</li>
          <li>12 Cau Giay, Cau Giay District, Quan Hoa Ward</li>
        </ul>
        <ul>
          <li style="font-weight: 500">TP.HCM:</li>
          <li>44 Vo Thi Sau, District 3, Ward 1</li>
        </ul>
      </div>
      <div class="furniture-contact">
        <h6>Contact Us</h6>
        <p>
          <span style="font-weight: 500">Email: </span>
          furniTMCoffical@hotmail.com
        </p>
        <p><span style="font-weight: 500">Phone:</span> +12679453</p>
      </div>
    </div>
  </footer>
  <component
    :is="'notifi-modal'"
    @close-modal="closeWarning"
    :openModal="displayWarning"
  >
    There is no product in your cart yet
  </component>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      displayWarning: false,
      showMenuHam: false,
      login: false,
      user: {},
      showLogout: false,
      logouts: false,
      avatar: "",
      shopList: [],
    };
  },
  created() {
    this.$store.dispatch("getAuth");
    this.login = this.$store.state.authenticated;
  },
  computed: {
    totalProductsInCart() {
      this.$store.dispatch("getShoppingList");
      let result = JSON.parse(this.$store.state.shoppingList);
      if (result == null) {
        result = 0;
      } else {
        result = result.length;
      }
      return result;
    },
  },
  methods: {
    closeWarning() {
      this.displayWarning = false;
    },
    Route(value, id, name) {
      if (value == "profileView") {
        this.$router.push({ name: value, params: { id: id, name: name } });
      } else if (value == "shoppingListView") {
        if (this.totalProductsInCart == 0) {
          this.displayWarning = true;
        } else {
          this.displayWarning = false;
          this.$router.push({ name: value });
        }
      } else {
        this.$router.push({ name: value });
      }
    },
    RouteFurni(value) {
      this.$router.push({ name: value, params: { id: "all" } });
    },
    loginVerified(val) {
      this.login = val;
    },
    async getUser() {
      this.$store.dispatch("getUser");
      const data = JSON.parse(this.$store.state.user);
      this.user = data;
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/User/userDetails/All/${data.id}`,
        this.$axios.defaults.headers["Authorization"]
      );
      if (this.user != null) {
        this.shopList = res.data.data.tempOrder;
        if (this.shopList != null) {
          this.$store.dispatch("storeShoppingList", this.shopList);
        }
      }
    },
    async logout() {
      let tempOrder;
      this.$store.dispatch("getShoppingList");
      const shopList = JSON.parse(this.$store.state.shoppingList);
      if (shopList != "" || shopList != null) {
        tempOrder = {
          tempOrder: shopList,
        };
      }
      this.$store.dispatch("accessToken");
      await this.$axios.put(
        `api/User/addTempOrder/${this.user.id}`,
        tempOrder,
        this.$axios.defaults.headers["Authorization"]
      );
      this.$store.dispatch("logout");
      this.logouts = true;
      this.$router.go();
    },
  },
  watch: {
    login() {
      this.getUser();
      // this.$router.go();
    },
    logouts() {
      this.login = false;
      this.logouts = false;
      this.showLogout = false;
    },
  },
  mounted() {
    const x = document.querySelector(".header");
    const userIcon = document.querySelector(".bx-user-circle");
    const y = document.querySelectorAll(".item");
    const z = document.querySelector(".cart-icon .num-item-cart");
    const avatar = document.querySelector(".header-user-image");
    window.onscroll = () => {
      let top = window.scrollY;
      if (top > 120) {
        x.classList.add("active");
        z.classList.add("active");
        y.forEach((item) => item.classList.add("active"));
        if (avatar) {
          // userWelcome.classList.add("active");
          avatar.classList.add("active");
        }
        if (userIcon) {
          userIcon.classList.add("active");
        }
      } else {
        x.classList.remove("active");
        if (avatar) {
          // userWelcome.classList.remove("active");
          avatar.classList.remove("active");
        }
        if (userIcon) {
          userIcon.classList.remove("active");
        }
        z.classList.remove("active");
        y.forEach((item) => item.classList.remove("active"));
      }
    };
    this.getUser();
  },
};
</script>

<style scoped>
/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */
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
  letter-spacing: 0.3px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}
.logo-slogan {
  padding: 0 2%;
}
.logo-slogan h1 {
  color: #b767ff;
  font-size: 3.5vw;
  font-family: "Dancing Script", cursive;
  font-weight: 500;
}
.logo-slogan P {
  font-weight: 500;
}
/* .header-logo-image {
  border: solid;
  width: 10%;
} */
.header-content {
  position: absolute;
  width: fit-content;
  display: flex;
  bottom: 18%;
  right: 1%;
}
.header-content ul {
  display: flex;
  align-items: center;
  margin: 1% 0 0 0;
  height: fit-content;
}
.item {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
}
.item.active {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: 500;
  transition: all 0.7s;
  letter-spacing: 0.7px;
  font-size: 18px;
}
.item:hover,
.item.item.active:hover {
  cursor: pointer;
}
.header-user {
  padding: 5px;
  width: fit-content;
  margin-right: 20px;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  column-gap: 10px;
}
/* --- before login ---- */
.bx-user-circle {
  cursor: pointer;
  visibility: hidden;
}
.bx-user-circle.active {
  cursor: pointer;
  transform: translateY(12%);
  visibility: visible;
}
/* --- after login ---- */

.avatar-user {
  border-right: solid rgb(164, 174, 184) 1px;
  position: relative;
  /* top: 7rem; */
}
.header-user-image {
  max-width: 2vw;
  height: 2vw;
  border-radius: 30px;
  transform: translateY(5%);
  cursor: pointer;
}
.text-welcome {
  padding: 10px;
}
.text-welcome.active {
  padding: 10px;
}
.avatar-user .text-welcome span {
  padding: 10px 2px;
  margin-top: 40px;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: pointer;
  font-size: 16px;
  color: #b767ff;
}
.avatar-user span span:hover {
  text-decoration: underline;
}

/* --- logout ---- */
.logout {
  position: absolute;
  top: 70px;
  border: solid #b767ff;
  padding: 10px;
  border-radius: 5px;
  background: white;
}
.logout::after {
  content: "";
  position: absolute;
  top: -20px;
  right: 40px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 0px solid transparent;
  border-bottom: 17px #b767ff solid;
  width: 20px;
  height: 20px;
}
.logout:hover {
  cursor: pointer;
  font-weight: 500;
}
.logout .view-profile {
  display: none;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}
.cart-icon i {
  transform: translateY(12%);
  margin-right: 2rem;
  color: #b767ff;
  /* padding-right: 10px; */
}
.cart-icon .num-item-cart {
  position: absolute;
  right: 12%;
  bottom: 0;
  visibility: hidden;
}
.cart-icon .num-item-cart.active {
  position: absolute;
  right: 12%;
  bottom: 0;
  visibility: visible;
}

/* -- hamburger menu bar -- */
.menu-ham {
  display: none;
  position: relative;
}
.menu-ham ul {
  display: block;
  position: fixed;
  top: 6.8vw;
  right: 0;
  background: white;
  width: 12rem;
  height: fit-content;
  border: solid 1px rgb(188, 183, 183);
  padding-left: 2rem;
}
.menu-ham i {
  transform: translateY(9%);
}
.menu-ham ul li {
  list-style: none;
  padding: 20px;
  margin-left: -30px;
  font-size: 16px;
}
.menu-ham ul li:hover {
  font-weight: 500;
  cursor: pointer;
  border-left: solid 6px rgb(174, 129, 221);
}

/* -- footer -- */
footer {
  display: flex;
  padding: 50px;
  gap: 5vw;
  flex-wrap: wrap;
  background: #ffc5e6;
}
.furniture-slogan h1 {
  color: #b767ff;
  font-size: 4rem;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
}
.footer-content {
  display: flex;
  padding: 20px 0;
  gap: 5vw;
  flex-wrap: wrap;
}
.furniture-slogan p {
  font-weight: 500;
}
h6 {
  font-weight: 500;
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

/* ----- Responsive ---- */
@media screen and (max-width: 1440px) {
  .item {
    padding: 0 15px;
    margin: auto 20px;
  }
  .item.active {
    padding: 0 15px;
    margin: auto 20px;
  }
  .avatar-user {
    border-right: none;
  }
  /* after login */
  .text-welcome {
    display: none;
  }
  .header-user-image {
    transform: translateY(-6%);
  }
  .header-user {
    margin-right: 10px;
    display: grid;
    grid-template-columns: 0.2fr 1fr;
    column-gap: 12px;
  }
  .cart-icon i {
    transform: translateY(3%);
    margin-right: 2rem;
  }
  /* logout */
  .logout {
    width: 150px;
    top: 57px;
    left: -5vw;
    padding: 8px;
  }
  .logout::after {
    top: -21px;
    left: 72px;
  }
  .logout .view-profile {
    display: block;
  }
  /* footer */
  .furniture-slogan p {
    font-size: 14px;
    font-weight: 500;
  }
}

@media screen and (max-width: 1250px) {
  .header-content ul {
    display: none;
  }
  .menu-ham,
  .menu-ham ul {
    display: block;
  }
  .logo-slogan P {
    font-size: 1vw;
  }
  .logout::after {
    top: -21px;
    left: 62px;
  }
  .footer-content {
    gap: 10vw;
    padding: 10px 0;
  }
}
@media screen and (max-width: 1240px) {
}
@media screen and (max-width: 1025px) {
  /* .menu-ham ul {
    top: 23%;
  } */
  .header-user-image {
    max-width: 3vw;
    height: 3vw;
    /* transform: translateY(5%); */
  }
  .footer-content {
    gap: 5vw;
    padding: 10px 0;
  }
}
@media screen and (max-width: 993px) {
  .logout::after {
    top: -21px;
    left: 52px;
  }
}
@media screen and (max-width: 769px) {
  .header-user-image {
    max-width: 3vw;
    height: 3vw;
    transform: translateY(6%);
  }
  .menu-ham ul {
    top: 8vw;
  }
  .footer-content {
    gap: 10vw;
    padding: 10px 0;
  }
  .logout::after {
    top: -21px;
    left: 40px;
  }
}

@media screen and (max-width: 676px) {
  .header-user-image {
    max-width: 4vw;
    height: 4vw;
    transform: translateY(6%);
  }
  .logo-slogan h1 {
    font-size: 9vw;
  }
  .menu-ham ul {
    top: 14.5vw;
  }
  .logout::after {
    top: -21px;
    left: 30px;
  }
}
/*
@media screen and (max-width: 615px) {
  .menu-ham ul {
    top: 15%;
  }
} */
/* @media screen and (max-width: 460px) {
  .menu-ham ul {
    top: 23%;
  }
} */
@media screen and (min-width: 320px) and (max-width: 480px) {
  .menu-ham ul {
    top: 17vw;
    /* width: 170px; */
  }
  .logo-slogan P {
    font-size: 2vw;
  }
  .logo-slogan h1 {
    font-size: 8vw;
  }
  .header-user-image {
    max-width: 4.5vw;
    height: 4.5vw;
    /* transform: translateY(18%); */
  }
  .furniture-slogan h1 {
    font-size: 3rem;
  }
  .furniture-stores ul li {
    list-style: none;
    text-align: left;
    font-size: 14px;
  }
  .furniture-about p,
  .furniture-contact p {
    font-size: 14px;
  }
  .logout::after {
    top: -21px;
    left: 20px;
  }
  .furniture-stores ul {
    padding-left: 0;
  }
  .logout {
    font-size: 15px;
  }
  .footer-content {
    gap: 5vw;
  }
  .furniture-about,
  .furniture-stores {
    text-align: left;
  }
}
</style>
