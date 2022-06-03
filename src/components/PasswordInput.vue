<template>
  <div class="password" data-validate="Password input is required">
    <label for="password">Password</label>
    <input
      name="password"
      :type="isShow ? 'text' : 'password'"
      required
      placeholder="Enter your password"
    />
    <i
      class="form-control-feedback"
      :class="[{ 'bx bx-show': !isShow }, { 'bx bx-low-vision': isShow }]"
      style="font-size: 22px"
      @click="toggle"
    ></i>
    <!-- <span v-if="!isValid" class="txt2 m-t-15 m-l-15">
      Must at least 8 characters
    </span> -->
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  data() {
    return {
      isShow: false,
    };
  },
  //   components: {},
  //   computed: {},
  //   emits: ["update:value"],
  methods: {
    handleInput(event) {
      this.$emit("update:value", event.target.value);
    },
    toggle() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.password {
  position: relative;
}
input {
  width: 90%;
  margin: 0 11px;
  font-size: 15px;
  padding: 12px 0;
  padding-left: 15px;
  border-radius: 7px;
  background: rgb(234, 234, 234);
  border: 1px rgb(213, 211, 211);
}
label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(56, 53, 53);
  padding: 7px;
}
.form-control-feedback {
  position: absolute;
  top: 50px;
  right: 30px;
  z-index: 2;
  display: block;
  text-align: center;
  cursor: pointer;
}
</style>
