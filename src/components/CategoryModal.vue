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
          <div class="modal-body">
            <div class="cate-name">
              <label for="categoryName">Name:</label>
              <input type="text" required maxlength="50" class="form-control" />
            </div>
            <div class="cate-code">
              <label for="categoryName">Category's code:</label>
              <input type="text" required class="form-control" />
            </div>
          </div>
          <div class="confirm-btn">
            <button
              type="button"
              class="btn cancel-btn"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn"
              style="background: #aa40e3; color: white"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryModal",
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
