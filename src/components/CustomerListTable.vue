<template>
  <div class="customer-list-table">
    <div class="table-title">
      <h5>Customer Space</h5>
      <p>Manage the trustworthy customer's information in the system</p>
    </div>
    <div class="cus-features">
      <div
        class="features-icon"
        @click="displayFeaturesBox = !displayFeaturesBox"
      >
        <span style="fonr-weight: 500; font-size: 15px; padding: 10px">
          Features <i class="bx bx-sm bx-fw bx-menu-alt-right"></i>
        </span>
      </div>
      <div class="features container" v-if="displayFeaturesBox">
        <input
          type="search"
          class="search-feature"
          placeholder="Search here"
          v-model="features.search"
        />
        <div class="sort">
          <label for="sort">Sort</label>
          <div class="sort-container">
            <select name="sort" v-model="features.kindOf" class="sort-features">
              <option value="1" selected>Ascending</option>
              <option value="-1">Descending</option>
            </select>
            <select
              name="sortName"
              v-model="features.sortName"
              class="sortName-features"
            >
              <option value="" disabled>Select</option>
              <option value="name">Name</option>
            </select>
          </div>
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
            <th class="user_name-email">Name</th>
            <th class="user-mobile">Mobile</th>
            <th class="user-address">Address</th>
            <th class="user-login">Last login</th>
            <th class="user-status">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cus in customerList" :key="cus.id">
            <td class="cus-name">
              <h6>{{ cus.firstname }} {{ cus.lastname }}</h6>
              <p style="font-size: 14px">{{ cus.email }}</p>
            </td>
            <td class="mobile">
              <p>{{ cus.phone }}</p>
            </td>
            <td class="address">
              <p>123 CMT8, Hoa Thanh, Tan Binh</p>
              <!-- <p>{{ cus.address.street }}</p> -->
            </td>
            <td class="last-login">
              <p>{{ cus.lastLogin }}</p>
            </td>
            <td
              class="status"
              :style="[
                choice == cus.status
                  ? { color: 'green', fontWeight: '600' }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              <p>{{ cus.status }}</p>
            </td>
            <!-- <td class="adjust-remove">
              <i
                class="bx bx-trash"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
                @click="openRemoveModal()"
              ></i>
            </td> -->
            <td class="adjust-edit">
              <i
                class="bx bx-edit-alt bx-fw"
                data-bs-target="#infoModal"
                data-bs-toggle="modal"
                style="color: darkblue"
                @click="openEditModal(cus._id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <component :is="'remove-modal'" @delete-confirm="removeConfirm">
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
      customerList: [],
      features: {
        kindOf: 1,
        sortName: "",
        search: "",
        status: "Active",
      },
      displayFeaturesBox: false,
    };
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/User/Customer/62ac075d3a5d293c62b3b12b`,
        this.$axios.defaults.headers["Authorization"]
      );
      this.customerList = res.data.data;
      this.customerList.forEach(dateLogin);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    function dateLogin(cus, index, arr) {
      const time = cus.lastLogin.toString();
      console.log(typeof time);
      const loginDateTime = new Date(time);
      console.log(loginDateTime);
      let day = loginDateTime.getDate();
      let month = loginDateTime.getMonth();
      let year = loginDateTime.getFullYear();
      let hour;
      let min = loginDateTime.getMinutes();

      if (parseInt(month) < 9) {
        month = "0" + (parseInt(month) + 1).toString();
      } else {
        month = (parseInt(month) + 1).toString();
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      } else {
        day = loginDateTime.getDate();
      }
      if (parseInt(loginDateTime.getHours()) < 10) {
        hour = "0" + loginDateTime.getHours();
        console.log(typeof hour);
      } else {
        hour = parseInt(loginDateTime.getHours()).toString();
        console.log(typeof hour);
      }
      if (parseInt(min) < 10) {
        min = "0" + (parseInt(min) + 1).toString();
      } else {
        min = (parseInt(min) + 1).toString();
      }
      arr[index].lastLogin =
        day + "-" + month + "-" + year + " " + hour + ":" + min;
    }
  },
  methods: {
    openRemoveModals() {},
    async getCus() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/User/Customer/62ac075d3a5d293c62b3b12b/`,
          {
            params: {
              kindOf: this.features.kindOf,
              search: this.features.search,
              status: this.features.status,
              sortName: this.features.sortName,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.staff = res.data.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
/* .cus-list-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px 0;
  padding-left: 15px;
  margin-top: 40px;
  column-gap: 20px;
  border: solid;
} */
.features-icon {
  display: flex;
  justify-content: flex-end;
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
tbody tr td:not(td.cus-name) {
  text-align: center;
}
td.cus-name h6 {
  color: #a65de7;
  font-weight: 500;
}
/* i {
  color: red;
  cursor: pointer;
} */
.mobile p,
.status p,
.address p,
.last-login p {
  transform: translateY(55%);
}
/* .adjust-remove .bx {
  transform: translateY(80%);
} */
.adjust-edit .bx {
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
/* --- Features ---- */
.features-icon {
  cursor: pointer;
}
.features {
  border-top: solid 1px rgb(228, 228, 228);
  border-bottom: solid 1px rgb(228, 228, 228);
  padding: 30px 60px;
}
.features label {
  font-size: 14px;
  font-weight: 500;
  color: grey;
}
.search-feature {
  width: 90%;
  padding: 9px 9px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
/* .features select {
  width: 70%;
  padding: 7px 12px;
  font-size: 14px;
  border-radius: 7px;
  border: solid 1px lightgrey;
} */
.sort,
.filter-features {
  margin-top: 30px;
  padding-left: 20px;
}
.sort {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
}
.sort-container {
  display: flex;
  gap: 80px;
}
.sort-container select,
.filter-features select {
  width: 25%;
  padding: 9px 12px;
  font-size: 14px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.filter-features {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
}
/* .filter-features div {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
} */
.btn-features {
  margin-top: 30px;
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
</style>
