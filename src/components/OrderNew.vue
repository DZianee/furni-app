<template>
  <component
    :is="'order-card-list'"
    :orderUserList="newOrderUserList"
  ></component>
</template>

<script>
export default {
  name: "ActivityNewOrders",
  data() {
    return {
      newOrderUserList: [],
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
    async getNewUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/perOrderPerUser/${user.id}`,
          {
            params: {
              process: "New",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.newOrderUserList = res.data.data;
        this.newOrderUserList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getNewUserOrders();
  },
};
</script>

<style scoped></style>
