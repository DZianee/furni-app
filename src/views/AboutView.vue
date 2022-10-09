<template>
  <div class="about-view container">
    <div class="company-overview">
      <h1>About <span>TMCi</span></h1>
      <hr />
      <div class="overview-content">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div class="company-owner">
        <img
          src="https://thumbs.dreamstime.com/b/close-up-portrait-nice-attractive-cheerful-experienced-skilled-wavy-haired-girl-ceo-boss-chief-hr-recruiter-sitting-chair-181090097.jpg"
          alt="owner"
        />
        <div class="owner-said">
          <span style="font-size: 60px">"</span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
          <span style="font-size: 60px">"</span>
          <p class="owner-name">
            <span style="font-family: Dancing Script, cursive"
              >Rosanne Gowlin</span
            >
            (TMCi owner)
          </p>
        </div>
      </div>
    </div>

    <div class="store-maintenance">
      <div class="stores">
        <h3>Stores in Vietnam</h3>
        <hr />
        <div class="stores-address">
          <ul>
            <li style="font-weight: 600">Ha Noi:</li>
            <li>12 Cau Giay, Cau Giay District, Quan Hoa Ward</li>
          </ul>
          <ul>
            <li style="font-weight: 600">TP.HCM:</li>
            <li>44 Vo Thi Sau, District 3, Ward 1</li>
          </ul>
        </div>
      </div>
      <div class="stores">
        <h3>Maintenance Policy</h3>
        <hr />
        <div class="stores-address">
          <img
            src="https://cameraezviz.com.vn/wp-content/uploads/2021/08/chinh-sach-bao-hanh-ezviz.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  created() {
    document.title = "Company";
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  margin-bottom: 50px;
}
.company-overview h1 {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  letter-spacing: 0.3px;
}
.company-overview span {
  color: #b767ff;
  font-family: "Dancing Script", cursive;
  font-weight: 600;
  font-size: 4rem;
}
.overview-content {
  padding: 2% 6%;
  font-size: 1rem;
  letter-spacing: 0.7px;
  line-height: 35px;
}
.store-maintenance {
  padding: 10px;
  margin-top: 10%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
}
.store-maintenance h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
}

.stores {
  text-align: center;
  margin-top: 5%;
}
/* .stores-address {
  display: flex;
  justify-content: space-evenly;
} */
ul {
  margin: 15px 0;
  height: fit-content;
}
li {
  list-style-type: none;
  padding: 10px 0;
  letter-spacing: 0.7px;
  font-size: 1rem;
}
.company-owner {
  margin-top: 4%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 5%;
  gap: 50px;
}
.company-owner img {
  width: 100%;
  border-radius: 15px;
}
.owner-said {
  padding: 20px;
  letter-spacing: 0.7px;
  line-height: 35px;
  font-size: 18px;
  margin: auto;
  font-style: italic;
}
.owner-said span {
  /* padding: 30px 0; */
  font-size: 2rem;
  font-weight: 700;
}
.owner-name {
  text-align: right;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
}

/* ---- Responsive ----- */
@media screen and (max-width: 1250px) {
  .store-maintenance img {
    width: 90%;
  }
}
@media screen and (max-width: 1025px) {
  .owner-said {
    font-size: 17px;
  }
}
@media screen and (max-width: 993px) {
  .company-owner {
    grid-template-columns: 100%;
  }
  .store-maintenance {
    grid-template-columns: 100%;
  }
}
</style>
