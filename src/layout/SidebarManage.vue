<template>
  <div class="nav">
    <div class="store-logo">
      <h1>TMCi</h1>
      <p>For Trending, Modern and Comfortable life</p>
    </div>
    <div class="user-shortcut">
      <div class="user-icon">
        <i class="bx bx-user-circle bx-md"></i>
      </div>
      <div class="user-info">
        <h6 class="user-name">Panda Sweet</h6>
        <p class="user-email">sweetPand@gmail.com</p>
      </div>
    </div>
    <ul class="nav-items">
      <li class="nav-item" @click="Route('dashboardView')">
        <i class="bx bxs-dashboard bx-sm bx-fw" />
        <span>Dashboard</span>
        <span class="tooltiptext">Dashboard</span>
      </li>
      <li class="nav-item" @click="Route('dashboardView')">
        <i class="bx bx-box bx-sm bx-fw" />
        <span>Storage</span>
        <span class="tooltiptext">Storage</span>
      </li>
      <li class="nav-item" @click="Route('dashboardView')">
        <i class="bx bx-spreadsheet bx-sm bx-fw" />
        <span>Order's delivery</span>
        <span class="tooltiptext">Order's delivery</span>
      </li>
      <!-- <li class="nav-item" @click="ManageRoute"> -->
      <li class="nav-item">
        <i class="bx bx-briefcase bx-sm bx-fw" />
        <span>Manage</span>
        <span class="tooltiptext">Manage</span>
      </li>
    </ul>
    <div class="nav-item log-out" @click="logout">
      <i class="bx bx-log-out bx-sm bx-fw" />
      <span>Log-out</span>
      <span class="tooltiptext">Log-out</span>
    </div>
  </div>
  <div class="router-view">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  /* z-index: 1; */
  width: 220px;
  height: 100%;
  position: fixed;
  background: white;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  padding: 15px;
  display: block;
}
.store-logo {
  height: fit-content;
}
.store-logo h1 {
  text-align: center;
  color: #b767ff;
}
.store-logo p {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #608294;
}
.user-shortcut {
  display: flex;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  gap: 7px;
  border-radius: 10px;
  padding: 4px;
  background: #fffdde;
}
.user-icon {
  display: flex;
  align-items: center;
}
.user-info {
  width: 130px;
  padding: 10px 0;
}
.user-info .user-name {
  font-size: 14px;
  letter-spacing: 0.3px;
  font-weight: 500;
}
.user-info .user-email {
  letter-spacing: 0.3px;
  font-size: 12px;
  color: rgb(103, 99, 99);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nav-items {
  /* width: inherit; */
  padding: 10px 0;
  position: relative;
  top: 10px;
}
.nav-item {
  height: 50px;
  margin: 5px 6px;
  line-height: 49px;
  border-radius: 10px;
  color: #829aa6;
  transition: ease 0.6s;
  list-style: none;
  font-size: 14px;
  letter-spacing: 0.3px;
}
.nav-item:hover {
  background-color: #e8def9;
  cursor: pointer;
  color: #263238;
  font-weight: 500;
}
.tooltiptext {
  visibility: hidden;
  position: relative;
  left: 75px;
  top: -45px;
  display: block;
  border-radius: 10px;
  width: 90px;
  height: 35px;
  line-height: 35px;
  background: black;
  color: rgb(240, 240, 240);
  font-size: 14px;
}
.log-out {
  position: absolute;
  bottom: 10px;
  width: 80%;
}
</style>
