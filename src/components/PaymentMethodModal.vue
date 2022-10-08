<template>
  <div class="payment-modal">
    <div
      class="modal fade"
      id="paymentModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="option-list">
              <div class="card momo-pay" @click="optionMethod('momo')">
                <img
                  src="../assets/img/square-8c08a00f550e40a2efafea4a005b1232.png"
                  alt="momo-img"
                />
                <p>
                  Scan with
                  <span style="color: #ad1457; font-weight: 600">MOMO</span>
                </p>
              </div>
              <div class="card zalo-pay" @click="optionMethod('zalo')">
                <img src="../assets/img/zalopay-tiki.png" alt="zalo-img" />
                <p>
                  Scan with
                  <span style="color: #0091ea; font-weight: 600">Zalo</span>
                </p>
              </div>
              <div class="card cash-pay" @click="optionMethod('cash')">
                <img
                  src="https://thumbs.dreamstime.com/b/dollar-money-icon-cash-sign-bill-symbol-flat-payment-dollar-currency-icon-dollar-money-icon-cash-sign-bill-symbol-flat-payment-147323372.jpg"
                  alt=""
                />
                <p>Pay after the delivery</p>
              </div>
            </div>
            <div class="method-container">
              <i
                class="bx bx-x bx-md close-icon"
                data-bs-dismiss="modal"
                @click="close"
              ></i>
              <div class="method-welcome" v-if="displayWelcome">
                <p>Please choose one of the payment method for this order</p>
              </div>
              <div class="method-content">
                <div class="momo-method" v-if="displayMomo">
                  <p class="method-received">
                    Hurray! You have chosen the payment:
                    <span style="color: #ad1457; font-weight: 600">MOMO</span>
                  </p>
                  <p class="transation-payment">
                    This is your Transaction ID:
                    <span style="font-weight: 600">{{ transactionID }}</span
                    >. Please send this code along with the money after scanning
                    below.
                  </p>
                  <div class="scanner-img">
                    <img src="../assets/img/IMG_1549.jpg" alt="scanner-img" />
                  </div>
                  <div class="tick-paid">
                    <label for="paid"
                      ><input
                        type="radio"
                        name="option"
                        v-model="acceptOption"
                        value="momo"
                      />
                      I accepted this payment method for the order and have
                      already completely the purchase
                    </label>
                  </div>
                  <button
                    v-if="displayBtnMomo"
                    @click="nextBtn"
                    data-bs-dismiss="modal"
                  >
                    Next
                  </button>
                </div>
                <div class="zalo-method" v-if="displayZalo">
                  <p class="method-received">
                    Hurray! You have chosen the payment:
                    <span style="color: #0091ea; font-weight: 600">ZALO</span>
                  </p>
                  <p class="transation-payment">
                    This is your Transaction ID:
                    <span style="font-weight: 600">{{ transactionID }}</span
                    >. Please send this code along with the money after scanning
                    below.
                  </p>
                  <div class="scanner-img">
                    <img src="../assets/img/IMG_1550.jpg" alt="scanner-img" />
                  </div>
                  <div class="tick-paid">
                    <label for="paid"
                      ><input
                        type="radio"
                        name="option"
                        v-model="acceptOption"
                        value="zalo"
                      />
                      I accepted this payment method for the order and have
                      already completely the purchase</label
                    >
                  </div>
                  <button
                    v-if="displayBtnZalo"
                    @click="nextBtn"
                    data-bs-dismiss="modal"
                  >
                    Next
                  </button>
                </div>
                <div class="cash-method" v-if="displayCash">
                  <p class="method-received">
                    Hurray! You have chosen the payment:
                    <span style="color: #4caf50; font-weight: 600"
                      >CASH after delivery</span
                    >
                  </p>
                  <div class="scanner-img">
                    <img
                      src="https://png.pngtree.com/png-clipart/20201024/ourlarge/pngtree-hand-drawn-cartoon-tram-delivery-service-elements-png-image_2374293.jpg"
                      alt="scanner-img"
                    />
                  </div>
                  <div class="tick-paid">
                    <label for="paid"
                      ><input
                        type="radio"
                        name="option"
                        v-model="acceptOption"
                        value="cash"
                      />
                      I accepted this payment method for the order</label
                    >
                  </div>
                  <button
                    v-if="displayBtnCash"
                    @click="nextBtn"
                    data-bs-dismiss="modal"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  components: {},
  data() {
    return {
      displayWelcome: true,
      displayMomo: false,
      displayZalo: false,
      displayCash: false,
      displayBtnMomo: false,
      displayBtnZalo: false,
      displayBtnCash: false,
      acceptOption: "",
    };
  },
  props: {
    transactionID: String,
  },
  methods: {
    nextBtn() {
      if (this.acceptOption == "momo") {
        this.$emit("chosen-payment", "MOMO");
      } else if (this.acceptOption == "zalo") {
        this.$emit("chosen-payment", "ZALO");
      } else if (this.acceptOption == "cash") {
        this.$emit("chosen-payment", "CASH");
      }
    },
    optionMethod(value) {
      this.displayWelcome = false;
      switch (value) {
        case "momo":
          this.displayMomo = true;
          this.displayZalo = false;
          this.displayCash = false;
          break;

        case "zalo":
          this.displayZalo = true;
          this.displayMomo = false;
          this.displayCash = false;
          break;

        case "cash":
          this.displayCash = true;
          this.displayZalo = false;
          this.displayMomo = false;
          break;
      }
    },
  },
  watch: {
    acceptOption() {
      let value = this.acceptOption;
      switch (value) {
        case "momo":
          this.displayBtnMomo = true;
          this.displayBtnZalo = false;
          this.displayBtnCash = false;

          break;

        case "zalo":
          this.displayBtnZalo = true;
          this.displayBtnMomo = false;
          this.displayBtnCash = false;
          break;

        case "cash":
          this.displayBtnCash = true;
          this.displayBtnZalo = false;
          this.displayBtnMomo = false;
          break;
      }
    },
    acceptCash() {},
  },
  mounted() {},
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@300&family=Roboto:wght@300&family=Space+Grotesk&display=swap"); */
/* .payment-modal {
  font-family: "Roboto", sans-serif;
} */
.modal-content {
  border-radius: 10px;
  height: 500px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.modal-content {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  /* margin: 0 auto; */
}
.modal-content ::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.modal-body {
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr;
}
/* -- on the left of the modal -- */
.option-list {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
}

.card {
  /* border: solid red; */
  width: 80%;
  height: 20%;
  padding: 10px 0;
  border-radius: 7px;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  column-gap: 10px;
}
.card:hover {
  cursor: pointer;
  border: solid 1px #aa00ff;
  box-shadow: 0 0 7px 2px #b388ff;
}
.card p {
  padding: 10px;
  transform: translateY(20%);
  letter-spacing: 0.4px;
  font-size: 14px;
}
.card span {
  font-size: 17px;
}
.momo-pay img {
  width: 30%;
  border-radius: 7px;
}
.zalo-pay img {
  height: 80%;
  width: 50%;
}
.cash-pay img {
  width: 30%;
}

/* -- on the right of the modal -- */
.method-container {
  padding: 20px;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 7px;
}
.method-welcome p {
  /* font-weight: 500; */
  text-align: center;
  margin-top: 50%;
  letter-spacing: 0.5px;
  font-size: 15px;
}

/* method content */
.method-content {
  margin-top: 3%;
  padding: 10px 0;
}
.method-content p,
.method-content label {
  font-size: 14px;
  letter-spacing: 0.4px;
}
.method-content label {
  font-size: 14px;
}
.method-content .scanner-img {
  text-align: center;
}
.scanner-img img {
  width: 60%;
}
.tick-paid {
  padding: 20px 0;
}
.cash-method .scanner-img img {
  border-radius: 90px;
  width: 70%;
}
.method-content .btn-form {
  width: 30%;
  float: right;
}
.method-content button {
  background: #ae51dd;
  color: white;
  font-weight: 500;
  width: 12%;
  border: none;
  border-radius: 5px;
  padding: 3px 0;
  position: absolute;
  right: 2%;
  bottom: 2%;
}
.method-content button:hover {
  background: #991ed7;
}
/* --- success message --- */
.success-message {
  border: none;
}
.success-message p {
  line-height: 40px;
  font-weight: 500;
}
.success-message p i {
  border: solid;
  border-radius: 50px;
  width: fit-content;
}

/* --- Responsive --- */
@media screen and (max-width: 993px) {
  .modal-body {
    grid-template-columns: 100%;
    padding: 30px 0;
  }
  .card {
    width: 80%;
    height: 35%;
  }
  .momo-pay img {
    width: 24%;
  }
  .zalo-pay img {
    height: 72%;
    width: 35%;
  }
  .cash-pay img {
    width: 20%;
  }
  .option-list {
    gap: 16px;
  }
  /* -- on the right of the modal -- */
  .method-container {
    padding: 20px;
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 7px;
  }
  .method-welcome p {
    /* font-weight: 500; */
    text-align: center;
    margin-top: 10%;
    letter-spacing: 0.5px;
    font-size: 15px;
  }

  /* method content */
  .method-content {
    margin-top: 10%;
    padding: 10px 0;
  }
  .method-content p,
  .method-content label {
    font-size: 14px;
    letter-spacing: 0.4px;
  }
  .method-content label {
    font-size: 14px;
  }
  .method-content .scanner-img {
    text-align: center;
  }
  .scanner-img img {
    width: 60%;
  }
  .tick-paid {
    padding: 20px 0;
  }
  .cash-method .scanner-img img {
    border-radius: 90px;
    width: 70%;
  }
  .method-content .btn-form {
    width: 30%;
    float: right;
  }
  .method-content button {
    background: #ae51dd;
    color: white;
    font-weight: 500;
    width: 12%;
    border: none;
    border-radius: 5px;
    padding: 3px 0;
    position: absolute;
    right: 2%;
    bottom: 2%;
  }
  .method-content button:hover {
    background: #991ed7;
  }
  /* --- success message --- */
  .success-message {
    border: none;
  }
  .success-message p {
    line-height: 40px;
    font-weight: 500;
  }
  .success-message p i {
    border: solid;
    border-radius: 50px;
    width: fit-content;
  }
}
</style>
