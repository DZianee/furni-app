<template>
  <div class="success-order">
    <div class="container">
      <h2>Thanks for your order at TMCi</h2>
      <p>
        Within a week, the product's order will be delievered to your home,
        check more <span> in here</span>
      </p>
      <P>Enjoy the shopping mood with our products from now</P>
      <p><span @click="Route('home')">Go back to Home page</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessOrderView",
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
  },
};
</script>

<style scoped>
.success-order {
  height: 100%;
  border: solid white;
  background: url("https://images.pexels.com/photos/5632393/pexels-photo-5632393.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2")
    25% 70%;
}
.container {
  margin-top: 12%;
  text-align: center;
  margin-bottom: 155px;
  width: 50%;
  font-size: 17px;
  background: white;
  padding: 20px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
p span {
  text-decoration: underline;
  color: #ff7171;
}
p span:hover {
  cursor: pointer;
  color: red;
}
</style>
