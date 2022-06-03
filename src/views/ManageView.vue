<template>
  <div class="manage-view container">
    <div class="title">
      <h3>Management Stage</h3>
      <p>
        Get your customer's infomation management in here and to know them
        better desire
      </p>
    </div>
    <NavForManagement />
    <div v-if="routeId == 'user' || routeId == ''">
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
}
</style>
