<template>
  <div class="header" v-if="isDisplay">
    <div class="close-icon" @click="closeDisplay">
      <i class="bx bx-md bx-x"></i>
    </div>
    <ul class="nav-items">
      <li
        class="nav-item user"
        @click="manageRoute('manageView')"
        v-if="userRole == 'Admin' || userRole == 'Manager'"
      >
        <i class="bx bx-user bx-sm bx-fw" />
        <span>Customers</span>
      </li>
      <li class="nav-item home" @click="Route('home')">
        <i class="bx bx-home bx-sm bx-fw" />
        <span>Home</span>
      </li>
      <li class="nav-item log-out" @click="logout">
        <i class="bx bx-log-out bx-sm bx-fw" />
        <span>Log-out</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MoreNav",
  props: {
    isDisplay: Boolean,
  },
  computed: {
    userRole() {
      const result = JSON.parse(this.$store.state.user).role.name;
      return result;
    },
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
    closeDisplay() {
      this.$emit("close-nav-more", false);
    },
  },
};
</script>

<style scoped>
.header {
  /* display: flex; */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 24%;
  z-index: 200;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: #ffddee;
}
.close-icon {
  float: right;
}
.nav-item {
  height: 50px;
  margin: 5px 6px;
  line-height: 49px;
  border-radius: 10px;
  /* color: #7a919d; */
  color: black;
  transition: ease 0.6s;
  list-style: none;
  font-size: 14px;
  letter-spacing: 0.3px;
}
/* ----- Responsive ---- */
@media screen and (max-width: 768px) {
  /* .header {
    visibility: visible;
  } */
}

@media screen and (max-width: 676px) {
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .nav-item {
    height: 50px;
    margin: 0 6px;
    line-height: 40px;
  }
}
</style>
