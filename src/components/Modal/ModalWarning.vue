<template>
  <transition>
    <div class="Confirm-Modal" v-if="openModal">
      <span class="Confirm-Modal-backdrop" @click="close"></span>
      <div class="Confirm-Modal-container">
        <!-- <div class="Confirm-Modal-close" @click="close">
          <i
            class="bi form-control-feedback bi-x-lg"
            style="font-size: 22px"
          ></i>
        </div> -->
        <!-- <header class="Confirm-Modal-header">
          <p>{{ title }}</p>
        </header> -->
        <div class="Confirm-Modal-body">
          <div style="display: flex; justify-content: center">
            <i class="bx bx-error bx-lg" style="color: #ffd600"></i>
          </div>
          <p>You cannot remove this item since it's being used recently</p>
        </div>
        <div class="cancel-btns">
          <button type="button" @click="close" class="btn_cancel btn-warning">
            Close
          </button>
        </div>
        <!-- <slot></slot> -->
        <!-- <div class="remove-btns">
            <button type="button" class="btn btn_cancel" @click="closeModal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn_remove btn-success"
              v-if="confirmText"
              :disabled="!activeConfirmButton"
              @click="submitModal"
            >
              {{ confirmText }}
            </button> -->
        <!-- <button type="button" class="btn btn_remove btn-success" v-if="CommentRejectButton" @click="CommentSubmit(false)">
              {{ CommentRejectButton }}
            </button>
            <button type="button" class="btn btn_remove btn-success" v-if="CommentConfirmButton" @click="CommentSubmit(true)">
              {{ CommentConfirmButton }}
            </button> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RemoveModal",
  props: {
    openModal: Boolean,
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.Confirm-Modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.Confirm-Modal-backdrop {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.Confirm-Modal-container {
  position: relative;
  width: 470px;
  max-width: calc(100% - 32px);
  min-height: 200px;
  background-color: white;
  border-radius: 5px;
  animation: modalfadein ease 0.3s;

  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  z-index: 2;
}

/* .Confirm-Modal-header {
  position: absolute;
  width: 250px;
  height: 30px;
  left: calc(50% - 250px / 2);
  top: 20px;
  text-align: center;
} */

/* .Confirm-Modal-header p {
  font-size: 20px;
} */

/* .Confirm-Modal-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  font-size: 20px;
} */

.Confirm-Modal-body {
  padding: 16px;
  margin-top: 15px;
}
.Confirm-Modal-body p {
  margin-top: 15px;
}

.btn_cancel {
  /* background-color: #b767ff; */
  width: 25%;
  padding: 7px 0;
  border-radius: 7px;
  font-weight: 500;
  transform: translateX(170px);
}
.btn-mar-right {
  margin-right: 10px;
}
/* .btn {
  margin-left: 8px;
  margin-right: 8px;
} */
</style>
