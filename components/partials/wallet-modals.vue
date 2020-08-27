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
              <img v-if="activeCurrency === 'ltc'" height="50" style="width:35px" src="../../assets/img/litecoin.png" alt="">
              <img v-if="activeCurrency === 'dash'" height="50" style="width:35px" src="../../assets/img/dash.png" alt="">

            </div>
            <div class="plain--input mt-12 mb-12">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <a @click="sendMode = 'address'" :class="[sendMode === 'address'? 'c-white': '']">
                      Send to Wallet address
                    </a>
                  </div>
                  <div class="col-6 text-right">
                    <a @click="sendMode = 'username'" :class="[sendMode === 'username'? 'c-white': '']">
                      Send to payafrik user
                    </a>
                  </div>
                </div>
              </div>
              <hr>
            </div>
            <div class="plain--input mt-12 mb-12">
              <input v-if="sendMode === 'address'" type="text" v-model="walletAddress" placeholder="Send to Wallet Address...">
              <input v-if="sendMode === 'username'" type="text" v-model="username" placeholder="Send to Payafrik Username...">
            </div>
            <div class="plain--input mt-12 mb-12">
              <input v-model="note" type="text" placeholder="Personal note">
              <span class="optional">[optional]</span>
            </div>
            <div class="line--input mt-64 mb-4">
              <input v-model="amount" type="number" class="c-afk" placeholder="0.00">
              <span v-if="activeCurrency === 'afk'" class="wallet--name">AFK</span>
              <span v-if="activeCurrency === 'btc'" class="wallet--name">BTC</span>
              <span v-if="activeCurrency === 'eth'" class="wallet--name">ETH</span>
              <span v-if="activeCurrency === 'ltc'" class="wallet--name">LTC</span>
              <span v-if="activeCurrency === 'dash'" class="wallet--name">DASH</span>
            </div>
            <div class="sending--amnt flex flex-between">
              <span v-if="activeCurrency === 'afk'" class="amount c-white">{{ amount | formatNumber }}</span>
              <span v-if="activeCurrency === 'btc'" class="amount c-white">{{ amount * btcData.current_price | formatNumberLong }}</span>
              <span v-if="activeCurrency === 'eth'" class="amount c-white">{{ amount * ethData.current_price | formatNumberLong }}</span>
              <span v-if="activeCurrency === 'ltc'" class="amount c-white">{{ amount * litecoinData.current_price | formatNumberLong }}</span>
              <span v-if="activeCurrency === 'dash'" class="amount c-white">{{ amount * dashData.current_price | formatNumberLong }}</span>
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
              <img v-if="activeCurrency === 'ltc'" height="50" style="width:35px" src="../../assets/img/litecoin.png" alt="">
              <img v-if="activeCurrency === 'dash'" height="50" style="width:35px" src="../../assets/img/dash.png" alt="">
            </div>
            <div class="plain--input mt-50 mb-12">
              <input v-if="activeCurrency === 'btc'" type="text" id="walletAddress" v-model="userDetails.btc_wallet">
              <input v-if="activeCurrency === 'afk'" type="text" id="walletAddress" v-model="userDetails.afk_wallet">
              <input v-if="activeCurrency === 'eth'" type="text" id="walletAddress" v-model="userDetails.eth_wallet">
              <input v-if="activeCurrency === 'ltc'" type="text" id="walletAddress" v-model="userDetails.litecoin_wallet">
              <input v-if="activeCurrency === 'dash'" type="text" id="walletAddress" v-model="userDetails.dash_wallet">
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
      walletAddress: '',
      username: '',
      sendMode: 'address'
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.authenticatedUser;
    },
    activeWalletModal() {
      return this.$store.state.global.activeWalletModal;
    },
    activeCurrency() {
      return this.$store.state.global.activeCurrency;
    },
    btcData() {
      return this.$store.state.btcData;
    },
    ethData() {
      return this.$store.state.ethData;
    },
    litecoinData() {
      return this.$store.state.litecoinData;
    },
    dashData() {
      return this.$store.state.dashData;
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
      if (this.sendMode === "address" && (this.walletAddress === '' || this.amount === 0) ) {
        return
      } 

      if (this.sendMode === "username" && (this.username === '' || this.amount === 0) ) {
        return
      } 

      this.sending = true
      let currency = ''

      if (this.activeCurrency === 'afk') {
        currency = 'AFK'
      } else if (this.activeCurrency === 'btc') {
        currency = 'BTC'
      } else if (this.activeCurrency === 'eth') {
        currency = 'ETH'
      } else if (this.activeCurrency === 'ltc') {
        currency = 'LTC'
      } else if (this.activeCurrency === 'dash') {
        currency = 'DASH'
      }

      const payload = {
        currency: currency,
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

      if (this.sendMode === 'address'){
        payload.recipient = this.walletAddress
        payload.address_type = 'WALLET'
      } else {
        payload.recipient = this.username
        payload.address_type = 'USERNAME'
      }

      if ( this.note !== '' ) {
        payload.note = this.note
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }

      try{
        const transferResponse = await this.$axios.$post(this.baseUrl+'exchange/utilities/transfer/', payload, {headers})
        // const transferResponse = await this.$axios.$post(this.baseUrl+'transactions/transactions/send/', payload, {headers})
        this.$toast.success('Transfer successful!')
        console.log('Transfer successfull...')
        await store.dispatch('getUserDetails')
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

a {
  cursor: pointer;
}

a.c-white{
  color: #fff!important;
}
</style>
