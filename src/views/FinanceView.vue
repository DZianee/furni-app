<template>
  <div class="finance-view container">
    <div class="title">
      <h3>Finance of TMCi HCM store</h3>
    </div>
    <div class="statistic"></div>
    <div class="table-responsive"></div>
    <div class="create-modal">
      <div class="staff-fullname">
        <div class="firstname">
          <label for="firstname">Firstname</label>
          <input type="text" required />
        </div>
        <div class="lastname">
          <label for="lastname">Lastname</label>
          <input type="text" required />
        </div>
      </div>
      <div class="staff_email-pass">
        <div class="email">
          <label for="email">Email</label>
          <input type="email" autocomplete="false" required />
        </div>
        <Password />
      </div>
      <div class="staff_role-status">
        <div class="role">
          <label for="role">Role</label>
          <select name="role" required>
            <option disabled value="">Please Select</option>
          </select>
        </div>
        <div class="status">
          <label for="status">Status</label>
          <select name="status" required>
            <option disabled value="">Select status</option>
            <option value="Active">Active</option>
          </select>
        </div>
      </div>
      <div class="staff-address">
        <div class="address">
          <label for="address">Address</label>
          <div>
            <input
              class="address-input"
              type="text"
              required
              placeholder="1 Cach Mang Thang Tam"
            />
            <div class="district-city">
              <div class="district">
                <select name="district" required>
                  <option disabled value="">Select district</option>
                </select>
              </div>
              <div class="city">
                <select name="city" required>
                  <option disabled value="">Select city</option>
                  <option value="HCM">HCM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="staff-phone">
        <div class="phone">
          <label for="phone">Mobile</label>
          <input
            class="phone-input"
            type="text"
            required
            minlength="10"
            maxlength="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "../components/PasswordInput.vue";
export default {
  name: "FinanceView",
  components: { Password },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");
.finance-view {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
  letter-spacing: 0.3px;
  border: solid;
  font-family: "Roboto", sans-serif;
}
.create-modal {
  width: 40%;
  padding-right: 10px;
}
.staff-fullname,
.staff-phone,
.staff-address,
.staff_role-status,
.staff_email-pass {
  padding: 10px 0;
}

.staff_role-status,
.staff-fullname,
.staff_email-pass {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* justify-content: space-around; */
}
.address-input,
.phone-input {
  width: 95%;
}
.district-city {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  /* padding: 10px; */
  column-gap: 14px;
  width: 97%;
}
label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
input {
  width: 90%;
  margin: 0 18px;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.role select,
.status select {
  width: 90%;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  margin: 0 18px;
  border: solid 1px lightgrey;
}
.district select,
.city select {
  width: 95%;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  margin: 0 18px;
  border: solid 1px lightgrey;
}
.password /deep/ input {
  width: 90%;
  margin: 0 18px;
  font-size: 14px;
  padding: 9px 12px;
  border-radius: 7px;
  border: solid 1px lightgrey;
}
.password /deep/ label {
  font-size: 14px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  padding: 10px;
  letter-spacing: 0.3px;
}
</style>
