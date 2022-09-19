<template>
  <div class="manage-staff-table">
    <div class="table-title">
      <div class="staff-title">
        <h5>Employee staff</h5>
        <p>Manage the active staffs working in the store</p>
      </div>
      <div class="staff-features">
        <div class="features-icon" @click="displayFeatures = !displayFeatures">
          <span style="fonr-weight: 500; font-size: 15px; padding: 10px">
            <i class="bx bx-sm bx-fw bx-menu-alt-left"></i> Features
          </span>
        </div>
        <div class="features" v-if="displayFeatures">
          <input
            type="search"
            class="search-feature"
            placeholder="Search here"
            v-model="features.search"
          />
          <div class="sort">
            <label for="sort">Sort</label>
            <select name="sort" v-model="features.kindOf" class="sort-features">
              <option value="1" selected>Ascending</option>
              <option value="-1">Descending</option>
            </select>
          </div>

          <div class="filter-features">
            <label for="filter">Filter</label>
            <div>
              <select
                name="status"
                v-model="features.status"
                class="filter-status"
              >
                <option value="Active">Active</option>
                <option value="Unactive">Unactive</option>
              </select>
              <select
                name="staffRole"
                v-model="features.role"
                class="filter-role"
              >
                <option value="" disabled>Select role</option>
                <option
                  v-for="role in roleList"
                  :key="role.index"
                  :value="role._id"
                >
                  {{ role.name }}
                </option>
              </select>
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
    </div>
    <div class="staff-content-side">
      <div class="create-staff-btn">
        <button
          type="button"
          data-bs-target="#createModal"
          data-bs-toggle="modal"
          @click="openCreateStaff"
        >
          New Staff +
        </button>
      </div>
      <div class="table-responsive">
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
            <tr v-for="item in staff" :key="item.index">
              <td class="staff-name">
                {{ item.firstname }} {{ item.lastname }}
              </td>
              <td>{{ item.role.name }}</td>
              <td>{{ item.phone }}</td>
              <td
                :style="[
                  choice == item.status
                    ? { color: 'green', fontWeight: '600' }
                    : { color: 'red', fontWeight: '600' },
                ]"
              >
                {{ item.status }}
              </td>
              <td class="adjust">
                <i
                  class="bx bx-dots-horizontal-rounded test"
                  style="cursor: pointer"
                  @click="close ? openAdjustMode(item._id) : closeAdjustMode(1)"
                ></i>
                <div class="adjust-mode" v-if="displayAdjustMode == item._id">
                  <div class="edit" style="color: green">
                    <i
                      class="bx bx-edit-alt bx-fw"
                      data-bs-target="#infoModal"
                      data-bs-toggle="modal"
                      @click="openEditModal(item._id)"
                    ></i>
                  </div>
                  <div class="remove" style="color: red">
                    <i
                      class="bx bx-trash bx-fw"
                      data-bs-target="#removeModal"
                      data-bs-toggle="modal"
                      @click="openRemoveModal(item._id)"
                    ></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <component
      :is="'create-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @submit="createEmp"
      @reset-form="resetForm"
    >
      <div class="modal-content">
        <div class="create-modal">
          <div class="staff-fullname">
            <div class="firstname">
              <label for="firstname">Firstname</label>
              <input
                type="text"
                required
                name="firstname"
                v-model="newStaff.firstname"
              />
            </div>
            <div class="lastname">
              <label for="lastname">Lastname</label>
              <input
                type="text"
                required
                name="lastname"
                v-model="newStaff.lastname"
              />
            </div>
          </div>
          <div class="staff_email-pass">
            <div class="email">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                autocomplete="false"
                required
                v-model="newStaff.email"
              />
            </div>
            <Password v-model:value="newStaff.password" />
          </div>
          <div class="staff_role-status">
            <div class="role">
              <label for="role">Role</label>
              <select name="role" required v-model="newStaff.role">
                <option disabled value="">Please select role</option>
                <option
                  v-for="role in roleList"
                  :key="role.index"
                  :value="role._id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="status">
              <label for="status">Status</label>
              <select name="status" required v-model="newStaff.status">
                <option disabled value="">Please select status</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          <div class="staff-address">
            <div class="address">
              <label for="address">Address</label>
              <div>
                <input
                  type="text"
                  name="street"
                  class="address-input"
                  v-model="newStaff.street"
                  required
                  placeholder="1 Cach Mang Thang Tam"
                />
                <div class="district-city">
                  <div class="district">
                    <select
                      name="district"
                      v-model="newStaff.district"
                      required
                    >
                      <option disabled value="">Please select district</option>
                      <option
                        v-for="d in destinationList.district"
                        :key="d.id"
                        :value="d.name"
                      >
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
                  <div class="city">
                    <select name="city" required v-model="newStaff.city">
                      <option disabled value="">Select city</option>
                      <option value="HCM">HCM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="staff-phone">
            <div class="phone">
              <label for="phone">Mobile</label>
              <input
                class="phone-input"
                type="text"
                required
                name="phone"
                v-model="newStaff.phone"
                minlength="10"
                maxlength="10"
              />
            </div>
          </div>
        </div>
      </div>
    </component>
    <component
      :is="'info-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @submit="updateInfo"
    >
      <div class="modal-content">
        <div class="edit-modal">
          <div class="staff-fullname">
            <div class="firstname">
              <label for="firstname">Firstname</label>
              <input
                type="text"
                name="firstname"
                v-model="staffDetails.firstname"
                required
              />
            </div>
            <div class="lastname">
              <label for="lastname">Lastname</label>
              <input
                type="text"
                name="lastname"
                v-model="staffDetails.lastname"
                required
              />
            </div>
          </div>

          <div class="staff_role-status">
            <div class="role">
              <label for="role">Role</label>
              <select name="role" required v-model="role">
                <option disabled value="">Please select role</option>
                <option
                  v-for="role in roleList"
                  :key="role.index"
                  :value="role._id"
                  :selected="role == role._id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="status">
              <label for="status">Status</label>
              <select name="status" v-model="staffDetails.status" required>
                <option disabled value="">Please select status</option>
                <option
                  value="Active"
                  :selected="staffDetails.status === 'Active'"
                >
                  Active
                </option>
                <option
                  value="Unactive"
                  :selected="staffDetails.status === 'Unactive'"
                >
                  Unactive
                </option>
              </select>
            </div>
          </div>
          <div class="staff-address">
            <div class="address">
              <label for="address">Address</label>
              <div>
                <input
                  type="text"
                  name="street"
                  class="address-input"
                  required
                  v-model="address.street"
                />
                <div class="district-city">
                  <div class="district">
                    <select name="district" required v-model="address.district">
                      <option
                        v-for="d in destinationList.district"
                        :key="d.id"
                        :value="d.name"
                        :selected="address.district == d.name"
                      >
                        {{ d.name }}
                      </option>
                    </select>
                  </div>
                  <div class="city">
                    <select name="city" required v-model="address.city">
                      <option disabled value="">Select city</option>
                      <option value="HCM">HCM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="staff_email">
            <div class="email">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                v-model="staffDetails.email"
                required
                class="email-input"
              />
            </div>
          </div>
          <div class="staff-phone">
            <div class="phone">
              <label for="phone">Mobile</label>
              <input
                type="text"
                class="phone-input"
                name="phone"
                v-model="staffDetails.phone"
                required
                minlength="10"
                maxlength="10"
              />
            </div>
          </div>
        </div>
      </div>
    </component>
    <component
      :is="'remove-modal'"
      :title="modalTitle"
      :confirmText="confirmText"
      :btnProperty="btnProperty"
      :headerPosition="headerPosition"
      @delete-confirm="deleteEmp"
    ></component>
  </div>
</template>

<script>
import Password from "../components/PasswordInput.vue";
import listImg from "../assets/JSON/avaImg.json";
import destinationList from "../assets/JSON/destinationCity.json";
export default {
  name: "StaffTableManage",
  components: { Password },
  data() {
    return {
      displayFeatures: false,
      optionModal: "",
      choice: "Active",
      displayAdjustMode: "",
      close: true,
      autoClose: false,
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      headerPosition: "",
      typeCase: 0,
      destinationList: destinationList,
      roleList: [],
      staff: [],
      staffDetails: {},
      address: {},
      role: "",
      removeId: "",
      newStaff: {
        avatar: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        street: "",
        ward: "",
        district: "",
        city: "",
      },
      features: {
        kindOf: 1,
        search: "",
        status: "Active",
        role: "",
      },
    };
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/User/Staff/62ac075d3a5d293c62b3b12b`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.staff = res.data.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async getStaff() {
      let staffFeatures;
      let res;
      if (this.features.role == "") {
        staffFeatures = {
          kindOf: 1,
          search: "",
          status: "Active",
        };
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/User/Staff/62ac075d3a5d293c62b3b12b/`,
            {
              params: {
                kindOf: staffFeatures.kindOf,
                search: staffFeatures.search,
                status: staffFeatures.status,
              },
            },
            this.$axios.defaults.headers["Authorization"]
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (this.features.role != "") {
        staffFeatures = {
          kindOf: 1,
          search: "",
          status: "Active",
          role: this.features.role,
        };
        this.$store.dispatch("accessToken");
        res = await this.$axios.get(
          `api/User/Staff/62ac075d3a5d293c62b3b12b/`,
          {
            params: {
              kindOf: staffFeatures.kindOf,
              search: staffFeatures.search,
              status: staffFeatures.status,
              role: staffFeatures.role,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
      }

      this.staff = res.data.data;
      console.log(res);
    },
    async getRole() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Role/staffRolesList/62ac075d3a5d293c62b3b12b`,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.roleList = res.data.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    submitFeatures() {
      this.getStaff();
    },
    resetFeatures() {
      this.features = {};
    },
    resetForm() {
      this.newStaff = {};
    },
    openAdjustMode(val) {
      this.displayAdjustMode = val;
      this.close = !this.close;
    },
    closeAdjustMode(val) {
      this.displayAdjustMode = val;
      this.close = !this.close;
    },
    async createEmp() {
      try {
        const randomImg = Math.floor(Math.random() * listImg.img.length);
        this.newStaff.avatar = listImg.img[randomImg];
        console.log(this.newStaff);
        this.$store.dispatch("accessToken");
        const res = await this.$axios.post(
          `api/User/newUser`,
          this.newStaff,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getStaff();
          console.log(res);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async updateInfo() {
      try {
        const updateUser = {
          firstname: this.staffDetails.firstname,
          lastname: this.staffDetails.lastname,
          email: this.staffDetails.email,
          phone: this.staffDetails.phone,
          role: this.role,
          street: this.address.street,
          district: this.address.district,
          city: this.address.city,
          status: this.staffDetails.status,
        };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/User/updateUser/${this.staffDetails.id}`,
          updateUser,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEmp() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.delete(
          `api/User/removeStaff/${this.removeId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getStaff();
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },
    openRemoveModal(value) {
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
      this.headerPosition = "center";
      this.displayAdjustMode = 0;
      this.close = !this.close;

      this.removeId = value;
      console.log(value);
    },
    async openEditModal(value) {
      this.modalTitle = "Employee Information";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "flex-start";
      this.displayAdjustMode = 0;
      this.close = !this.close;

      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/User/userDetails/All/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.staffDetails = res.data.data;
        console.log(this.staffDetails);
        this.address = res.data.data.address;
        this.role = res.data.data.role;
      } catch (error) {
        console.log(error);
      }
    },
    openCreateStaff() {
      this.modalTitle = "New Employee";
      this.confirmText = "Create";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "flex-start";
    },
  },
  watch: {
    autoClose() {
      console.log(this.autoClose);
      this.autoClose = false;
    },
  },
  mounted() {
    this.getRole();
  },
};
</script>

<style scoped>
.manage-staff-table {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  column-gap: 20px;
  padding: 15px 0;
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
  padding-right: 8%;
  justify-content: flex-end;
  margin-bottom: 12px;
  margin-top: 2%;
}
.create-staff-btn button {
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
thead th {
  background: #ece9fc;
  height: 50px;
}
tr:not(thead tr):hover {
  background: #f8f2fe;
}
thead tr th {
  font-size: 13px;
  text-align: center;
}
tbody tr td {
  font-size: 14px;
  padding: 20px 10px;
}
tbody tr td:not(td.staff-name) {
  text-align: center;
}
.staff-name {
  color: #a65de7;
  font-weight: 500;
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
.staff-address,
.staff_role-status,
.staff_email-pass {
  padding: 10px 0;
}

.staff_role-status,
.staff-fullname,
.staff_email-pass {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.address-input,
.phone-input,
.email-input {
  width: 95%;
}
.district-city {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  /* padding: 10px; */
  column-gap: 14px;
  width: 97%;
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
  padding: 9px 12px;
  border-radius: 7px;
  margin: 0 18px;
  border: solid 1px lightgrey;
}
.district select,
.city select {
  width: 95%;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  margin: 0 18px;
  border: solid 1px lightgrey;
}
.password /deep/ input {
  width: 90%;
  margin: 0 18px;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.password /deep/ label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
.modal-content {
  border: none;
}
.create-modal {
  padding-right: 10px;
}

/* --- Features ---- */
.features-icon {
  cursor: pointer;
}
.features {
  border-top: solid 1px rgb(228, 228, 228);
  border-bottom: solid 1px rgb(228, 228, 228);
  padding: 30px 10px;
}
.features label {
  font-size: 14px;
  /* font-weight: 500; */
}
.features select {
  width: 70%;
  padding: 9px 12px;
  font-size: 14px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.sort,
.filter-features {
  margin-top: 20px;
  padding-left: 20px;
}
.filter-features {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
}
.filter-features div {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
}
/* .features .filter-status,
.features .filter-name {
  width: 82%;
} */
.btn-features {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.btn-submit-features {
  color: white;
  background: #aa40e3;
  width: 90px;
  font-weight: 500;
}
.btn-submit-features:hover {
  color: white;
}
.btn-reset-features {
  background: rgb(218, 218, 218);
  width: 90px;
  font-weight: 500;
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
}
</style>
