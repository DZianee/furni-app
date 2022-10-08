<template>
  <div class="fill-order-info container">
    <div class="title">
      <h4>Your order's personal information</h4>
      <p style="color: grey; font-size: 15px">
        The required information to complete the order will be automatically
        filled from your personal information. In case, you prefer to change,
        please update in
        <span
          style="color: #aa00ff; font-weight: 500; cursor: pointer"
          @click="Route('profileView', user.id, 'profile')"
          >Your Profile</span
        >
        .
      </p>
      <hr />
    </div>
    <div class="order-info-container">
      <div class="buyer-info">
        <div class="firstname">
          <label for="firstname">Firstname:</label>
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            required
            v-model="user.firstname"
            readonly
          />
        </div>
        <div class="lastname">
          <label for="lastname">Lastname:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            required
            v-model="user.lastname"
            readonly
          />
        </div>
      </div>
      <div class="buyer-contact">
        <label for="phone">Phone:</label>
        <input
          type="tel"
          class="form-control"
          required
          readonly
          v-model="user.phone"
        />
      </div>
      <div class="buyer-address">
        <label for="address">Address:</label>
        <div class="address">
          <div class="street">
            <input
              type="text"
              class="form-control"
              placeholder="23 Le Thanh Tong"
              v-model="address.street"
              readonly
            />
          </div>
          <div class="option-select">
            <select name="city" class="form-control" required disabled>
              <option value="hcm">Ho Chi Minh</option>
              <option value="hn">Ha Noi</option>
            </select>
            <select
              name="district"
              class="form-control"
              required
              disabled
              v-model="address.district"
            >
              <option
                v-for="dis in destinationList.district"
                :key="dis.index"
                :value="dis.name"
                :selected="address.district == dis.name"
              >
                {{ dis.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import destinationList from "../assets/JSON/destinationCity.json";
export default {
  name: "FillOrderInfo",
  props: {
    showOrderInfo: Boolean,
  },
  data() {
    return {
      test: "",
      destinationList: destinationList,
      user: {},
      address: {
        district: "",
        city: "",
        street: "",
      },
    };
  },
  methods: {
    async getUserDetails() {
      try {
        this.$store.dispatch("accessToken");
        // this.$store.dispatch("getUser");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/User/userDetails/All/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.user = res.data.data;
        this.address.district = res.data.data.address.district;
        this.address.street = res.data.data.address.street;
        this.address.city = res.data.data.address.city;
      } catch (error) {
        // console.log(error);
      }
    },
    Route(value, id, name) {
      this.$router.push({ name: value, params: { id: id, name: name } });
    },
  },
  watch: {
    user() {
      console.log(this.user);
      if (this.user != null) {
        this.$emit("fill-color", "info", true);
      }
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

<style scoped>
.container {
  margin-top: 7%;
  padding: 20px 50px;
  width: 90%;
}
.order-info-container {
  width: 50%;
  margin: auto;
}
.buyer-info .firstname,
.buyer-info .lastname {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
}
.buyer-contact {
  padding: 15px 0;
  display: flex;
  gap: 20px;
  align-items: center;
}
.buyer-address {
  padding: 15px 0;
}
.address .street {
  padding: 10px 0;
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
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.8px;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .container {
    margin-top: 10%;
    width: 100%;
    padding: 10px 20px;
  }
  .order-info-container {
    width: 100%;
  }
}
</style>
