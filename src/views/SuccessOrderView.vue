<template>
  <div class="success-order">
    <div class="container">
      <h2>Thanks for your order at TMCi</h2>
      <p>
        Within a week, the product's order will be delievered to your home,
        check more
        <span @click="Route('profileView', user.id, 'order')"> in here</span>
      </p>
      <P>Enjoy the shopping mood with our products from now</P>
      <p><span @click="Route('home')">Go back to Home page</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessOrderView",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    Route(value, id, name) {
      if (value == "profileView") {
        this.$router.push({ name: value, params: { id: id, name: name } });
      } else {
        this.$router.push({ name: value });
      }
    },
  },
  mounted() {
    this.$store.dispatch("removeShoppingList", null);
    this.$store.dispatch("getUser");
    const data = JSON.parse(this.$store.state.user);
    this.user = data;
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
  margin-bottom: 12%;
  width: 50%;
  font-size: 16px;
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

/* -- responsive */
@media screen and (max-width: 1024px) {
  .container {
    width: 70%;
  }
}
@media screen and (max-width: 903px) {
  .container {
    width: 100%;
  }
}
@media screen and (max-width: 480px) and (min-width: 320px) {
  .container {
    font-size: 14px;
  }
}
</style>
