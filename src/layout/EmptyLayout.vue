<template>
  <div class="empty-layout">
    <span class="route-home" @click="Route('home')">Back to Home</span>
    <div class="router-view">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Route(val) {
      this.$router.push({ name: val });
    },
  },
};
</script>

<style scoped>
.route-home {
  padding: 10px;
  font-weight: 600;
  width: fit-content;
  position: absolute;
  top: 30px;
  left: 50px;
  cursor: pointer;
  font-size: 18px;
}
</style>
