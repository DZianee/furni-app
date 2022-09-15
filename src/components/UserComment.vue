<template>
  <div class="user-comment">
    <div class="review-features">
      <select name="comment">
        <option value="like">Top highest likes</option>
        <option value="createdAt">Newest comment</option>
      </select>
    </div>
    <div class="review-container">
      <div class="review-comment" v-if="reviewList.length < 1">
        <p style="text-align: center; color: grey; font-style: italic">
          There is no review exist yet
        </p>
      </div>
      <div class="review-comment" v-else>
        <div class="card comment" v-for="cmt in reviewList" :key="cmt.index">
          <div class="comment-card-header">
            <div class="user-info">
              <div class="user-avatar">
                <img :src="`${cmt.avatar}`" alt="user-avatar" />
              </div>
              <div class="user_fullname-date">
                <div class="user-fullname">
                  <h6>{{ cmt.firstname }} {{ cmt.lastname }}</h6>
                </div>
                <div class="user-date">
                  <p style="font-size: 14px">
                    {{ convertDateTime(cmt.dateCreated) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="user-criticise-react">
              <div class="user-criticise" :style="checkColor(cmt.rating)">
                {{ cmt.rating }}
              </div>
              <div class="criticise_react-option">
                <div class="users-reacts">
                  <div
                    class="unreact"
                    v-if="cmt._id === examineUserInReactIf()"
                  >
                    <i
                      class="bx bxs-heart"
                      style="color: red"
                      @click="removeReact(cmt._id)"
                    ></i>
                    {{ cmt.countReacts }}
                  </div>
                  <div class="react" v-else>
                    <i
                      class="bx bx-heart"
                      style="color: red"
                      @click="addReact(cmt._id)"
                    ></i>
                    {{ cmt.countReacts }}
                  </div>
                  <!-- <div class="unreact" v-if="cmt._id === examineUserInReact()">
                  <i
                    class="bx bxs-heart"
                    style="color: red"
                    @click="test ? addReact(cmt._id) : removeReact(cmt._id)"
                  ></i>
                  {{ cmt.countReacts }}
                </div> -->
                </div>
                <div class="more-option" v-if="cmt.user === userId">
                  <i
                    class="bx bx-dots-horizontal-rounded"
                    data-bs-target="#cmtModal"
                    data-bs-toggle="modal"
                    @click="openEditModal(cmt._id)"
                  ></i>
                  <!-- <div class="features_edit-remove">
                <i class="bx bx-trash bx-fw"></i>
                <i class="bx bx-edit-alt bx-fw"></i>
              </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="comment-card-body">
            <p>
              {{ cmt.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <component
    :is="'comment-modal'"
    :confirmText="confirmText"
    :btnProperty="btnProperty"
    @submit="updateChange"
  >
    <div class="modal-content">
      <div class="criticise-option">
        <select name="criticise" required v-model="detailsReview.rating">
          <option value="" disabled>Select rating</option>
          <option
            value="EXCELLENT"
            :selected="detailsReview.rating === 'EXCELLENT'"
          >
            EXCELLENT
          </option>
          <option value="GOOD" :selected="detailsReview.rating === 'GOOD'">
            GOOD
          </option>
          <option value="FAIR" :selected="detailsReview.rating === 'FAIR'">
            FAIR
          </option>
          <option value="POOR" :selected="detailsReview.rating === 'POOR'">
            POOR
          </option>
        </select>
      </div>
      <div class="input-review">
        <textarea
          name="review"
          cols="30"
          rows="10"
          minlength="30"
          required
          v-model="detailsReview.comment"
        ></textarea>
      </div>
    </div>
  </component>
  <component :is="'remove-modal'" @delete-confirm="deleteConfirm"></component>
  <component
    :is="'notifi-modal'"
    @close-modal="closeWarning"
    :openModal="displayWarning"
    >Oops! Please Sign In to experience this</component
  >
</template>

<script>
export default {
  name: "UserComment",
  props: {
    productId: String,
  },
  data() {
    return {
      displayWarning: false,
      reviewList: [],
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      detailsReview: {},
      detailsReview4React: {},
      reviewId: "",
      reviewReactId: "",
      totalLikes: 0,
      commentReact: {
        like: 1,
        user: "",
      },
      examineValue: [],
      commentId: "",
      test: [],
      x: "",
      matchUser: false,
    };
  },
  computed: {
    userId() {
      let result;
      const x = JSON.parse(this.$store.state.user);
      if (x == null) {
        result = "";
      } else {
        result = x.id;
      }
      return result;
    },
  },
  methods: {
    examineUserInReactIf() {
      let result;
      let finalResult;

      result = this.examineValue.some(({ user }) => user == this.userId);
      if (result == true) {
        finalResult = this.commentId;
      } else {
        finalResult = this.userId;
      }
      return finalResult;
    },
    async examineUserInLikeList(value) {
      let result;
      let finalResult;

      await this.getReviewDetailsForReact(value);
      result = this.test.some(({ user }) => user == this.userId);

      if (result == true) {
        finalResult = this.userId;
      } else {
        finalResult = false;
      }
      return finalResult;
    },
    async getReviewDetailsForReact(value) {
      try {
        console.log(value);

        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productId}/Review/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.test = res.data.data.like;
      } catch (error) {
        console.log(error);
      }
      //   console.log(value);
      //   // let likeArr = [];
      //   let result;
      //   let finalResult;
      // value.forEach((item) => {
      //   likeArr.push(item.like);
      // });
      // console.log(likeArr);
      // likeArr.forEach((item) => {
      //   result = item.some(({ user }) => user == this.userId);
      //   console.log(result);
      // if(result)
      // });
      // try {
      //   this.$store.dispatch("accessToken");
      //   const res = await this.$axios.get(
      //     `api/Product/productDetails/${this.productId}/Review/${value}`,
      //     this.$axios.defaults.headers["Authorization"]
      //   );
      //   this.detailsReview = res.data.data;
      //   this.examineValue = res.data.data.like;
      // } catch (error) {
      //   console.log(error);
      // }
    },
    checkColor(value) {
      if (value === "EXCELLENT") {
        return "color: green; text-shadow: 0 0 7px #76ff03; font-weight: 500";
      } else if (value === "GOOD") {
        return "color: blue; text-shadow: 0 0 7px #76ff03; font-weight: 500";
      } else if (value === "FAIR") {
        return "color: #f57f17; text-shadow: 0 0 7px yellow; font-weight: 500";
      } else if (value === "POOR") {
        return "color: red; text-shadow: 0 0 7px #ff8a80; font-weight: 500";
      }
    },
    closeWarning() {
      this.displayWarning = false;
    },
    convertDateTime(value) {
      const result = new Date(value);
      let year = result.getFullYear();
      let month = ("0" + (result.getMonth() + 1)).slice(-2);
      let day = ("0" + result.getDate()).slice(-2);
      return day + "-" + month + "-" + year;
    },
    openEditModal(value) {
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.reviewId = value;
      this.getReviewDetails(value);
    },
    async updateChange() {
      try {
        const update = {
          comment: this.detailsReview.comment,
          rating: this.detailsReview.rating,
          user: this.detailsReview.user,
        };
        this.$store.dispatch("accessToken");
        const res = await this.$axios.put(
          `api/Product/productDetails/${this.productId}/Review/${this.reviewId}`,
          update,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteConfirm() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.delete(
          `api/Product/productDetails/${this.productId}/Review/${this.reviewId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getProductDetails() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productId}`
        );
        this.reviewList = res.data.data.review;
        console.log(this.reviewList);
        // this.getReviewDetailsForReact(this.reviewList);
      } catch (error) {
        console.log(error);
      }
    },

    async getReviewDetails(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productId}/Review/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.detailsReview = res.data.data;
        this.examineValue = res.data.data.like;
      } catch (error) {
        console.log(error);
      }
    },

    async addReact(value) {
      if (this.userId != "") {
        try {
          this.$store.dispatch("accessToken");
          this.commentReact.user = this.userId;
          const res = await this.$axios.post(
            `api/Product/productDetails/${this.productId}/Review/${value}/React`,
            this.commentReact,
            this.$axios.defaults.headers["Authorization"]
          );

          if (res.status == 200) {
            this.getProductDetails();
            this.getReviewDetails(value);
            this.commentId = value;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.displayWarning = true;
      }
    },
    async removeReact(value) {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        const res = await this.$axios.delete(
          `api/Product/productDetails/${this.productId}/Review/${value}/React/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getProductDetails();
          this.getReviewDetails(value);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // getReact(value) {
    //   if (this.test == true) {
    //     this.addReact(value);
    //   } else if (this.test == false) {
    //     this.removeReact(value);
    //   }
    // },
  },
  watch: {
    numOfReacts() {
      console.log(this.numOfReacts);
      this.colorReact = "red";
    },
    x() {
      console.log(this.x);
    },
  },
  mounted() {
    console.log(this.reviewList);
    this.getProductDetails();
  },
};
</script>

<style scoped>
/* .user-comment {
  border: solid;
} */

/* --- features --- */
.review-features {
  /* border-top: solid 1px rgb(231, 223, 223); */
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  margin-top: 3%;
}
.review-features select {
  padding: 7px 7px;
  margin-right: 20px;
  font-size: 14px;
}

/* --- modal comment --- */
.modal-content {
  border: solid white 1px;
}
.criticise-option {
  padding-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
}
.criticise-option select {
  padding: 5px 7px;
  margin-right: 12%;
  font-size: 14px;
}

textarea {
  width: 100%;
  padding: 10px 18px;
  height: 120px;
  font-size: 14px;
}
/* --- comment --- */
.review-container {
  max-height: 450px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.review-comment {
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 50px;
}

.card {
  padding: 0 15px;
  padding-top: 10px;
  width: 100%;
  border-radius: 20px;
  border: solid #e040fb;
  /* border: none; */
  /* border-bottom: solid 3px #e040fb; */
}

.comment-card-header {
  display: flex;
  justify-content: space-between;
}
.comment-card-header .user-info,
.comment-card-header .user-criticise-react {
  display: flex;
  gap: 15px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.user-criticise-react {
  padding-top: 2%;
  font-size: 15px;
}
.comment-card-body {
  padding: 10px 25px;
}
.comment-card-body p {
  line-height: 30px;
  font-size: 14px;
}

/* --- Responsive --- */
/* @media screen and (max-width: 1400px) {
  .criticise_react-option {
    display: flex;
    flex-flow: column;
  }
} */
@media screen and (max-width: 993px) {
  .review-comment {
    grid-template-columns: 1fr 1fr;
    row-gap: 30px;
  }
}
@media screen and (max-width: 768px) {
  .review-comment {
    grid-template-columns: 100%;
    row-gap: 30px;
  }
}
</style>
