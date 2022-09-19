<template>
  <div>
    <div class="chart-container">
      <div class="line">
        <canvas
          id="revenueLineChart"
          aria-label="Revenues of Each Month"
        ></canvas>
      </div>
      <div class="doughnut">
        <canvas
          id="paymentMethodDoughChart"
          aria-label="Summary payment methods in a year"
        ></canvas>
      </div>
    </div>
    <div class="summary-content">
      <div class="filter-features">
        <select name="month" v-model="selectedMonth">
          <option value="">All</option>
          <option v-for="m in monthList.month" :key="m.index" :value="m.id">
            {{ m.value }}
          </option>
        </select>
        <select name="payment" v-model="selectedPMethod">
          <option value="">All</option>
          <option value="CASH">Cash</option>
          <option value="MOMO">MOMO</option>
          <option value="ZALO">Zalo</option>
        </select>
      </div>
      <div class="summary-info">
        <div class="revenue-result">
          <label for="revenue"
            >Revenue:
            <span style="font-weight: 500; color: black; font-size: 17px">
              VND {{ finOrderOverview.revenue }}</span
            >
          </label>
        </div>
        <div class="rate-result">
          <label for="rate">Rate: <span> - </span> </label>
        </div>
        <div class="percent-result">
          <label for="percent">Percent: <span> - </span> </label>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="text-align: center">No.</th>
              <th style="text-align: center">Month</th>
              <th>Order ID</th>
              <th style="text-align: center">Total bill (VND)</th>
              <th style="text-align: center">Payment</th>
              <th style="text-align: center">Process</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in finRowList" :key="item.index">
              <td style="text-align: center">
                {{ finRowList.indexOf(item) + 1 }}
              </td>
              <td style="font-weight: 500; text-align: center">
                {{ item.month }}
              </td>
              <td style="font-weight: 600; color: #a65de7">
                {{ item.order_id }}
              </td>
              <td style="text-align: center">{{ item.totalBill }}</td>
              <td :style="paymentColor(item.payment)">{{ item.payment }}</td>
              <td
                style="
                  text-align: center;
                  color: #2962ff;
                  text-shadow: 0 0 7px #73e8ff;
                  font-weight: 500;
                "
              >
                {{ item.process }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import monthList from "../assets/JSON/month.list.json";
import { Chart, registerables } from "chart.js";

export default {
  name: "FinYearStatistic",
  props: {
    yearSelected: String,
  },
  data() {
    return {
      finRowList: [],
      finOrderOverview: {},
      monthList: monthList,
      selectedMonth: "",
      selectedPMethod: "",
    };
  },
  created() {
    Chart.register(...registerables);
    document.title = "Finance";
  },
  methods: {
    paymentColor(value) {
      if (value === "ZALO") {
        return "color: #0091ea; text-align: center; font-weight: 500; letter-spacing: 0.3px";
      } else if (value === "MOMO") {
        return "text-align: center; color: #ad1457; font-weight: 500; letter-spacing: 0.3px";
      } else {
        return "color: green; text-align: center; font-weight: 500; letter-spacing: 0.3px";
      }
    },
    async getFinRowList(value) {
      let res;
      if (this.selectedMonth == "" && this.selectedPMethod == "") {
        try {
          console.log(this.selectedMonth);
          console.log(this.selectedPMethod);
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/Fin/detailsFinInYear/${value}`,
            this.$axios.defaults.headers["Authorization"]
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          res = await this.$axios.get(
            `api/Fin/detailsFinInYear/${value}`,
            {
              params: {
                month: this.selectedMonth,
                paymentMethod: this.selectedPMethod,
              },
            },
            this.$axios.defaults.headers["Authorization"]
          );
        } catch (error) {
          console.log(error);
        }
      }

      this.finRowList = res.data.data.order;
      this.finOrderOverview = res.data.data;
      console.log(res);
    },
    async getDetailsOrder() {},
    async getRevenueChart(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Fin/detailsFinInYear/chart/revenueEachMonth/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.initLineChart(res.data.month, res.data.revenues);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPaymentMethodChart(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Fin/detailsFinInYear/chart/summaryPaymentMethod/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.initDoughChart(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    initLineChart(labels, revenueData) {
      new Chart(document.getElementById("revenueLineChart"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Revenue of Each Month (VND)",
              backgroundColor: "#f57f17",
              data: revenueData,
              borderColor: "#fbc02d",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += " " + context.parsed.y + " " + "VND";
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    },
    initDoughChart(paymentMethodData) {
      const labels = ["Cash", "MOMO", "Zalo"];
      let arrData = [];
      arrData.push(paymentMethodData.CASH);
      arrData.push(paymentMethodData.MOMO);
      arrData.push(paymentMethodData.ZALO);
      new Chart(document.getElementById("paymentMethodDoughChart"), {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              backgroundColor: ["#b4cfb0", "#ff8aae", "#9adcff"],
              data: arrData,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
  watch: {
    selectedMonth() {
      console.log(this.selectedMonth);
      this.getFinRowList(this.yearSelected);
    },
    selectedPMethod() {
      this.getFinRowList(this.yearSelected);
    },
  },
  mounted() {
    if (this.yearSelected != "") {
      this.getFinRowList(this.yearSelected);
      this.getRevenueChart(this.yearSelected);
      this.getPaymentMethodChart(this.yearSelected);
    } else {
      return;
    }
  },
};
</script>

<style scoped>
.summary-content {
  padding: 2% 5%;
}
/* -- filter -- */
.filter-features {
  padding: 10px;
  display: flex;
  gap: 30px;
}
.filter-features select {
  border: solid 1px silver;
  padding: 5px;
  width: 90px;
  border-radius: 7px;
  font-size: 15px;
}

/* -- summary-info -- */
.summary-info {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
}
.summary-info label {
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 14px;
  color: rgb(142, 121, 121);
}
.summary-info span {
  font-size: 15px;
}

/* -- table -- */
.table-responsive {
  max-height: 700px;
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
  width: 1296px;
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

.chart-container {
  padding-top: 2%;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  column-gap: 20px;
  height: 40%;
}
.line {
  height: 300px;
  width: 700px;
}
.doughnut {
  width: 400px;
}
@media screen and (max-width: 1400px) {
  .chart-container {
    width: 95%;
  }
}
@media screen and (max-width: 1250px) {
  .chart-container {
    width: 100%;
  }
  line {
    width: 600px;
  }
  .doughnut {
    width: 300px;
  }
}
@media screen and (max-width: 1050px) {
  .line {
    width: 500px;
  }
  .doughnut {
    width: 200px;
  }
}
@media screen and (max-width: 993px) {
  .chart-container {
    padding: 0 5%;
    grid-template-columns: 100%;
    width: 100%;
  }
  .line,
  .doughnut {
    width: 100%;
  }
}
</style>
