<template>
  <div class="delivery-new-table">
    <component
      :is="'order-table'"
      :type="'new'"
      :orderList="orderList"
      :displaySingleFeature="true"
      :displayBin="true"
      :displayGroupFeatures="false"
      @sort-orders="sortTable"
      @load-orders="loadOrders"
    ></component>
  </div>
</template>

<script>
export default {
  name: "DeliveryNewTable",
  data() {
    return {
      orderList: [],
      totalNewOrders: 0,
      kindOf: 1,
      features: {
        sortName: "dateCreate",
      },
    };
  },
  methods: {
    async getNewOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/newOrders`,
          {
            params: {
              kindOf: this.kindOf,
              sortName: this.features.sortName,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.totalNewOrders = res.data.totalOrders;
        this.$emit("count-new-order", this.totalNewOrders);
        this.orderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        // console.log(error);
      }
    },
    convertDateTime(value) {
      const result = new Date(value.dateCreate);
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      value.dateCreate = day + "-" + month + "-" + year;
    },
    sortTable(value) {
      this.kindOf = value;
    },
    loadOrders() {
      this.getNewOrders();
    },
  },
  watch: {
    totalNewOrders() {
      this.$emit("total-new-orders", this.totalNewOrders, "new");
    },
    kindOf() {
      this.getNewOrders();
    },
  },
  mounted() {
    this.getNewOrders();
  },
};
</script>

<style scoped>
/* .empty-content-message {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  transform: translateX(400px);
  color: rgb(125, 122, 122);
  font-style: italic;
}
--- features ---
.sort-feature {
  display: flex;
  justify-content: flex-end;
  margin: 0 30px 20px 0;
}
.sort-feature select {
  padding: 7px 9px;
  width: 12%;
}
--- table ---
.table-responsive {
  height: 600px;
}

table {
  width: 100%;
}
thead tr th {
  font-weight: 500;
  font-size: 14px;
  background: #e0c2ff;
  height: 50px;
  text-align: center;
}
tbody tr td {
  font-size: 15px;
  padding: 25px 0;
  color: rgb(108, 106, 106);
  text-align: center;
}

--- order-id ---
.order-id {
  font-weight: 600;
  color: #a65de7;
}
.order-id:hover {
  text-decoration: underline;
  cursor: pointer;
}

--- order-customer ---
.order-customer {
  font-weight: 500;
  text-align: left;
}
.order-customer:hover {
  cursor: pointer;
}
--- status order ---
.status-order {
  font-weight: 500;
}
-- payStatus --
span select {
  padding: 5px 8px;
  border: none;
  background: white;
  font-weight: 500;
}
--- shopping -list ---
.shopping-list:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #2962ff;
}

--- modify process ---
.process-order {
  position: relative;
}
.process-order .process-content {
  color: #f4511e;
  text-shadow: 0 0 7px #ff7043;
  font-weight: 500;
  cursor: pointer;
}

.modify-process {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: -100px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  background: white;
  border-radius: 4px;
  transition: all 0.8s;
}
.modify-process i {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.modify-process .process-check {
  margin-top: 20px;
  padding: 10px 20px;
}
.modify-process .process-check div {
  padding: 7px;
  font-weight: 600;
  font-size: 14px;
}
.check-checked label {
  color: #ff4081;
  text-shadow: 0 0 5px #ef68fc;
}
.check-delivered label {
  color: #00ad48;
  text-shadow: 0 0 6px #64dd17;
}
.check-cancelled label {
  color: #ff5252;
  text-shadow: 0 0 6px #ff867f;
}
.check-completed label {
  color: #2962ff;
  text-shadow: 0 0 6px #73e8ff;
}
.btn-submit-check {
  background: #c261f7;
  width: 80%;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 2px;
  border: none;
  margin-bottom: 5px;
  border-radius: 5px;
}
.btn-submit-check:hover {
  background: #be4dfa;
  color: white;
}
- - -  remove btn - - -
.item_remove-bin i:hover {
  color: red;
  cursor: pointer;
}
- - -  remove btn - - -
.modal-content p {
  text-align: center;
  padding: 10px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.3px;
} */
</style>
