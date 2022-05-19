<template>
  <div class="home-services container">
    <div class="service-title">
      <h1>Incredible Services</h1>
    </div>
    <div class="services-body">
      <div class="services-content">
        <img
          class="img"
          src="https://images.pexels.com/photos/7174386/pexels-photo-7174386.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="template_house-design"
        />
        <div class="description">
          <h2>House Furniture Design</h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </div>
      </div>
      <div class="services-content">
        <div class="description">
          <h2>Cooperate Self-Designed</h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </div>
        <img
          class="img right"
          src="https://images.pexels.com/photos/7181109/pexels-photo-7181109.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="template_house-design"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeServices",
  mounted() {
    let observer = new IntersectionObserver(isElScrolledIntoView, {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    });
    // grab our elements, this will be a global class for animating elements
    const elements = document.querySelectorAll(".img");
    // loop over all elements and observe each of them
    elements.forEach((element) => {
      observer.observe(element);
    });
    // create our "what to do with each observed element" function
    function isElScrolledIntoView(entries) {
      // again loop over all entries (element)
      entries.forEach((entry) => {
        // check if the entry is intersecting at our set threshold
        if (entry.isIntersecting) {
          // set a class to toggle animation
          entry.target.classList.add("fade-in");
          // if we only want to play the animation once per page, let's also add a class for that
          //   entry.target.classList.add("scrolled-into-view-first-time");
        } else {
          // if we've stopped intersecting, let's remove the animation
          entry.target.classList.remove("fade-in");
        }
      });
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Space+Grotesk&display=swap");

.container {
  margin-top: 150px;
  font-family: "Poppins", sans-serif;
}
.service-title h1 {
  text-align: center;
  font-size: 55px;
  letter-spacing: 0.7px;
}
.services-content {
  /* border: solid; */
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}
.img {
  max-width: 100%;
  opacity: 0;
  transform: translateX(-300px);
}
.right {
  transform: translateX(30px);
}
.img.fade-in {
  opacity: 1;
  transform: translateX(0px);
  transition: 1.5s all ease;
}

.services-content .description {
  margin: auto;
  font-size: 20px;
  padding: 20px 50px;
}
.services-content .description h2 {
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: 600;
}
</style>
