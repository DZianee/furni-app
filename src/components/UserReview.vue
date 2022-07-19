<template>
  <div class="user-review">
    <div class="title">
      <h4>Reviews</h4>
      <hr />
    </div>
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
    </div>
    <UserComment :reviewList="reviewList" :productId="productId" />
  </div>
</template>

<script>
import UserComment from "./UserComment.vue";
export default {
  name: "UserReview",
  components: { UserComment },
  props: {
    productId: String,
    reviewList: Array,
  },
  data() {
    return {
      displayErrorMissing: false,
      displayErrorLength: false,
      productComment: {
        comment: "",
        user: "",
        avatar: "",
        firstname: "",
        lastname: "",
        rating: "",
      },
    };
  },
  methods: {
    async newComment() {
      try {
        if (
          this.productComment.comment == "" ||
          this.productComment.rating == ""
        ) {
          this.displayErrorMissing = true;
        } else {
          this.displayErrorMissing = false;
        }
        if (this.productComment.comment < 30) {
          this.displayErrorLength = true;
        } else {
          this.displayErrorLength = false;
        }
        if (
          this.productComment.comment != "" &&
          this.productComment.rating != "" &&
          this.productComment.comment >= 30
        ) {
          this.$store.dispatch("accessToken");
          this.$store.dispatch("getUser");
          const user = JSON.parse(this.$store.state.user);
          this.productComment.user = user.id;
          console.log(user);
          console.log(user.avatar);
          this.productComment.firstname = user.firstname;
          this.productComment.lastname = user.lastname;
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
        console.log(error);
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
.input-review {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}
.title h4 {
  padding: 10px 20px;
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
</style>
