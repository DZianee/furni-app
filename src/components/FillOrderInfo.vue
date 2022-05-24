<template>
  <div class="fill-order-info container">
    <div class="title">
      <h4>Your order's personal information</h4>
      <p style="color: grey; font-size: 15px">
        Fill all the required information to complete the order now
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
          />
        </div>
        <div class="lastname">
          <label for="lastname">Lastname:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            required
          />
        </div>
      </div>
      <div class="buyer-contact">
        <label for="phone">Phone:</label>
        <input type="tel" class="form-control" required />
      </div>
      <div class="buyer-address">
        <label for="address">Address:</label>
        <div class="address">
          <div class="street">
            <input
              type="text"
              class="form-control"
              placeholder="23 Le Thanh Tong"
            />
          </div>
          <div class="option-select">
            <select name="city" class="form-control" required>
              <option value="hcm">Ho Chi Minh</option>
              <option value="hn">Ha Noi</option>
            </select>
            <select name="district" class="form-control" required>
              <option value="q1">1</option>
              <option value="q2">2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FillOrderInfo",
  props: {
    showOrderInfo: Boolean,
  },
  mounted() {},
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
</style>
