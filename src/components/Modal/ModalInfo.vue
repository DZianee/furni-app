<template>
  <transition>
    <div
      class="modal fade"
      id="infoModal"
      tabindex="-1"
      aria-labelledby="modalLabel"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" :style="{ justifyContent: headerPosition }">
            <h5 class="modal-title">
              {{ title }}
            </h5>
          </div>
          <form @submit.prevent="submit">
            <div class="modal-body"><slot></slot></div>
            <div class="confirm-btn">
              <button
                type="button"
                class="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn"
                :style="{
                  backgroundColor: btnProperty.backColor,
                  color: btnProperty.color,
                }"
              >
                {{ confirmText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalCustom",
  props: {
    headerPosition: String,
    title: String,
    btnProperty: Object,
    confirmText: String,
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.modal-header {
  /* justify-content: center; */
  letter-spacing: 0.3px;
}
.confirm-btn {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
}
.confirm-btn button {
  width: 40%;
  font-weight: 500;
  letter-spacing: 0.2px;
  border-radius: 7px;
}
.cancel-btn {
  background: rgb(167, 160, 160);
  color: white;
}
.modal-content {
  border: 1px solid white;
}

/* --- Responsive --- */
.confirm-btn button {
  width: 46%;
}
</style>
