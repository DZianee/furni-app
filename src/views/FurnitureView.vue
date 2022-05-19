<template>
  <div class="furniture-view container">
    <p id="testing">Back to top</p>
    <div class="category-title" id="toTop">
      <h1>Explore more than 100+ high quality furniture items</h1>
    </div>
    <div class="list-categories">
      <ul>
        <li>All</li>
        <li>Chairs/Armchairs</li>
        <li>Sofa</li>
        <li>Shelves</li>
        <li>Mix Stuffs</li>
      </ul>
    </div>
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
                  <option value="descending">Descending</option>
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
      <div class="card product-item">
        <img
          src="https://images.pexels.com/photos/7602905/pexels-photo-7602905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="product-img"
        />
        <div class="item-info">
          <div class="item-name">
            <h5>Testing item nam info</h5>
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
            <h5>Testing item nam info gy gdygd gdhgd</h5>
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
            <h5>Testing item nam info gy gdygd gdhgd</h5>
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
            <h5>Testing item nam info gy gdygd gdhgd</h5>
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
            <h5>Testing item nam info gy gdygd gdhgd</h5>
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
            <h5>Testing item nam info gy gdygd gdhgd</h5>
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
  name: "FurnitureView",
  mounted() {
    let mybutton = document.getElementById("testing");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap");

.container {
  margin-top: 60px;
  text-align: center;
  font-family: "Poppins", sans-serif;
}
#testing {
  position: fixed;
  right: 15px;
  text-decoration: none;
  bottom: 20px;
  display: none;
  color: rgb(222, 63, 203);
  font-size: 18px;
}
#testing:hover {
  cursor: pointer;
}
.category-title h1 {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 0.7px;
}
.list-categories {
  margin-top: 30px;
  padding: 20px;
}
ul {
  display: flex;
  justify-content: center;
}
ul li {
  list-style: none;
  padding: 0 20px;
  margin: 0 20px;
  font-size: 18px;
  letter-spacing: 0.5px;
}
ul li:hover {
  font-weight: 600;
  cursor: pointer;
}
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
}
.product-list {
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
.item-name h5 {
  line-height: 35px;
}
.item-price p {
  color: rgb(126, 122, 122);
}
</style>
