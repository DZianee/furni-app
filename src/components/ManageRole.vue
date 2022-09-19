<template>
  <div class="manage-role">
    <div class="table-title">
      <h5>Role Manage</h5>
      <p>Manage available roles in system</p>
    </div>
    <div class="create-role-btn">
      <button
        type="button"
        data-bs-target="#createModal"
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
            <th class="role-name">Name</th>
            <th class="role-adjust">Adjust</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roleList" :key="role.index">
            <td class="id">{{ role._id }}</td>
            <td class="name">{{ role.name }}</td>
            <td class="adjust">
              <div class="edit" style="color: green">
                <i
                  class="bx bx-edit-alt bx-fw"
                  data-bs-target="#infoModal"
                  data-bs-toggle="modal"
                  @click="openEditModal(role._id)"
                ></i>
              </div>
              <div class="remove" style="color: red">
                <!-- <div v-if="displayModal"> -->
                <i
                  class="bx bx-trash bx-fw"
                  data-bs-target="#removeModal"
                  data-bs-toggle="modal"
                  @click="openRemoveModal(role._id)"
                ></i>
                <!-- </div> -->
                <!-- <div v-else>
                  <i
                    class="bx bx-trash bx-fw"
                    data-bs-target="#warningModal"
                    data-bs-toggle="modal"
                    @click="checkRole"
                  ></i>
                </div> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <component
      :is="'create-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @submit="createRoles"
    >
      <div class="modal-content">
        <div class="create-modal">
          <label for="role">Role name</label>
          <input type="text" name="role" v-model="name" required />
        </div>
      </div>
    </component>
    <component
      :is="'info-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @submit="editRole"
    >
      <div class="modal-content">
        <label for="role">Role name</label>
        <input type="text" v-model="roleDetails.name" required />
      </div>
    </component>
    <component :is="'remove-modal'" @delete-confirm="removeConfirm">
    </component>
    <component
      :is="'warning-modal'"
      @close-modal="closeWarning"
      :openModal="displayWarning"
    >
    </component>
  </div>
</template>

<script>
export default {
  name: "ManageRole",
  data() {
    return {
      checkedValue: false,
      displayWarning: false,
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      headerPosition: "",
      roleList: [],
      removeId: "",
      // newRole: {
      //   name: "",
      // },
      name: "",
      roleDetails: {},
    };
  },
  methods: {
    async getRole() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Role`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.roleList = res.data.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    async editRole() {
      try {
        const updateRole = { name: this.roleDetails.name };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Role/updateRole/${this.roleDetails._id}`,
          updateRole,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async removeConfirm() {
      let res;
      try {
        if (this.checkedValue == true) {
          this.displayWarning = true;
        } else {
          this.$store.dispatch("accessToken");
          res = await this.$axios.delete(`api/Role/${this.removeId}`);
          if (res.status == 200) {
            this.getRole();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkRole() {
      let res;
      try {
        this.$store.dispatch("accessToken");
        res = await this.$axios.get(`api/Role/checkRole/${this.removeId}`);
        if (res.status == 200) {
          this.checkedValue = true;
          console.log(res);
        } else {
          this.checkedValue = false;
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeWarning() {
      this.displayWarning = false;
    },
    openRemoveModal(value) {
      this.removeId = value;
      this.checkRole();
    },
    async openEditModal(value) {
      this.modalTitle = "Role";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "center";

      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Role/roleDetails/${value}`,
          this.newRole,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.roleDetails = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    openCreateRole() {
      this.modalTitle = "New Role";
      this.confirmText = "Create";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "center";

      console.log("test");
    },
    async createRoles() {
      try {
        // const newRole = { name: this.name };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.post(
          `api/Role/newRole`,
          { name: this.name },
          this.$axios.defaults.headers["Authorization"]
        );

        if (res.status == 200) {
          this.getRole();
          console.log(res);
        }
        console.log("test");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getRole();
  },
};
</script>

<style scoped>
.manage-role {
  padding: 0 15px;
}
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
  width: 150px;
  border: none;
}
/* --- table --- */
.table-responsive {
  padding: 25px 0;
  /* padding-left: 10px; */
  max-height: 400px;
  overflow: auto;
  scroll-behavior: smooth;
}
.table-responsive {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}

.table-responsive::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
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
/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .manage-staff-table {
    grid-template-columns: 100%;
    row-gap: 10px;
    padding: 15px 0;
    padding-left: 15px;
  }
  .table {
    width: 834px;
  }
  .table-title {
    padding: 0 4%;
  }
}
</style>
