<template>
  <div class="forgot-pass-form">
    <div
      class="modal fade"
      id="forgotPassForm"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="forgotPassFormLabel"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <!-- <div class="img-illustrate">
              <img
                src="https://images.pexels.com/photos/7585250/pexels-photo-7585250.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
                alt="img"
              />
            </div> -->
            <div class="forgot-container">
              <i
                class="bx bx-x bx-md close-icon"
                data-bs-dismiss="modal"
                @click="close"
              ></i>
            </div>
            <div class="forgot-header">
              <h3>Forgot Password</h3>
              <p>One touch to complete</p>
            </div>
            <div class="forgot-content" v-if="displayFirstStep">
              <div class="forgot-input">
                <div class="email">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    v-model="firstRecord.email"
                    required
                    data-validate="Email is required"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="phone">
                  <label for="phone">Phone (Mobile)</label>
                  <input
                    type="tel"
                    name="phone"
                    v-model="firstRecord.phone"
                    required
                    data-validate="Phone number is required"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div class="error-message" v-if="errorMessage">
                  Wrong email or phone. Please try again.
                </div>
              </div>
              <div class="submit-default">
                <div
                  class="btn btn-login"
                  style="background: #b767ff; color: white"
                  @click="checkInfo"
                >
                  <i class="bx bx-chevron-right bx-sm bx-fw"></i>
                  <!-- <i
                    class="bx bx-loader bx-sm bx-fw bx-spin"
                    v-if="loadingIcon"
                  ></i> -->
                  <!-- {{ loadingIcon ? "Processing In..." : "Processing In" }} -->
                </div>
              </div>
            </div>
            <div class="forgot-content" v-if="displaySecondStep">
              <div class="forgot-input">
                <div class="password">
                  <label for="password">New password</label>
                  <input
                    type="password"
                    name="password"
                    v-model="secondRecord.pass"
                    required
                    data-validate="Password is required"
                    placeholder="Enter your new password"
                  />
                </div>
                <div class="error-message" v-if="errorFormat">
                  Password must be at least 7 characters
                </div>
                <div class="submit-default">
                  <div
                    class="btn btn-login"
                    style="background: #b767ff; color: white"
                    @click="updatePass"
                  >
                    <i class="bx bx-chevron-right bx-sm bx-fw"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="forgot-content" v-if="displayLastStep">
              <div class="icon-success">
                <i class="bx bx-check-circle bx-lg"></i>
              </div>
              <h6>New password has been successfully updated</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPass",
  data() {
    return {
      displayFirstStep: true,
      displaySecondStep: false,
      displayLastStep: false,
      errorMessage: false,
      errorFormat: false,
      firstRecord: {
        email: "",
        phone: "",
      },
      secondRecord: {
        pass: "",
      },
    };
  },
  methods: {
    async checkInfo() {
      try {
        const res = await this.$axios.post(
          `api/User/checkInfo`,
          this.firstRecord
        );
        if (res.status == 200) {
          this.displayFirstStep = false;
          this.displaySecondStep = true;
          this.errorMessage = false;
        }
        console.log(res);
      } catch (error) {
        this.errorMessage = true;
        console.log(error);
      }
    },
    async updatePass() {
      try {
        const data = {
          email: this.firstRecord.email,
          newPass: this.secondRecord.pass,
        };
        const res = await this.$axios.post(`api/User/updateForgotPass`, data);
        if (res.status == 200) {
          this.displaySecondStep = false;
          this.displayLastStep = true;
          this.errorFormat = false;
        }
        console.log(res);
      } catch (error) {
        this.errorFormat = true;
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300&family=Roboto:wght@300&family=Space+Grotesk&display=swap");
.forgot-pass-form {
  font-family: "Roboto", sans-serif;
}
.modal-content {
  border-radius: 12px;
}
img {
  width: 100%;
}
.modal-body {
  /* display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr; */
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 7px;
}
.forgot-header {
  padding: 1% 5%;
}
.forgot-header h3 {
  font-weight: 600;
}
.forgot-header p {
  color: rgb(109, 108, 108);
  font-size: 14px;
}
.forgot-container {
  padding: 30px;
  margin: auto;
}
.forgot-content {
  padding: 0 22px;
}
.email,
.phone,
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
input[type="email"],
input[type="password"] {
  text-transform: lowercase;
}
.error-message {
  font-size: 14px;
  margin-top: -22px;
  padding: 5px 10px;
  padding-bottom: 15px;
  color: red;
  font-weight: 500;
}
/* -- forgot btn --- */
.submit-default,
.forgot-auto {
  padding-top: 5%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  width: 72px;
  margin-bottom: 7px;
  font-weight: 500;
  font-size: 18px;
  border-radius: 20px;
  padding: 4px 0;
}

/* last step */
.icon-success {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.icon-success i {
  color: #76ff03;
}
h6 {
  text-align: center;
  font-weight: 500;
  margin-bottom: 45px;
  line-height: 30px;
}
</style>
