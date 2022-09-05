<template>
  <div class="finance-view container">
    <div class="title">
      <h3>Summary statistic finance</h3>
    </div>
    <div class="year-option">
      <select name="year" v-model="yearSelected">
        <option value="">All</option>
        <option v-for="y in finYearsList" :key="y.index" :value="y._id">
          {{ y.year }}
        </option>
      </select>
    </div>
    <div class="content-container" v-if="yearSelected == ''">
      <FinAllStatistic />
    </div>
    <div class="content-container" v-else>
      <FinYearStatistic :yearSelected="yearSelected" />
    </div>
  </div>
</template>

<script>
import FinAllStatistic from "../components/FinanceAllStatistic.vue";
import FinYearStatistic from "../components/FinanceYearStatistic.vue";
export default {
  name: "FinanceView",
  components: {
    FinAllStatistic,
    FinYearStatistic,
  },
  data() {
    return {
      finYearsList: [],
      yearSelected: "",
    };
  },
  // async created() {
  //   try {
  //     this.$store.dispatch("accessToken");
  //     const res = await this.$axios.get(
  //       `api/Fin/detailsFinInYear/${value}`,
  //       this.$axios.defaults.headers["Authorization"]
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  methods: {
    async getFinYearList() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Fin/`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.finYearsList = res.data.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  // watch: {
  //   yearSelected() {
  //     // if(this.yearSelected == ""){

  //     // }
  //     this.getFinRowList(this.yearSelected);
  //     this.getRevenueChart(this.yearSelected);
  //     this.getPaymentMethodChart(this.yearSelected);
  //   },
  // },
  mounted() {
    this.getFinYearList();
  },
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
  /* border: solid; */
  font-family: "Roboto", sans-serif;
}

.summary-content {
  padding-top: 2%;
}
/* -- year option -- */
.year-option {
  display: flex;
  justify-content: flex-end;
  padding-right: 6%;
}
.year-option select {
  padding: 5px;
  width: 15%;
  border-radius: 7px;
  border: 1px solid silver;
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
  width: 10%;
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
  height: 700px;
  overflow-y: auto;
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
}
</style>
