<template>
  <div class="home-services container">
    <div class="service-title">
      <h1>Open Services</h1>
    </div>
    <div class="services-body">
      <div class="services-content a">
        <img
          class="img left"
          src="https://images.pexels.com/photos/7174386/pexels-photo-7174386.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="template_house-design"
        />
        <div class="description">
          <h2>House Furniture Design</h2>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </div>
      </div>
      <div class="services-content b">
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap");

/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */
.container {
  margin-top: 15%;
}
.services-body {
  margin-top: 2%;
}
.service-title h1 {
  text-align: center;
  font-size: 4rem;
  letter-spacing: 0.3px;
  font-family: "Open Sans", sans-serif;
}
.services-content {
  margin: 5% auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}
.img {
  width: 100%;
  opacity: 0;
  border-radius: 20px;
}
.left {
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
  font-size: 18px;
  padding: 1% 5%;
}
.services-content .description h2 {
  text-align: center;
  letter-spacing: 0.3px;
  font-weight: 500;
  padding: 3%;
}

/* ----- Responsive ----- */
@media screen and (max-width: 1400px) {
  .service-title h1 {
    font-size: 3.5rem;
  }
}
@media screen and (max-width: 1250px) {
  .service-title h1 {
    font-size: 3rem;
  }
  .services-content .description h2 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 993px) {
  .services-content .description h2 {
    font-size: 1.5rem;
    padding: 3%;
  }
  .services-content {
    margin: 5% auto;
    gap: 20px;
  }
  .services-content .description {
    font-size: 1rem;
    padding: 1% 3%;
  }
}
@media screen and (max-width: 788px) {
  .left {
    transform: translateX(-30px);
  }
}
@media screen and (max-width: 780px) {
  .service-title h1 {
    font-size: 2.5rem;
  }
  .services-content .description h2 {
    font-size: 1.2rem;
  }
  /* .services-content .description {
    font-size: 15px;
  } */
}
@media screen and (max-width: 768px) {
  .services-content .description h2 {
    font-size: 1.8rem;
  }
  .services-content {
    margin-top: 12% auto;
    grid-template-columns: 100%;
  }
  .services-content.b :nth-child(1) {
    order: 2;
  }
  .services-content.b :nth-child(2) {
    order: 1;
  }
  .right {
    transform: translateX(5px);
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .service-title h1 {
    font-size: 1.7rem;
  }
  .services-content .description h2 {
    padding: 0;
    font-size: 1.2rem;
  }
  .services-body {
    margin-top: 10%;
  }
  .container {
    margin-top: 25%;
  }

  .services-content {
    margin-top: 12% auto;
    grid-template-columns: 100%;
  }
  .right {
    transform: translateX(5px);
  }
}
</style>
