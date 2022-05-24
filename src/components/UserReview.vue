<template>
  <div class="user-review">
    <div class="title">
      <h4>Reviews</h4>
      <hr />
    </div>
    <div class="input-review">
      <textarea
        name="review"
        cols="30"
        rows="10"
        placeholder="Write your review here"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserReview",
};
</script>

<style scoped>
.title h4 {
  padding: 10px 20px;
}
textarea {
  width: 90%;
  padding: 10px 18px;
  margin-left: 20px;
  height: 170px;
}
</style>
