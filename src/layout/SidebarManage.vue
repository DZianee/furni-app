<template>
  <div class="nav">
    <div class="store-logo">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>
    <div class="user-shortcut">
      <div class="user-icon">
        <img
          class="header-user-image"
          alt="user avatar"
          :src="`${user.avatar}`"
        />
      </div>
      <div class="user-info">
        <h6 class="user-name">{{ user.firstname }} {{ user.lastname }}</h6>
        <p class="user-email">{{ user.email }}</p>
      </div>
    </div>
    <ul class="nav-items">
      <li class="nav-item" @click="Route('dashboardView')">
        <i class="bx bxs-dashboard bx-sm bx-fw" />
        <span>Dashboard</span>
        <span class="tooltiptext">Dashboard</span>
      </li>
      <li class="nav-item" @click="Route('storageView')">
        <i class="bx bx-box bx-sm bx-fw" />
        <span>Storage</span>
        <span class="tooltiptext">Storage</span>
      </li>
      <li class="nav-item" @click="Route('deliveryView', 'all')">
        <i class="bx bx-spreadsheet bx-sm bx-fw" />
        <span>Order's delivery</span>
        <span class="tooltiptext">Order's delivery</span>
      </li>
      <li class="nav-item" @click="Route('financeView')">
        <i class="bx bx-money-withdraw bx-sm bx-fw" />
        <span>Finance</span>
        <span class="tooltiptext">Finance</span>
      </li>
      <li class="nav-item" @click="manageRoute('manageView')">
        <i class="bx bx-user bx-sm bx-fw" />
        <span>Customers</span>
        <span class="tooltiptext">Customers</span>
      </li>
      <li class="nav-item" @click="Route('home')">
        <i class="bx bx-home bx-sm bx-fw" />
        <span>Back to Store</span>
        <span class="tooltiptext">Home</span>
      </li>
    </ul>
    <div class="nav-item log-out" @click="logout">
      <i class="bx bx-log-out bx-sm bx-fw" />
      <span>Log-out</span>
      <span class="tooltiptext">Log-out</span>
    </div>
  </div>
  <div class="router-view">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    Route(value, id) {
      this.$router.push({ name: value, params: { id: id } });
    },
    manageRoute(value) {
      this.$router.push({ name: value, params: { id: "user" } });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "home" });
    },
    getUser() {
      this.$store.dispatch("getUser");
      const data = JSON.parse(this.$store.state.user);
      this.user = data;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
.nav {
  z-index: 1;
  width: 250px;
  height: 100%;
  position: fixed;
  background: #f4eefb;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  padding: 15px;
  display: block;
}
.store-logo {
  height: fit-content;
}
.store-logo h1 {
  text-align: center;
  color: #b767ff;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  font-size: 60px;
}
.store-logo p {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #536f7e;
}
.user-shortcut {
  display: flex;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  gap: 7px;
  border-radius: 10px;
  padding: 10px;
  height: 15%;
  background: #fffdde;
}
.user-icon {
  display: flex;
  align-items: center;
}
.header-user-image {
  max-width: 40px;
  height: 40px;
  border-radius: 30px;
  transform: translateY(-30%);
}
.user-info {
  width: 150px;
  padding: 10px 0;
}
.user-info .user-name {
  font-size: 14px;
  letter-spacing: 0.3px;
  font-weight: 500;
}
.user-info .user-email {
  letter-spacing: 0.3px;
  font-size: 12px;
  color: rgb(103, 99, 99);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-items {
  /* width: inherit; */
  padding: 10px 0;
  position: relative;
  top: 10px;
}
.nav-item {
  height: 50px;
  margin: 5px 6px;
  line-height: 49px;
  border-radius: 10px;
  color: #7a919d;
  transition: ease 0.6s;
  list-style: none;
  font-size: 14px;
  letter-spacing: 0.3px;
}
.nav-item:hover {
  background-color: #fefbf3;
  cursor: pointer;
  color: #263238;
  font-weight: 500;
}
.tooltiptext {
  visibility: hidden;
  position: relative;
  left: 75px;
  top: -45px;
  display: block;
  border-radius: 10px;
  width: 90px;
  height: 35px;
  line-height: 35px;
  background: black;
  color: rgb(240, 240, 240);
  font-size: 14px;
}
.log-out {
  position: absolute;
  bottom: 10px;
  width: 80%;
}
</style>
