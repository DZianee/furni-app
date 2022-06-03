<template>
  <div class="register-view">
    <div class="register-container">
      <div class="register-header">
        <h1>
          Make house becomes home with
          <span
            style="
              font-size: 80px;
              font-family: 'Dancing Script', cursive;
              font-weight: 600;
              color: #b767ff;
            "
            >TMCi</span
          >
        </h1>
        <p>Keep in touch with us by creating account now</p>
      </div>
      <div class="register-content">
        <div class="email">
          <label for="email">Email</label>
          <input
            type="email"
            required
            data-validate="Email is required"
            placeholder="Enter your email"
          />
        </div>
        <Password />
        <div class="register-default">
          <div
            class="btn btn-register"
            style="background: #b767ff; color: white"
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
    <div class="img-register">
      <img
        src="https://images.pexels.com/photos/7218480/pexels-photo-7218480.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img"
      />
    </div>
  </div>
</template>

<script>
import Password from "../components/PasswordInput.vue";
export default {
  name: "RegisterView",
  components: { Password },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300&family=Roboto:wght@300&family=Space+Grotesk&display=swap");

.register-view {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  border: solid;
  /* height: 900px; */
  font-family: "Roboto", sans-serif;
}
img {
  max-height: 100%;
  max-width: 100%;
}
.register-header h1 {
  font-weight: 600;
  /* color: #b767ff; */
}
.register-header p {
  color: rgb(109, 108, 108);
  font-size: 16px;
}
.register-container {
  padding: 30px;
  margin: auto;
}
.register-content {
  padding: 10px;
  width: 72%;
  margin: auto;
}
.email,
.password {
  margin-bottom: 20px;
}
label {
  font-size: 16px;
  font-weight: 500;
  color: rgb(56, 53, 53);
  padding: 7px;
}
input {
  width: 90%;
  margin: 0 11px;
  font-size: 16px;
  padding: 12px 0;
  padding-left: 15px;
  border-radius: 7px;
  background: rgb(234, 234, 234);
  border: 1px rgb(213, 211, 211);
}

.password /deep/ .form-control-feedback {
  right: 50px;
}
.error-message {
  font-size: 15px;
  padding: 5px 10px;
  color: red;
  font-weight: 500;
}
/* -- register btn --- */
.register-default,
.register-auto {
  display: flex;
  justify-content: center;
}
.btn {
  width: 90%;
  margin-top: 15px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 7px;
  padding: 12px 0;
  margin-right: 20px;
}
</style>
