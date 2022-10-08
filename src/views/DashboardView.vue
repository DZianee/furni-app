<template>
  <div class="dashboard">
    <div class="dashboard-view container">
      <h4>Dashboard</h4>
      <div class="content">
        <div class="left-content">
          <DashCounter />
          <div class="chart-content">
            <div class="chart">
              <canvas
                id="mixChart"
                aria-label="Summary mix orders and revenue"
              ></canvas>
            </div>
          </div>
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
import { Chart, registerables } from "chart.js";
export default {
  name: "ManagementView",
  components: {
    DashCounter,
    DashOrderOverview,
    DashTopSales,
  },
  created() {
    Chart.register(...registerables);
    document.title = "TMCI Dashboard";
  },
  methods: {
    async getData() {
      const currYear = new Date().getFullYear();
      try {
        this.$store.dispatch("accessToken");
        const resOrders = await this.$axios.get(
          `api/Fin/detailsFinInYear/chart/orderEachMonth/${currYear}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (resOrders.status == 200) {
          this.initMixChart(
            resOrders.data.month,
            resOrders.data.order,
            resOrders.data.revenue
          );
        }
      } catch (error) {
        // console.log(error);
      }
    },
    initMixChart(labels, orderData, revenueData) {
      let order = Object.values(orderData);
      new Chart(document.getElementById("mixChart"), {
        type: "scatter",
        data: {
          labels,
          datasets: [
            {
              type: "line",
              label: "Order of Each Month",
              backgroundColor: "#f67280",
              data: order,
              borderColor: "#ffbaba",
              yAxisID: "right-y-axis",
            },
            {
              type: "bar",
              label: "Revenue of Each Month (VND)",
              backgroundColor: "#a6b1e1",
              data: revenueData,
              borderColor: "#fbc02d",
              yAxisID: "left-y-axis",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            "right-y-axis": {
              type: "linear",
              position: "right",
              beginAtZero: true,
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
              title: {
                color: "red",
                display: true,
                text: "Order of Each Month",
              },
            },
            "left-y-axis": {
              type: "linear",
              position: "left",
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
              title: {
                color: "red",
                display: true,
                text: "Revenue of Each Month",
              },
            },
          },
          plugins: {
            legend: false,
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += " " + context.parsed.y;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.dashboard-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
  /* border: solid; */
}

/* --- content --- */
.content {
  margin-top: 2%;
  /* border: solid red; */
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  column-gap: 30px;
}

/* ** left-content ** */
/* ** right-content ** */
/* .right-content {
  border: solid;
  width: 200px;
} */

/* -- chart -- */
.chart-content {
  margin-top: 10%;
  background: white;
  height: 40%;
  width: 100%;
}
.chart {
  height: 100%;
}

/* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .dashboard-view {
    right: -3%;
    width: calc(100% - 200px);
  }
  .chart-content {
    height: 40%;
    width: 99%;
  }
}
@media screen and (max-width: 1250px) {
  .dashboard-view {
    right: -2.5%;
    width: calc(100% - 145px);
  }
}
@media screen and (max-width: 1200px) {
  .dashboard-view {
    right: -1.5%;
    width: calc(100% - 125px);
  }
}
@media screen and (max-width: 993px) {
  /* .dashboard-view {
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
  .dashboard-view {
    right: 0;
    width: 100%;
    margin-bottom: 20%;
  }
  h4 {
    font-size: 18px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .dashboard-view {
    margin-bottom: 28%;
  }
}
</style>
