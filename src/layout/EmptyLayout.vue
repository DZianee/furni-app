<template>
  <div class="empty-layout">
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
@media screen and (max-width: 1050px) {
  .empty-layout {
    background: url("https://images.pexels.com/photos/4667852/pexels-photo-4667852.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2");
    height: 680px;
  }
}
</style>
