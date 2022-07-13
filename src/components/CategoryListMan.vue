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
    <div class="empty-container" v-if="categoryList == ''">
      <p>There is no category exist at moment</p>
    </div>
    <div class="category-container" v-else>
      <div
        class="card category-item"
        v-for="cate in categoryList"
        :key="cate.index"
      >
        <div class="category-content">
          <h6 class="cate-name" @click="Route('productCategoryView', cate._id)">
            {{ cate.name }}
          </h6>
          <div class="cate-info">
            <div class="cate-code">
              <p style="font-weight: 500">Code:</p>
              <p>{{ cate.code }}</p>
            </div>
            <!-- <div class="cate-quantity">
              <p style="font-weight: 500">Quantity:</p>
              <p v-for="i in inStock" :key="i.index">
                {{ i.inStock }}
              </p>
            </div> -->
          </div>
        </div>
        <div class="adjust-btn">
          <div
            class="btn edit-info"
            @click="openEditModal(cate._id)"
            data-bs-target="#infoModal"
            data-bs-toggle="modal"
          >
            Modify
          </div>
          <div
            class="btn remove-info"
            @click="openRemoveModal(cate._id)"
            data-bs-target="#removeModal"
            data-bs-toggle="modal"
          >
            Remove
          </div>
        </div>
      </div>

      <component
        :is="'info-modal'"
        :title="modalTitle"
        :confirmText="confirmText"
        :btnProperty="btnProperty"
        :headerPosition="headerPosition"
        @submit="submitModal"
      >
        <div class="modal-content">
          <div class="modal-cate-name">
            <label for="categoryName">Name:</label>
            <input
              type="text"
              required
              name="cateName"
              maxlength="50"
              minlength="5"
              class="form-control"
              v-model="cateDetails.name"
            />
          </div>
          <div class="modal-cate-code">
            <label for="categoryName">Category's code:</label>
            <input
              type="text"
              name="code"
              minlength="2"
              maxlength="5"
              required
              class="form-control"
              v-model="cateDetails.code"
            />
          </div>
        </div>
      </component>
      <component
        :is="'remove-modal'"
        @delete-confirm="deleteConfirm"
      ></component>
      <component
        :is="'warning-modal'"
        @close-modal="closeWarning"
        :openModal="displayWarning"
      ></component>
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
      categoryList: [],
      cateDetails: {},
      removeId: "",
      removeCheck: 0,
      displayWarning: false,
      checkedValue: false,
    };
  },
  methods: {
    async getCate() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Category/`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.categoryList = res.data.data.content;
        console.log(this.categoryList);
      } catch (error) {
        console.log(error);
      }
    },
    Route(value, id) {
      this.$router.push({ name: value, params: { id: id } });
    },
    async deleteConfirm() {
      try {
        if (this.checkedValue == true) {
          this.displayWarning = true;
        } else {
          this.$store.dispatch("accessToken");
          const res = await this.$axios.delete(
            `api/Category/${this.removeId}`,
            this.$axios.defaults.headers["Authorization"]
          );
          if (res.status == 200) {
            this.getCate();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkProduct(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Category/checkProduct/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
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
    async submitModal() {
      try {
        const updateCate = {
          name: this.cateDetails.name,
          code: this.cateDetails.code,
        };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Category/updateCate/${this.cateDetails._id}`,
          updateCate,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$$router.go();
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async openEditModal(value) {
      this.modalTitle = "Category Information";
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.headerPosition = "flex-start";

      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Category/cateDetails/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.cateDetails = res.data.data.content;
        console.log(this.cateDetails);
      } catch (error) {
        console.log(error);
      }
    },
    openRemoveModal(value) {
      this.removeId = value;
      this.checkProduct(value);
      console.log(this.removeId);
    },
  },
  mounted() {
    this.getCate();
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

/* --- empty container ---*/
.empty-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.empty-container p {
  color: rgb(125, 122, 122);
  font-style: italic;
}

.category-container {
  display: grid;
  column-gap: 10px;
  row-gap: 100px;
  grid-template-columns: 1fr 1fr;
  /* flex-wrap: wrap; */
  /* justify-content: space-around; */
  padding: 50px;
}
.card {
  width: 70%;
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  /* border: none; */
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
  margin-top: 7px;
}
.modal-content {
  border: solid 1px white;
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

.modal-cate-name {
  margin-bottom: 20px;
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
