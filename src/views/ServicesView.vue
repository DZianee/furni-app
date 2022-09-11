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
      <div class="container-a">
        <div class="services-content">
          <div class="service-title">
            <h3>House Furniture Design</h3>
          </div>
          <div class="btns">
            <button @click="showContact = !showContact">Contact us now</button>
            <div class="contact-info" v-if="showContact">
              <p><span>PD Team Department</span></p>
              <p><span>Contact:</span> +137872389</p>
            </div>
          </div>

          <div class="service-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="img-template"
        />
      </div>
      <div class="img-wrap-a">
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
    </div>
    <div class="services-container">
      <div class="container-b">
        <img
          src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="img-design-team"
        />
        <div class="services-content">
          <div class="service-title">
            <h3>Cooperate Self-Designed</h3>
          </div>
          <div class="btns">
            <button @click="showContact = !showContact">Contact us now</button>
            <div class="contact-info" v-if="showContact">
              <p><span>Talent Innovation Team Department</span></p>
              <p><span>Contact:</span> +137873243</p>
            </div>
          </div>
          <div class="service-des">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
      </div>
      <div class="img-wrap-b">
        <img
          src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260&dpr=2"
          alt="img-design-team"
        />
        <img
          src="https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img-design-team"
        />
        <img
          src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img-design-team"
        />
      </div>
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
  margin-top: 3%;
  /* border: solid; */
}
.services-overview h1 {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
.services-overview p {
  padding: 15px 25px;
  font-size: 1rem;
  letter-spacing: 0.3px;
  line-height: 35px;
}
.services-container {
  margin: 70px 0;
  padding: 10px;
  /* display: flex;
  flex-wrap: wrap;
  gap: 40px; */
}
.services-container .container-a {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}
.services-container .container-b {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}
.services-content {
  padding: 15px;
}
.service-title h3 {
  font-weight: 500;
  text-align: center;
}
.services-content .btns {
  display: flex;
  justify-content: center;
}
.services-content button {
  margin-top: 2%;
  color: wheat;
  font-weight: 500;
  background: #000;
  padding: 2%;
  font-size: 1rem;
  border-radius: 20px;
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
  font-size: 1rem;
  letter-spacing: 0.3px;
  line-height: 35px;
}

/**  img **/
/* --- wrap a --- */
.img-wrap-a,
.img-wrap-b {
  margin-top: 3%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3%;
}
.img-wrap-a img,
.img-wrap-b img {
  width: 100%;
  border-radius: 15px;
}
.img-wrap-a :first-child,
.img-wrap-b :first-child {
  display: none;
}

img {
  width: 100%;
  border-radius: 15px;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .services-container .container-a,
  .services-container .container-b {
    display: grid;
    grid-template-columns: 100%;
  }
  .services-container .container-a img,
  .services-container .container-b img {
    display: none;
  }
  .img-wrap-a,
  .img-wrap-b {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3%;
    overflow-x: auto;
    scroll-behavior: smooth;
    overflow-y: hidden;
  }
  .img-wrap-a,
  .img-wrap-b {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    /* margin: 0 auto; */
  }
  .img-wrap-a ::-webkit-scrollbar,
  .img-wrap-b ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  .img-wrap-a img,
  .img-wrap-b img {
    width: 400px;
  }
  .img-wrap-a :first-child,
  .img-wrap-b :first-child {
    display: block;
  }
}
</style>
