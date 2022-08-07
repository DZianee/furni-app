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
        <li class="item" @click="Route('dashboardView')">Management</li>
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
              class="bx bx-user-circle bx-md bx-fw"
              data-bs-target="#loginForm"
              data-bs-toggle="modal"
              alt="user avatar"
            />
          </div>
        </div>

        <div class="cart-icon">
          <i class="bx bx-cart bx-md"></i>
          <div class="num-item-cart" @click="Route('shoppingListView')">
            ({{ totalProductsInCart }})
          </div>
        </div>
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
      login: false,
      user: {},
      showLogout: false,
      logouts: false,
      avatar: "",
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
    getUser() {
      this.$store.dispatch("getUser");
      const data = JSON.parse(this.$store.state.user);
      this.user = data;
    },
    logout() {
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
  font-family: "Dancing Script", cursive;
  font-weight: 500;
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
  bottom: 15px;
  right: 10px;
}
.header-content ul {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-right: 20px;
  height: fit-content;
}
.item {
  list-style-type: none;
  padding: 0 15px;
  margin: auto 30px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: black;
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
  color: black;
}
.item:hover,
.item.item.active:hover {
  cursor: pointer;
}
.header-user {
  width: fit-content;
  margin-right: 20px;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  column-gap: 10px;
}
/* --- before login ---- */
.bx-user-circle {
  color: black;
  transform: translateY(50%);
  cursor: pointer;
  visibility: hidden;
}
.bx-user-circle.active {
  color: black;
  cursor: pointer;
  transform: translateY(50%);
  visibility: visible;
}
/* --- after login ---- */

.avatar-user {
  border-right: solid rgb(164, 174, 184) 1px;
  position: relative;
  top: 7px;
}
.header-user-image {
  max-width: 40px;
  height: 40px;
  border-radius: 30px;
  transform: translateY(5%);
  cursor: pointer;
}
.text-welcome {
  padding: 10px;
  color: black;
}
.text-welcome.active {
  padding: 10px;
  color: black;
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

.cart-icon {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.cart-icon i {
  transform: translateY(12%);
  margin-right: 20px;
  color: #b767ff;
  padding-right: 10px;
}
.cart-icon .num-item-cart {
  position: absolute;
  right: 5px;
  bottom: 10px;
  color: black;
  cursor: pointer;
  visibility: hidden;
}
.cart-icon .num-item-cart.active {
  position: absolute;
  right: 5px;
  bottom: 10px;
  color: black;
  cursor: pointer;
  visibility: visible;
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
