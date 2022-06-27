<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <video src=""></video> -->
    <video autoplay loop>
      <source
        src="https://player.vimeo.com/external/392582053.sd.mp4?s=edeb26876814b33dc139fa14d5fde8b6bc49cdbb&profile_id=165&oauth2_token_id=57447761"
      />
      Your browser doesn't support HTML5 video tag.
    </video>
    <div></div>
    <HomeCounter />
    <HomeProductOverview />
    <HomeServices />
    <HomeBenefits />
    <HomeCooperate />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCounter from "@/components/HomeCounter.vue";
import HomeProductOverview from "@/components/HomeProductOverview.vue";
import HomeServices from "@/components/HomeServices.vue";
import HomeBenefits from "@/components/HomeBenefits.vue";
import HomeCooperate from "@/components/HomeCooperate.vue";

export default {
  name: "HomeView",
  components: {
    HomeCounter,
    HomeProductOverview,
    HomeServices,
    HomeBenefits,
    HomeCooperate,
  },
};
</script>
<style scoped>
video {
  width: 100%;
}
</style>
