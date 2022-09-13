<template>
  <div class="profile-view">
    <div class="none-bg">
      <div class="user-side">
        <div class="side-container">
          <div class="img"><img :src="userDetails.avatar" alt="avatar" /></div>
          <div class="user-side-info">
            <div class="user-name">
              {{ userDetails.firstname }} {{ userDetails.lastname }}
            </div>
            <div class="last-login">
              <label style="font-weight: 500">Last login:</label>
              {{ lastLogin }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="none" style="color: white">hgfefdegfdegfd</div>
    <div class="user-overview-activities container">
      <div class="route-profile-bar">
        <nav>
          <ul>
            <li
              @click="routeProfileBar('profile')"
              class="bar active"
              style="text-align: center"
            >
              Profile
            </li>
            <li @click="routeProfileBars('order', 'allorders')" class="bar">
              Order Activity
            </li>
            <li @click="routeProfileBar('post')" class="bar">Posted Comment</li>
          </ul>
        </nav>
      </div>
      <div class="user-overview-container container">
        <ProfileInfo
          :userDetails="userDetails"
          v-if="routeName === 'profile'"
        />
        <OrderActivities
          v-if="routeName === 'order'"
          :routeName="routeName"
          :routeId="routeId"
        />
        <PostedComment v-if="routeName === 'post'" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfo from "../components/ProfileInfo.vue";
import OrderActivities from "../components/OrderActivities.vue";
import PostedComment from "../components/PostedComment.vue";
export default {
  name: "ProfileView",
  components: {
    ProfileInfo,
    OrderActivities,
    PostedComment,
  },
  data() {
    return {
      userDetails: {},
      lastLogin: "",
    };
  },
  computed: {
    routeName() {
      return this.$route.params.name;
    },
    routeId() {
      return this.$route.params.id;
    },
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const user = JSON.parse(this.$store.state.user);
      const res = await this.$axios.get(
        `api/User/userDetails/All/${user.id}`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.userDetails = res.data.data;
      this.convertDateTime(this.userDetails.lastLogin);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    routeProfileBar(value) {
      this.$router.push({
        name: "profileView",
        params: { id: this.$route.params.id, name: value },
      });
    },
    routeProfileBars(name) {
      this.$router.push({
        path: `/profile-view/${this.routeId}/${name}`,
      });
      console.log(name);
    },
    convertDateTime(value) {
      console.log(value);
      let date = new Date(value);
      this.lastLogin = date.toLocaleString();
    },
  },
  mounted() {
    const navItems = document.querySelectorAll(".bar");

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("click", function () {
        var current = document.querySelector(".active");
        if (current) {
          current.classList.remove("active");
        }
        this.classList.add("active");
      });
    }
  },
};
</script>

<style scoped>
.profile-view {
  margin-bottom: 100px;
}

/* --- user side  --- */
.user-side {
  position: fixed;
  background: #e1c8ff;
  height: 100%;
  width: 19%;
}

.side-container {
  padding: 40px 0;
}

.user-side .side-container .img {
  display: flex;
  justify-content: center;
}

.user-side .side-container img {
  width: 50%;
  border-radius: 30px;
}

.user-side-info {
  margin-top: 10%;
  padding: 10px 0;
  text-align: center;
  background: white;
}
.user-side-info .user-name {
  padding: 10px 0;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.user-side-info .last-login {
  padding: 10px 0;
  letter-spacing: 0.3px;
}

/* --- user overviee info + details activities  --- */
.user-overview-activities {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
}
.user-overview-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  height: 600px;
}
.user-overview-container {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.user-overview-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
/* -- nav route --- */

nav {
  padding: 1%;
}
ul {
  display: flex;
  gap: 70px;
  justify-content: space-around;
  border-bottom: 1px solid lightgrey;
}
.bar {
  list-style: none;
  letter-spacing: 0.3px;
  font-weight: 500;
  font-size: 15px;
  color: rgb(124, 121, 121);
  padding: 10px;
}
.bar:hover {
  cursor: pointer;
  color: black;
}

.bar.active {
  border-bottom: solid #b980f0 4px;
  color: black;
  list-style: none;
  font-weight: 500;
  font-size: 15px;
  padding: 10px;
  transition: all 0.2s;
}

/* --- Responsive --- */
@media screen and (max-width: 1250px) {
  /* .user-side-info .last-login {
    padding: 10px 7px;
  } */
  .user-side {
    position: sticky;
    z-index: 1;
    height: 170px;
    width: 100%;
    top: 0;
  }
  .side-container {
    padding: 20px;
    display: flex;
  }
  .user-side .side-container img {
    width: 34%;
    height: 98%;
    border: 2px solid #ffee63;
  }
  .user-side .side-container .img {
    display: flex;
    justify-content: center;
  }
  .user-side-info {
    margin-top: 2%;
    padding: 10px -20px;
    text-align: left;
    background: none;
  }

  /* --- user overviee info + details activities  --- */
  .user-overview-activities {
    height: fit-content;
    position: relative;
    right: 0;
    width: 100%;
    top: 2%;
  }

  /* -- nav route --- */
  nav {
    padding: 4% 0;
  }
}
@media screen and (max-width: 767px) {
  .side-container {
    padding: 20px;
    display: block;
  }
  .user-side-info {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .user-overview-activities {
    top: 28vw;
  }
  .none-bg {
    opacity: 0.9;
  }
}
@media screen and (max-width: 520px) {
  nav {
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  nav {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    /* margin: 0 auto; */
  }
  nav::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  ul {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
  .bar,
  .bar.active {
    width: 125px;
    padding: 12px 0;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .user-overview-activities {
    top: 15vw;
  }
}
</style>
