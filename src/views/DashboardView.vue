<template>
  <div class="dashboard">
    <div class="dashboard-view container">
      <p>Dashboard</p>
      <div class="content">
        <div class="left-content">
          <DashCounter />
          <div class="chart-content"></div>
        </div>
        <div class="right-content">
          <DashOrderOverview />
          <DashTopSales />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashCounter from "../components/DashboardCounter.vue";
import DashOrderOverview from "../components/DashOrderOverview.vue";
import DashTopSales from "../components/DashTopSales.vue";
export default {
  name: "ManagementView",
  components: {
    DashCounter,
    DashOrderOverview,
    DashTopSales,
  },
};
</script>

<style scoped>
.dashboard {
  /* background: rgb(248, 247, 247); */
  background: #f6f6f6;
  padding-bottom: 50px;
}

.dashboard-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  /* border: solid; */
  width: calc(100% - 336px);
  top: 20px;
}

/* --- content --- */
.content {
  margin-top: 2%;
  /* border: solid red; */
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  column-gap: 25px;
}

/* ** left-content ** */

/* ** right-content ** */
/* .right-content {
  border: solid;
} */
</style>
