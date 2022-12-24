<template>
  <div class="header">
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
      // console.log(this.login);
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
        this.$store.dispatch("getShoppingList");
        let result = JSON.parse(this.$store.state.shoppingList);
        if (result == null) {
          this.$store.dispatch("storeShoppingList", this.shopList);
        }
      }
    },
    async logout() {
      let tempOrder;
      this.$store.dispatch("getShoppingList");
      const shopList = JSON.parse(this.$store.state.shoppingList);
      if (shopList != null) {
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
      this.$router.push({ name: "home" });

      // this.logouts = true;
      // this.$store.dispatch("getAuth");
      // this.login = this.$store.state.authenticated;
    },
  },
  watch: {
    login() {
      // console.log(this.login);
      this.getUser();
      // this.$router.go();
    },
    logouts() {
      // console.log(this.logouts);
      this.login = false;
      this.logouts = false;
      this.showLogout = false;
    },
  },
  mounted() {
    this.getUser();
  },
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
  letter-spacing: 0.7px;
  font-size: 18px;
}
.item:hover {
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
  color: black;
  cursor: pointer;
}
/* --- after login ---- */

.avatar-user {
  border-right: solid rgb(164, 174, 184) 1px;
  position: relative;
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

/* .header-user-image {
  max-width: 40px;
  border-radius: 30px;
  transform: translateY(10%);
} */

/* --- logout ---- */
.logout {
  position: absolute;
  top: 60px;
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
.logout p:hover {
  cursor: pointer;
  font-weight: 500;
}
.logout .view-profile {
  display: none;
}
.cart-icon {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.cart-icon i {
  transform: translateY(12%);
  margin-right: 2rem;
  color: #b767ff;
}
.cart-icon .num-item-cart {
  position: absolute;
  right: 12%;
  bottom: 0;
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
}
@media screen and (max-width: 1240px) {
}
@media screen and (max-width: 1025px) {
  .menu-ham ul {
    top: 7vw;
  }
  .header-user-image {
    max-width: 3vw;
    height: 3vw;
    /* transform: translateY(5%); */
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
    top: 14.8vw;
  }
  .logout::after {
    top: -21px;
    left: 30px;
  }
}
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
  .logout::after {
    top: -21px;
    left: 20px;
  }
  .logout {
    font-size: 15px;
  }
}
</style>
