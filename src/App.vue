<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { useRouter } from "vue-router";

const defaultLayout = "default";
export default {
  computed: {
    layout() {
      const { currentRoute } = useRouter();
      return `${currentRoute.value.meta.layout || defaultLayout}-layout`;
    },
  },
  // methods: {
  //   async refresh() {
  //     try {
  //       await this.$axios.post(
  //         `api/v1/User/RefreshToken`,
  //         this.$axios.defaults.headers["Authorization"]
  //       );
  //     } catch (e) {
  //       //
  //     }
  //   },
  // },
  // created() {
  //   this.$store.dispatch("fetchAccessToken");
  // this.refresh();
  // if (this.$store.state.token != null) {
  //   setInterval(
  //     function () {
  //       this.refresh();
  //     }.bind(this),
  //     25 * 60 * 1000
  //   );
  // }
  // },
  // beforeMount() {
  //   this.$store.dispatch("getUser");
  // },
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
