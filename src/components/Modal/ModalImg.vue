<template>
  <transition>
    <div class="img_modal">
      <div class="modal fade" id="imgModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <form>
            <div class="modal-content">
              <!-- <div class="modal-header">
                <h5 class="modal-title">Remove Confirmation</h5>
              </div> -->
              <!-- <div class="modal-body"> -->
              <img :src="`http://localhost:2371/${img}`" />
              <!-- <p>Are you sure you want to remove this item ?</p> -->
              <!-- </div> -->
              <!-- <div class="remove-btns">
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
              </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ImgModal",
  props: {
    img: String,
  },
  //   methods: {
  //     deleteConfirm() {
  //       this.$emit("delete-confirm");
  //     },
  //   },
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
}
.modal-content {
  position: relative;
}
img {
  width: 100%;
}
/* .modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}
.modal-body p {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.remove-btns {
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
  }
} */
</style>
