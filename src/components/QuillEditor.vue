<template>
  <div class="text-editor">
    <QuillEditor
      toolbar="essential"
      :style="{ height: heightEditor + 'px' }"
    ></QuillEditor>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "VueQuillEditor",
  props: {
    heightEditor: String,
  },
  components: { QuillEditor },
};
</script>

<style scoped></style>
