<template>
  <component
    :is="'order-card-list'"
    :orderUserList="cancelledOrderUserList"
  ></component>
</template>

<script>
export default {
  name: "ActivityNewOrders",
  data() {
    return {
      cancelledOrderUserList: [],
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
    async getCancelledUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/perOrderPerUser/${user.id}`,
          {
            params: {
              process: "Cancelled",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.cancelledOrderUserList = res.data.data;
        this.cancelledOrderUserList.forEach((item) =>
          this.convertDateTime(item)
        );
      } catch (error) {
        // console.log(error);
      }
    },
  },
  mounted() {
    this.getCancelledUserOrders();
  },
};
</script>

<style scoped></style>
