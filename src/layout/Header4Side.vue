<template>
  <div class="header wrapper">
    <div class="logo-slogan">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>
    <div class="header-user">
      <div class="avatar-user">
        <img
          class="header-user-image"
          alt="user avatar"
          :src="`${user.avatar}`"
          @click="Route('profileView', user.id, 'profile')"
        />
        <!-- <span class="text-welcome">
          Hello
          <span> {{ user.email }}</span>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      avatar: "",
    };
  },
  created() {
    this.$store.dispatch("getAuth");
    this.login = this.$store.state.authenticated;
  },
  methods: {
    Route(value, id, name) {
      this.$router.push({ name: value, params: { id: id, name: name } });
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
.header {
  display: none;
}
.logo-slogan {
  padding: 0 2%;
}
.logo-slogan h1 {
  color: #b767ff;
  padding: 2%;
  font-size: 2.2rem;
  font-family: "Dancing Script", cursive;
  font-weight: 500;
}
.logo-slogan p {
  font-weight: 500;
  font-size: 15px;
}
.header-user-image {
  max-width: 2.5rem;
  height: 2.5rem;
  margin-right: 20px;
  margin-top: 50px;
  border-radius: 30px;
}

.avatar-user {
  text-align: center;
}
.avatar-user span span:hover {
  text-decoration: underline;
}

/* ----- Responsive ---- */
@media screen and (max-width: 768px) {
  .header {
    display: block;
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    background: white;
  }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .logo-slogan P {
    font-size: 2vw;
  }
  .logo-slogan h1 {
    font-size: 8vw;
  }
  .header-user-image {
    max-width: 2.2rem;
    height: 2.2rem;
    margin-top: 40px;
  }
}
</style>
