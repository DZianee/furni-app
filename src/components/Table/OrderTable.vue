<template>
  <transition>
    <div class="order-custom-table">
      <div class="sort-feature" v-if="displaySingleFeature">
        <select name="sort" v-model="kindOf">
          <option value="1">Ascending</option>
          <option value="-1">Descending</option>
        </select>
      </div>
      <div
        class="order-features"
        style="cursor: pointer"
        v-if="displayGroupFeatures"
      >
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
                v-model="groupFeatures.search"
                placeholder="Search here..."
              />
            </div>
            <div class="filter-sort">
              <div class="filter-status">
                <label for="filterStatus">Sort:</label>
                <select
                  name="sort"
                  class="form-control"
                  v-model="groupFeatures.kindOf"
                >
                  <option value="1">Ascending</option>
                  <option value="-1">Descending</option>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-features">
            <div class="btn btn-reset-features" @click="resetFeatures">
              Reset
            </div>
            <div class="btn btn-submit-features" @click="submitFeatures">
              Go
            </div>
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
                @click="openUserInfo(order.user._id)"
              >
                {{ order.user.firstname }} {{ order.user.lastname }}
              </td>
              <td>{{ order.dateCreate }}</td>
              <td style="font-weight: 500; color: #a65de7">
                {{ order.payment.transactionID }}
              </td>
              <td>
                {{ order.payment.paymentMethod }} -
                <span style="font-weight: 500">
                  <select
                    name="payStatus"
                    v-model="order.payment.payStatus"
                    @change="
                      getValue(
                        order.payment.payStatus,
                        order._id,
                        order.process
                      )
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
                <label @click="openCheck(order._id)" class="process-content">{{
                  order.process
                }}</label>
                <div
                  class="modify-process"
                  v-if="showCheckProcess == order._id"
                >
                  <i class="bx bx-x bx-sm" @click="closeCheck"></i>
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
                      updateOrders(
                        order._id,
                        order,
                        order.payment.paymentMethod
                      )
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
              <td class="item_remove-bin" v-if="displayBin">
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
      <component :is="'remove-modal'" @delete-confirm="deleteConfirm">
      </component>
      <CustomerInfoModal :address="address" :userInfo="userInfo" />
      <ShoppingListModal
        :cartDetails="cartDetails"
        :orderDetails="orderDetails"
      />
    </div>
  </transition>
</template>

<script>
import CustomerInfoModal from "../CustomerInfoModal.vue";
import ShoppingListModal from "../ShoppingListModal.vue";
export default {
  name: "OrderTable",
  components: {
    CustomerInfoModal,
    ShoppingListModal,
  },
  props: {
    orderList: Array,
    displayGroupFeatures: Boolean,
    displaySingleFeature: Boolean,
    displayBin: Boolean,
    type: String,
  },
  data() {
    return {
      removeId: "",
      showCheckProcess: false,
      displayFeatures: false,
      choice: "Active",
      kindOf: 1,
      features: {
        sortName: "dateCreate",
      },
      groupFeatures: {
        sortName: "dateCreate",
        search: "",
        kindOf: 1,
      },
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
    };
  },
  methods: {
    async getValue(value, id, process) {
      if (process === "Cancelled") {
        return;
      } else {
        this.updateOrder.payStatus = value;
        await this.getOrderDetails(id);
        this.updateOrders(id);
      }
    },
    submitFeatures() {
      this.$emit("load-orders", this.groupFeatures);
    },
    resetFeatures() {
      this.groupFeatures = {};
    },
    openCheck(value) {
      if (this.type === "cancelled") {
        this.showCheckProcess = false;
      } else {
        this.showCheckProcess = value;
      }
    },
    closeCheck(value) {
      this.showCheckProcess = value;
    },
    openRemoveModal(id) {
      this.removeId = id;
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
    async updateOrders(id, item, paymentMethod) {
      let order;
      try {
        if (this.updateOrder.process === "Cancelled") {
          order = {
            status: "Unactive",
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
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Order/updateOrder/${id}`,
          order,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$emit("load-orders-update");
          if (this.updateOrder.process === "Completed") {
            this.newRowFinOrder(
              id,
              item,
              this.updateOrder.process,
              paymentMethod
            );
          }
        }
      } catch (error) {
        // console.log(error);
      }
    },
    async openShoppingList(value) {
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
    async newRowFinOrder(value, item, process, payment) {
      try {
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
    async deleteConfirm() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.delete(
          `api/Order/${this.removeId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$emit("load-orders");
        }
      } catch (error) {
        // console.log(error);
      }
    },
  },
  watch: {
    kindOf() {
      this.$emit("sort-orders", this.kindOf);
    },
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
/* --- features --- */
.sort-feature {
  display: flex;
  justify-content: flex-end;
  margin: 0 30px 20px 0;
}
.sort-feature select {
  padding: 7px 9px;
  width: 150px;
}
/* --- group of feature --- */
.order-features {
  padding: 15px 0;
}
.features {
  margin-top: 10px;
  border-top: solid 1px rgb(228, 228, 228);
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
.filter-sort select {
  font-weight: 500;
  font-size: 15px;
  background: #faf8f8;
  width: 200px;
}
.features-bar label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(105, 102, 102);
}

.btn-features {
  margin-top: 3%;
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
  font-weight: 500;
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
  color: #f4511e;
  text-shadow: 0 0 7px #ff7043;
  font-weight: 500;
  cursor: pointer;
}

.modify-process {
  /* border: solid rgb(205, 205, 205) 1px; */
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
  /* border-top: solid rgb(220, 217, 217); */
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
@media screen and (max-width: 1025px) {
  .features {
    padding: 30px 20px;
  }
  .features-bar {
    flex-flow: column;
    justify-content: unset;
    align-items: flex-start;
    gap: 30px;
    /* background: #f9f5f4; */
  }
  .search-bar {
    width: 100%;
  }
  .filter-sort {
    width: 100%;
  }
  .btn-submit-features,
  .btn-reset-features {
    width: 20%;
  }
}
</style>
