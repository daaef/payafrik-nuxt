<template>
  <div class="buy--token--modal">
    <a @click="closeFunctionModal()" class="modal-close">
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
            <h1>{{ +userDetails.balance }}</h1>
            <p class="light">1 AFK TOKEN = {{pricePerToken}} NGN</p>
            <input type="number" v-model="tokens" placeholder="How many tokens?" >
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
                <!-- <paystack
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
                </paystack> -->
                <button>
                  <a @click="sendPaymentRequest()">
                      BUY WITH CASH
                    </a>
                </button>
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
var sha512 = require('js-sha512');
const jsSHA = require("jssha");


export default {
  components: {
    paystack
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      paystackkey: "pk_test_0a74386a6032347f675dee2ba41fb9d47bba958d", //paystack public key
      email: "foobar@example.com", // Customer email
      amount: 1000000, // in kobo
      initiatingPayment: false,
      tokens: 0,
      pricePerToken: 1
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    },
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
    closeFunctionModal() {
      this.$store.commit("global/closeFunctionModal");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal",
      closeFunctionModal: "global/closeFunctionModal"
    }),
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    async sendPaymentRequest() {
      this.initiatingPayment = true
      const transactionRef = this.reference()
      const productId = '6205'
      const paymentItemId = '101'
      const amount = this.tokens * this.pricePerToken * 100
      const siteRedirectUrl = 'https://portal.payafrik.io/user-area/payment-done'
      const macKey = 'D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F	'

      var hash = sha512(transactionRef + productId + paymentItemId + amount + siteRedirectUrl + macKey);
      // hash.update(transactionRef + productId + paymentItemId + amount + siteRedirectUrl + macKey);
      // hash.hex();

      // var hash = sha512.hmac('key', transactionRef + productId + paymentItemId + amount + siteRedirectUrl + macKey)
      // const hash = sha512(transactionRef + productId + paymentItemId + amount + siteRedirectUrl + macKey);

      // var baseStringToBeSigned = transactionRef + productId + paymentItemId + amount + siteRedirectUrl + macKey
      // var shaObj = new jsSHA('SHA-512', "TEXT"); // sha;
      // shaObj.update(baseStringToBeSigned);
      // var hash = shaObj.getHash("B64");

      const requestObject = {
        amount: amount,
        currency: 566,
        cust_id: this.userDetails.id,
        hash: hash,
        txn_ref: transactionRef,
        pay_item_id: paymentItemId,
        product_id: productId,
        site_redirect_url: siteRedirectUrl,
        cust_id_desc: this.userDetails.username,
        cust_name: this.userDetails.first_name + ' ' + this.userDetails.last_name,
        site_name: 'www.portal.payafrik.io'
      }

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      console.log('THE REQUEST OBJECT ====>', JSON.stringify(requestObject))

      try{
        const requestResponse = await this.$axios.$post('https://sandbox.interswitchng.com/collections/w/pay', requestObject, {headers})
        console.log('payment request response', requestResponse)
        // if (requestResponse.status === true){
        //     this.sendPaymentAdvice()
        // }

      } catch(e){
        console.log('TRANSACTION REQUEST ERROR===>', e)
        this.$toast.error(e)
        this.makingPayment = false
      }
    }
  }
};
</script>

<style scoped>
/* .buy--token--modal.active {
  margin-top: 0px !important;
  background-color: #131c4b !important;
} */
.modal-close {
  cursor: pointer;
}
button a {
  color: #fff !important;
}
input {
  padding: 20px;
  color: #ffffff99;
  background: #111a3f;
  border: solid 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  /* width: 100%; */
}
</style>
