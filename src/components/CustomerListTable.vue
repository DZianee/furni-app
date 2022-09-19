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
            <!-- <th></th> -->
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
              <p>
                {{ cus.address.street }}, {{ cus.address.district }},
                {{ cus.address.city }}
              </p>
            </td>
            <td class="last-login">
              <p>{{ cus.lastLogin }}</p>
            </td>
            <td
              class="status"
              :style="[
                choice == cus.status
                  ? { color: 'green', fontWeight: '600', cursor: 'pointer' }
                  : { color: 'red', fontWeight: '600', cursor: 'pointer' },
              ]"
            >
              <p @click="editStatus" v-if="hiddenEditStatus">
                {{ cus.status }}
              </p>
              <select
                v-else
                name="status"
                v-model="cus.status"
                @change="
                  getValue(
                    cus.status,
                    cus._id,
                    cus.address.city,
                    cus.address.district,
                    cus.address.street
                  )
                "
              >
                <option value="Active" :selected="cus.status == 'Active'">
                  Active
                </option>
                <option value="Unactive" :selected="cus.status == 'Unactive'">
                  Unactive
                </option>
              </select>
            </td>
            <!-- <td class="adjust-remove">
              <i
                class="bx bx-trash"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
                @click="openRemoveModal()"
              ></i>
            </td> -->
            <!-- <td class="adjust-edit">
              <i
                class="bx bx-edit-alt bx-fw"
                style="color: darkblue"
                data-bs-target="#infoModal"
                data-bs-toggle="modal"
                @click="openEditModal()"
              ></i>
            </td> -->
          </tr>
        </tbody>
      </table>
      <component
        :is="'pagination-feature'"
        :totalPages="totalPages"
        @click-next="pageChange"
        @click-previous="pageChange"
        :currentPage="currentPage"
      ></component>
    </div>
    <!-- <component :is="'remove-modal'" @delete-confirm="removeConfirm">
    </component> -->
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
      address: {},
      features: {
        kindOf: 1,
        sortName: "",
        search: "",
        status: "Active",
      },
      displayFeaturesBox: false,
      totalPages: 0,
      currentPage: 1,
      displayPreBtn: false,
      hiddenEditStatus: true,
    };
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/User/Customer/62ac075d3a5d293c62b3b12b`,
        {
          params: {
            page: this.currentPage,
          },
        },
        this.$axios.defaults.headers["Authorization"]
      );
      this.customerList = res.data.data;
      this.customerList.forEach((item) => this.convertDateTime(item));
      this.totalPages = res.data.pageTotals;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    removeConfim() {},
    convertDateTime(value) {
      let date = new Date(value.lastLogin);
      value.lastLogin = date.toLocaleString();
    },
    async getValue(value, id, city, district, street) {
      const updateStatus = {
        status: value,
        city: city,
        district: district,
        street: street,
      };
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/User/updateUser/${id}`,
          updateStatus,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
    editStatus() {
      this.hiddenEditStatus = false;
    },
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
              page: this.currentPage,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.customerList = res.data.data;
        this.customerList.forEach((item) => this.convertDateTime(item));
        this.totalPages = res.data.pageTotals;
      } catch (error) {
        console.log(error);
      }
    },
    submitFeatures() {
      this.currentPage = 1;
      this.getCus();
    },
    resetFeatures() {
      this.features = {};
    },
    pageChange(current) {
      this.currentPage = current;
      this.getCus();
      console.log(current);
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
.customer-list-table {
  padding: 15px 10px;
}
.features-icon {
  display: flex;
  justify-content: flex-end;
  /* margin-right: 8%; */
}
.table-title p {
  line-height: 30px;
  color: rgb(81, 75, 75);
  font-size: 14px;
}
.table-responsive {
  padding: 25px 0;
  padding-left: 10px;
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
/* .table {
  width: 1220px;
} */
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

.status select {
  border: none;
  font-weight: 500;
  padding: 7px;
  transform: translateY(20%);
}
/* .adjust-remove .bx{
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
  column-gap: 20px;
}
.sort-container {
  display: flex;
  gap: 80px;
}
.sort-container select,
.filter-features select {
  width: 150px;
  padding: 9px 12px;
  font-size: 14px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.filter-features {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  column-gap: 20px;
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
@media screen and (max-width: 1250px) {
  .table {
    width: 950px;
  }
}
@media screen and (max-width: 768px) {
  .search-feature {
    width: 100%;
    padding: 9px 12px;
  }
  .sort-container {
    gap: 30px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .sort-container {
    flex-flow: column;
  }
}
</style>
