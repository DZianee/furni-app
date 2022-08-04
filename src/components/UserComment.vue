<template>
  <div class="user-comment">
    <div class="review-features">
      <select name="comment">
        <option value="like">Top highest likes</option>
        <option value="createdAt">Newest comment</option>
      </select>
    </div>
    <div class="review-container">
      <div class="review-comment">
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
                    {{ convertDateTime() }}
                  </p>
                </div>
              </div>
            </div>
            <div class="user-criticise-react">
              <div class="user-criticise" :style="checkColor(cmt.rating)">
                {{ cmt.rating }}
              </div>
              <div class="users-reacts">
                <div class="react">
                  <i
                    class="bx bx-heart"
                    style="color: red"
                    @click="getReact(cmt._id)"
                  ></i>
                  {{ cmt.countReacts }}
                </div>
                <!-- <div class="unreact">
                <i
                  class="bx bxs-heart"
                  style="color: red"
                  @click="removeReact(cmt._id)"
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
  ></component>
</template>

<script>
export default {
  name: "UserComment",
  props: {
    productId: String,
  },
  data() {
    return {
      test: true,
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
    };
  },
  // computed: {
  //   userId() {
  //     const x = JSON.parse(this.$store.state.user);
  //     console.log(x.id);
  //     return x.id;
  //   },
  // },
  methods: {
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
    convertDateTime() {
      let day;
      let month;
      let year;
      this.reviewList.forEach((item) => {
        let value = item.dateCreated;

        const result = new Date(value);
        year = result.getFullYear();
        month = ("0" + (result.getMonth() + 1)).slice(-2);
        day = ("0" + result.getDate()).slice(-2);
      });
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
          `api/Product/productDetails/${this.productId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.reviewList = res.data.data.review;

        console.log(res);
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
        // this.executeReactUser();
      } catch (error) {
        console.log(error);
      }
    },
    // executeReactUser() {
    //   let user = JSON.parse(this.$store.state.user);
    //   console.log(this.detailsReview4React);
    //   let reactArr = this.detailsReview4React.like;
    //   console.log(reactArr);

    //   const userFilter = reactArr.filter((item) => item.user === user.id);
    //   console.log(userFilter.length);
    //   if (userFilter.length > 0) {
    //     this.colorReact = "red";
    //   } else {
    //     this.colorReact = "";
    //   }
    // },
    async addReact(value) {
      try {
        this.$store.dispatch("accessToken");
        // this.$store.dispatch("getUser");
        const user = JSON.parse(this.$store.state.user);
        this.commentReact.user = user.id;
        const res = await this.$axios.post(
          `api/Product/productDetails/${this.productId}/Review/${value}/React`,
          this.commentReact,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getProductDetails();
          this.test = false;
        }
      } catch (error) {
        console.log(error);
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
          this.test = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getReact(value) {
      if (this.test == true) {
        this.addReact(value);
      } else if (this.test == false) {
        this.removeReact(value);
      }
    },
  },
  watch: {
    numOfReacts() {
      console.log(this.numOfReacts);
      this.colorReact = "red";
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
  border-top: solid 1px rgb(231, 223, 223);
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
  height: 480px;
  overflow-y: auto;
}
.review-comment {
  margin-top: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.card {
  padding: 0 15px;
  padding-top: 10px;
  width: 85%;
  border-radius: 20px;
  border: solid #e040fb;
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
</style>
