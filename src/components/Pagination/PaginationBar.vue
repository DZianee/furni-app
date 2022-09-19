<template>
  <div class="pagination-bar container">
    <div class="se-previous-btn" v-if="displaySePreviousBtn">
      <i class="bx bx-chevron-left bx-fw bx-md"></i>
    </div>
    <div class="previous-btn" @click="previousAction" v-if="displayPreviousBtn">
      <i class="bx bx-chevron-left bx-fw bx-md"></i>
    </div>
    <div class="pagintion-content">
      <p>
        Page <span style="font-weight: 500">{{ currentPage }}</span> of
        <span style="font-weight: 500">{{ totalPages }}</span>
      </p>
    </div>
    <div class="se-next-btn" v-if="displaySeNextBtn">
      <i class="bx bx-chevron-right bx-fw bx-md"></i>
    </div>
    <div class="next-btn" @click="nextAction" v-if="displayNextBtn">
      <i class="bx bx-chevron-right bx-fw bx-md"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationBar",
  props: {
    totalPages: Number,
    currentPage: Number,
    displayPreBtn: Boolean,
  },
  data() {
    return {
      displayPreviousBtn: false,
      displaySePreviousBtn: true,
      displayNextBtn: true,
      displaySeNextBtn: false,
    };
  },
  methods: {
    activatePrev() {},
    previousAction() {
      this.$emit("click-previous", this.currentPage - 1);
    },
    nextAction() {
      this.$emit("click-next", this.currentPage + 1);
    },
  },
  watch: {
    currentPage() {
      if (this.currentPage > 1) {
        this.displayPreviousBtn = true;
        this.displaySePreviousBtn = false;
      } else {
        this.displaySePreviousBtn = true;
        this.displayPreviousBtn = false;
      }
      if (this.currentPage == this.totalPages) {
        this.displayNextBtn = false;
        this.displaySeNextBtn = true;
      } else {
        this.displayNextBtn = true;
        this.displaySeNextBtn = false;
      }
    },
    totalPages() {
      if (this.totalPages > 1) {
        this.displayNextBtn = true;
        this.displaySeNextBtn = false;
      } else {
        this.displayNextBtn = false;
        this.displaySeNextBtn = true;
      }
    },
  },
  mounted() {
    if (this.currentPage == this.totalPages) {
      this.displaySeNextBtn = true;
      this.displayNextBtn = false;
    } else {
      this.displaySeNextBtn = false;
      this.displayNextBtn = true;
    }
  },
};
</script>

<style scoped>
.pagination-bar {
  margin-top: 3%;
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.previous-btn,
.next-btn {
  cursor: pointer;
}

.se-previous-btn i {
  color: white;
}
.se-next-btn i {
  color: white;
}

i,
span {
  color: #8800ff;
}
</style>
