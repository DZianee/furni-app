<template>
  <div class="customer-list-table">
    <div class="table-title">
      <h5>Customer Space</h5>
      <p>Manage the trustworthy customer's information in the system</p>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="user_name-email">Name</th>
            <th class="user-mobile">Mobile</th>
            <th class="user-address">Address</th>
            <th class="user-status">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h6>Ly Hong Chao</h6>
              <p>chaone123ne@dd.com</p>
            </td>
            <td class="mobile">
              <p>90283738</p>
            </td>
            <td class="address">
              <p>123 Dinh Tien Hoang, 1, Ho Thi Ky, HCM</p>
            </td>
            <td
              class="status"
              :style="[
                choice
                  ? { color: 'green', fontWeight: '600' }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              <p>Active</p>
            </td>
            <td class="adjust-remove">
              <i
                class="bx bx-trash"
                data-bs-target="#modal"
                data-bs-toggle="modal"
                @click="openRemoveModals"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <component
      :is="'confirm-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @submit="submitModal"
    >
      <div class="modal-content">
        <p>Are you sure you want to remove this row ?</p>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: "CustomerListTable",
  data() {
    return {
      choice: "Active",
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      headerPosition: "",
    };
  },
  methods: {
    openRemoveModals() {
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
      this.headerPosition = "center";
    },
  },
};
</script>

<style scoped>
.customer-list-table {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  padding: 15px 0;
  padding-left: 15px;
  margin-top: 40px;
  column-gap: 20px;
}
.table-title p {
  line-height: 30px;
  color: rgb(81, 75, 75);
  font-size: 14px;
}
.table-responsive {
  padding: 25px 0;
  padding-left: 10px;
}
thead {
  background: #ece9fc;
  height: 50px;
}
tr:not(thead tr):hover {
  background: #f8f2fe;
}
thead tr th {
  font-size: 14px;
  text-align: center;
}
tbody tr td {
  font-size: 15px;
  padding: 0px 10px;
  padding-top: 22px;
}
i {
  color: red;
  cursor: pointer;
}
.mobile p,
.status p,
.address p {
  transform: translateY(55%);
}
.adjust-remove .bx {
  transform: translateY(80%);
}
/* - - -  remove btn - - - */
.modal-content p {
  text-align: center;
  padding: 10px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.3px;
}
.modal-content {
  border: none;
}
</style>
