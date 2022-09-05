<template>
  <div class="posted-comment-view">
    <div class="empty-order-list" v-if="postList.length < 1">
      <img src="./OrderCard/Stuck-at-Home-Mailing-List.png" alt="" />
      <p>Oops! Empty Post</p>
    </div>
    <div class="card" v-for="post in postList" :key="post.index" v-else>
      <div class="comment-card-header">
        <div class="user-info">
          <div class="user-avatar">
            <img :src="`${post.avatar}`" alt="user-avatar" />
          </div>
          <div class="user_fullname-date">
            <div class="user-fullname">
              <h6>{{ post.firstname }} {{ post.lastname }}</h6>
              <i class="bx bxs-right-arrow"></i>
              <h6
                class="to-product"
                @click="
                  routeProductDetails(productReview._id, productReview.category)
                "
              >
                {{ productReview.name }}
              </h6>
            </div>
            <div class="user-date">
              <p style="font-size: 14px">
                {{ convertDateTime() }}
              </p>
            </div>
          </div>
        </div>
        <div class="user-criticise-react">
          <div class="user-criticise" :style="checkColor(post.rating)">
            {{ post.rating }}
          </div>
          <div class="users-reacts">
            <div class="react">
              <i class="bx bx-heart" style="color: red"></i>
              {{ post.countReacts }}
            </div>
          </div>
          <div class="more-option" v-if="post.user === userId">
            <i
              class="bx bx-dots-horizontal-rounded"
              data-bs-target="#cmtModal"
              data-bs-toggle="modal"
              @click="openEditModal(post._id)"
            ></i>
          </div>
        </div>
      </div>
      <div class="comment-card-body">
        <p>
          {{ post.comment }}
        </p>
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
</template>

<script>
export default {
  name: "PostedComment",
  data() {
    return {
      postList: [],
      productReview: {},
      userId: "",
      detailsReview: "",
      btnProperty: {
        color: "",
        backColor: "",
      },
      confirmText: "",
      reviewId: "",
    };
  },

  methods: {
    openEditModal(value) {
      this.confirmText = "Submit changes";
      this.btnProperty.color = "white";
      this.btnProperty.backColor = "#aa40e3";
      this.reviewId = value;
      this.getReviewDetails(value);
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
    convertDateTime() {
      let day;
      let month;
      let year;
      this.postList.forEach((item) => {
        let value = item.dateCreated;
        const result = new Date(value);
        year = result.getFullYear();
        month = ("0" + (result.getMonth() + 1)).slice(-2);
        day = ("0" + result.getDate()).slice(-2);
      });
      return day + "-" + month + "-" + year;
    },
    routeProductDetails(id, category) {
      this.$router.push({
        name: "productDetailsView",
        params: { id: id, cateType: category },
      });
    },
    async getPosts() {
      try {
        this.$store.dispatch("accessToken");
        const user = JSON.parse(this.$store.state.user);
        this.userId = user.id;
        const res = await this.$axios.get(
          `api/Product/reviewPerUser/${user.id}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.postList = res.data.data;
        this.productReview = res.data.arrProduct[0];
      } catch (error) {
        console.log(error);
      }
    },
    async getReviewDetails(value) {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.get(
          `api/Product/productDetails/${this.productReview._id}/Review/${value}`,
          this.$axios.defaults.headers["Authorization"]
        );
        this.detailsReview = res.data.data;
      } catch (error) {
        console.log(error);
      }
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
          `api/Product/productDetails/${this.productReview._id}/Review/${this.reviewId}`,
          update,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getPosts();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteConfirm() {
      try {
        this.$store.dispatch("accessToken");
        const res = await this.$axios.delete(
          `api/Product/productDetails/${this.productReview._id}/Review/${this.reviewId}`,
          this.$axios.defaults.headers["Authorization"]
        );
        if (res.status == 200) {
          this.getPosts();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
.posted-comment-view {
  padding: 1% 0 0 10%;
  height: 600px;
  overflow-y: auto;
}
/* -- empty list --- */
.empty-order-list {
  text-align: center;
}
.empty-order-list p {
  font-size: 18px;
  padding: 10px;
  font-style: italic;
}
.empty-order-list img {
  width: 30%;
}
/* -- list -- */
.card {
  padding: 0 15px;
  padding-top: 20px;
  width: 90%;
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

.user-fullname {
  display: flex;
  gap: 10px;
}
.user-fullname h6 {
  font-size: 15px;
}
.user-fullname .to-product:hover {
  cursor: pointer;
  text-decoration: underline;
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
</style>
