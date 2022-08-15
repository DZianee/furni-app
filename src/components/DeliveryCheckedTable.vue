<template>
  <div class="delivery-new-table">
    <div class="sort-feature">
      <select name="sort" v-model="kindOf">
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
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
                  @change="getValue(order.payment.payStatus, order._id)"
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
              <div class="modify-process" v-if="showCheckProcess == order._id">
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
                  @click="updateOrders(order._id)"
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
            <!-- <td class="item_remove-bin">
              <i
                class="bx bx-trash"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
                @click="openRemoveModal(order._id)"
              ></i>
            </td> -->
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
</template>

<script>
import CustomerInfoModal from "./CustomerInfoModal.vue";
import ShoppingListModal from "./ShoppingListModal.vue";
export default {
  name: "DeliveryNewTable",
  data() {
    return {
      removeId: "",
      showCheckProcess: false,
      choice: "Active",
      kindOf: 1,
      features: {
        sortName: "dateCreate",
      },
      updateOrder: {
        status: "",
        process: "",
        payStatus: "",
        transactionID: "",
        paymentMethod: "",
      },
      cartDetails: [],
      orderList: [],
      orderDetails: {},
      userInfo: {},
      address: {
        street: "",
        city: "",
        district: "",
      },
      totalCheckedOrders: 0,
    };
  },
  components: {
    CustomerInfoModal,
    ShoppingListModal,
  },
  methods: {
    async getValue(value, id) {
      this.updateOrder.payStatus = value;
      await this.getOrderDetails(id);
      this.updateOrders(id);
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
        console.log(error);
      }
    },
    async getCheckedOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/checkedOrders`,
          {
            params: {
              kindOf: this.kindOf,
              sortName: this.features.sortName,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.orderList = res.data.data;
        this.totalCheckedOrders = res.data.totalOrders;
        this.orderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
    async updateOrders(value) {
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
          `api/Order/updateOrder/${value}`,
          order,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getCheckedOrders();
          this.showCheckProcess = false;
        }
      } catch (error) {
        console.log(error);
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
        console.log(this.orderDetails);
      } catch (error) {
        console.log(error);
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
        console.log(this.userInfo);
      } catch (error) {
        console.log(error);
      }
    },
    convertDateTime(value) {
      const result = new Date(value.dateCreate);
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      value.dateCreate = day + "-" + month + "-" + year;
    },
    openCheck(value) {
      this.showCheckProcess = value;
    },
    closeCheck() {
      this.showCheckProcess = false;
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
          this.getCheckedOrders();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    totalCheckedOrders() {
      console.log(this.totalCheckedOrders);
      this.$emit("total-checked-orders", this.totalCheckedOrders);
    },
    kindOf() {
      this.getCheckedOrders();
    },
  },
  mounted() {
    this.getCheckedOrders();
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
  width: 12%;
}
/* --- table --- */
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
  color: #ff4081;
  text-shadow: 0 0 7px #ef68fc;
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
i {
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
</style>
