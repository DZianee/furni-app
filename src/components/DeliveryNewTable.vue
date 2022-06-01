<template>
  <div class="delivery-new-table">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th style="text-align: left">ID</th>
            <th style="text-align: left">Customer</th>
            <th>Date create</th>
            <th>Payment method</th>
            <th>Order's process</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="order-id"
              data-bs-target="#shoplistModal"
              data-bs-toggle="modal"
            >
              2434354
            </td>
            <td
              class="order-customer"
              data-bs-target="#cusModal"
              data-bs-toggle="modal"
            >
              Rosan weending
            </td>
            <td>20/20/2000</td>
            <td>mimo</td>
            <td class="process-order">
              <label @click="openCheck" class="process-content">New</label>
              <div class="modify-process" v-if="showCheckProcess">
                <i class="bx bx-x bx-sm" @click="closeCheck"></i>
                <div class="process-check">
                  <div class="check-checked">
                    <label for="checked">
                      <input type="radio" name="processOrder" value="checked" />

                      Checked</label
                    >
                  </div>
                  <div class="check-delivered">
                    <label for="delivery">
                      <input
                        type="radio"
                        name="processOrder"
                        value="delivery"
                      />

                      Delivering</label
                    >
                  </div>
                  <div class="check-completed">
                    <label for="completed">
                      <input
                        type="radio"
                        name="processOrder"
                        value="completed"
                      />

                      Completed</label
                    >
                  </div>
                  <div class="check-cancelled">
                    <label for="cancelled">
                      <input
                        type="radio"
                        name="processOrder"
                        value="cancelled"
                      />

                      Cancelled</label
                    >
                  </div>
                </div>
                <div class="btn btn-submit-check">Save</div>
              </div>
            </td>
            <td
              class="status-order"
              :style="[choice ? { color: 'green' } : { color: 'red' }]"
            >
              Active
            </td>
          </tr>
          <tr>
            <td style="text-align: left">2434354545</td>
            <td style="text-align: left">Rosan weending</td>
            <td>20/20/2000</td>
            <td>mimo</td>
            <td>chekced</td>
            <td>active</td>
          </tr>
          <tr>
            <td style="text-align: left">2434354545</td>
            <td style="text-align: left">Rosan weending</td>
            <td>20/20/2000</td>
            <td>mimo</td>
            <td>chekced</td>
            <td>active</td>
          </tr>
        </tbody>
      </table>
    </div>
    <component
      :is="'confirm-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      @submit="submitModal"
    >
      <div class="modal-content">
        <p>Are you sure you want to remove this row ?</p>
      </div>
    </component>
    <CustomerInfoModal />
    <ShoppingListModal />
  </div>
</template>

<script>
import CustomerInfoModal from "./CustomerInfoModal.vue";
import ShoppingListModal from "./ShoppingListModal.vue";
export default {
  name: "DeliveryNewTable",
  data() {
    return {
      showCheckProcess: false,
      choice: "active",
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
    };
  },
  components: {
    CustomerInfoModal,
    ShoppingListModal,
  },
  methods: {
    openCheck() {
      this.showCheckProcess = true;
    },
    closeCheck() {
      this.showCheckProcess = false;
    },
    openRemoveModal() {
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
    },
  },
};
</script>

<style scoped>
/* --- table --- */
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
  padding: 25px;
  color: rgb(108, 106, 106);
  text-align: center;
}

/* --- order-id --- */
.order-id {
  font-weight: 700;
  text-align: left;
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
  font-weight: 500;
}
/* --- status order --- */
.status-order {
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
