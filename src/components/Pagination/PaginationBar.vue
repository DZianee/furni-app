<template>
  <div class="pagination-bar container">
    <div class="previous-btn" @click="previousAction" v-if="displayPreviousBtn">
      <i class="bx bx-chevron-left bx-fw bx-md"></i>
    </div>
    <div class="pagintion-content">
      <p>
        Page <span style="font-weight: 500">{{ currentPage }}</span> of
        <span style="font-weight: 500">{{ totalPages }}</span>
      </p>
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
      displayNextBtn: true,
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
      } else {
        this.displayPreviousBtn = false;
      }
      if (this.currentPage == this.totalPages) {
        this.displayNextBtn = false;
      } else {
        this.displayNextBtn = true;
      }
    },
    totalPages() {
      if (this.totalPages > 1) {
        this.displayNextBtn = true;
      } else {
        this.displayNextBtn = false;
      }
    },
  },
  mounted() {
    if (this.currentPage == this.totalPages) {
      this.displayNextBtn = false;
    } else {
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
}
.previous-btn,
.next-btn {
  cursor: pointer;
}
.previous-btn {
  float: left;
}
.next-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 3px;
}
.pagintion-content {
  position: absolute;
  transform: translateX(580px);
}
i,
span {
  color: #8800ff;
}
</style>
