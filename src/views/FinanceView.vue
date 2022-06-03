<template>
  <div class="finance-view container">
    <div class="title">
      <h3>Finance of TMCi HCM store</h3>
    </div>
    <div class="statistic"></div>
    <div class="table-responsive"></div>
  </div>
</template>

<script>
export default {
  name: "FinanceView",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
.finance-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
  letter-spacing: 0.3px;
  border: solid;
  font-family: "Roboto", sans-serif;
}
</style>
