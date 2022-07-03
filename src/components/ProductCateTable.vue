<template>
  <div class="product-cate-table">
    <div class="title">
      <h4>List of items</h4>
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
    <div class="features-bar">
      <div class="search-bar">
        <input
          type="search"
          class="form-control"
          placeholder="Search here..."
        />
      </div>
      <div class="filter-sort">
        <select class="filter-type form-control">
          <option value="chair">Chair</option>
          <option value="armchair">Armchair</option>
        </select>
        <select class="sort-name form-control">
          <option value="name">Name</option>
        </select>
        <select class="asc-desc form-control">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th style="text-align: center">Price (per one)</th>
            <th style="text-align: center">Import quantity</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <div v-if="cateDetails.productList == 0">
            <p class="empty-content-message">
              There is no content in this table yet
            </p>
          </div>
          <div v-else>
            <tr v-for="item in cateDetails.productList" :key="item.index">
              <td class="item-code" @click="Route('productManDetailsView')">
                {{ item.code }}
              </td>
              <td class="item-name">{{ item.name }}</td>
              <td class="item-type">{{ item.type }}</td>
              <td class="item-price">{{ item.price }} VND</td>
              <td class="item-quantity">20</td>
              <td
                class="item-img"
                data-bs-target="#imgModal"
                data-bs-toggle="modal"
              >
                View image
              </td>
              <td class="item_remove-bin">
                <i
                  class="bx bx-trash"
                  data-bs-target="#modal"
                  data-bs-toggle="modal"
                  @click="openRemoveModal"
                ></i>
              </td>
            </tr>
          </div>
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
    <div
      class="modal fade img-modal"
      id="imgModal"
      tabindex="-1"
      aria-labelledby="imgModal"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <img
            src="https://images.pexels.com/photos/4857784/pexels-photo-4857784.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
            alt="iitem-img"
          />
        </div>
      </div>
    </div>
    <ProductCateModal :cateId="cateId" />
  </div>
</template>

<script>
import ProductCateModal from "./ProductCreateModal.vue";
export default {
  name: "ProductCateTable",
  components: { ProductCateModal },
  data() {
    return {
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      cateId: this.$route.params.id,
    };
  },
  props: {
    cateDetails: Object,
  },
  methods: {
    openRemoveModal() {
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
    },
    Route(value) {
      this.$router.push({ name: value });
    },
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
  width: 15%;
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

/* - - - Table - - - */
.table-responsive {
  margin: 20px;
  padding: 10px;
  height: 400px;
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
  color: black;
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
.item-img:hover {
  text-decoration: underline;
  color: rgb(107, 107, 255);
  cursor: pointer;
  font-weight: 500;
}
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
