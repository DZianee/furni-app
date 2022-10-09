<template>
  <div class="manage-view container">
    <div class="title">
      <h4>Management Stage</h4>
      <p>
        Get your customer's infomation management in here and to know them
        better desire
      </p>
    </div>
    <NavForManagement />
    <div v-if="routeId == 'user'">
      <StaffTableManage />
      <CustomerListTable />
    </div>
    <ManageRole v-if="routeId == 'role'" />
  </div>
</template>

<script>
import CustomerListTable from "../components/CustomerListTable.vue";
import StaffTableManage from "../components/StaffTable.vue";
import NavForManagement from "../components/Nav4Mangement.vue";
import ManageRole from "../components/ManageRole.vue";
export default {
  name: "ManageView",
  data() {
    return {
      choice: "",
    };
  },
  components: {
    NavForManagement,
    StaffTableManage,
    CustomerListTable,
    ManageRole,
  },
  computed: {
    routeId() {
      return this.$route.params.id;
    },
    userRole() {
      const result = JSON.parse(this.$store.state.user).role.name;
      return result;
    },
  },
  created() {
    document.title = "Management";
  },
  methods: {
    openUserRoute(val) {
      this.choice = val;
    },
  },
};
</script>

<style scoped>
.container {
  height: fit-content;
  position: relative;
  right: -8.1%;
  width: calc(100% - 336px);
  top: 20px;
  letter-spacing: 0.3px;
}
.title p {
  color: rgb(116, 112, 112);
  font-size: 14px;
} /* --- Responsive --- */
@media screen and (max-width: 1440px) {
  .container {
    right: -3%;
    width: calc(100% - 200px);
  }
}
@media screen and (max-width: 1250px) {
  .container {
    right: -2.5%;
    width: calc(100% - 145px);
  }
}
@media screen and (max-width: 1200px) {
  .container {
    right: -1.5%;
    width: calc(100% - 125px);
  }
}
/* @media screen and (max-width: 786px) {
.container {
    right: -1.5%;
    width: calc(100% - 125px);
  }
} */
@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 100%;
    row-gap: 80px;
    padding: 10px 0;
    right: 0;
    width: 100%;
    margin-bottom: 20%;
  }
  .title {
    padding: 0 5%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  /* .delivery-view {
    margin-bottom: 28%;
  } */
}
</style>
