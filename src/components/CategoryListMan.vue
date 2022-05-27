<template>
  <div class="category-manage-list">
    <div class="create-category-btn">
      <button
        type="button"
        data-bs-target="#createCateModal"
        data-bs-toggle="modal"
      >
        New Category +
      </button>
    </div>
    <CategoryModal />
    <div class="category-container">
      <div class="card category-item">
        <div class="category-content">
          <h6 class="cate-name" @click="Route('productCategoryView')">
            Chairs/Armchairs
          </h6>
          <div class="cate-info">
            <div class="cate-code">
              <p style="font-weight: 500">Code:</p>
              <p>CAS</p>
            </div>
            <div class="cate-quantity">
              <p style="font-weight: 500">Quantity:</p>
              <p>194</p>
            </div>
          </div>
        </div>
        <div class="adjust-btn">
          <div class="btn edit-info">Modify</div>
          <div class="btn remove-info">Remove</div>
        </div>
      </div>
      <div class="card category-item">
        <div class="category-content">
          <h6 class="cate-name">Chairs/Armchairs</h6>
          <div class="cate-info">
            <div class="cate-code">
              <p style="font-weight: 500">Code:</p>
              <p>CAS</p>
            </div>
            <div class="cate-quantity">
              <p style="font-weight: 500">Quantity:</p>
              <p>194</p>
            </div>
          </div>
        </div>
        <div class="adjust-btn">
          <div
            class="btn edit-info"
            data-bs-target="#modal"
            data-bs-toggle="modal"
            @click="openEditModal('edit')"
          >
            Modify
          </div>
          <div
            class="btn remove-info"
            data-bs-target="#modal"
            data-bs-toggle="modal"
            @click="openRemoveModal('remove')"
          >
            Remove
          </div>
        </div>
      </div>
      <component
        :is="'confirm-modal'"
        :title="modalTitle"
        :confirmText="confirmText"
        :btnProperty="btnProperty"
        @submit="submitModal"
      >
        <div class="modal-content">
          <div v-if="modalContentOpt == 'edit'">
            <div class="modal-cate-name">
              <label for="categoryName">Name:</label>
              <input type="text" required maxlength="50" class="form-control" />
            </div>
            <div class="modal-cate-code">
              <label for="categoryName">Category's code:</label>
              <input type="text" required class="form-control" />
            </div>
          </div>
          <div v-if="modalContentOpt == 'remove'">
            <p>Are you sure you want to remove this item ?</p>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script>
import CategoryModal from "./CategoryModal.vue";
export default {
  name: "CategoryListMan",
  components: { CategoryModal },
  data() {
    return {
      modalContentOpt: "",
      modalTitle: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
    };
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
    close() {
      this.isOpenModal = false;
    },
    openEditModal(value) {
      this.modalContentOpt = value;
      this.modalTitle = "Category Information";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
    },
    openRemoveModal(value) {
      this.modalContentOpt = value;
      this.modalTitle = "Remove Confirmation";
      this.confirmText = "Remove";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#fd5d5d";
    },
  },
};
</script>

<style scoped>
.create-category-btn {
  align-items: center;
  display: flex;
  padding-right: 8%;
  justify-content: flex-end;
}
.create-category-btn button {
  background: #aa40e3;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px;
  width: 15%;
  border: none;
}
.category-container {
  display: flex;
  column-gap: 120px;
  row-gap: 100px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 50px;
}
.card {
  width: 35%;
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border: none;
  border-radius: 30px;
}
.cate-name {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  background: #fff9f9;
}
.cate-name:hover {
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}
.cate-code,
.cate-quantity {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  padding: 4px 10px;
}
.adjust-btn {
  display: grid;
}
.adjust-btn .btn {
  font-size: 15px;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
}
.edit-info {
  background: #e8f8df;
}
.remove-info {
  background: #ffbbbb;
}

/* - - - Modal component - - - - */
.modal-content div {
  margin-top: 12px;
}
.modal-content label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
.modal-content input {
  width: 95%;
  margin-left: 15px;
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
