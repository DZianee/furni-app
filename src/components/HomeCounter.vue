<template>
  <div class="home-counter container">
    <div class="counter total">
      <div>
        <h1>
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="200"
            prefix=""
            suffix=""
            separator=""
            decimalSeparator="."
            :autoinit="true"
          />
        </h1>
        <h3>located in the world</h3>
      </div>
    </div>
    <div class="content">
      <div class="counter">
        <div>
          <h1>
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="10"
              prefix=""
              suffix=""
              separator=","
              decimalSeparator="."
              :autoinit="true"
            />
          </h1>
          <h3>Stores in Asia countries</h3>
        </div>
      </div>
      <div class="counter">
        <div>
          <h1>
            <vue3-autocounter
              ref="counter"
              :startAmount="0"
              :endAmount="100"
              :duration="2"
              prefix=""
              suffix=""
              separator=","
              decimalSeparator="."
              :autoinit="true"
            />
          </h1>
          <h3>Customers</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "HomeCounter",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
};
</script>

<style scoped>
.home-counter {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10%;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}
.counter {
  text-align: center;
}
.counter.total h1 {
  font-size: 8rem;
}
.counter.total h3 {
  font-size: 2.8rem;
}
.counter.total div {
  transform: translateY(10px);
}
.content {
  margin-top: 2%;
}
.content .counter div {
  display: flex;
  margin-left: 10%;
  padding: 10px;
}
.content .counter div h1 {
  font-size: 4rem;
}
.content .counter div h3 {
  font-size: 2rem;
  padding-top: 5%;
  margin-left: 3%;
}

/* ------ Responsive ----- */
@media screen and (max-width: 1250px) {
  .counter.total h3 {
    font-size: 2rem;
  }
  .content .counter div h1 {
    font-size: 4rem;
  }
  .content .counter div h3 {
    font-size: 1.5rem;
    margin-left: 5%;
  }
}
@media screen and (max-width: 780px) {
  .counter.total h1 {
    font-size: 6rem;
  }
  .counter.total h3 {
    font-size: 1.5rem;
  }
  .content .counter div h1 {
    font-size: 3rem;
  }
  .content .counter div h3 {
    font-size: 1.2rem;
    margin-left: 5%;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .home-counter {
    margin-top: 20vw;
  }
  .counter.total h1 {
    font-size: 5rem;
  }
  .counter.total h3 {
    font-size: 1.2rem;
  }
  .content .counter div h1 {
    font-size: 2.2rem;
  }
  .content .counter div h3 {
    font-size: 1rem;
  }
}
</style>
