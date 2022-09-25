<template>
  <div class="content-container">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th style="text-align: center">Year</th>
            <th style="text-align: center">Total Orders</th>
            <th style="text-align: center">Revenue (VND)</th>
            <th>Rate</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in finYearStatistic" :key="item.index">
            <td style="font-weight: 600; text-align: center; color: #a65de7">
              {{ item.year }}
            </td>
            <td style="text-align: center">
              {{ formatPrice(item.totalOrders) }}
            </td>
            <td style="text-align: center">{{ formatPrice(item.revenue) }}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart-content">
      <div class="chart">
        <canvas
          id="yearRevenStatisticBar"
          aria-label="Summary each year's revenue"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { randomColors } from "../utils/charColors.js";
import { Chart, registerables } from "chart.js";
export default {
  name: "FinAllStatistic",
  data() {
    return {
      finYearStatistic: [],
    };
  },
  created() {
    Chart.register(...registerables);
    document.title = "Finance";
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toString();
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getFinYearStatistic() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Fin/`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.finYearStatistic = res.data.data;
        if (res.status == 200) {
          this.initYearRevenueChart(res.data.data);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    initYearRevenueChart(res) {
      let labels = [];
      let data = [];
      res.forEach((item) => {
        labels.push(item.year);
        data.push(item.revenue);
      });
      new Chart(document.getElementById("yearRevenStatisticBar"), {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              backgroundColor: randomColors,
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: false,
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.x !== null) {
                    label += context.parsed.x;
                  }
                  return label;
                },
              },
            },
          },
          indexAxis: "y",
          title: {
            display: true,
          },
          scales: {
            x: {
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            y: {
              grid: {
                lineWidth: 0.5,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.getFinYearStatistic();
  },
};
</script>

<style scoped>
.content-container {
  padding: 3% 5%;
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  column-gap: 70px;
}

/* -- table --- */
.table-responsive {
  max-height: 600px;
  /* margin: auto; */
  overflow-y: auto;
  scroll-behavior: smooth;
}
.table-responsive {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.table-responsive::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.table {
  width: 687px;
}
thead tr th {
  font-weight: 500;
  font-size: 14px;
  background: #e0c2ff;
  height: 50px;
  /* text-align: center; */
}
tbody tr td {
  font-size: 15px;
  padding: 12px 0;
  color: rgb(108, 106, 106);
  /* text-align: center; */
}
/* -- chart -- */
.chart-content {
  margin-top: 2%;
  height: 40%;
  width: 100%;
}
.chart {
  height: 300px;
}

/* --- Responsive --- */
@media screen and (max-width: 1200px) {
  .content-container {
    display: grid;
    grid-template-columns: 100%;
  }
  /* .table {
    width: ;
  } */
}
</style>
