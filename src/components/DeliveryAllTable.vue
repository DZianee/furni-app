<template>
  <div class="delivery-all-table">
    <div class="order-features" style="cursor: pointer">
      <div class="features-icon" @click="displayFeatures = !displayFeatures">
        <span style="font-weight: 400; font-size: 15px; padding: 10px">
          <i class="bx bx-sm bx-fw bx-menu-alt-left"></i>Features
        </span>
      </div>
      <div class="features" v-if="displayFeatures">
        <div class="features-bar">
          <div class="search-bar">
            <input
              type="search"
              class="form-control"
              v-model="features.search"
              placeholder="Search here..."
            />
          </div>
          <div class="filter-sort">
            <div class="filter-status">
              <label for="filterStatus">Sort:</label>
              <select
                name="sort"
                class="form-control"
                v-model="features.kindOf"
              >
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
              </select>
            </div>
            <div class="filter-status">
              <label for="filterStatus">Status:</label>
              <select
                class="form-control"
                name="status"
                v-model="features.status"
              >
                <option value="" disabled>Select status</option>
                <option value="Active">Active</option>
                <option value="Unactive">Unactive</option>
              </select>
            </div>
            <div class="filter-process">
              <label for="filterProcess">Process:</label>
              <select
                class="form-control"
                name="process"
                v-model="features.process"
              >
                <option value="" disabled>Select process</option>
                <option value="New">New</option>
                <option value="Checked">Checked</option>
                <option value="Delivering">Delivering</option>
                <option value="Completed">Closed</option>
                <option value="Cancel">Cancelled</option>
              </select>
            </div>
            <!-- <div class="filter-payment">
              <label for="filterPayment">Payment:</label>
              <select
                class="form-control"
                name="payment"
                v-model="features.payment"
              >
                <option value="" disabled>Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="MOMO">MOMO</option>
              </select>
            </div> -->
          </div>
        </div>
        <div class="btn-features">
          <div class="btn btn-reset-features" @click="resetFeatures">Reset</div>
          <div class="btn btn-submit-features" @click="submitFeatures">Go</div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th style="text-align: left">ID</th>
            <th style="text-align: left">Customer</th>
            <th>Date create</th>
            <th>Transaction ID</th>
            <th>Payment method</th>
            <th>Order's process</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <div v-if="orderList.length < 1" class="empty-content-message">
            <p>There is no content in this table yet</p>
          </div>
          <tr v-for="order in orderList" :key="order.index" v-else>
            <td
              class="order-id"
              data-bs-target="#shoplistModal"
              data-bs-toggle="modal"
              style="text-align: left"
              @click="openShoppingList(order._id)"
            >
              {{ order.orderId }}
            </td>
            <td
              class="order-customer"
              data-bs-target="#cusModal"
              data-bs-toggle="modal"
              style="font-weight: 500"
              @click="openUserInfo(order.user._id)"
            >
              {{ order.user.firstname }} {{ order.user.lastname }}
            </td>
            <td>{{ order.dateCreate }}</td>
            <td style="font-weight: 500; color: #a65de7">
              {{ order.payment.transactionID }}
            </td>
            <!-- <td
              :style="[
                paymentMethod == order.payment.paymentMethod
                  ? { color: '#00c853', fontWeight: '600' }
                  : { color: '#f50057', fontWeight: '600' },
              ]"
            >
              {{ order.payment.paymentMethod }} - {{ order.payment.payStatus }}
              <span></span>
            </td> -->
            <td>
              {{ order.payment.paymentMethod }} -
              <span style="font-weight: 500">
                <select
                  name="payStatus"
                  v-model="order.payment.payStatus"
                  @change="
                    getValue(order.payment.payStatus, order._id, order.process)
                  "
                >
                  <option
                    value="Paid"
                    :selected="order.payment.payStatus == 'Paid'"
                  >
                    Paid
                  </option>
                  <option
                    value="Unpaid"
                    :selected="order.payment.payStatus == 'Unpaid'"
                  >
                    Unpaid
                  </option>
                </select>
              </span>
            </td>
            <td class="process-order">
              <label
                @click="openCheck(order._id)"
                class="process-content"
                :style="changeProcessColor(order.process)"
                >{{ order.process }}</label
              >
              <div class="modify-process" v-if="showCheckProcess == order._id">
                <i
                  class="bx bx-x bx-sm"
                  style="position: absolute; right: 10px"
                  @click="closeCheck"
                ></i>
                <div class="process-check">
                  <div class="check-checked">
                    <label for="checked">
                      <input
                        type="radio"
                        name="processOrder"
                        value="Checked"
                        v-model="updateOrder.process"
                      />

                      Checked</label
                    >
                  </div>
                  <div class="check-delivered">
                    <label for="delivery">
                      <input
                        type="radio"
                        name="processOrder"
                        value="Delivery"
                        v-model="updateOrder.process"
                      />

                      Delivering</label
                    >
                  </div>
                  <div class="check-completed">
                    <label for="completed">
                      <input
                        type="radio"
                        name="processOrder"
                        value="Completed"
                        v-model="updateOrder.process"
                      />

                      Completed</label
                    >
                  </div>
                  <div class="check-cancelled">
                    <label for="cancelled">
                      <input
                        type="radio"
                        name="processOrder"
                        value="Cancelled"
                        v-model="updateOrder.process"
                      />

                      Cancelled</label
                    >
                  </div>
                </div>
                <div
                  class="btn btn-submit-check"
                  @click="
                    updateOrders(order._id, order, order.payment.paymentMethod)
                  "
                >
                  Save
                </div>
              </div>
            </td>
            <td
              class="status-order"
              :style="[
                choice == order.status
                  ? { color: 'green', fontWeight: '600' }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              {{ order.status }}
            </td>
            <td class="item_remove-bin">
              <i
                class="bx bx-trash"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
                @click="openRemoveModal(order._id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <component
      :is="'pagination-feature'"
      :totalPages="pageTotals"
      @click-next="pageChange"
      @click-previous="pageChange"
      :currentPage="currentPage"
    ></component>
    <component :is="'remove-modal'" @delete-confirm="deleteConfirm">
    </component>
    <CustomerInfoModal :address="address" :userInfo="userInfo" />
    <ShoppingListModal
      :cartDetails="cartDetails"
      :orderDetails="orderDetails"
    />
  </div>
</template>

<script>
import CustomerInfoModal from "./CustomerInfoModal.vue";
import ShoppingListModal from "./ShoppingListModal.vue";
export default {
  name: "DeliveryAllTable",
  data() {
    return {
      removeId: "",
      displayFeatures: false,
      showCheckProcess: false,
      choice: "Active",
      orderList: [],
      updateOrder: {
        status: "",
        process: "",
        payStatus: "",
        transactionID: "",
        paymentMethod: "",
      },
      cartDetails: [],
      orderDetails: {},
      userInfo: {},
      address: {
        street: "",
        city: "",
        district: "",
      },
      features: {
        kindOf: 1,
        search: "",
        status: "Active",
        process: "",
        sortName: "dateCreate",
      },
      currentPage: 1,
      pageTotals: 1,
      totalOrders: 0,
    };
  },
  components: {
    CustomerInfoModal,
    ShoppingListModal,
  },
  methods: {
    async getAllOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order`,
          { params: { page: this.currentPage } },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.pageTotals = res.data.pageTotals;
        this.totalOrders = res.data.totalOrders;
        this.orderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        // console.log(error);
      }
    },
    async getValue(value, id, process) {
      if (process === "Cancelled") {
        return;
      } else {
        this.updateOrder.payStatus = value;
        await this.getOrderDetails(id);
        this.updateOrders(id);
      }
    },
    openCheck(value) {
      this.showCheckProcess = value;
    },
    closeCheck() {
      this.showCheckProcess = false;
    },
    changeProcessColor(value) {
      if (value === "New") {
        return "color: #f4511e; text-shadow: 0 0 7px #ff7043";
      } else if (value === "Checked") {
        return "color: #ff4081; text-shadow: 0 0 7px #ef68fc";
      } else if (value === "Delivery") {
        return "color: #00ad48; text-shadow: 0 0 7px #64dd17";
      } else if (value === "Completed") {
        return "color: #2962ff; text-shadow: 0 0 7px #73e8ff";
      } else if (value === "Cancelled") {
        return "color: #ff5252; text-shadow: 0 0 7px #ff867f";
      }
    },
    async updateOrders(value, item, payment) {
      let order;
      this.$store.dispatch("accessToken");

      try {
        if (this.updateOrder.process === "Cancelled") {
          order = {
            status: "Unactive",
            process: this.updateOrder.process,
          };
        } else if (this.updateOrder.process != "Cancelled") {
          order = {
            status: "Active",
            process: this.updateOrder.process,
          };
        } else if (this.updateOrder.payStatus == "") {
          order = {
            process: this.updateOrder.process,
          };
        } else if (this.updateOrder.payStatus != "") {
          order = {
            payStatus: this.updateOrder.payStatus,
            transactionID: this.updateOrder.transactionID,
            paymentMethod: this.updateOrder.paymentMethod,
          };
        }

        const res = await this.$axios.put(
          `api/Order/updateOrder/${value}`,
          order,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getAllOrders();
          this.showCheckProcess = false;
          if (this.updateOrder.process === "Completed") {
            this.newRowFinOrder(value, item, this.updateOrder.process, payment);
          }
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async newRowFin() {
      let yearNow = new Date(Date.now()).getFullYear();
      try {
        this.$store.dispatch("accessToken");

        const res = await this.$axios.get(
          `api/Fin`,
          this.$axios.defaults.headers["Authorization"]
        );
        let result = res.data.data.some((item) => item.year == yearNow);

        if (res.data.data == "" || result == false) {
          let rowLine = {
            year: yearNow,
          };
          await this.$axios.post(
            `api/Fin/newRow`,
            rowLine,
            this.$axios.defaults.headers["Authorization"]
          );
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async newRowFinOrder(value, item, process, payment) {
      try {
        console.log(item);
        this.$store.dispatch("accessToken");
        let newFinOrder = {
          month: item.dateCreate,
          order: value,
          process: process,
          totalBill: item.totalBill,
          order_id: item.orderId,
          paymentMethod: payment,
        };
        await this.$axios.post(
          `api/Fin/finOrder/newFinOrder`,
          newFinOrder,
          this.$axios.defaults.headers["Authorization"]
        );
      } catch (error) {
        // console.log(error);
      }
    },
    async getOrderDetails(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/orderDetails/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.updateOrder.transactionID = res.data.data.payment.transactionID;
        this.updateOrder.paymentMethod = res.data.data.payment.paymentMethod;
      } catch (error) {
        // console.log(error);
      }
    },
    async openShoppingList(value) {
      console.log(value);
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/orderDetails/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.cartDetails = res.data.data.cart;
        this.orderDetails = res.data.data;
      } catch (error) {
        // console.log(error);
      }
    },
    async openUserInfo(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/User/userDetails/All/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.userInfo = res.data.data;
        this.address.city = res.data.data.address.city;
        this.address.street = res.data.data.address.street;
        this.address.district = res.data.data.address.district;
      } catch (error) {
        // console.log(error);
      }
    },
    convertDateTime(value) {
      const result = new Date(value.dateCreate);
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      value.dateCreate = month + "-" + day + "-" + year;
    },
    async getOrders() {
      let res;
      if (this.features.process == "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/Order`,
            {
              params: {
                kindOf: this.features.kindOf,
                search: this.features.search,
                status: this.features.status,
                page: this.currentPage,
                sortName: this.features.sortName,
              },
            },
            this.$axios.defaults.headers["Authorization"]
          );
        } catch (error) {
          // console.log(error);
        }
      }
      if (this.features.process != "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/Order`,
            {
              params: {
                page: this.currentPage,
                kindOf: this.features.kindOf,
                search: this.features.search,
                status: this.features.status,
                sortName: this.features.sortName,
                process: this.features.process,
              },
            },
            this.$axios.defaults.headers["Authorization"]
          );
        } catch (error) {
          // console.log(error);
        }
      }
      this.orderList = res.data.data;
      this.pageTotals = res.data.pageTotals;
      this.orderList.forEach((item) => this.convertDateTime(item));
    },
    openRemoveModal(id) {
      this.removeId = id;
    },
    async deleteConfirm() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.delete(
          `api/Order/${this.removeId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getOrders();
        }
      } catch (error) {
        // console.log(error);
      }
    },
    pageChange(current) {
      this.currentPage = current;
      this.getOrders();
    },
    submitFeatures() {
      this.getOrders();
    },
    resetFeatures() {
      this.features = {};
    },
  },
  watch: {
    totalOrders() {
      this.$emit("total-products", this.totalOrders);
    },
  },
  mounted() {
    this.getAllOrders();
    this.newRowFin();
  },
};
</script>

<style scoped>
.empty-content-message {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  transform: translateX(400px);
  color: rgb(125, 122, 122);
  font-style: italic;
}
/* --- feature --- */
.features {
  margin-top: 10px;
  border-top: solid 1px rgb(228, 228, 228);
  /* border-bottom: solid 1px rgb(228, 228, 228); */
  padding: 30px 10px;
}
.features-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: #f9f5f4; */
}
.search-bar {
  width: 26%;
}
.search-bar input {
  background: #faf8f8;
}
.filter-sort {
  display: flex;
  gap: 25px;
  width: 50%;
}

.filter-status,
.filter-process,
.filter-payment {
  width: 100%;
}
select {
  font-weight: 500;
  font-size: 15px;
  background: #faf8f8;
}
.features-bar label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(105, 102, 102);
}

.btn-features {
  margin-top: 5%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.btn-submit-features {
  color: white;
  background: #aa40e3;
  width: 10%;
  font-weight: 500;
}
.btn-submit-features:hover {
  color: white;
}
.btn-reset-features {
  background: rgb(218, 218, 218);
  width: 10%;
  font-weight: 500;
}
/* --- table --- */
.table-responsive {
  margin: 20px;
  padding: 10px;
}
table {
  width: 1290px;
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

/* --- order-id --- */
.order-id {
  font-weight: 600;
  color: #a65de7;
}
.order-id:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* --- order-customer --- */
.order-customer {
  text-align: left;
}
.order-customer:hover {
  cursor: pointer;
}
/* --- status order --- */
.status-order {
  font-weight: 500;
}

/* -- payStatus -- */
span select {
  padding: 5px 8px;
  border: none;
  background: white;
  font-weight: 500;
}
/* --- shopping -list --- */
.shopping-list:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #2962ff;
}

/* --- modify process --- */
.process-order {
  position: relative;
}
.process-order .process-content {
  /* color: #f4511e; */
  /* text-shadow: 0 0 7px #ff7043; */
  font-weight: 500;
  cursor: pointer;
}

.modify-process {
  /* border: solid rgb(205, 205, 205) 1px; */
  position: absolute;
  z-index: 4;
  top: 20px;
  right: -100px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  background: white;
  border-radius: 4px;
  transition: all 0.8s;
}
.item_remove-bin i {
  /* position: absolute; */
  right: 10px;
  cursor: pointer;
}
.modify-process .process-check {
  /* border-top: solid rgb(220, 217, 217); */
  margin-top: 10px;
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
/* - - -  remove btn - - - */
.item_remove-bin i:hover {
  color: red;
  cursor: pointer;
}
/* - - -  remove btn - - - */
.modal-content p {
  text-align: center;
  padding: 10px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .features {
    padding: 30px 20px;
  }
  .features-bar {
    display: flex;
    flex-flow: column;
    gap: 30px;
    justify-content: unset;
    align-items: flex-start;
  }
  .search-bar {
    width: 100%;
  }
  .filter-sort {
    width: 70%;
  }
  .btn-submit-features,
  .btn-reset-features {
    width: 20%;
  }
}
@media screen and (max-width: 993px) {
  .filter-sort {
    width: 100%;
  }
}
</style>
