<template>
  <div class="manage-role">
    <div class="table-title">
      <h5>Role Manage</h5>
      <p>Manage available roles in system</p>
    </div>
    <div class="create-role-btn">
      <button
        type="button"
        data-bs-target="#modal"
        data-bs-toggle="modal"
        @click="openCreateRole"
      >
        New Role +
      </button>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="role-id">ID</th>
            <th class="role-name">Role name</th>
            <th class="role-adjust">Adjust</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="id" style="font-weight: 600">454545434</td>
            <td class="name">Manager</td>
            <td class="adjust">
              <div class="edit" style="color: green">
                <i
                  class="bx bx-edit-alt bx-fw"
                  data-bs-target="#modal"
                  data-bs-toggle="modal"
                  @click="openEditModal"
                ></i>
              </div>
              <div class="remove" style="color: red">
                <i
                  class="bx bx-trash bx-fw"
                  data-bs-target="#modal"
                  data-bs-toggle="modal"
                  @click="openRemoveModal"
                ></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="id">5563234</td>
            <td class="name">Employee</td>
            <td class="adjust">
              <div class="edit" style="color: green">
                <i
                  class="bx bx-edit-alt bx-fw"
                  data-bs-target="#modal"
                  data-bs-toggle="modal"
                  @click="openEditModal"
                ></i>
              </div>
              <div class="remove" style="color: red">
                <i
                  class="bx bx-trash bx-fw"
                  data-bs-target="#modal"
                  data-bs-toggle="modal"
                  @click="openRemoveModal"
                ></i>
              </div>
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
        <div class="create-modal" v-if="optionModal == 'create'">
          <label for="role">Role name</label>
          <input type="text" required />
        </div>
        <div class="edit-modal" v-if="optionModal == 'edit'">
          <label for="role">Role name</label>
          <input type="text" value="testing role" required />
        </div>
        <div class="remove-modal" v-if="optionModal == 'remove'">
          <p>Are you sure you want to remove this role ?</p>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: "ManageRole",
  data() {
    return {
      optionModal: "",
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
    openRemoveModal() {
      this.optionModal = "remove";
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
      this.headerPosition = "center";
    },
    openEditModal() {
      this.optionModal = "edit";
      this.modalTitle = "Role";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "center";
    },
    openCreateRole() {
      this.optionModal = "create";
      this.modalTitle = "New Role";
      this.confirmText = "Create";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "center";
    },
  },
};
</script>

<style scoped>
.table-title p {
  line-height: 30px;
  color: rgb(81, 75, 75);
  font-size: 14px;
}

/* --- create btn --- */
.create-role-btn {
  align-items: center;
  display: flex;
  padding-right: 8%;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.create-role-btn button {
  background: #aa40e3;
  color: white;
  font-weight: 500;
  font-size: 15px;
  padding: 5px;
  width: 16%;
  border: none;
}
/* --- table --- */
.table {
  margin: auto;
  width: 90%;
}
.adjust {
  display: flex;
  gap: 30px;
}
thead th {
  background: #ece9fc;
  height: 50px;
}
tr:not(thead tr):hover {
  background: #f8f2fe;
}
thead tr th {
  font-size: 14px;
}
tbody tr td {
  font-size: 15px;
  padding: 20px 10px;
}

/* - - - remove btn - - - */
.modal-content p {
  text-align: center;
  padding: 10px;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.3px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
input {
  width: 90%;
  margin: 0 18px;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}

.modal-content {
  border: none;
}
</style>
