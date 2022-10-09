<template>
  <div class="input-profile container">
    <div class="input-header">
      <h3>Our Customer Information</h3>
      <p>
        Please complete and ensure your personal information correctly for the
        latter shopping time
      </p>
      <p style="color: red">
        Notification: Sorry for this disturb. Our store are currently supporting
        for the shipping services in Ho Chi Minh city only. We're upgrading
        these difficulities for your better enjoyment.
      </p>
      <p style="color: red">Thanks for your understanding.</p>
    </div>
    <form @submit.prevent="confirmInfo">
      <div class="input-profile-container">
        <div class="fullname">
          <div class="firstname">
            <label for="firstname">Firstname:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Your first name"
              required
              v-model="input.firstname"
            />
          </div>
          <div class="lastname">
            <label for="lastname">Lastname:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Your last name"
              v-model="input.lastname"
              required
            />
          </div>
        </div>
        <div class="phone">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            class="form-control"
            required
            minlength="10"
            maxlength="10"
            placeholder="Your phone number"
            v-model="input.phone"
          />
        </div>
        <div class="address">
          <label for="address">Address:</label>

          <div class="address">
            <div class="street">
              <input
                type="text"
                class="form-control"
                placeholder="23 Le Thanh Tong"
                required
                v-model="input.street"
              />
            </div>
            <div class="option-select">
              <select
                name="city"
                class="form-control"
                required
                v-model="input.city"
              >
                <option value="" disabled>Please select city</option>
                <option value="HCM">Ho Chi Minh</option>
              </select>
              <select
                name="district"
                class="form-control"
                required
                v-model="input.district"
              >
                <option value="" disabled>Please select district</option>
                <option
                  v
                  v-for="dis in destinationList.district"
                  :key="dis.index"
                  :value="dis.name"
                >
                  {{ dis.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-submit">Confirm</button>
    </form>
  </div>
</template>

<script>
import destinationList from "../assets/JSON/destinationCity.json";
export default {
  name: "InputProfileView",
  data() {
    return {
      destinationList: destinationList,
      input: {
        firstname: "",
        lastname: "",
        phone: "",
        street: "",
        district: "",
        city: "",
      },
    };
  },
  created() {
    document.title = "Customer Information";
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
    async confirmInfo() {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.put(
        `api/User/updateUser/${this.userId}`,
        this.input
      );
      if (res.status == 200) {
        this.$router.push({ name: "home" });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.container {
  padding-top: 6%;
  /* width: 50%; */
}

.input-header {
  text-align: center;
  letter-spacing: 0.5px;
}
.input-header h3 {
  background: #eecdff;
  padding: 15px;
}

.input-header p {
  color: rgb(121, 117, 117);
  font-weight: 500;
  font-size: 15px;
}

.input-profile-container {
  padding-top: 20px;
  padding: 40px 80px;
  width: 50%;
  margin: auto;
  font-size: 14px;
}

.fullname .firstname,
.fullname .lastname {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
}
.phone {
  padding: 15px 0;
  display: flex;
  gap: 20px;
  align-items: center;
}
.address {
  padding: 15px 0;
}
.address .street {
  margin-bottom: 10px;
  padding-left: 88px;
}
.option-select {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  padding: 10px 0;
  padding-left: 88px;
}
label {
  color: rgb(86, 84, 84);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
input {
  padding: 10px;
  border-radius: 7px;
}
/* --- btn --- */
.btn-submit {
  float: right;
  margin-right: 20%;
  width: 100px;
  background: #aa00ff;
  color: white;
  font-weight: 500;
  border-radius: 7px;
  padding: 10px;
  letter-spacing: 0.5px;
}
.btn-submit:hover {
  color: white;
}

/* --- Responsive --- */
@media screen and (max-width: 1050px) {
  .input-profile-container {
    padding: 18px 80px;
    width: 70%;
  }
  .btn-submit {
    margin-bottom: 5%;
  }
}
@media screen and (max-width: 993px) {
  .input-profile-container {
    width: 90%;
  }
  .btn-submit {
    margin-bottom: 5%;
    margin-right: 10%;
  }
}
@media screen and (max-width: 993px) {
  .input-profile-container {
    padding: 18px 20px;
    width: 100%;
  }
}
</style>
