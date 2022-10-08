<template>
  <div class="product-cate-table">
    <div class="title">
      <h4>List of items ({{ totalProducts }})</h4>
    </div>
    <div class="create-product-btn">
      <button
        type="button"
        data-bs-target="#createProductModal"
        data-bs-toggle="modal"
      >
        New Product +
      </button>
    </div>
    <div class="cus-features">
      <div
        class="features-icon"
        @click="displayFeaturesBox = !displayFeaturesBox"
      >
        <span style="fonr-weight: 500; font-size: 15px; padding: 10px">
          <i class="bx bx-sm bx-fw bx-menu-alt-left"></i>Features
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
              <option value="" disabled>Select type</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="importQuantity">Quantity</option>
              <option value="createdAt">Date create</option>
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
              <option value="IN STOCK">IN STOCK</option>
              <option value="OUT OF STOCK">OUT OF STOCK</option>
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
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th style="text-align: center">Price (VND per one)</th>
            <th style="text-align: center">Import quantity</th>
            <th style="text-align: center">Export quantity</th>
            <th style="text-align: center">Image</th>
            <th>Date create</th>
            <th>Is 3D</th>
            <th>On-shelves</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <div v-if="productList == ''" class="empty-content-message">
            <p>There is no content in this table yet</p>
          </div>
          <tr v-for="item in productList" :key="item.index" v-else>
            <td
              class="item-code"
              @click="Route('productManDetailsView', item._id)"
            >
              {{ item.code }}
            </td>
            <td class="item-name">{{ item.name }}</td>
            <td class="item-type">{{ item.type }}</td>
            <td class="item-price">{{ formatPrice(item.price) }}</td>
            <td class="item-quantity">{{ item.importQuantity }}</td>
            <td class="item-quantity">{{ item.exportQuantity }}</td>
            <td
              class="item-img"
              data-bs-target="#imgModal"
              data-bs-toggle="modal"
              @click="getImg(item.productImg)"
              style="text-align: center"
            >
              View
            </td>
            <td>{{ item.createdAt }}</td>
            <td style="font-weight: 500; color: red">
              <select
                style="border: none; margin-left: 5px"
                v-if="edit3DMode()"
                name="is3D"
                v-model="item.is3D"
                @change="get3DValue(item.is3D, item._id, item.color)"
              >
                <option
                  value="Unavailable"
                  :selected="item.is3D == 'Unavailable'"
                >
                  Unavailable
                </option>
                <option value="Available" :selected="item.is3D == 'Available'">
                  Available
                </option>
              </select>
              <span v-else>{{ item.is3D }}</span>
            </td>
            <td class="on-shelves-status">
              <!-- {{ item.statusOnShelves }} -->
              <select
                name="onShelves"
                v-model="item.statusOnShelves"
                @change="getValue(item.statusOnShelves, item._id, item.color)"
              >
                <option
                  value="Active"
                  :selected="item.statusOnShelves == 'Active'"
                >
                  Active
                </option>
                <option
                  value="Unactive"
                  :selected="item.statusOnShelves == 'Unactive'"
                >
                  Unactive
                </option>
              </select>
            </td>
            <td
              :style="[
                status == item.status
                  ? { color: 'green', fontWeight: '600' }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              {{ item.status }}
            </td>
            <td class="item_remove-bin">
              <i
                class="bx bx-trash"
                data-bs-target="#removeModal"
                data-bs-toggle="modal"
                @click="openRemoveModal(item._id)"
              ></i>
            </td>
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
    <component :is="'remove-modal'" @delete-confirm="deleteConfirm">
    </component>
    <component
      :is="'notifi-modal'"
      @close-modal="closeNotification"
      :openModal="displayNotifi"
    >
      This product item is being used in
      <span style="font-weight: 600">ORDER</span>. You are not allowed to remove
      it
    </component>
    <component :is="'img-modal'" :img="img"> </component>
    <ProductCateModal :cateId="cateId" :cateCode="cateCode" />
  </div>
</template>

<script>
import ProductCateModal from "./ProductCreateModal.vue";
export default {
  name: "ProductCateTable",
  components: { ProductCateModal },
  data() {
    return {
      displayNotifi: false,
      status: "IN STOCK",
      statusOnShelves: "Active",
      is3D: "Unavailable",
      currentPage: 1,
      totalPages: 0,
      displayPreBtn: false,
      removeId: "",
      displayFeaturesBox: false,
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      productList: [],
      totalProducts: 0,
      img: "",
      cateId: this.$route.params.id,
      features: {
        kindOf: 1,
        sortName: "",
        search: "",
        status: "IN STOCK",
      },
    };
  },
  props: {
    cateCode: String,
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/Product/${this.cateId}`,
        { params: { page: this.currentPage } },
        this.$axios.defaults.headers["Authorization"]
      );
      this.productList = res.data.data;
      this.productList.forEach((item) => this.convertDateTime(item));
      this.totalProducts = res.data.totalProducts;
      this.totalPages = res.data.pageTotals;
    } catch (error) {
      // console.log(error);
    }
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toString();
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // .slice(",", 2);
    },
    async getProduct() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/${this.cateId}`,
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
        this.productList = res.data.data;
        this.productList.forEach((item) => this.convertDateTime(item));
        this.totalProducts = res.data.totalProducts;
        this.totalPages = res.data.pageTotals;
      } catch (error) {
        // console.log(error);
      }
    },
    convertDateTime(value) {
      const result = new Date(value.createdAt);
      var year = result.getFullYear();
      var month = ("0" + (result.getMonth() + 1)).slice(-2);
      var day = ("0" + result.getDate()).slice(-2);
      value.createdAt = day + "-" + month + "-" + year;
    },
    getImg(value) {
      this.img = value;
    },
    async getValue(status, id, color) {
      let update = {
        statusOnShelves: status,
        color: color,
      };
      try {
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/updateProduct/${id}`,
          update,
          this.$axios.defaults.headers["Authorization"]
        );
      } catch (error) {
        // console.log(error);
      }
    },
    async get3DValue(status, id, color) {
      let update = {
        is3D: status,
        color: color,
      };
      try {
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/Product/updateProduct/${id}`,
          update,
          this.$axios.defaults.headers["Authorization"]
        );
        this.$router.go();
      } catch (error) {
        // console.log(error);
      }
    },
    edit3DMode() {
      const role = JSON.parse(this.$store.state.user).role.name;
      if (role === "Admin") {
        this.edit3D = true;
      }
    },
    openRemoveModal(value) {
      this.removeId = value;
    },
    closeNotification() {
      this.displayNotifi = false;
    },
    async deleteConfirm() {
      try {
        this.$store.dispatch("accessToken");

        const res = await this.$axios.get(
          `api/Order/checkProductInOrder/${this.removeId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.data.data == true) {
          this.displayNotifi = true;
        } else {
          const resRemove = await this.$axios.delete(
            `api/Product/${this.removeId}`,
            this.$axios.defaults.headers["Authorization"]
          );
          if (resRemove.status == 200) {
            this.getProduct();
          }
        }
      } catch (error) {
        // console.log(error);
      }
    },
    Route(value, id) {
      this.$router.push({ name: value, params: { id: id } });
    },
    submitFeatures() {
      this.currentPage = 1;
      this.getProduct();
    },
    resetFeatures() {
      this.features = {};
    },
    pageChange(current) {
      this.currentPage = current;
      this.getProduct();
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product-cate-table {
  margin-top: 30px;
}
.create-product-btn {
  align-items: center;
  display: flex;
  padding-right: 3%;
  justify-content: flex-end;
}
.create-product-btn button {
  background: #aa40e3;
  color: white;
  font-weight: 500;
  font-size: 15px;
  padding: 5px;
  width: 150px;
  border: none;
  border-radius: 5px;
}
.features-bar {
  padding: 5px 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
/* - - - Search - - - */
.search-bar {
  border-radius: 5px;
  width: 30%;
  margin-left: 20px;
}
.search-bar input {
  font-size: 15px;
  background: #f9f5f4;
}
/* - - - Filter-Sort - - - */

.filter-sort {
  margin-right: 20px;
  display: flex;
  gap: 10px;
  width: 40%;
}
.filter-sort select {
  font-weight: 500;
  background: #f9f5f4;
  font-size: 15px;
  border-radius: 5px;
  border: solid 1px rgb(199, 195, 195);
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
  column-gap: 7px;
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
  column-gap: 7px;
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
/* - - - Table - - - */

.empty-content-message {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  transform: translateX(400px);
  color: rgb(125, 122, 122);
  font-style: italic;
}
.table-responsive {
  margin: 20px;
  padding: 10px;
}
.table {
  width: 1450px;
}
thead th {
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  background: #e0c2ff;
}
tbody td {
  padding: 20px 0;
  font-size: 15px;
  color: rgb(108, 106, 106);
}
.item-code {
  font-weight: 600;
  color: #a65de7;
}
.item-code:hover {
  text-decoration: underline;
  cursor: pointer;
}
.item-name {
  font-weight: 500;
}
.item-price,
.item-quantity,
.item_remove-bin {
  text-align: center;
}
.item-img {
  color: rgb(107, 107, 255);
  cursor: pointer;
  font-weight: 500;
}
.on-shelves-status select {
  border: none;
  padding: 0 5px;
  text-align: center;
}
.item_remove-bin i {
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

/* -- Responsive --- */
@media screen and (max-width: 993px) {
  .features {
    padding: 30px 0;
  }
  .sort-container select,
  .filter-features select {
    width: 35%;
    padding: 9px 12px;
    font-size: 14px;
    border-radius: 7px;
    border: solid 1px lightgrey;
  }
  .search-feature {
    width: 100%;
  }
  .btn-submit-features,
  .btn-reset-features {
    width: 20%;
  }
}
@media screen and (max-width: 768px) {
  .features {
    padding: 30px 20px;
  }
  .sort-container select,
  .filter-features select {
    width: 100%;
  }
  .sort-container {
    gap: 40px;
  }
  .btn-submit-features,
  .btn-reset-features {
    width: 25%;
  }
  h4 {
    padding-left: 2%;
  }
}
</style>
