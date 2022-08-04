<template>
  <component :is="'order-card-list'" :orderUserList="userOrderList"></component>
</template>

<script>
export default {
  name: "ActivityAllOrders",
  data() {
    return {
      userOrderList: [],
      totalList: 0,
    };
  },
  methods: {
    convertDateTime(value) {
      const dateTime = new Date(value.dateCreate);
      var year = dateTime.getFullYear();
      var month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
      var day = ("0" + dateTime.getDate()).slice(-2);
      value.dateCreate = day + "/" + month + "/" + year;
    },
    async getAllUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/allOrderPerUser/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.userOrderList = res.data.data;
        this.totalList = this.userOrderList.length;
        console.log(this.totalList);
        this.userOrderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getAllUserOrders();
  },
};
</script>

<style scoped></style>
