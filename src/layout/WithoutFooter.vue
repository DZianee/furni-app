<template>
  <div class="header">
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
              <span @click="RouteId('profileView', user.id)">
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
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
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
    RouteId(value, id) {
      this.$router.push({ name: value, params: { id: id } });
    },
    Route(value) {
      this.$router.push({ name: value });
    },
    loginVerified(val) {
      this.login = val;
      // console.log(this.login);
    },
    getUser() {
      this.$store.dispatch("getUser");
      const data = JSON.parse(this.$store.state.user);
      this.user = data;
      // console.log(this.user);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.go();
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
  letter-spacing: 0.7px;
  font-size: 18px;
  color: black;
}
.item:hover {
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
}
.cart-icon .num-item-cart:hover {
  cursor: pointer;
  bottom: 10px;
}
</style>
