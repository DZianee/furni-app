<template>
  <div class="manage-staff-table">
    <div class="table-title">
      <h5>Employee staff</h5>
      <p>Manage the active staffs working in the store</p>
      <p>{{ result }}</p>
    </div>
    <div class="table-responsive">
      <div class="create-staff-btn">
        <button
          type="button"
          data-bs-target="#modal"
          data-bs-toggle="modal"
          @click="openCreateStaff"
        >
          New Staff +
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="staff_name-email">Name</th>
            <th class="staff-role">Role</th>
            <th class="staff-mobile">Mobile</th>
            <th class="staff-status">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="staff-name">Ly Hong Chao</td>
            <td>Manager</td>
            <td>90283738</td>
            <td
              :style="[
                choice
                  ? { color: 'green', fontWeight: '600' }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              Active
            </td>
            <td class="adjust">
              <i
                class="bx bx-dots-horizontal-rounded test"
                style="cursor: pointer"
                @click="displayAdjustMode = !displayAdjustMode"
              ></i>
              <div class="adjust-mode" v-if="displayAdjustMode">
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
              </div>
            </td>
          </tr>
          <tr>
            <td class="staff-name">Ly Lac Lac</td>
            <td>Employee</td>
            <td>90283738</td>
            <td>Active</td>
            <td><i class="bx bx-dots-horizontal-rounded"></i></td>
          </tr>
          <tr>
            <td class="staff-name">Ly Lac Hy</td>
            <td>Employee</td>
            <td>90283738</td>
            <td>Active</td>
            <td><i class="bx bx-dots-horizontal-rounded"></i></td>
          </tr>
          <tr>
            <td class="staff-name">Ly Y Vy</td>
            <td>Employee</td>
            <td>90283738</td>
            <td>Active</td>
            <td><i class="bx bx-dots-horizontal-rounded"></i></td>
          </tr>
          <tr>
            <td class="staff-name">Ly Duong Thien Phat</td>
            <td>Employee</td>
            <td>90283738</td>
            <td>Active</td>
            <td><i class="bx bx-dots-horizontal-rounded"></i></td>
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
        <div class="remove-modal" v-if="optionModal == 'remove'">
          <p>Are you sure you want to remove this row ?</p>
        </div>
        <div class="edit-modal" v-if="optionModal == 'edit'">
          <div class="staff-fullname">
            <div class="firstname">
              <label for="firstname">Firstname</label>
              <input type="text" value="Hong Chao" />
            </div>
            <div class="lastname">
              <label for="lastname">Lastname</label>
              <input type="text" value="Ly" />
            </div>
          </div>
          <div class="staff_email-pass">
            <div class="email">
              <label for="email">Email</label>
              <input type="email" value="chaonehihih@dmci.com" />
            </div>
            <div class="password">
              <label for="password">Password</label>
              <input type="password" value="34234343@dmci.com" />
            </div>
          </div>
          <div class="staff_role-status">
            <div class="role">
              <label for="role">Role</label>
              <select name="role">
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="default user">Default user</option>
              </select>
            </div>
            <div class="status">
              <label for="status">Status</label>
              <select name="status">
                <option value="active">Active</option>
                <option value="unactive">Unactive</option>
              </select>
            </div>
          </div>
          <div class="staff-address">
            <div class="address">
              <label for="address">Address</label>
              <input
                type="text"
                value="123 Dinh Tien Hoang, 1, Ho Thi Ky, HCM"
              />
            </div>
          </div>
          <div class="staff-phone">
            <div class="phone">
              <label for="phone">Mobile</label>
              <input type="text" value="544545454" />
            </div>
          </div>
        </div>
        <div class="create-modal" v-if="optionModal == 'create'">
          <div class="staff-fullname">
            <div class="firstname">
              <label for="firstname">Firstname</label>
              <input type="text" required />
            </div>
            <div class="lastname">
              <label for="lastname">Lastname</label>
              <input type="text" required />
            </div>
          </div>
          <div class="staff_email-pass">
            <div class="email">
              <label for="email">Email</label>
              <input type="email" autocomplete="false" required />
            </div>
            <div class="password">
              <label for="password">Password</label>
              <input type="password" required />
            </div>
          </div>
          <div class="staff_role-status">
            <div class="role">
              <label for="role">Role</label>
              <select name="role" required>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="default user">Default user</option>
              </select>
            </div>
            <div class="status">
              <label for="status">Status</label>
              <select name="status" required>
                <option value="active">Active</option>
                <option value="unactive">Unactive</option>
              </select>
            </div>
          </div>
          <div class="staff-address">
            <div class="address">
              <label for="address">Address</label>
              <input type="text" required />
            </div>
          </div>
          <div class="staff-phone">
            <div class="phone">
              <label for="phone">Mobile</label>
              <input type="text" required />
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: "StaffTableManage",
  data() {
    return {
      optionModal: "",
      choice: "Active",
      displayAdjustMode: false,
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      headerPosition: "",
      id: "62ac075d3a5d293c62b3b12b",
      result: [],
    };
  },
  async created() {
    try {
      // this.$store.dispatch("fetchAccessToken"); 62ac075d3a5d293c62b3b12b
      this.$axios.defaults.headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjdlNWZiM2UyODhmYmZmZWZlY2FiMyIsImlhdCI6MTY1NjM5ODkwMywiZXhwIjoxNjU2NDA2MTAzfQ.R3fVlEqRH1I4i65oH2Ktj1gXYj1Gsww-KcrDlR4kZJ8`;

      const res = await this.$axios.get(
        `api/User/Staff/${this.id}`,
        this.$axios.defaults.headers["Authorization"]
      );
      console.log(res);
      this.result = res.status;
    } catch (e) {
      //
    }
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
      this.modalTitle = "Employee Information";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "flex-start";
    },
    openCreateStaff() {
      this.optionModal = "create";
      this.modalTitle = "New Employee";
      this.confirmText = "Create";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "flex-start";
    },
  },
  // mounted() {
  //   this.getStaff();
  // },
};
</script>

<style scoped>
.manage-staff-table {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  column-gap: 20px;
  padding: 15px 0;
  padding-left: 15px;
}
.table-title p {
  line-height: 30px;
  color: rgb(81, 75, 75);
  font-size: 14px;
}

/* --- create btn --- */
.create-staff-btn {
  align-items: center;
  display: flex;
  /* padding-right: 8%; */
  justify-content: flex-end;
  margin-bottom: 20px;
}
.create-staff-btn button {
  background: #aa40e3;
  color: white;
  font-weight: 500;
  font-size: 15px;
  padding: 5px;
  width: 20%;
  border: none;
}

/* --- table --- */
.table-responsive {
  padding: 25px 0;
  padding-left: 10px;
  height: 340px;
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
  text-align: center;
}
tbody tr td {
  font-size: 15px;
  padding: 20px 10px;
}
tbody tr td:not(td.staff-name) {
  text-align: center;
}

/* --- adjust --- */
.adjust {
  position: relative;
}
.adjust-mode {
  border: solid 1px grey;
  position: absolute;
  z-index: 1;
  width: 40px;
  right: 10px;
  top: 40px;
  background: white;
  border-radius: 5px;
  /* display: none; */
}
.edit,
.remove {
  padding: 10px;
  font-size: 14px;
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

/* --- edit modal --- */
.staff-fullname,
.staff-phone,
.edit-modal .staff-address,
.staff_role-status,
.staff_email-pass {
  padding: 10px;
}

.staff_role-status,
.staff-fullname,
.staff_email-pass {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
.role select,
.status select {
  width: 90%;
  font-size: 14px;
  padding: 7px 12px;
  border-radius: 7px;
  margin: 0 18px;
  border: solid 1px lightgrey;
}

.modal-content {
  border: none;
}
</style>
