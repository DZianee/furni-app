<template>
  <div class="category-list-bar">
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
  </div>
</template>

<script>
export default {
  name: "CategoryListBar",
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
  font-weight: 500;
  cursor: pointer;
  color: rgb(174, 67, 255);
}
</style>
