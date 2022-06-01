<template>
  <div class="delivery-counter">
    <div class="card new-orders">
      <div class="name-counter">
        <h6>New orders</h6>
        <p>22/22/2022</p>
      </div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="88"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
    <div class="card unchecked-orders">
      <div class="name-counter">
        <h6>Unchecked orders</h6>
      </div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="128"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
    <div class="card month-orders">
      <div class="name-counter">
        <h6>This month orders</h6>
        <p>12/2022</p>
      </div>
      <p class="counter">
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="428"
          prefix=""
          suffix=""
          separator=""
          decimalSeparator="."
          :autoinit="true"
        />
      </p>
    </div>
  </div>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "DeliveryCounter",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
};
</script>

<style scope>
.delivery-counter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 100px;
  padding: 10px;
}

/* --- Card --- */
.delivery-counter .card {
  border-radius: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.name-counter {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  text-align: center;
}
.counter {
  text-align: center;
  font-size: 40px;
  margin-top: 10px;
}
.delivery-counter .new-orders {
  background: linear-gradient(to top, #9f51ff, #faf096, #faf7e6);
}
.delivery-counter .unchecked-orders {
  background: linear-gradient(to top, #9f51ff, #fbb6b6, #faf7e6);
}
.delivery-counter .month-orders {
  background: linear-gradient(to top, #9f51ff, #b7fbff, #effffd);
}
.name-counter h6 {
  font-weight: 600;
}
.name-counter p {
  font-weight: 500;
}
</style>
