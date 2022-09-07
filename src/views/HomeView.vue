<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <video src=""></video> -->
    <!-- <video autoplay loop>
      <source
        src="https://cdn.videvo.net/videvo_files/video/premium/video0194/large_watermarked/Young%20woman%20sitting%20on%20sofa%20reading%20book%20and%20smiling%20at%20camera_preview.mp4"
      />
      Your browser doesn't support HTML5 video tag.
    </video>
    <div class="hello-home">
      <p>Make House becomes HOME</p>
    </div> -->
    <div>
      <img
        src="https://img.freepik.com/free-photo/empty-living-room-with-blue-sofa-plants-table-empty-white-wall-background-3d-rendering_41470-1786.jpg?w=2000&t=st=1662472803~exp=1662473403~hmac=f7344e2c0afff8948b7ff411e2c74e43efcabfbf86dcbd25249055637f278abc"
        alt=""
      />
    </div>
    <div class="hello-home">
      <p class="sub-large">
        <span style="color: #f806cc">T</span>rending,
        <span style="color: #ff4a4a">M</span>odern &
        <span style="color: #3330e4">C</span>omfortable
      </p>
      <p class="sub-small">We Make House Becomes<span> Home</span></p>
    </div>
    <HomeCounter />
    <HomeProductOverview />
    <HomeServices />
    <HomeBenefits />
    <HomeCooperate />
  </div>
</template>

<script>
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
img {
  width: 100%;
}
video {
  width: 100%;
}
.hello-home {
  position: absolute;
  top: 27%;
  z-index: 1;
  padding: 22px;
  /* width: 70%; */
  /* height: 24%; */
  /* background: rgb(218, 218, 218); */
  /* background: #d065ee; */
}

.hello-home .sub-large {
  font-size: 55px;
  padding: 23px;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0;
}
.hello-home .sub-large span {
  font-size: 80px;
  font-weight: 500;
  padding: 5px;
  font-style: italic;
  font-family: "Dancing Script", cursive;
}
.sub-small {
  font-size: 38px;
  padding-left: 15%;
  font-family: "Open Sans", sans-serif;
}
.sub-small span {
  font-family: "Dancing Script", cursive;
  font-size: 70px;
  color: #b767ff;
}
</style>
