<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="dashboard-card big shadowed-box afk">
            <div class="overlay">
              <img style="width:30px; margin-bottom:10px;" src="../../assets/img/logo.svg">
              <p>Africkoin Wallet</p>
              <h6>{{userDetails.balance}}</h6>
              <div class="afk-functions">                
                <a @click="openModal('afkTransferModal')" id="transfer-button"> Send to user <i class="ti-arrow-right"></i></a><br>
                <a href> Send to wallet <i class="ti-arrow-right"></i></a><br>
                <a href> Receive from wallet <i class="ti-arrow-right"></i></a><br>
                <nuxt-link to="./coin-purchase"> Purchase Coin <i class="ti-arrow-right"></i></nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="dashboard-card big shadowed-box btc">
            <div class="overlay">
              <i class="crypto-logo fab fa-bitcoin"></i>
              <p>Bitcoin Wallet</p>
              <!-- <a v-if="userDetails.btc_wallet === ''" @click="startImport('BTC')"> Import BTC wallet <i class="ti-arrow-right"></i></a>
              <span v-else> 
                <p>{{userDetails.btc_wallet}}</p>
                <h6>0.0000</h6>
              </span> -->
              <span class="text-ellipsis"> 
                <p class="crypto-key">{{userDetails.btc_wallet}}</p>
                <p v-if="gettingBtcBalance" class="crypto-key">getting BTC ballance...</p>
                <h6 v-else>{{btcBalance}}</h6>
              </span>
              <a @click="startImport('BTC')"> Import BTC wallet <i class="ti-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-card big shadowed-box eth">
            <div class="overlay">
              <i class="crypto-logo fab fa-ethereum"></i>
              <p>Ethereum Wallet</p>
              <!-- <a v-if="userDetails.eth_wallet === ''" @click="startImport('ETH')"> Import ETH wallet <i class="ti-arrow-right"></i></a>
              <span v-else> 
                <p>{{userDetails.eth_wallet}}</p>
                <h6>{{ethBalance}}</h6>
              </span> -->
              <span class="text-ellipsis"> 
                <p class="crypto-key">{{userDetails.eth_wallet}}</p>
                <p v-if="gettingEthBalance" class="crypto-key">getting ETH ballance...</p>
                <h6 v-else>{{ethBalance}}</h6>
              </span>
              <a @click="startImport('ETH')"> Import ETH wallet <i class="ti-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-lg-7">

          <div class="utitlities">
            <h6 class="text-uppercase">UTILITIES</h6>
            <div class="underline"></div>
            <div class="row">
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-mobile"></i>
                  <i class="ti-mobile floating-icon"></i>
                 <p> Mobile Topup</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-world"></i>
                  <i class="ti-world floating-icon"></i>
                  <p>Data Subscription</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-light-bulb"></i>
                  <i class="ti-light-bulb floating-icon"></i>
                  <p>Electricity</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-desktop"></i>
                  <i class="ti-desktop floating-icon"></i>
                  <p>Cable TV</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-layout-grid2"></i>
                  <i class="ti-layout-grid2 floating-icon"></i>
                  <p>Water</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="utility dashboard-card small shadowed-box">
                  <i class="ti-money floating-icon"></i>
                  <i class="ti-money"></i>
                  <p>Betting</p>
                </div>
              </div>
              <div class="col-lg-12 mt-3">
                <a href> See all utitlities <i class="ti-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="transactions">
            <h6 class="text-uppercase">RECENT TRANSACTIONS</h6>
            <div class="underline"></div>

            <ul class="list-table header-row row not-for-mobile">
              <li class="col-md-1"></li>
              <li class="col-md-7">Transaction</li>
              <li class="col-md-3">Date</li>
            </ul>

            <ul class="list-table body-row row">
              <li class="col-md-1"><i class="fa fa-circle text-success small"></i></li>
              <li class="col-md-7"><strong>N5000</strong> Airtel 1GB Data bundle</li>
              <li class="col-md-3">Oct 11, 2019</li>
            </ul>
            <ul class="list-table body-row row">
              <li class="col-md-1"><i class="fa fa-circle text-success small"></i></li>
              <li class="col-md-7"><strong>N5000</strong> Airtel 1GB Data bundle</li>
              <li class="col-md-3">Oct 11, 2019</li>
            </ul>
            <ul class="list-table body-row row">
              <li class="col-md-1"><i class="fa fa-circle text-danger small"></i></li>
              <li class="col-md-7"><strong>N5000</strong> Airtel 1GB Data bundle</li>
              <li class="col-md-3">Oct 11, 2019</li>
            </ul>
            <ul class="list-table body-row row">
              <li class="col-md-1"><i class="fa fa-circle text-warning small"></i></li>
              <li class="col-md-7"><strong>N5000</strong> Airtel 1GB Data bundle</li>
              <li class="col-md-3">Oct 11, 2019</li>
            </ul>

            <div class="col-md-12 mt-3 clear">
              <a href> See all transactions <i class="ti-arrow-right"></i></a>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- AFK Transfer Modal -->
    <div class="modal fade" id="afkTransferModal" tabindex="-1" role="dialog" aria-labelledby="afkTransferModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">Transfer Africkoin to a user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Recipient username</label>
                  <input v-model="userTransferAfk" type="text" placeholder="The user you are transferring to">
                  <label>Amount</label>
                  <input v-model="afkAmountToTransfer" type="number" placeholder="How much are you transferring?">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <button type="button" class="greyed-btn" data-dismiss="modal">Cancel</button>
                </div>
                <div class="col-md-4">
                  <button class="success-btn" v-if="!transferringAfk" @click="transferAfk()" type="button">Transfer</button>
                  <button class="success-btn" v-if="transferringAfk" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wallet Import Modal -->
    <div class="modal fade" id="walletImportModal" tabindex="-1" role="dialog" aria-labelledby="walletImportModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">Import a Cryptocurrency Wallet</h5>
            <button @click="closeModal('walletImportModal')" type="button" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Wallet Type</label>
                  <select disabled v-model="toImport" placeholder="Select crypto">
                    <option v-for="importable of importables" v-bind:key="importable.key" :value="importable.key">{{importable.name}}</option>

                  </select>

                  <label>Wallet Public Key</label>
                  <input type="text" v-model="walletAddress" placeholder="Your assigned import code" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <button type="button" class="greyed-btn" data-dismiss="modal">Cancel</button>
                </div>
                <div class="col-md-4">
                  <button class="success-btn" v-if="!importingWallet" @click="importWallet" type="button">Import</button>
                  <button class="success-btn" v-if="importingWallet" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
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
import { mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      toImport: 'BTC',
      walletAddress: '',
      importingWallet: false,
      formErrors: {},
      baseUrl: process.env.baseUrl,
      userTransferAfk: '',
      afkAmountToTransfer: 0,
      transferringAfk: false,
      gettingBtcBalance: false,
      gettingEthBalance: false,
      ethBalance: 0,
      btcBalance:0,
      importables: [
        {
          key: 'BTC',
          name: 'Bitcoin'
        },
        {
          key: 'ETH',
          name: 'Ethereum'
        },
        {
          key: 'EOS',
          name: 'EOS'
        }
      ]
    }
  },
  computed: {
    userDetails () {
        return this.$store.state.global.authenticatedUser
    }
  },
  methods:{
    openModal(modalId) {
      $('#' + modalId).modal('show')    
    },
    closeModal(modalId) {
      $('#' + modalId).modal('hide')    
    },
    startImport(toImport){
      this.toImport = toImport;
      this.openModal('walletImportModal')
    },
   async importWallet(){
     if(this.walletAddress === ''){
        this.formErrors.walletAddressError = true
     }
     this.importingWallet = true
      let payload = {}

      switch(this.toImport){
        case 'BTC':
          payload = {
            "btc_wallet":this.walletAddress,
            "eth_wallet":this.userDetails.eth_wallet,
            "eos_wallet":'eos_wallet',
          }
          break;
        case 'ETH':
          payload = {
            "btc_wallet":this.userDetails.btc_wallet,
            "eth_wallet":this.walletAddress,
            "eos_wallet":'eos_wallet',
          }
          break;
        case 'EOS':
          payload = {
            "btc_wallet":this.userDetails.btc_wallet,
            "eth_wallet":this.userDetails.eth_wallet,
            "eos_wallet":this.walletAddress,
          }
      }

      console.log(JSON.stringify(payload))

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };
     
      try{
        const importResponse = await this.$axios.$put(this.baseUrl+'auth/user/import-wallets/', payload, {headers})
        if(importResponse.success === 'updated'){
          this.$toast.success("Wallet imported successfully!")
          this.closeModal('walletImportModal')
          this.getUserDetails()
          // switch (this.toImport){
          //   case 'BTC':
          //     this.getBtcWalletBalance()
          //     break;
          //   case 'ETH':
          //    this.getEthWalletBalance()
          //     break;
          //   case 'EOS':
          //     this.getEosWalletBalance()
          // }
        }
        this.importingWallet = false
        this.walletAddress = ''
      }catch(e){
          this.$toast.error(e.response.data.detail)
          this.importingWallet = false
          console.log(e.response)
      }
    },

    async getEthWalletBalance(){
      this.gettingEthBalance = true
      console.log('getting ETH balance')
      var Web3 = require('web3')
      const testnet = 'https://mainnet.infura.io/v3/463cd18d3029471d85efed20bdccb271';
      const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
      try{
        const balance = await web3.eth.getBalance(this.userDetails.eth_wallet)
          this.gettingEthBalance = false
          console.log('balance',balance)
          this.ethBalance = +balance/1000000000000000000
          console.log(this.ethBalance) 
      }catch(e){
        this.gettingEthBalance = false
        console.log(e)
      }
    },

    async getBtcWalletBalance(){
      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Authorization': this.userDetails.token,
      // };
      this.gettingBtcBalance = true
      console.log('getting BTC balance')
      try{
        const btcWalletDetails = await this.$axios.$get('https://blockchain.info/address/' + this.userDetails.btc_wallet + '?format=json&cors=true')
        this.gettingBtcBalance = false
        console.log('BTC->',btcWalletDetails)
        this.btcBalance = btcWalletDetails.final_balance/100000000
      }catch(e){
          this.$toast.error(e.response.data.detail)
          this.gettingBtcBalance = false
          console.log(e.response)
      }
    },

    async getUserDetails(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };

      try{
        const updatedUserDetails = await this.$axios.$get(this.baseUrl+'auth/accounts/' + this.userDetails.id + '/', {headers})
        updatedUserDetails.token = this.userDetails.token
        this.authenticate(
          updatedUserDetails
        )
      }catch(e){
          this.$toast.error(e.response.data.detail)
          this.importingWallet = false
          console.log(e.response)
      }
    },

    authenticate (user) {
      this.$store.commit('global/authenticateUser', user)
    },
    ...mapMutations({
      authenticate: 'global/authenticateUser'
    }),


    async transferAfk() {
      let self = this
      this.transferringAfk = true
      const payload = {
        "recipient": this.userTransferAfk,
        "requested_amount": this.afkAmountToTransfer
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState === 4 && xmlHttp.status === 202)
              self.$toast.success('Transfer successful!')
              this.userTransferAfk = 0
              this.afkAmountToTransfer = ''
              this.transferringAfk = false
              self.getUserDetails()
              self.closeModal('afkTransferModal')
              console.log('successful')
          if (xmlHttp.readyState === 4 && xmlHttp.status !== 202)
              self.$toast.error('Transfer failed! Please check username or try later.')
              this.userTransferAfk = 0
              this.afkAmountToTransfer = ''
              this.transferringAfk = false
      }
      xmlHttp.open("POST", this.baseUrl+'transactions/transactions/send-afk/', true); // true for asynchronous 
      xmlHttp.setRequestHeader("Authorization", this.userDetails.token);
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      xmlHttp.send(JSON.stringify(payload));
      this.userTransferAfk = 0
      this.afkAmountToTransfer = ''
      this.transferringAfk = false
      // xmlHttp.send(null);
    },
    checkWallets(){
      if(this.userDetails.eth_wallet !== ''){
        console.log('look here for eth')
        this.getEthWalletBalance()
      }
      if(this.userDetails.btc_wallet !== ''){
        console.log('look here for btc')
        this.getBtcWalletBalance()
      }
    }
  },

  beforeMount(){
    this.getUserDetails(),
    this.checkWallets()
  }
}
</script>

<style>
.main{
    width:100%;
    min-height:100vh;
    height:inherit;
    background-color: #f8f8f8;
}
.afk-functions{
  position:absolute;
  bottom:40px;
  right:50px;
  width:50%;
  text-align:right;
}
.btc{
  background: url('../../assets/img/btc-bg.jpg') no-repeat center center;
  background-size:cover;
}
.eth{
  background: url('../../assets/img/eth-bg.jpg') no-repeat center center;
  background-size:cover;
}
.afk{
  background: url('../../assets/img/crypto-bg.jpg') no-repeat center center;
  background-size:cover;
}
i.crypto-logo{
  font-size:1.5em;
  color: #F9B330;
  margin-bottom:10px;
}
p.crypto-key{
  margin-top:10px;
  font-size:0.7em!important;
}
.btc h6, .eth h6, .afk h6{
  color:#fff!important;
  font-weight:700;
  font-size:1.2em;
}
.btc p, .eth p, .afk p{
  color:#fff;
  margin-bottom:0;
}
.btc a, .eth a, .afk a{
  color:#ffffffcf !important;
  margin-bottom:0;
  text-decoration:none;
  font-size:0.8em;
}
.btc a:hover, .eth a:hover, .afk a:hover{
  color:#fff;
}
.utility p{
  margin-top:10px;
  color:#242424 !important;
}
.utility{
  position:relative;
}
.utility i.floating-icon{
  position:absolute;
  font-size:5em;
  top:0;
  right:0;
  color:#53535315;
}
@media only screen and (max-width: 990px) {
  .transactions{
    margin-top:20px;
  }
}
</style>
