<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <video src=""></video> -->
    <video autoplay loop>
      <source
        src="https://player.vimeo.com/progressive_redirect/playback/665395712/rendition/720p?loc=external&oauth2_token_id=1027659655&signature=34a448e7345858b0bf09fb6654247161c7fe367ef61bad94332f8072d5b0cca7"
        type="video/mp4"
      />

      Your browser doesn't support HTML5 video tag.
    </video>
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
