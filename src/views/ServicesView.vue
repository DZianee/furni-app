<template>
  <div class="services-view container">
    <div class="services-overview">
      <h1>Our Services</h1>
      <hr />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
    </div>
    <div class="services-container">
      <div class="services-content">
        <div class="service-title">
          <h2>House Furniture Design</h2>
        </div>
        <button @click="showContact = !showContact">Contact us now</button>
        <div class="contact-info" v-if="showContact">
          <p><span>PD Team Department</span></p>
          <p><span>Contact:</span> +137872389</p>
        </div>
        <div class="service-des">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-template"
      />
      <img
        src="https://images.pexels.com/photos/3935354/pexels-photo-3935354.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-template"
      />
      <img
        src="https://images.pexels.com/photos/7195743/pexels-photo-7195743.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-template"
      />
    </div>
    <div class="services-container">
      <img
        src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-design-team"
      />
      <div class="services-content">
        <div class="service-title">
          <h2>Cooperate Self-Designed</h2>
        </div>
        <button @click="showContact = !showContact">Contact us now</button>
        <div class="contact-info" v-if="showContact">
          <p><span>Talent Innovation Team Department</span></p>
          <p><span>Contact:</span> +137873243</p>
        </div>
        <div class="service-des">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/4409369/pexels-photo-4409369.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-design-team"
      />

      <img
        src="https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
        alt="img-design-team"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesView",
  data() {
    return {
      showContact: false,
    };
  },
};
</script>

<style scoped>
.services-view {
  margin-top: 50px;
  /* border: solid; */
}
.services-overview h1 {
  text-align: center;
  font-weight: 600;
}
.services-overview p {
  padding: 15px 25px;
}
.services-container {
  margin: 70px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.services-content {
  max-width: 48%;
  padding: 15px;
}
.service-title h2 {
  font-weight: 500;
  text-align: center;
}
.services-content button {
  transform: translateX(190px);
  margin-top: 15px;
  color: wheat;
  font-weight: 500;
  background: #000;
  padding: 7px;
  font-size: 16px;
  border-radius: 7px;
}
.contact-info {
  text-align: center;
  margin-top: 20px;
  background: #fff0f0;
  border-bottom: solid rgb(223, 220, 220);
  border-top: solid rgb(218, 217, 217);
  padding: 10px;
}
.contact-info span {
  font-weight: 600;
}
.service-des {
  margin: 15px;
}
img {
  width: 48%;
  border-radius: 15px;
}
</style>
