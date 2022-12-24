<template>
  <div class="profile-info">
    <p class="profile-message">
      This is your personal information. Feel free and ensure all details are
      accurrately correct for other great experienece in our shop
    </p>
    <div class="profile-info-content">
      <div class="card personal-info">
        <p class="error-message" v-if="displayEditInput" style="color: red">
          Please ensure all information is filled
        </p>
        <form @submit.prevent="updateInfo">
          <div class="fullname">
            <div class="firstname" v-if="displayInfo">
              <label for="firstname">Firstname</label>
              <div>
                <input type="text" :value="userDetails.firstname" readonly />
                <i class="bx bx-edit-alt" @click="editInfo"></i>
              </div>
            </div>
            <div class="firstname-edit" v-if="displayEditInput">
              <label for="firstname">Firstname</label>
              <input type="text" required v-model="userDetails.firstname" />
            </div>
            <div class="lastname" v-if="displayInfo">
              <label for="lastname">Lastname</label>
              <div>
                <input type="text" readonly :value="userDetails.lastname" />
                <i class="bx bx-edit-alt" @click="editInfo"></i>
              </div>
            </div>
            <div class="lastname-edit" v-if="displayEditInput">
              <label for="lastname">Lastname</label>
              <input type="text" v-model="userDetails.lastname" required />
            </div>
          </div>
          <div class="phone" v-if="displayInfo">
            <label for="phone">Contact</label>
            <div>
              <input type="text" readonly :value="userDetails.phone" />
              <i class="bx bx-edit-alt" @click="editInfo"></i>
            </div>
          </div>
          <div class="phone-edit" v-if="displayEditInput">
            <label for="phone">Contact</label>
            <input
              type="text"
              v-model="userDetails.phone"
              required
              minlength="10"
              maxlength="10"
            />
          </div>
          <div class="address" v-if="displayInfo">
            <label for="address">Address</label>
            <div>
              <input
                type="text"
                readonly
                :value="`${address.street}, ${address.district}, ${address.city}`"
              />
              <i class="bx bx-edit-alt" @click="editInfo"></i>
            </div>
          </div>
          <div class="address-edit" v-if="displayEditInput">
            <label for="address">Address</label>
            <input type="text" v-model="address.street" required />
            <div></div>
            <div class="district-city">
              <select
                name="district"
                class="district"
                required
                v-model="address.district"
              >
                <option
                  v-for="dis in destinationDistrict.district"
                  :key="dis.index"
                  :selected="address.district == dis.name"
                >
                  {{ dis.name }}
                </option>
              </select>
              <select name="city" class="city" required v-model="address.city">
                <option value="HCM">HCM</option>
              </select>
            </div>
          </div>
          <div class="btn-form" v-if="displayEditInput">
            <button class="btn-cancel" @click="cancelEdit">Cancel</button>
            <button type="submit" class="btn-save">Save</button>
          </div>
        </form>
      </div>
      <div class="card personal-account-info">
        <div class="email">
          <label for="email">Email</label>
          <input type="email" readonly :value="userDetails.email" />
        </div>
        <div class="password" v-if="displayBtnUpdatePass">
          <!-- <label for="password">Password</label>
          <input type="text" readonly value="5454354365" /> -->
          <button class="btn-update-pass" @click="updatePassForm">
            Change Password
          </button>
          <button
            class="btn-update-pass"
            data-bs-target="#forgotPassForm"
            data-bs-toggle="modal"
          >
            Forgot Password
          </button>
        </div>
        <div v-if="displayChangePassword">
          <div class="password-edit">
            <label for="oldPassword">Old Password</label>
            <input type="text" v-model="oldPassword" />
          </div>
          <div class="password-edit">
            <label for="newPassword">New Password</label>
            <input type="text" v-model="newPassword" />
          </div>
          <div class="password-edit">
            <label for="confirmPassword">Confirm Password</label>
            <input type="text" v-model="updatePass" />
          </div>
          <div class="error-message" style="color: red">
            <p v-if="errorMessage.emptyError">Please do not let field empty</p>
            <p v-if="errorMessage.confirmError">
              Your confirm password is not correct
            </p>
            <p v-if="errorMessage.lengthError">
              The password must be at least 7 characters
            </p>
            <p v-if="errorMessage.wrongPass">
              Oops! Your old password is wrong, please check it again
            </p>
          </div>
          <div class="btn-form">
            <!-- <label for="password">Password</label>
          <input type="text" readonly value="5454354365" /> -->
            <!-- <div> -->
            <button class="btn-cancel" @click="cancelChangePass">Cancel</button>
            <!-- </div> -->
            <!-- <div> -->
            <button class="btn-update-pass" @click="updateAccount">
              Change
            </button>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Password from "./PasswordInput.vue";
import destinationList from "../assets/JSON/destinationCity.json";
export default {
  name: "ProfileInfo",
  //   components: {
  //     Password,
  //   },
  data() {
    return {
      displayEditInput: false,
      displayInfo: true,
      displayBtnUpdatePass: true,
      displayChangePassword: false,
      destinationDistrict: destinationList,
      userDetails: {},
      address: {},
      oldPassword: "",
      newPassword: "",
      updatePass: "",
      errorMessage: {
        confirmError: false,
        lengthError: false,
        wrongPass: false,
        emptyError: false,
      },
    };
  },
  props: {},
  async created() {},
  methods: {
    editInfo() {
      this.displayEditInput = true;
      this.displayInfo = false;
    },
    cancelEdit() {
      this.displayEditInput = false;
      this.displayInfo = true;
    },
    updatePassForm() {
      this.displayChangePassword = true;
      this.displayBtnUpdatePass = false;
    },
    cancelChangePass() {
      this.displayChangePassword = false;
      this.displayBtnUpdatePass = true;
    },
    checkError() {
      if (
        this.newPassword == "" ||
        this.oldPassword == "" ||
        this.updatePass == ""
      ) {
        this.errorMessage.emptyError = true;
      } else if (this.newPassword != this.updatePass) {
        this.errorMessage.confirmError = true;
      } else {
        this.errorMessage.confirmError = false;
      }
    },
    async getUserDetails() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/User/userDetails/All/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.userDetails = res.data.data;
        this.address = res.data.data.address;
      } catch (error) {
        // console.log(error);
      }
    },
    async updateInfo() {
      try {
        const updateUser = {
          firstname: this.userDetails.firstname,
          lastname: this.userDetails.lastname,
          phone: this.userDetails.phone,
          street: this.address.street,
          city: this.address.city,
          district: this.address.district,
        };
        this.$store.dispatch("accessToken");
        await this.$axios.put(
          `api/User/updateUser/${this.userDetails.id}`,
          updateUser,
          this.$axios.defaults.headers["Authorization"]
        );

        this.$router.go();
      } catch (error) {
        // console.log(error);
      }
    },
    async updateAccount() {
      this.checkError();
      console.log(this.errorMessage.emptyError);
      if (
        this.errorMessage.confirmError == false &&
        this.errorMessage.emptyError == false
      ) {
        try {
          const updateAccount = {
            oldPassword: this.oldPassword,
            password: this.updatePass,
            street: this.address.street,
            city: this.address.city,
            district: this.address.district,
          };
          this.$store.dispatch("accessToken");
          await this.$axios.put(
            `api/User/updateUser/${this.userDetails.id}`,
            updateAccount,
            this.$axios.defaults.headers["Authorization"]
          );
          this.$router.go();
        } catch (error) {
          this.errorMessage.wrongPass = true;
          // console.log(error);
        }
      }
    },
  },
  watch: {
    newPassword() {
      if (this.newPassword.length < 7) {
        this.errorMessage.lengthError = true;
      } else {
        this.errorMessage.lengthError = false;
      }
    },
    oldPassword() {
      if (this.oldPassword.length < 7) {
        this.errorMessage.lengthError = true;
      } else {
        this.errorMessage.lengthError = false;
      }
    },
    updatePass() {
      if (this.updatePass.length < 7) {
        this.errorMessage.lengthError = true;
      } else {
        this.errorMessage.lengthError = false;
      }
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

<style scoped>
/* -- error message */
/* .error-message {
} */

.error-message p {
  font-size: 14px;
  padding-left: 50px;
}

/* -- container view -- */
.profile-info {
  width: 80%;
  margin: 0 0 0 10%;
}
.profile-message {
  color: rgb(101, 96, 96);
  letter-spacing: 0.3px;
  font-size: 15px;
  font-weight: 500;
}
.profile-info-content {
  /* width: 80%; */
  margin: 5% 0 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 100px;
  padding-left: 50px;
}
/* -- personal info -- */
.personal-info {
  padding: 4%;
  border: solid 1px #aa00ff;
  box-shadow: 0 0 7px 2px #b388ff;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.personal-info .firstname input,
.personal-info .lastname input,
.personal-info .phone input,
.personal-info .address input {
  border: none;
  padding-left: 20px;
  letter-spacing: 0.3px;
}
.personal-info .firstname div,
.personal-info .lastname div,
.personal-info .phone div,
.personal-info .address div {
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  column-gap: 10px;
}
.personal-info i {
  margin-top: 12%;
  color: green;
  cursor: pointer;
}

.personal-info label {
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: rgb(112, 107, 107);
}
.fullname .firstname,
.fullname .lastname,
.phone,
.address {
  padding: 20px;
  column-gap: 10px;
  row-gap: 10px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
}

/* -- personal info edit -- */
.fullname .firstname-edit,
.fullname .lastname-edit,
.phone-edit,
.address-edit {
  padding: 20px;
  column-gap: 10px;
  row-gap: 10px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
}

.personal-info .firstname-edit input,
.personal-info .lastname-edit input,
.personal-info .phone-edit input,
.personal-info .address-edit input {
  padding: 7px 20px;
  border-radius: 7px;
  border: solid 1px grey;
  margin-top: -8px;
}

.district-city {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}
.district-city select {
  width: 100%;
  border-radius: 7px;
  padding: 5px;
}
/* -- account info -- */

.personal-account-info {
  padding: 20px;
  border: solid 1px #aa00ff;
  box-shadow: 0 0 7px 2px #b388ff;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.personal-account-info,
.personal-account-info .email input {
  border: none;
  padding-left: 20px;
  letter-spacing: 0.3px;
}

.personal-account-info label {
  font-size: 14px;
  letter-spacing: 0.3px;
  font-weight: 500;
  color: rgb(112, 107, 107);
}
.email,
.password-edit {
  padding: 20px;
  column-gap: 10px;
  row-gap: 10px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
}
.personal-account-info .password-edit input {
  padding: 7px 20px;
  border-radius: 7px;
  border: solid 1px grey;
  margin-top: -8px;
}
/* btn edit change */
.btn-form {
  margin-top: 5%;
  display: flex;
  gap: 40px;
  justify-content: center;
}
button {
  width: 22%;
  padding: 3px 0;
  border-radius: 7px;
  border: none;
  color: white;
  font-weight: 500;
}
.btn-cancel {
  background: rgb(119, 115, 115);
}
.btn-save {
  background: #ff6d00;
}
.password {
  display: flex;
  /* justify-content: cent.er; */
  align-items: center;
  gap: 30px;
  flex-flow: column;
}

.btn-update-pass {
  background: #ff6d00;
  width: 70%;
  padding: 7px;
}

/* ---- Responsive ---- */
@media screen and (max-width: 1440px) {
  .profile-info-content {
    /* width: 80%; */
    padding-left: 0;
    column-gap: 4%;
  }
}
@media screen and (max-width: 1200px) {
  .profile-info-content {
    /* width: 80%; */
    margin: 5% 0 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8%;
    padding-left: 0;
  }
}
@media screen and (max-width: 993px) {
  .profile-info-content {
    /* width: 80%; */
    margin: 7% 0 0 0;
    grid-template-columns: 100%;
    row-gap: 10%;
  }
}
@media screen and (max-width: 545px) {
  .fullname .firstname,
  .fullname .lastname,
  .phone,
  .address {
    column-gap: 0;
    row-gap: 10px;
    grid-template-columns: 100%;
  }
  .personal-info .firstname input,
  .personal-info .lastname input,
  .personal-info .phone input,
  .personal-info .address input {
    padding-left: 0;
  }
  .fullname .firstname-edit,
  .fullname .lastname-edit,
  .phone-edit,
  .address-edit {
    column-gap: 0;
    row-gap: 10px;
    grid-template-columns: 100%;
  }
  .email,
  .password-edit {
    column-gap: 0;
    row-gap: 10px;
    grid-template-columns: 100%;
  }
  .personal-account-info,
  .personal-account-info .email input {
    border: none;
    padding-left: 0;
    letter-spacing: 0.3px;
  }

  .btn-form {
    margin-top: 5%;
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  .btn-update-pass {
    width: 80%;
  }
}
</style>
