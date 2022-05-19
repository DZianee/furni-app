<template>
  <div class="about-view container">
    <div class="company-overview">
      <h1>About <span>TMCi</span></h1>
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
          <span>"</span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
          <span>"</span>
          <p class="owner-name">Rosanne Gowlin (TMCi owner)</p>
        </div>
      </div>
    </div>
    <div class="stores">
      <h1>Stores in VietNam</h1>
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
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&family=Space+Grotesk&display=swap");

.container {
  margin-top: 50px;
  font-family: "Poppins", sans-serif;
}
.company-overview h1 {
  text-align: center;
  font-size: 50px;
  letter-spacing: 0.7px;
}
.company-overview span {
  color: #b767ff;
}
.overview-content {
  padding: 15px 60px;
  font-size: 18px;
  letter-spacing: 0.7px;
  line-height: 35px;
}
.stores {
  text-align: center;
  margin-top: 50px;
}
.stores-address {
  display: flex;
  justify-content: space-evenly;
}
ul {
  margin: 15px 0;
  height: fit-content;
}
li {
  list-style-type: none;
  padding: 10px 0;
  letter-spacing: 0.7px;
  font-size: 18px;
}
.company-owner {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  padding: 0 50px;
  gap: 50px;
}
.company-owner img {
  width: 48%;
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
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
}
.owner-name {
  text-align: right;
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
}
</style>
