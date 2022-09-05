<template>
  <component
    :is="'order-card-list'"
    :orderUserList="checkedOrderUserList"
  ></component>
</template>

<script>
export default {
  name: "ActivityNewOrders",
  data() {
    return {
      checkedOrderUserList: [],
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
    async getCheckedUserOrders() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.get(
          `api/Order/perOrderPerUser/${user.id}`,
          {
            params: {
              process: "Checked",
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.checkedOrderUserList = res.data.data;
        this.checkedOrderUserList.forEach((item) => this.convertDateTime(item));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCheckedUserOrders();
  },
};
</script>

<style scoped></style>
