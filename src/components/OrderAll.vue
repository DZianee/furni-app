<template>
  <component
    :is="'order-card-list'"
    :orderUserList="userOrderList"
    @load-page="loadPage"
  ></component>
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
      value.dateCreate = month + "/" + day + "/" + year;
    },
    async getAllUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/allOrderPerUser/${user.id}`,
          {
            params: {
              kindOf: "-1",
              sortName: "dateCreate",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.userOrderList = res.data.data;
        this.totalList = this.userOrderList.length;
        this.userOrderList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
    loadPage() {
      this.getAllUserOrders();
    },
  },
  mounted() {
    this.getAllUserOrders();
  },
};
</script>

<style scoped></style>
