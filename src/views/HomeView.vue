<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <video src=""></video> -->
    <video autoplay loop>
      <source
        src="https://cdn.videvo.net/videvo_files/video/premium/video0194/large_watermarked/Young%20woman%20sitting%20on%20sofa%20reading%20book%20and%20smiling%20at%20camera_preview.mp4"
      />
      Your browser doesn't support HTML5 video tag.
    </video>
    <div class="hello-home">
      <p>Make House becomes HOME</p>
    </div>
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
.hello-home {
  position: absolute;
  top: 39%;
  left: 15%;
  z-index: 1;
  font-size: 80px;
  font-weight: 500;
  padding: 22px;
  border-radius: 7px;
  width: 70%;
  height: 24%;
  /* background: rgb(218, 218, 218); */
  background: #d065ee;
  opacity: 0.9;
}
.hello-home::after {
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: rgb(218, 218, 218);
  filter: blur(8px);
}
.hello-home p {
  position: absolute;
  left: 10%;
  z-index: 1;
  font-size: 55px;
  font-weight: 500;
  padding: 23px;
  border: red;
}
</style>
