<template>
  <div class="category-list-bar">
    <p id="testing">Back to top</p>
    <div class="category-title" id="toTop">
      <div v-if="cateTitle == '' || cateTitle === 'all'">
        <h1>Explore more than 100+ high quality furniture items</h1>
      </div>
      <div v-else>
        <h1>{{ cateTitle }}</h1>
      </div>
    </div>
    <div class="list-categories">
      <ul>
        <li @click="getCateTitle('all')">All</li>
        <li
          v-for="cate in categoryList"
          :key="cate.index"
          @click="getCateTitleId(cate.name, cate._id)"
        >
          {{ cate.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryListBar",
  data() {
    return {
      categoryList: [],
      cateTitle: "",
    };
  },
  props: {
    test: String,
  },
  async created() {
    try {
      this.$store.dispatch("accessToken");
      const res = await this.$axios.get(`api/Category/`);
      this.categoryList = res.data.data.content;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getCateTitleId(val, id) {
      this.cateTitle = val;
      this.$emit("cate-title-id", id);
      this.$router.push({ name: "furnitureView", params: { id: id } });
    },
    getCateTitle(val) {
      this.cateTitle = val;
      this.$emit("cate-title-all", "all");
      this.$router.push({ name: "furnitureView", params: { id: "all" } });
    },
  },
  watch: {
    test() {
      this.cateTitle = this.test;
    },
  },
  mounted() {
    let mybutton = document.getElementById("testing");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    // When the user clicks on the button, scroll to the top of the document
    mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap");
/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */

#testing {
  position: fixed;
  right: 15px;
  text-decoration: none;
  bottom: 20px;
  display: none;
  background: rgb(222, 63, 203);
  font-size: 16px;
  border: solid;
  padding: 10px;
  color: white;
  border-radius: 20px;
  z-index: 3;
}
#testing:hover {
  cursor: pointer;
}
.category-title h1 {
  font-weight: 500;
  line-height: 40px;
  font-size: 2.5rem;
  letter-spacing: 0.3px;
  /* font-family: "Open Sans", sans-serif; */
}
.list-categories {
  margin-top: 2%;
  max-height: 80px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
}
ul {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
}
.list-categories {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.list-categories::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
ul li {
  list-style: none;
  padding: 20px 0;
  margin: 0 20px;
  font-size: 18px;
  letter-spacing: 0.3px;
  width: 142px;
}
ul li:hover {
  font-weight: 500;
  cursor: pointer;
  color: rgb(174, 67, 255);
}

/* ---- Responsive --- */
@media screen and (max-width: 1250px) {
  .category-title h1 {
    font-size: 2.2rem;
  }
}
@media screen and (max-width: 993px) {
  .category-title h1 {
    font-size: 1.8rem;
  }
  ul {
    padding-left: 0;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .category-title h1 {
    font-size: 1.4rem;
  }
  ul li {
    font-size: 16px;
    margin: 0 5px;
  }
}
</style>
