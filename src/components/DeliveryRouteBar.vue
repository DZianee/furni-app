<template>
  <div class="delivery-route-bar">
    <nav>
      <ul>
        <li @click="openOrderRoute('all')" class="bar active">
          All ({{ totalOrders }})
        </li>
        <li @click="openOrderRoute('new')" class="bar">
          New orders
          <span>{{ totalNewOrders }}</span>
        </li>
        <li @click="openOrderRoute('checked')" class="bar">
          Checked orders <span>{{ totalCheckedOrders }}</span>
        </li>
        <li @click="openOrderRoute('delivering')" class="bar">
          Delivering orders <span>{{ totalDeliveryOrders }}</span>
        </li>
        <li @click="openOrderRoute('cancelled')" class="bar">
          Cancelled orders <span>{{ totalCancelledOrders }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "DeliveryRouteBar",
  data() {
    return {
      totalOrders: 0,
      totalNewOrders: 0,
      totalCheckedOrders: 0,
      totalDeliveryOrders: 0,
      totalCancelledOrders: 0,
    };
  },
  props: {
    allOrders: Number,
    newOrders: Number,
    checkedOrders: Number,
    deliveryOrders: Number,
    cancelledOrders: Number,
  },
  methods: {
    openOrderRoute(value) {
      this.$router.push({ name: "deliveryView", params: { id: value } });
      this.$emit("open-orders-tab", value);
    },
    async getNewOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/newOrders`,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.totalNewOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    async getCheckedOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/checkedOrders`,
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.totalCheckedOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order`,
          { params: { page: this.currentPage } },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.totalOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    async getDeliveryOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/deliveryOrders`,
          { params: { page: this.currentPage } },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.totalDeliveryOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
    async getCancelledOrders() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Order/cancelledOrders`,
          { params: { page: this.currentPage } },
          this.$axios.defaults.headers["Authorization"]
        );
        console.log(res);
        this.totalCancelledOrders = res.data.totalOrders;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    allOrders() {
      this.totalOrders = this.allOrders;
    },
    newOrders() {
      this.totalNewOrders = this.newOrders;
    },
    checkedOrders() {
      this.totalCheckedOrders = this.checkedOrders;
    },
    deliveryOrders() {
      this.totalDeliveryOrders = this.deliveryOrders;
    },
    cancelledOrders() {
      this.totalCancelledOrders = this.cancelledOrders;
    },
  },
  mounted() {
    this.getNewOrders();
    this.getAllOrders();
    this.getCheckedOrders();
    this.getDeliveryOrders();
    this.getCancelledOrders();
    const navItems = document.querySelectorAll(".bar");

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("click", function () {
        var current = document.querySelector(".active");
        if (current) {
          current.classList.remove("active");
        }
        this.classList.add("active");
      });
    }
  },
};
</script>

<style scoped>
.delivery-route-bar {
  letter-spacing: 0.3px;
}
ul {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
}
.bar {
  list-style: none;
  font-weight: 500;
  font-size: 15px;
  color: rgb(124, 121, 121);
  padding: 10px;
}
.bar:hover {
  cursor: pointer;
  color: black;
}

.bar.active {
  border-bottom: solid #b980f0 4px;
  color: black;
  list-style: none;
  font-weight: 500;
  font-size: 15px;
  padding: 10px;
  transition: all 0.2s;
}
span {
  border: solid;
  padding: 5px 9px;
  border-radius: 30px;
  background: red;
  color: white;
  font-size: 12px;
  font-weight: 500;
}

/* --- Responsive --- */
@media screen and (max-width: 1250px) {
  .delivery-route-bar {
    scroll-behavior: smooth;
    overflow-x: auto;
  }
  .delivery-route-bar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    /* margin: 0 auto; */
  }
  .delivery-route-bar::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  ul {
    display: grid;
    column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .bar {
    text-align: center;
    width: 185px;
  }
}
</style>
