<template>
  <div class="buy--token--modal" :class="[tokenModalActive ? 'active' : '']">
    <a @click="toggleTokenModal()" class="modal-close">
      <img src="../../assets/img/close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="w-100">
          <div class="modal-title">
            <h3 class="light text-center">BUY AFK</h3>
            <h3 class="am-type">token</h3>
          </div>
          <div class="token-details">
            <p class="highlight">AVAILABLE TOKEN</p>
            <h1>2,500.24</h1>
            <p class="light">1 AFK TOKEN = 1.00 NGN</p>
          </div>
          <div class="token--description">
            <p class="c-white">
              You can use AFK tokens to carry out transactions on this platform
              from purchasing utilities to other items in our mart. you can also
              transfer them to your AFK mastercard and make payments on physical
              machines or withdraw from an ATM.
            </p>
          </div>
          <div class="cash--crypto--btns">
            <div>
              <div class="sub-button mr-50">
                <paystack
                  :amount="amount"
                  :email="email"
                  :paystackkey="paystackkey"
                  :reference="reference"
                  :callback="callback"
                  :close="close"
                  :embed="false"
                  class="yellowText text-uppercase"
                >
                  Buy with Cash
                </paystack>
              </div>

              <div class="sub-button ml-56">
                <button>
                  <a
                    target="_blank"
                    href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b"
                  >
                    BUY WITH CRYPTO
                  </a>
                  <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from 'vuex'
import paystack from "vue-paystack";

export default {
  components: {
    paystack
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      paystackkey: "pk_test_0a74386a6032347f675dee2ba41fb9d47bba958d", //paystack public key
      email: "foobar@example.com", // Customer email
      amount: 1000000 // in kobo
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  },
  methods: {
    callback: function(response) {
      console.log(response);
    },
    close: function() {
      console.log("Payment closed");
    },
    signOut() {},
    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },
    toggleTokenModal() {
      this.$store.commit("global/toggleTokenModal");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal"
    })
  }
};
</script>

<style scoped>
.buy--token--modal.active {
  margin-top: 0px !important;
  background-color: #131c4b !important;
}
.modal-close {
  cursor: pointer;
}
button a {
  color: #fff !important;
}
</style>
