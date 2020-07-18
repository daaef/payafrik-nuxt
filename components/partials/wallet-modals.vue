<template>
    <div class="wallet--modals">
    <div v-if="activeWalletModal === 'send'" class="wallet--send h-100 wallet-active">
      <a @click="closeFunctionModal()" class="modal-close">
        <img src="../../assets/img/close.png" alt="">
      </a>
      <div class="modal-content h-100">
        <div class="main-modal h-100">
          <div>
            <div class="w-100 text-center mb-20">
              <img v-if="activeCurrency === 'afk'" height="50" src="../../assets/img/Africoin.png" alt="">
              <img v-if="activeCurrency === 'btc'" height="50" src="../../assets/img/bitcoin.png" alt="">
              <img v-if="activeCurrency === 'eth'" height="50" src="../../assets/img/eth.png" alt="">

            </div>
            <div class="plain--input mt-12 mb-12">
              <input type="text" v-model="walletAddress" placeholder="Send to Wallet Address...">
            </div>
            <div class="plain--input mt-12 mb-12">
              <input v-model="note" type="text" placeholder="Personal note">
              <span class="optional">[optional]</span>
            </div>
            <div class="line--input mt-64 mb-4">
              <input v-model="amount" type="number" class="c-afk" placeholder="0.00">
              <span class="wallet--name">AFK</span>
            </div>
            <div class="sending--amnt flex flex-between">
              <span class="amount c-white">0.00</span>
              <span class="currency c-white">USD</span>
            </div>
            <div class="text-center mt-20">
              <button v-if="!sending" @click="sendCurrency()" class="normal-btn afk-bordered">Send</button>
              <button v-if="sending" class="normal-btn afk-bordered" disabled>Sending...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeWalletModal === 'receive'" class="wallet--recieve h-100 wallet-active">
      <a @click="closeFunctionModal()" class="modal-close">
        <img src="../../assets/img/close.png" alt="">
      </a>
      <div class="modal-content h-100">
        <div class="main-modal h-100">
          <div>
            <div class="w-100 text-center mb-20">
              <!-- <img height="50" src="../../assets/img/Africoin.png" alt=""> -->
              <img v-if="activeCurrency === 'afk'" height="50" src="../../assets/img/Africoin.png" alt="">
              <img v-if="activeCurrency === 'btc'" height="50" src="../../assets/img/bitcoin.png" alt="">
              <img v-if="activeCurrency === 'eth'" height="50" src="../../assets/img/eth.png" alt="">
            </div>
            <div class="plain--input mt-50 mb-12">
              <input v-if="activeCurrency === 'btc'" type="text" id="walletAddress" v-model="userDetails.btc_wallet">
              <input v-if="activeCurrency === 'afk'" type="text" id="walletAddress" v-model="userDetails.afk_wallet">
              <input v-if="activeCurrency === 'eth'" type="text" id="walletAddress" v-model="userDetails.eth_wallet">
              <a @click="copyText()" class="copy--btn">
                <img src="../../assets/img/copy.png" alt="">
              </a>
            </div>
            <div class="qr-code text-center mt-20 mb-20 w-100">
              <img src="../../assets/img/qr.png" alt="">
            </div>
            <div class="plain-btns mt-50">
              <div>
                <button class="plain-btn">
                  <img src="../../assets/img/email.png" alt="">
                </button>
                <span class="c-white mt-8 d-block">Email this address</span>
              </div>
              <div>
                <button class="plain-btn">
                  <img src="../../assets/img/link.png" alt="">
                </button>
                <span class="c-white mt-8 d-block">Veiw on Blockchain</span>
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
      sending: false,
      userTransferAfk: '',
      amount: 0,
      note: '',
      walletAddress: ''
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    },
    activeWalletModal() {
      return this.$store.state.global.activeWalletModal;
    },
    activeCurrency() {
      return this.$store.state.global.activeCurrency;
    }
  },
  methods: {
    copyText () {
      /* Get the text field */
      var copyText = document.getElementById("walletAddress");
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      /* Copy the text inside the text field */
      document.execCommand("copy");
      this.$toast.success('Address copied to clipboard')
    },

    closeFunctionModal() {
      this.$store.commit("global/closeFunctionModal");
    },
    async sendCurrency() {
      if (this.walletAddress === '' || this.amount === 0 ) {
        return
      } 

      this.sending = true
      // const payload = {
      //   "recipient": this.walletAddress,
      //   "requested_amount": this.amount,
      // }

      let currency = ''

      if (this.activeCurrency === 'afk') {
        currency = 'AFK'
      } else if (this.activeCurrency === 'btc') {
        currency = 'BTC'
      } else if (this.activeCurrency === 'eth') {
        currency = 'ETH'
      }

      const payload = {
        wallet_name: this.userDetails.username,
        currency: currency,
        receiving_address: this.walletAddress,
        amount: this.amount
      }

      if (this.activeCurrency === 'afk'){
        payload.wallet === 'AFK'
      } 
      else if (this.activeCurrency === 'btc') {
        payload.wallet = 'BTC'
      } 
      else if (this.activeCurrency === 'eth') {
        payload.wallet = 'ETH'
      }

      if ( this.note !== '' ) {
        payload.note = this.note
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }

      try{
        const transferResponse = await this.$axios.$post(this.baseUrl+'wallet/utilities/transfer/', payload, {headers})
        // const transferResponse = await this.$axios.$post(this.baseUrl+'transactions/transactions/send/', payload, {headers})
        this.$toast.success('Transfer successful!')
        console.log('AFK TRansfer successfull...')
        this.sending = false
      } catch(e){
        console.log(e.response)
        this.$toast.error(e.response.data.error)
        this.sending = false
      }
    },
    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal",
      closeFunctionModal: "global/closeFunctionModal",
    openFunctionModal: "global/openFunctionModal"
    })
  },
  mounted() {
      console.log('ACTIVE WALLET', this.activeWalletModal)
  }
};
</script>

<style scoped>

.modal-close {
  cursor: pointer;
}
button a {
  color: #fff !important;
}
</style>
