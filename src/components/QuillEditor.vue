<template>
  <div class="text-editor">
    <QuillEditor
      toolbar="essential"
      :style="{ height: heightEditor + 'px' }"
      v-model:content="contentEditor"
      @update:content="handleInput(editorCase)"
      contentType="html"
    >
      ></QuillEditor
    >
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "VueQuillEditor",
  data() {
    return {
      contentEditor: this.contentEdit,
    };
  },
  props: {
    heightEditor: String,
    contentEdit: String,
    editorCase: Number,
  },
  components: { QuillEditor },
  methods: {
    handleInput(value) {
      this.$emit("handleInput", this.contentEditor, value);
    },
  },
};
</script>

<style scoped></style>
