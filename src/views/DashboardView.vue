<template>
  <div class="dashboard">
    <div class="dashboard-view container">
      <h3>Dashboard</h3>
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
        console.log(resOrders);
        if (resOrders.status == 200) {
          this.initMixChart(
            resOrders.data.month,
            resOrders.data.order,
            resOrders.data.revenue
          );
        }
      } catch (error) {
        console.log(error);
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
          maintainAspectRatio: true,
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

/* -- chart -- */
.chart-content {
  margin-top: 4%;
  background: white;
}
.chart {
  height: 100%;
}
</style>
