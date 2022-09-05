<template>
  <div class="top-sales-content">
    <div class="card">
      <div class="card-header-title">
        <h6>Top sales product</h6>
      </div>
      <div class="empty-content">
        <p>Empty</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashTopSales",
};
</script>

<style scoped>
.card {
  height: 400px;
  margin-top: 7%;
  border-radius: 5px;
}

.card-header-title {
  padding: 20px 10px 10px 10px;
  border-bottom: solid 1px silver;
}

.empty-content {
  font-style: italic;
  color: grey;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(226, 223, 223);
}
</style>
