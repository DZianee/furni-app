<template>
  <div class="user-review">
    <div class="title">
      <h4>Reviews ({{ countReviews }})</h4>
      <hr />
    </div>
    <div class="wrapper">
      <div class="criticise-option">
        <select name="criticise" v-model="productComment.rating" required>
          <option value="" disabled>Select rating</option>
          <option value="EXCELLENT">EXCELLENT</option>
          <option value="GOOD">GOOD</option>
          <option value="FAIR">FAIR</option>
          <option value="POOR">POOR</option>
        </select>
      </div>
      <div class="input-review">
        <textarea
          required
          minlength="30"
          name="review"
          cols="30"
          rows="10"
          placeholder="Write your review here"
          v-model="productComment.comment"
        ></textarea>
        <div class="btn_submit-reset">
          <div class="btn btn-submit" @click="newComment">
            <i class="bx bx-leaf bx-sm"></i>
          </div>
          <div class="btn btn-reset" @click="resetInput">
            <i class="bx bx-reset bx-sm"></i>
          </div>
        </div>
      </div>
      <div class="error-message">
        <p v-if="displayErrorLength">Comment must be at least 30 characters</p>
        <p v-if="displayErrorMissing">Rating or Comment field is missing</p>
        <p v-if="displayErrorOverwrite">
          You have crossed the limition of comment (one per user)
        </p>
      </div>
    </div>

    <UserComment :productId="productId" />
  </div>
  <component
    :is="'notifi-modal'"
    @close-modal="closeWarning"
    :openModal="displayWarning"
  >
    You need to login to post review
  </component>
</template>

<script>
import UserComment from "./UserComment.vue";
export default {
  name: "UserReview",
  components: { UserComment },
  props: {
    productId: String,
    reviewList: Array,
    countReviews: Number,
  },
  data() {
    return {
      displayWarning: false,
      displayErrorMissing: false,
      displayErrorLength: false,
      displayErrorOverwrite: false,
      productComment: {
        comment: "",
        user: "",
        avatar: "",
        firstname: "",
        lastname: "",
        rating: "",
      },
      userName: {},
    };
  },
  methods: {
    closeWarning() {
      this.displayWarning = false;
    },
    async newComment() {
      if (this.$store.state.user == null) {
        this.displayWarning = true;
      } else {
        try {
          this.$store.dispatch("accessToken");
          this.$store.dispatch("getUser");
          this.errorHandling();
          const user = JSON.parse(this.$store.state.user);
          await this.getUser(user.id);
          const findUser = this.reviewList.filter(
            (item) => item.user === user.id
          );
          if (
            this.productComment.comment != "" &&
            this.productComment.rating != "" &&
            this.productComment.comment.length >= 30 &&
            findUser.length == 0
          ) {
            this.productComment.user = user.id;
            this.productComment.firstname = this.userName.firstname;
            this.productComment.lastname = this.userName.lastname;
            this.productComment.avatar = user.avatar;

            const res = await this.$axios.post(
              `api/Product/productDetails/${this.productId}/Review`,
              this.productComment,
              this.$axios.defaults.headers["Authorization"]
            );
            if (res.status == 200) {
              this.$router.go();
            }
          }
        } catch (error) {
          // console.log(error);
        }
      }
    },
    async getUser(value) {
      try {
        const res = await this.$axios.get(
          `api/User/userDetails/All/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.userName = res.data.data;
      } catch (error) {
        // console.log(error);
      }
    },
    errorHandling() {
      const user = JSON.parse(this.$store.state.user);
      const findUser = this.reviewList.filter((item) => item.user === user.id);
      if (
        (this.productComment.comment == "" ||
          this.productComment.rating == "") &&
        this.productComment.comment.length < 30
      ) {
        this.displayErrorMissing = true;
        this.displayErrorLength = true;
      } else if (
        this.productComment.comment == "" ||
        this.productComment.rating == ""
      ) {
        this.displayErrorMissing = true;
      } else if (this.productComment.comment.length < 30) {
        this.displayErrorLength = true;
      } else if (findUser.length > 0) {
        this.displayErrorOverwrite = true;
      } else {
        this.displayErrorLength = false;
        this.displayErrorMissing = false;
        this.displayErrorOverwrite = false;
      }
    },
    resetInput() {
      this.productComment = {};
    },
  },
  // watch: {
  //   displayErrorMissing() {
  //     this.displayErrorMissing = false;
  //   },
  // },
  mounted() {},
};
</script>

<style scoped>
/* -- error message --- */
.error-message {
  padding: 10px;
  margin-left: 6%;
}
.error-message p {
  color: red;
  font-size: 15px;
}

/* --- content --- */
.wrapper {
  width: 50%;
}
.criticise-option {
  padding-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}
.criticise-option select {
  padding: 7px 7px;
  margin-right: 12%;
  font-size: 14px;
}
.user-review {
  margin-top: 7%;
}
.input-review {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}
.title h4 {
  padding: 1% 2%;
  font-size: 21px;
}
textarea {
  width: 90%;
  padding: 10px 18px;
  margin-left: 30px;
  height: 100px;
  font-size: 14px;
}
.btn_submit-reset {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn {
  border-radius: 7px;
  width: 45px;
  height: 40px;
}
.btn-submit {
  background: #00e676;

  color: white;
}
.btn-reset {
  background: #aa00ff;
  color: white;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .wrapper {
    width: 100%;
  }
  .user-review {
    margin-top: 15%;
  }
}
/* @media screen and (min-width: 320px) and (max-width: 480px) {
  .confirm-btn button {
    width: 46%;
  }
} */
</style>
