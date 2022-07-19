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
    <div class="product-list container" v-if="cateId === 'all' || cateId == ''">
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
            <p>{{ product.price }} VND</p>
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
    <div class="product-list container" v-if="cateId != 'all'">
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
            <p>{{ product.price }} VND</p>
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
      // page: 0,
    };
  },
  props: {
    cateId: String,
    cateProductList: Array,
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(
        `api/Product`,
        {
          params: {
            page: this.currentPage,
          },
        },
        this.$axios.defaults.headers["Authorization"]
      );
      this.productList = res.data.data;
      this.tempProductList = this.productList;
      this.pageTotals = res.data.pageTotals;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    Route(value, cateId, id) {
      this.$router.push({ name: value, params: { cateType: cateId, id: id } });
      console.log(cateId);
    },
    async getProduct() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product`,
          {
            params: {
              page: this.currentPage,
            },
          },
          this.$axios.defaults.headers["Authorization"]
        );
        this.pageTotals = res.data.pageTotals;
        this.productList = this.tempProductList.concat(res.data.data);
        this.tempProductList = this.productList;
      } catch (error) {
        console.log(error);
      }
    },
    loadMore() {
      if (this.currentPage == this.pageTotals) {
        return;
      } else {
        this.currentPage = this.currentPage + 1;
        this.getProduct();
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
    console.log(this.cateId);
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
  gap: 60px;
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
  letter-spacing: 0.5px;
}
.item-price p {
  color: rgb(98, 95, 95);
  float: right;
  letter-spacing: 0.2px;
}
</style>
