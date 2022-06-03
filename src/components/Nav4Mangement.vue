<template>
  <div class="navbar-4-management">
    <nav>
      <ul>
        <li @click="openUserRoute('user')" class="bar active">Customers</li>
        <li @click="openUserRoute('role')" class="bar">Role management</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavForManagement",
  methods: {
    openUserRoute(value) {
      this.$emit("open-users-tab", value);
      this.$router.push({ name: "manageView", params: { id: value } });
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
.navbar-4-management {
  letter-spacing: 0.3px;
}
ul {
  display: flex;
  gap: 70px;
  justify-content: space-around;
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
