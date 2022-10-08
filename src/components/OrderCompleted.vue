<template>
  <component
    :is="'order-card-list'"
    :orderUserList="completedOrderUserList"
  ></component>
</template>

<script>
export default {
  name: "ActivityNewOrders",
  data() {
    return {
      completedOrderUserList: [],
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
    async getCompletedUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/perOrderPerUser/${user.id}`,
          {
            params: {
              process: "Completed",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.completedOrderUserList = res.data.data;
        this.completedOrderUserList.forEach((item) =>
          this.convertDateTime(item)
        );
      } catch (error) {
        // console.log(error);
      }
    },
  },
  mounted() {
    this.getCompletedUserOrders();
  },
};
</script>

<style scoped></style>
