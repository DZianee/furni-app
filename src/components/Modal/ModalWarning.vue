<template>
  <transition>
    <div class="warning_modal">
      <div
        class="modal fade"
        id="warningModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- <div class="modal-header">
              <h5 class="modal-title">Remove Confirmation</h5>
            </div> -->
            <div class="modal-body">
              <div style="display: flex; justify-content: center">
                <i class="bx bx-error bx-md" style="color: #ffeb3b"></i>
              </div>
              <p>You cannot remove this item since it's being used recently</p>
            </div>
            <div class="cancel-btns">
              <button type="button" data-bs-dismiss="modal" class="btn_cancel">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RemoveModal",
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
.modal-title {
  margin-left: 135px;
  font-weight: 700;
}
.modal-body p {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.cancel-btns {
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
    left: 50%;
    transform: translateX(-50%) !important;
  }
  .modal-title {
    margin-left: 120px;
  }
  input {
    width: 100%;
  }
}
@media screen and (max-width: 480px) {
  .modal-dialog {
    padding: 0;
  }
  .modal-content {
    margin: 0;
    /* height: 220px; */
  }
}
</style>
