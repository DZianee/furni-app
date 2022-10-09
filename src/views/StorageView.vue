<template>
  <div class="storage-view container">
    <h3>Storage in HCM city</h3>
    <CategoryListMan />
  </div>
</template>

<script>
import CategoryListMan from "../components/CategoryListMan.vue";
export default {
  name: "StorageView",
  components: { CategoryListMan },
  created() {
    document.title = "Storage";
  },
};
</script>

<style scoped>
.storage-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
}

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .storage-view {
    right: -3%;
    width: calc(100% - 200px);
  }
  .chart-content {
    height: 40%;
    width: 99%;
  }
}
@media screen and (max-width: 1250px) {
  .storage-view {
    right: -2.5%;
    width: calc(100% - 145px);
  }
  /* .chart-content {
    height: 60%;
    width: 100%;
  }
  .content {
    grid-template-columns: 100%;
  } */
}
@media screen and (max-width: 1200px) {
  .storage-view {
    right: -1.5%;
    width: calc(100% - 125px);
  }
}
@media screen and (max-width: 993px) {
  /* .storage-view {
    right: -1.5%;
    width: calc(100% - 125px);
  } */
  .chart-content {
    height: 55%;
    width: 100%;
  }
  .content {
    grid-template-columns: 100%;
  }
  .right-content {
    margin-top: 10%;
  }
}
@media screen and (max-width: 768px) {
  .storage-view {
    right: 0;
    width: 100%;
    margin-bottom: 20%;
  }
  h4 {
    font-size: 18px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .storage-view {
    margin-bottom: 28%;
  }
}
</style>
