<template>
  <div class="product-list-feature">
    <div class="product-list container" v-if="cateId === 'all' || cateId == ''">
      <div class="product-features">
        <div class="table-search-box">
          <input
            type="text"
            class="form-control form-input"
            placeholder="Search name, status here..."
            v-model="searchAll"
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
                  <select class="form-select" v-model="kindOfAll" name="sort">
                    <option value="-1" style="font-weight: 600">
                      Descending
                    </option>
                    <option value="1">Ascending</option>
                  </select>
                  <select
                    class="form-select"
                    v-model="sortNameAll"
                    name="sortName"
                  >
                    <option value="" disabled>Select type to sort</option>
                    <option value="createdAt">None</option>
                    <option value="price" style="font-weight: 600">
                      Price
                    </option>
                    <option value="name">Name</option>
                  </select>
                  <select class="form-select" name="price" v-model="priceAll">
                    <option value="all">All</option>
                    <option value="1">Lower than 200.000</option>
                    <option value="2">200.000 - 1 Million</option>
                    <option value="3">Above 1 Million</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-content-list">
        <div
          class="card product-item"
          v-for="product in productList"
          :key="product.index"
          @click="Route('productDetailsView', 'all', product._id)"
        >
          <img
            :src="`http://localhost:2371/${product.productImg}`"
            alt="product-img"
          />
          <div class="item-info">
            <div class="item-name">
              <h6>{{ product.name }}</h6>
            </div>
            <div
              class="item-status"
              :style="[
                status == product.status
                  ? {
                      color: '#e040fb',
                      fontWeight: '600',
                      textShadow: ' 0 0 10px #ff8a80',
                    }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              <p>{{ product.status }}</p>
            </div>
            <div class="item-price">
              <p>{{ convertCurrency(product.price) }} VND</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="btn btn_load-more"
        @click="loadMore"
        v-if="displayLoadMoreBtn"
      >
        Load more
      </div>
    </div>
    <!-- <div v-observe-visibility="visibilityChanged"></div> -->
    <div class="product-list container" v-else>
      <div class="product-features">
        <div class="table-search-box">
          <input
            type="text"
            class="form-control form-input"
            placeholder="Search anything..."
            v-model="search"
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
                  <select class="form-select" v-model="kindOf" name="sort">
                    <option value="-1" style="font-weight: 600">
                      Descending
                    </option>
                    <option value="1">Ascending</option>
                  </select>
                  <select
                    class="form-select"
                    v-model="sortName"
                    name="sortName"
                  >
                    <option value="" disabled>Select type to sort</option>
                    <option value="createdAt">None</option>
                    <option value="price" style="font-weight: 600">
                      Price
                    </option>
                    <option value="name">Name</option>
                  </select>
                  <select class="form-select" name="price" v-model="price">
                    <option value="all">All</option>
                    <option value="1">Lower than 200.000</option>
                    <option value="2">200.000 - 1 Million</option>
                    <option value="3">Above 1 Million</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-content-list">
        <div
          class="card product-item"
          v-for="product in cateProductList"
          :key="product.index"
          @click="Route('productDetailsView', product.category, product._id)"
        >
          <img
            :src="`http://localhost:2371/${product.productImg}`"
            alt="product-img"
          />
          <div class="item-info">
            <div class="item-name">
              <h6>{{ product.name }}</h6>
            </div>
            <div
              class="item-status"
              :style="[
                status == product.status
                  ? {
                      color: '#e040fb',
                      fontWeight: '600',
                      textShadow: ' 0 0 10px #ff8a80',
                    }
                  : { color: 'red', fontWeight: '600' },
              ]"
            >
              <p>{{ product.status }}</p>
            </div>
            <div class="item-price">
              <p>{{ convertCurrency(product.price) }} VND</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      displayLoadMoreBtn: true,
      productList: [],
      tempProductList: [],
      status: "IN STOCK",
      currentPage: 1,
      pageTotals: 0,
      cateProductList: [],
      kindOf: "-1",
      price: "all",
      sortName: "createdAt",
      search: "",
      kindOfAll: "-1",
      priceAll: "all",
      sortNameAll: "createdAt",
      searchAll: "",
      // page: 0,
    };
  },
  props: {
    cateId: String,
  },
  methods: {
    convertCurrency(value) {
      let currency;
      currency = value.toLocaleString();
      return currency;
    },
    Route(value, cateId, id) {
      this.$router.push({ name: value, params: { cateType: cateId, id: id } });
    },
    // get alll products
    async getProduct() {
      let res;
      if (this.price == "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(`api/Product`, {
            params: {
              page: this.currentPage,
              kindOf: this.kindOfAll,
              sortName: this.sortNameAll,
              search: this.searchAll,
            },
          });
        } catch (error) {
          // console.log(error);
        }
      } else if (this.price != "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(`api/Product`, {
            params: {
              page: this.currentPage,
              kindOf: this.kindOfAll,
              price: this.priceAll,
              sortName: this.sortNameAll,
              search: this.searchAll,
            },
          });
        } catch (error) {
          // console.log(error);
        }
      }
      this.pageTotals = res.data.pageTotals;
      this.productList = res.data.data;
    },
    // pagination for all products
    async getProductPagination() {
      let res;
      if (this.priceAll == "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(`api/Product`, {
            params: {
              page: this.currentPage,
              kindOf: this.kindOfAll,
              sortName: this.sortNameAll,
              search: this.searchAll,
            },
          });
        } catch (error) {
          // console.log(error);
        }
      } else if (this.priceAll != "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(`api/Product`, {
            params: {
              page: this.currentPage,
              kindOf: this.kindOfAll,
              price: this.priceAll,
              sortName: this.sortNameAll,
              search: this.searchAll,
            },
          });
        } catch (error) {
          // console.log(error);
        }
      }

      this.pageTotals = res.data.pageTotals;
      this.productList = this.productList.concat(res.data.data);
    },
    // get product by category
    async getCateDetails() {
      let res;
      if (this.price == "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/Product/getProductCate/${this.cateId}`,
            {
              params: {
                kindOf: this.kindOf,
                sortName: this.sortName,
                search: this.search,
              },
            }
          );
        } catch (error) {
          // console.log(error);
        }
      } else if (this.price != "") {
        try {
          this.$store.dispatch("accessToken");
          res = await this.$axios.get(
            `api/Product/getProductCate/${this.cateId}`,
            {
              params: {
                kindOf: this.kindOf,
                price: this.price,
                sortName: this.sortName,
                search: this.search,
              },
            }
          );
        } catch (error) {
          // console.log(error);
        }
      }
      this.cateProductList = res.data.data;
    },
    loadMore() {
      if (this.currentPage == this.pageTotals) {
        return;
      } else {
        this.currentPage = this.currentPage + 1;
        this.getProductPagination();
      }
    },
  },
  watch: {
    currentPage() {
      if (this.currentPage == this.pageTotals) {
        this.displayLoadMoreBtn = false;
      } else {
        this.displayLoadMoreBtn = true;
      }
    },
    pageTotals() {
      if (this.pageTotals == 1) {
        this.displayLoadMoreBtn = false;
      } else {
        this.displayLoadMoreBtn = true;
      }
    },
    cateId() {
      if (this.cateId != "all") {
        this.getCateDetails();
      } else {
        this.currentPage = 1;
        this.getProduct();
      }
    },
    kindOf() {
      this.getCateDetails();
    },
    sortName() {
      this.getCateDetails();
    },
    price() {
      this.getCateDetails();
    },
    search() {
      this.getCateDetails();
    },
    kindOfAll() {
      this.currentPage = 1;
      this.getProduct();
    },
    sortNameAll() {
      this.currentPage = 1;
      this.getProduct();
    },
    priceAll() {
      this.currentPage = 1;
      this.getProduct();
    },
    searchAll() {
      this.currentPage = 1;
      this.getProduct();
    },
  },
  // mounted() {
  //   let observer = new IntersectionObserver(isElScrolledIntoView, {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.25,
  //   });
  //   const elements = document.querySelector("footer");

  //   observer.observe(elements);
  //   function isElScrolledIntoView(entries) {
  //     if (entries[0].isIntersecting) {
  //       console.warn("Intersecting with the viewport");
  //     }
  //   }
  // },
  mounted() {
    if (this.cateId === "all") {
      this.getProduct();
    } else {
      this.getCateDetails();
    }
  },
};
</script>

<style scoped>
.product-features {
  margin-top: 2%;
}
.table-search-box {
  width: 34%;
  margin: auto;
}
.table-search-box input {
  height: 60px;
  border-radius: 30px;
  font-size: 15px;
  padding: 0 18px;
  letter-spacing: 0.3px;
}
.filter {
  margin-top: 20px;
}
.accordion-item button {
  height: 40px;
  border-radius: 20px;
}
.sort-bar {
  padding: 10px;
  display: flex;
  gap: 40px;
}
.sort-bar select {
  padding: 12px;
  width: 400px;
  font-weight: 500;
  border-radius: 30px;
}
.product-content-list {
  margin-top: 4%;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  column-gap: 60px;
  /* flex-wrap: wrap; */
  row-gap: 70px;
  /* justify-content: center; */
}
.card.product-item {
  /* border: solid; */
  /* width: 30%; */
  border: none;
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
  letter-spacing: 0.3px;
}
.item-price p {
  color: rgb(98, 95, 95);
  float: right;
  letter-spacing: 0.2px;
}

.btn_load-more {
  border: 3px solid #aa00ff;
  border-radius: 10px;
  margin-top: 3%;
  font-weight: 500;
}
/* -- btn-reset ---*/
.btn-to-reset {
  border: solid;
  position: relative;
}
.btn-reset {
  position: absolute;
  right: -47%;
  width: 5%;
  color: white;
  font-weight: 500;
  font-size: 16px;
  background: #aa00ff;
  border-radius: 7px;
  border: none;
}
.tooltips {
  position: relative;
  left: 100px;
}

/* ---- Responsive --- */
/* @media screen and (max-width: 1400px){

} */
@media screen and (max-width: 1025px) {
  .table-search-box {
    width: 40%;
    margin: auto;
  }
  .product-content-list {
    column-gap: 24px;
    row-gap: 70px;
  }
}
@media screen and (max-width: 993px) {
  .item-name h6 {
    font-size: 15px;
  }
}
@media screen and (max-width: 767px) {
  .table-search-box {
    width: 60%;
    margin: auto;
  }
  .sort-bar select {
    width: 127px;
  }
  .sort-bar {
    gap: 25px;
  }
  .product-content-list {
    margin-top: 10%;
    row-gap: 50px;
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .sort-bar select {
    width: 82px;
    font-size: 15px;
  }
  .sort-bar {
    gap: 20px;
    padding: 0;
  }
  .product-content-list {
    row-gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
