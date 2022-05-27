<template>
  <div class="product-cate-table">
    <div class="title">
      <h4>List of items</h4>
    </div>
    <div class="create-product-btn">
      <button
        type="button"
        data-bs-target="#createProductModal"
        data-bs-toggle="modal"
      >
        New Product +
      </button>
    </div>
    <div class="features-bar">
      <div class="search-bar">
        <input
          type="search"
          class="form-control"
          placeholder="Search here..."
        />
      </div>
      <div class="filter-sort">
        <select class="filter-type form-control">
          <option value="chair">Chair</option>
          <option value="armchair">Armchair</option>
        </select>
        <select class="sort-name form-control">
          <option value="name">Name</option>
        </select>
        <select class="asc-desc form-control">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price (per one)</th>
            <th>Import quantity</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 600">CAS1I989</td>
            <td>Testing product name at current</td>
            <td>Chair</td>
            <td>229.000 VND</td>
            <td>20</td>
            <td>View image</td>
            <td>remove</td>
          </tr>
          <tr>
            <td>CAS1I989</td>
            <td>Testing product name at current</td>
            <td>Chair</td>
            <td>229.000 VND</td>
            <td>20</td>
            <td>View image</td>
            <td>remove</td>
          </tr>
          <tr>
            <td>CAS1I989</td>
            <td>Testing product name at current</td>
            <td>Chair</td>
            <td>229.000 VND</td>
            <td>20</td>
            <td>View image</td>
            <td>remove</td>
          </tr>
          <tr>
            <td>CAS1I989</td>
            <td>Testing product name at current</td>
            <td>Chair</td>
            <td>229.000 VND</td>
            <td>20</td>
            <td>View image</td>
            <td>remove</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCateTable",
};
</script>

<style scoped>
.product-cate-table {
  margin-top: 30px;
}
.create-product-btn {
  align-items: center;
  display: flex;
  padding-right: 3%;
  justify-content: flex-end;
}
.create-product-btn button {
  background: #aa40e3;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px;
  width: 15%;
  border: none;
  border-radius: 5px;
}
.features-bar {
  padding: 5px 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
/* - - - Search - - - */
.search-bar {
  border-radius: 5px;
  width: 30%;
  margin-left: 20px;
}
.search-bar input {
  font-size: 15px;
  background: #f1eeee;
}
/* - - - Filter-Sort - - - */

.filter-sort {
  margin-right: 20px;
  display: flex;
  gap: 10px;
  width: 40%;
}
.filter-sort select {
  font-weight: 500;
  background: #f1eeee;
  font-size: 15px;
  border-radius: 5px;
  border: solid 1px rgb(199, 195, 195);
}

/* - - - Table - - - */
.table-responsive {
  margin: 20px;
  padding: 10px;
}
thead {
  background: #e4cdff;
}
</style>
