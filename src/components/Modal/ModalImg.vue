<template>
  <transition>
    <div class="img_modal">
      <div class="modal fade" id="imgModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <form>
            <div class="modal-content">
              <img :src="`http://localhost:2371/${img}`" />
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
  methods: {},
};
</script>

<style scoped>
.modal {
  margin-top: 100px;
  border-radius: 7px;
  height: 600px;
}
.modal-content {
  position: relative;
}
img {
  width: 100%;
}
</style>
