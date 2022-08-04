<template>
  <div class="customer-info-modal">
    <div
      class="modal fade cus-modal"
      id="cusModal"
      tabindex="-1"
      aria-labelledby="cusModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Customer Information</h5>
          </div>
          <div class="modal-body">
            <div class="customer-email">
              <label for="cusEmail">Email:</label>
              <!-- <input type="text" :value="userInfo.email" readonly /> -->
              <p>{{ userInfo.email }}</p>
            </div>
            <div class="customer-fullname">
              <label for="cusFullname">Fullname:</label>
              <p>{{ userInfo.firstname }} {{ userInfo.lastname }}</p>
            </div>
            <div class="customer-phone">
              <label for="cusPhone">Phone (Mobile):</label>
              <p>{{ userInfo.phone }}</p>
            </div>
            <div class="customer-address">
              <label for="cusAddress">Address:</label>
              <p>
                {{ address.street }}, {{ address.district }}, {{ address.city }}
              </p>
            </div>
          </div>
          <div class="btn btn-close-modal" data-bs-dismiss="modal">Close</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CusInfoModal",
  props: {
    userrId: String,
    userInfo: Object,
    address: Object,
  },
  data() {
    return {};
  },
  methods: {
    async getUserDetails() {},
  },
  mounted() {},
};
</script>

<style scoped>
.modal-header {
  justify-content: center;
  letter-spacing: 0.3px;
}
.modal-body {
  padding: 10px;
}
.customer-email,
.customer-phone,
.customer-fullname,
.customer-address {
  padding: 15px 10px;
  display: grid;
  grid-template-columns: 0.6fr 1fr;
}
label {
  font-size: 15px;
  font-weight: 500;
  color: rgb(107, 104, 104);
  letter-spacing: 0.3px;
}
p {
  font-size: 15px;
}
.btn-close-modal {
  background-color: #c673f3;
  border-radius: 7px;
  color: white;
  width: 90%;
  margin: 25px auto;
  font-weight: 500;
}
.btn-close-modal:hover {
  background-color: #bb53f3;
  color: white;
}
</style>
