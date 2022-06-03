<template>
  <div class="login-form">
    <div
      class="modal fade"
      id="loginForm"
      tabindex="-1"
      aria-labelledby="loginFormLabel"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="img-illustrate">
              <img
                src="https://images.pexels.com/photos/7585250/pexels-photo-7585250.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
                alt="img"
              />
            </div>
            <div class="login-container">
              <div class="login-header">
                <h3>Hi, our precious friends</h3>
                <p>Enjoy the shopping time with one login</p>
              </div>
              <div class="login-content">
                <div class="login-input">
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
                  <div class="forgot-pass">Forgot password</div>
                  <!-- <div class="error-message">Wrong password or username</div> -->
                  <div class="login-default">
                    <div
                      class="btn btn-login"
                      style="background: #b767ff; color: white"
                    >
                      Sign in
                    </div>
                  </div>
                </div>
                <p style="text-align: center">or</p>
                <div class="login-auto">
                  <div
                    class="btn btn-login-auto"
                    style="background: white; border: 1px grey solid"
                  >
                    Continue with Google
                  </div>
                </div>
              </div>
              <div class="new-account">
                Haven't got an account?
                <span
                  style="
                    color: #b767ff;
                    font-weight: 600;
                    font-family: 'Dancing Script', cursive;
                    font-size: 28px;
                    cursor: pointer;
                  "
                  @click="Route('registerView')"
                  data-bs-dismiss="modal"
                  >Sign up</span
                >
                with us now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "../components/PasswordInput.vue";

export default {
  name: "LoginForm",
  components: {
    Password,
  },
  methods: {
    Route(val) {
      this.$router.push({ name: val });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300&family=Roboto:wght@300&family=Space+Grotesk&display=swap");
.login-form {
  font-family: "Roboto", sans-serif;
}
.modal-content {
  border-radius: 10px;
}
img {
  width: 100%;
}
.modal-body {
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr;
}

.login-header h3 {
  font-weight: 600;
  color: #b767ff;
}
.login-header p {
  color: rgb(109, 108, 108);
  font-size: 14px;
}
.login-container {
  padding: 30px;
  margin: auto;
}
.login-content {
  padding: 10px;
}
.email,
.password {
  margin-bottom: 20px;
}
label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(56, 53, 53);
  padding: 7px;
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
.forgot-pass {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 500;
  /* padding: 10px; */
  cursor: pointer;
  visibility: hidden;
}
.error-message {
  font-size: 15px;
  padding: 5px 10px;
  color: red;
  font-weight: 500;
}
/* -- login btn --- */
.login-default,
.login-auto {
  display: flex;
  justify-content: center;
}
.btn {
  width: 90%;
  margin-bottom: 7px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 7px;
  padding: 12px 0;
}
</style>
