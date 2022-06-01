<template>
  <div class="delivery-route-bar">
    <nav>
      <ul>
        <li @click="openOrderRoute('all')" class="bar active">All</li>
        <li @click="openOrderRoute('new')" class="bar">New orders</li>
        <li @click="openOrderRoute('delivering')" class="bar">
          Delivering orders
        </li>
        <li @click="openOrderRoute('cancelled')" class="bar">
          Cancelled orders
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    openOrderRoute(value) {
      this.$emit("open-orders-tab", value);
    },
  },
  mounted() {
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
  gap: 40px;
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
</style>
