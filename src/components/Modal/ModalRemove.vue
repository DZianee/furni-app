<template>
  <transition>
    <div class="remove_modal">
      <div class="modal fade" id="removeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <form>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Remove Confirmation</h5>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to remove this item ?</p>
              </div>
              <div class="remove-btns">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  class="btn_cancel"
                >
                  Cancel
                </button>
                <button
                  class="btn_remove btn-danger"
                  type="submit"
                  @click.prevent="deleteConfirm"
                  data-bs-dismiss="modal"
                >
                  Remove
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RemoveModal",
  methods: {
    deleteConfirm() {
      this.$emit("delete-confirm");
    },
  },
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
}
.modal-content {
  /* height: 170px; */
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: center;
  letter-spacing: 0.3px;
}
/* .modal-title {
  margin-left: 135px;
  font-weight: 700;
} */
.modal-body p {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.remove-btns {
  /* position: absolute; */
  bottom: 10px;
  width: 100%;
  text-align: center;
}
.remove-btns button {
  margin: 7px;
}
button {
  border-radius: 7px;
  height: 35px;
  width: 102px;
  font-size: 16px;
  font-weight: 500;
}
.btn_cancel:hover {
  background-color: rgb(218, 218, 218);
}
@media screen and (max-width: 580px) {
  .modal-dialog {
    padding: 0 70px 0 30px;
    border-radius: 7px;
    /* left: 50%; */
    display: flex;
    justify-content: center;
    /* transform: translateX(-50%) !important; */
  }
  /* .modal-title {
    margin-left: 120px;
  } */
  input {
    width: 100%;
  }
}
@media screen and (max-width: 480px) {
  .modal-dialog {
    /* left: 40%; */
    padding: 16px;
  }
  .modal-content {
    margin: 0;
    /* height: 220px; */
  }
}
</style>
