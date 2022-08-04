<template>
  <transition>
    <div class="Confirm-Modal" v-if="openModal">
      <span class="Confirm-Modal-backdrop" @click="close"></span>
      <div class="Confirm-Modal-container">
        <div class="Confirm-Modal-body">
          <div style="display: flex; justify-content: center">
            <!-- <i class="bx bx-error bx-lg" style="color: #ffd600"></i> -->
            <img src="./Monsters-Error404.png" alt="hgfh" />
          </div>
          <p>Oops! Please Sign In to experience this</p>
        </div>
        <div class="cancel-btns">
          <button type="button" @click="close" class="btn_cancel btn-warning">
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NotifiModal",
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
  border-radius: 7px;
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

.Confirm-Modal-body {
  padding: 16px;
  margin-top: 15px;
}
.Confirm-Modal-body p {
  margin-top: 15px;
  text-align: center;
}

img {
  height: 100px;
}

.btn_cancel {
  /* background-color: #b767ff; */
  width: 25%;
  padding: 7px 0;
  border-radius: 7px;
  font-weight: 500;
  transform: translateX(170px);
  margin-bottom: 20px;
}
.btn-mar-right {
  margin-right: 10px;
}
/* .btn {
  margin-left: 8px;
  margin-right: 8px;
} */
</style>
