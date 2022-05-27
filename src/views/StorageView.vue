<template>
  <div class="storage-view container">
    <h2>Storage in HCM city</h2>
    <CategoryListMan />
  </div>
</template>

<script>
import CategoryListMan from "../components/CategoryListMan.vue";
export default {
  name: "StorageView",
  components: { CategoryListMan },
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
</style>
