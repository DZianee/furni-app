<template>
  <div class="home">
    <div>
      <img
        src="https://img.freepik.com/free-photo/empty-living-room-with-blue-sofa-plants-table-empty-white-wall-background-3d-rendering_41470-1786.jpg?w=2000&t=st=1662472803~exp=1662473403~hmac=f7344e2c0afff8948b7ff411e2c74e43efcabfbf86dcbd25249055637f278abc"
        alt=""
      />
    </div>
    <div class="hello-home">
      <p class="sub-large">
        <span>Inspiration</span> & <span>Simplicity</span>
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
/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */
img {
  width: 100%;
}
.hello-home {
  position: absolute;
  top: 12vw;
  z-index: 2;
  padding: 22px;
}

.hello-home .sub-large {
  font-size: 4rem;
  padding: 23px;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0;
  position: relative;
  text-align: center;
}
.hello-home .sub-large:after {
  content: "";
  position: absolute;
  bottom: 1vw;
  left: 0;
  height: 7px;
  width: 100%;
  border: solid 2px #f24c4c;
  border-color: #f24c4c transparent transparent transparent;
  border-radius: 50%;
}
.hello-home .sub-large span {
  font-size: 7rem;
  font-weight: 500;
  padding: 5px;
  font-style: italic;
  font-family: "Dancing Script", cursive;
}
.sub-small {
  font-size: 3rem;
  /* padding-left: 15%; */
  border-radius: 20px;
  text-align: center;
  position: relative;
  font-family: "Open Sans", sans-serif;
}
.sub-small span {
  font-family: "Dancing Script", cursive;
  font-size: 6rem;
  color: #b767ff;
}

/* ----- Responsive ---- */
@media screen and (max-width: 1440px) {
  /* .hello-home {
    top: 12vw;
  } */
  .hello-home .sub-large span {
    font-size: 5rem;
  }
  .sub-small {
    font-size: 2rem;
    /* padding-left: 15%; */
  }
  .sub-small span {
    font-size: 5rem;
  }
}

@media screen and (max-width: 1280px) {
  .hello-home {
    /* top: 11vw; */
    padding: 22px;
  }
  .hello-home .sub-large {
    font-size: 3rem;
  }
  .hello-home .sub-large span {
    font-size: 4rem;
  }
  .sub-small {
    font-size: 2rem;
    /* padding-left: 15%; */
  }
  .sub-small span {
    font-size: 4rem;
  }
}
@media screen and (max-width: 1025px) {
  /* .hello-home {
    top: 12vw;
  } */
  /* .hello-home .sub-large {
    font-size: 3vw;
    padding: 23px;
  } */
  /* .hello-home .sub-large span {
    font-size: 3rem;
    padding: 5px;
  }
  .sub-small span {
    font-size: 4rem;
  } */
}
@media screen and (max-width: 875px) {
  .hello-home::before {
    content: "";
    position: absolute;
    top: 12vw;
    padding: 22px;
    border: solid;
    filter: blur(84px);
    background: rgb(226, 226, 226);
    width: 74vw;
    height: 65%;
  }
}
@media screen and (max-width: 685px) {
  .hello-home .sub-large {
    font-size: 3rem;
  }
  .hello-home .sub-large span {
    font-size: 4rem;
  }
  .sub-small {
    font-size: 2rem;
  }
  .sub-small span {
    font-size: 4rem;
  }
}
@media screen and (max-width: 672px) {
  .hello-home .sub-large {
    font-size: 3rem;
  }
  .hello-home .sub-large span {
    font-size: 4rem;
  }
  .sub-small {
    font-size: 2rem;
  }
  .sub-small span {
    font-size: 4rem;
  }
}
@media screen and (max-width: 660px) {
  .hello-home {
    padding: 3vw 0 0 13vw;
  }
  .hello-home .sub-large {
    font-size: 2rem;
  }
  .hello-home .sub-large span {
    font-size: 3rem;
  }
  .sub-small {
    font-size: 2rem;
  }
  .sub-small span {
    font-size: 3rem;
  }
}
@media screen and (max-width: 620px) {
  .hello-home {
    padding: 3vw 0 0 10vw;
  }
}
@media screen and (max-width: 575px) {
  .hello-home {
    padding: 3vw 0 0 8vw;
  }
  .sub-small {
    font-size: 1rem;
  }
  .sub-small span {
    font-size: 3rem;
  }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  /* .hello-home {
    /* padding: 2vw 0 0 10vw; 
  } */

  .hello-home .sub-large {
    font-size: 1rem;
  }
  .hello-home .sub-large span {
    font-size: 3rem;
  }
  .sub-small span {
    font-size: 2.5rem;
  }
}
</style>
