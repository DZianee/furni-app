<template>
  <Header4Side />
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
          :src="`${userDetails.avatar}`"
        />
      </div>
      <div class="user-info">
        <h6 class="user-name">
          {{ userDetails.firstname }} {{ userDetails.lastname }}
        </h6>
        <p class="user-email">{{ userDetails.email }}</p>
      </div>
    </div>
    <ul class="nav-items">
      <li class="nav-item" @click="Route('dashboardView')">
        <i class="bx bxs-dashboard bx-sm bx-fw" />
        <i class="bx bxs-dashboard bx-md" />
        <span>Dashboard</span>
        <span class="tooltiptext">Dashboard</span>
      </li>
      <li class="nav-item" @click="Route('storageView')">
        <i class="bx bx-box bx-sm bx-fw" />
        <i class="bx bx-box bx-md" />
        <span>Storage</span>
        <span class="tooltiptext">Storage</span>
      </li>
      <li class="nav-item" @click="Route('deliveryView', 'all')">
        <i class="bx bx-spreadsheet bx-sm bx-fw" />
        <i class="bx bx-spreadsheet bx-md" />
        <span>Order's delivery</span>
        <span class="tooltiptext">Order's delivery</span>
      </li>
      <li class="nav-item" @click="Route('financeView')">
        <i class="bx bx-money-withdraw bx-sm bx-fw" />
        <i class="bx bx-money-withdraw bx-md" />
        <span>Finance</span>
        <span class="tooltiptext">Finance</span>
      </li>
      <li class="nav-item user" @click="manageRoute('manageView')">
        <i class="bx bx-user bx-sm bx-fw" />

        <i class="bx bx-user bx-md" />
        <span>Customers</span>
        <span class="tooltiptext">Customers</span>
      </li>
      <li class="nav-item home" @click="Route('home')">
        <i class="bx bx-home bx-sm bx-fw" />
        <i class="bx bx-home bx-md" />
        <span>Back to Store</span>
        <span class="tooltiptext">Home</span>
      </li>
      <li class="nav-item more-option" @click="isDisplay = !isDisplay">
        <i class="bx bx-dots-horizontal bx-sm bx-fw" />
        <i class="bx bx-dots-horizontal bx-md" />
        <span>More</span>
      </li>
    </ul>
    <div class="nav-item log-out" @click="logout">
      <i class="bx bx-log-out bx-sm bx-fw" />
      <i class="bx bx-log-out bx-md" />
      <span>Log-out</span>
      <span class="tooltiptext">Log-out</span>
    </div>
  </div>
  <div class="router-view">
    <slot />
  </div>
  <MoreNav :isDisplay="isDisplay" @close-nav-more="closeNavMore" />
</template>

<script>
import Header4Side from "./Header4Side.vue";
import MoreNav from "./MoreNav.vue";
export default {
  components: {
    Header4Side,
    MoreNav,
  },
  data() {
    return {
      isDisplay: false,
      user: {},
      userDetails: {},
    };
  },
  methods: {
    closeNavMore() {
      this.isDisplay = false;
    },
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
    async getUserDetails() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/User/userDetails/All/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.userDetails = res.data.data;
      } catch (error) {
        // console.log(error);
      }
    },
  },
  mounted() {
    this.getUserDetails();
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
  height: 12%;
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
  /* transform: translateY(-30%); */
}
.user-info {
  width: 150px;
  padding: 3% 0;
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
.bx-md {
  display: none;
}
.nav-item.more-option {
  display: none;
}
.nav-item:hover {
  background: #fefbf3;
  cursor: pointer;
  color: #263238;
  font-weight: 500;
}
.tooltiptext {
  visibility: hidden;
  position: relative;
  left: 60px;
  top: -45px;
  display: block;
  border-radius: 10px;
  width: 125px;
  height: 40px;
  line-height: 35px;
  background: white;
  color: black;
  border: solid 2px black;
  font-size: 14px;
  display: flex;
  justify-content: center;
}
.log-out {
  position: absolute;
  bottom: 10px;
  width: 80%;
}

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .nav {
    width: 7%;
    /* padding: 2%; */
  }
  .store-logo h1 {
    font-size: 2rem;
    margin-left: -23%;
  }
  .store-logo p,
  .user-info,
  .nav-item span:not(.tooltiptext) {
    display: none;
  }
  .nav-items {
    padding: 10px 4px;
  }
  .nav-item {
    margin: 14px 2px;
  }
  .nav-item:hover {
    background: none;
  }
  .nav-item:hover .tooltiptext {
    visibility: visible;
  }
  .user-shortcut {
    box-shadow: none;
    padding: 0;
    background: none;
    border: none;
  }
}
@media screen and (max-width: 993px) {
  .nav {
    width: 8%;
    /* padding: 2%; */
  }
}
@media screen and (max-width: 768px) {
  .nav {
    width: 100%;
    bottom: 0;
    left: 0;
    height: 12%;
    padding: 0 1%;
    background: #a85cf9;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .user-shortcut,
  .nav-item.home,
  .nav-item.user,
  .nav-item.log-out,
  .store-logo,
  .bx-sm {
    display: none;
  }

  .nav-item span:not(.tooltiptext),
  .nav-item.more-option {
    display: block;
    color: white;
  }
  .nav-items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 0 4px;
  }
  .bx-md {
    display: block;
    color: white;
  }
  .nav-item {
    text-align: center;
    margin: auto;
    width: 30px;
  }
  .nav-item:hover .tooltiptext {
    display: none;
  }
  .nav-item:hover {
    background: none;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .nav {
    height: 10%;
  }
  .nav-item span:not(.tooltiptext) {
    display: none;
  }
  /* .bx-md {
    display: none;
  }
  .bx-sm {
    display: block;
    color: white;
  } */

  .nav-items {
    padding: 0;
    margin-top: 2%;
  }
}
</style>
