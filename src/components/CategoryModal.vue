<template>
  <div class="category-modal">
    <div
      class="modal fade"
      id="createCateModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Category</h5>
          </div>
          <form @submit.prevent="createCate">
            <div class="modal-body">
              <div class="cate-name">
                <label for="categoryName">Name:</label>
                <input
                  type="text"
                  name="cateName"
                  required
                  maxlength="50"
                  minlength="5"
                  class="form-control"
                  v-model="newCate.name"
                />
              </div>
              <div class="cate-code">
                <label for="categoryName">Category's code:</label>
                <input
                  type="text"
                  name="code"
                  required
                  maxlength="5"
                  minlength="2"
                  class="form-control"
                  v-model="newCate.code"
                />
              </div>
            </div>
            <div class="confirm-btn">
              <button type="button" class="btn cancel-btn" @click="resetForm">
                Reset
              </button>
              <button
                type="submit"
                class="btn"
                style="background: #aa40e3; color: white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryModal",
  data() {
    return {
      newCate: {
        name: "",
        code: "",
      },
    };
  },
  methods: {
    async createCate() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.post(
          `api/Category/newCate`,
          this.newCate,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
      this.newCate = {};
    },
  },
};
</script>

<style scoped>
.modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}
.modal-body div {
  margin-top: 12px;
}
label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
input {
  width: 95%;
  margin-left: 15px;
}
.confirm-btn {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
}
.confirm-btn button {
  width: 90%;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.cancel-btn {
  background: rgb(167, 160, 160);
  color: white;
}
</style>
