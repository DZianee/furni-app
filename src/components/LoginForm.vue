<template>
  <div class="login-form">
    <div
      class="modal fade"
      id="loginForm"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
              <!-- <img
                src="  https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
                alt="img"
              /> -->
            </div>
            <div class="login-container">
              <i
                class="bx bx-x bx-md close-icon"
                data-bs-dismiss="modal"
                @click="close"
              ></i>

              <div class="success-message card" v-if="succeed">
                <p>
                  Login verified
                  <i
                    class="bx bx-check bx-fw bx-md"
                    style="color: #00ff00; margin-left: 7px"
                  ></i>
                </p>
              </div>
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
                      name="email"
                      v-model="email"
                      required
                      data-validate="Email is required"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Password v-model:value="password" />
                  <div class="forgot-pass">Forgot password</div>
                  <div class="error-message" v-if="errorMessage">
                    Wrong password or username. Please try again.
                  </div>
                  <div class="login-default">
                    <div
                      class="btn btn-login"
                      style="background: #b767ff; color: white"
                      @click="login"
                    >
                      <i
                        class="bx bx-loader bx-sm bx-fw bx-spin"
                        v-if="loadingIcon"
                      ></i>
                      {{ loadingIcon ? "Signing In..." : "Sign In" }}
                    </div>
                  </div>
                </div>
                <!-- <p style="text-align: center">or</p> -->
                <!-- <div class="login-auto">
                  <div
                    class="btn btn-login-auto"
                    style="background: white; border: 1px grey solid"
                  >
                    Continue with Google
                  </div>
                </div> -->
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
// import $ from "jquery";
import Password from "../components/PasswordInput.vue";
export default {
  name: "LoginForm",
  components: {
    Password,
  },
  data() {
    return {
      email: "",
      password: "",
      loadingIcon: false,
      errorMessage: false,
      succeed: false,
    };
  },
  methods: {
    Route(val) {
      this.$router.push({ name: val });
    },
    close() {
      this.succeed = false;
    },
    async login() {
      try {
        const userLogin = {
          email: this.email,
          password: this.password,
        };
        const res = await this.$axios.post(`api/User/login`, userLogin);
        this.loadingIcon = true;
        if (res.status == 200) {
          this.$store.dispatch("verifiedUser", true);
          this.loadingIcon = false;
          this.succeed = true;
          this.$emit("login-verified", true);
          let user = {
            id: res.data.data.id,
            avatar: res.data.data.avatar,
            email: res.data.data.email,
            token: res.data.data.token,
            refreshToken: res.data.data.refreshToken,
            role: res.data.data.role,
          };
          this.$store.dispatch("login", user);
          this.errorMessage = false;
        }
      } catch (error) {
        this.loadingIcon = false;
        this.errorMessage = true;
        console.log(error);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300&family=Roboto:wght@300&family=Space+Grotesk&display=swap");
.login-form {
  font-family: "Roboto", sans-serif;
}
.modal-content {
  border-radius: 12px;
}
img {
  width: 100%;
}
.modal-body {
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 7px;
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
  font-size: 14px;
  margin-top: -22px;
  padding: 0px 10px;
  padding-bottom: 15px;
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
  font-size: 18px;
  border-radius: 7px;
  padding: 12px 0;
}
.new-account {
  font-size: 15px;
}

/* --- success message --- */
.success-message {
  border: none;
}
.success-message p {
  line-height: 40px;
  font-weight: 500;
}
.success-message p i {
  border: solid;
  border-radius: 50px;
  width: fit-content;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .modal-body {
    grid-template-columns: 100%;
    background: url("https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2");
  }
  .img-illustrate img {
    display: none;
  }
  .login-container {
    border-radius: 12px;
    background: white;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .modal-body {
    background: none;
  }
}
</style>
