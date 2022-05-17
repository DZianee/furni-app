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
  margin-top: 100px;
}
.counter {
  text-align: center;
}
.counter.total h1 {
  font-size: 170px;
}
.counter.total h3 {
  font-size: 60px;
}
.counter.total div {
  transform: translateY(10px);
}
.content {
  margin-top: 2%;
}
.content .counter div {
  display: flex;
  /* justify-content: center; */
  margin-left: 100px;
  padding: 10px;
}
.content .counter div h1 {
  font-size: 90px;
}
.content .counter div h3 {
  font-size: 35px;
  padding-top: 25px;
  margin-left: 30px;
}
</style>
