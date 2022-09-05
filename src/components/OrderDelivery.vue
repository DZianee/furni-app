<template>
  <component
    :is="'order-card-list'"
    :orderUserList="deliveryOrderUserList"
  ></component>
</template>

<script>
export default {
  name: "ActivityNewOrders",
  data() {
    return {
      deliveryOrderUserList: [],
    };
  },
  methods: {
    convertDateTime(value) {
      const dateTime = new Date(value.dateCreate);
      var year = dateTime.getFullYear();
      var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
      var day = ("0" + dateTime.getDate()).slice(-2);
      value.dateCreate = month + "/" + day + "/" + year;
    },
    async getDeliveryUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/perOrderPerUser/${user.id}`,
          {
            params: {
              process: "Delivery",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.deliveryOrderUserList = res.data.data;
        this.deliveryOrderUserList.forEach((item) =>
          this.convertDateTime(item)
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getDeliveryUserOrders();
  },
};
</script>

<style scoped></style>
