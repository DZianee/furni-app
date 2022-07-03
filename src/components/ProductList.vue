<template>
  <div class="product-list-feature">
    <div class="product-features">
      <div class="table-search-box">
        <input
          type="text"
          class="form-control form-input"
          placeholder="Search anything..."
        />
      </div>
      <div class="filter">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
            >
              <i class="bx bx-filter bx-md"></i>
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
          >
            <div class="accordion-body">
              <div class="sort-bar">
                <select class="form-select">
                  <option value="descending" style="font-weight: 700">
                    Descending
                  </option>
                  <option value="ascending">Ascending</option>
                </select>
                <select class="form-select">
                  <option value="all">All</option>
                  <option value="<200">lower than 200K VND</option>
                  <option value="200-1000">200K - 1 Million VND</option>
                  <option value=">1000">above 1 Million VND</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-list container">
      <div class="card product-item" @click="Route('productDetailsView')">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info gy gdygd gdhgd</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info gy gdygd gdhgd</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info gy gdygd gdhgd</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info gy gdygd gdhgd</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h6>Testing item nam info gy gdygd gdhgd</h6>
          </div>
          <div class="item-price">
            <p>250.000 VND</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    cateId: String,
    cateProductList: Array,
  },
  methods: {
    Route(value) {
      this.$router.push({ name: value });
    },
  },
};
</script>

<style scoped>
.product-features {
  margin-top: 20px;
}
.table-search-box {
  width: 34%;
  margin: auto;
}
.table-search-box input {
  height: 60px;
  border-radius: 5px;
}
.filter {
  margin-top: 20px;
}
.accordion-item button {
  height: 40px;
}
.sort-bar {
  padding: 10px;
  display: flex;
  gap: 40px;
}
.sort-bar select {
  padding: 10px;
  width: 400px;
  font-weight: 500;
}
.product-list {
  margin-top: 40px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  row-gap: 70px;
  justify-content: center;
}
.card.product-item {
  /* border: solid; */
  width: 30%;
}
.card.product-item:hover {
  cursor: pointer;
}
.item-info {
  padding: 10px;
  text-align: left;
}
.item-name h6 {
  line-height: 35px;
}
.item-price p {
  color: rgb(126, 122, 122);
}
</style>
