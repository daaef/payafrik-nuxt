<template>
  <div class="sidebar" v-bind:class="sidebarClosed === true ? 'closed' : ''">
    <p>AFK Token Balance</p>
    <h6 class="token-balance">{{+userDetails.balance}}</h6>
    <div class="underline"></div>
    <nuxt-link to="token-purchase" class="token-purchase"> <i class="ti-server"></i> Buy tokens</nuxt-link><br>
    <!-- <nuxt-link to="token-purchase" class="token-purchase"> <i class="ti-wallet"></i> Withdraw tokens</nuxt-link><br> -->

    <div class="dropdown">
      <a id="withdrawalButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="token-purchase"> <i class="ti-wallet"></i> Wihdraw tokens</a>
      <div class="dropdown-menu" aria-labelledby="withdrawalButton">
          <a class="dropdown-item" @click="openModal('tokenWithdrawal')"><i class="ti-share mr-2"></i>To an account</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"><i class="ti-wallet mr-2"></i>To a smart card</a>
      </div>
    </div>

    <!-- <div class="dropdown"> -->
      <button id="transferButton"  @click="openModal('afkTransferModal')" class="transfer"> Transfer tokens <i class="ti-exchange-vertical mr-1"></i></button>
      <!-- <div class="dropdown-menu" aria-labelledby="transferButton">
          <a class="dropdown-item"><i class="ti-share mr-2"></i>To user</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"><i class="ti-wallet mr-2"></i>To Wallet</a>
      </div>
    </div> -->
    <p class="mb-4">Rank: #14</p>
    <h6 class="sidebar-heading text-uppercase shadowed-box">Your business</h6>
    <nav>
      <nuxt-link to="/user-area/dashboard" active-class="active" class="navigation">Dashboard</nuxt-link>
      <nuxt-link to="/user-area/transactions" active-class="active" class="navigation">Transactions</nuxt-link>
      <nuxt-link to="/user-area/payouts" active-class="active" class="navigation">Payouts</nuxt-link>
      <nuxt-link to="/user-area/wallet" active-class="active" class="navigation">Wallets</nuxt-link>      
      <nuxt-link to="/user-area/chats" active-class="active" class="navigation">Chats</nuxt-link>
    </nav>
    <h6 class="sidebar-heading text-uppercase shadowed-box">Other Services</h6>
    <nav>
      <!-- <a class="navigation">Utilities</a> -->
      <nuxt-link to="/user-area/mart" active-class="active" class="navigation">Mart</nuxt-link>
      <nuxt-link to="/user-area/logistics" active-class="active" class="navigation">Logistics</nuxt-link>
      <nuxt-link to="/user-area/loans" active-class="active" class="navigation">Loans</nuxt-link>
      <nuxt-link to="/user-area/chats" active-class="active" class="navigation">Investments</nuxt-link>
    </nav>
    <h6 class="sidebar-heading text-uppercase shadowed-box">Support</h6>
    <nav>
      <a class="navigation">Contact us</a>
      <a class="navigation">Documentation</a>
    </nav>
    <a @click="closeSideBar()" class="nav-closer"><i class="fa fa-times"></i></a>


    <!-- AFK Transfer Modal -->
    <div class="modal fade" id="afkTransferModal" tabindex="-1" role="dialog" aria-labelledby="afkTransferModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">Transfer Afrikoin to a user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Recipient phone number</label>
                  <input v-model="userTransferAfk" type="text" placeholder="The phone number user you are transferring to">
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
                  <button class="success-btn" v-if="!transferringAfk" @click="sendTokens()" type="button">Transfer</button>
                  <button class="success-btn" v-if="transferringAfk" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Token Withdrawal Modal -->
    <div class="modal fade" id="tokenWithdrawal" tabindex="-1" role="dialog" aria-labelledby="afkTransferModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">Transfer Afrikoin to a user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Bank</label>
                  <input v-model="userTransferAfk" type="text" placeholder="The bank you a transferring to">
                  <label>Account number</label>
                  <input v-model="userTransferAfk" type="text" placeholder="The account number you a transferring to">
                  <label>Withdral Amount (10,000 Minimum)</label>
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
                  <button class="success-btn" v-if="!transferringAfk" @click="transferAfk()" type="button">WIthdraw</button>
                  <button class="success-btn" v-if="transferringAfk" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
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
  data(){
    return {
      userTransferAfk: '',
      afkAmountToTransfer: 0,
      transferringAfk: false,
      baseUrl: process.env.baseUrl
    }
  },
  computed: {
    sidebarClosed () {
      return this.$store.state.global.sidebarClosed
    },
    userDetails () {
        return this.$store.state.global.authenticatedUser
    }
  },
  mounted () {
    console.log('the user ==>', this.userDetails)
  },
  methods:{
    openModal(modalId) {
      $('#' + modalId).modal('show')    
    },
    closeModal(modalId) {
      $('#' + modalId).modal('hide')    
    },
    closeSideBar () {
      this.$store.commit('global/closeSidebar')
    },
    ...mapMutations({
      toggleSidebar: 'global/toggleSidebar',
      closeSideBar: 'global/closeSidebar'
    }),
    async transferAfk() {
      let self = this
      this.transferringAfk = true
      const payload = {
        "recipient": this.userTransferAfk,
        "requested_amount": this.afkAmountToTransfer,
        "wallet": "AFK"
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
              self.closeModal('afkTransferModal')
              console.log('successful')
              self.getUserDetails()
          if (xmlHttp.readyState === 4 && xmlHttp.status !== 202)
              self.$toast.error('Transfer failed! Please check username or try later.')
              this.userTransferAfk = 0
              this.afkAmountToTransfer = ''
              this.transferringAfk = false
      }
      xmlHttp.open("POST", this.baseUrl+'transactions/transactions/send/', true); // true for asynchronous 
      xmlHttp.setRequestHeader("Authorization", this.userDetails.token);
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      xmlHttp.send(JSON.stringify(payload));
      this.userTransferAfk = 0
      this.afkAmountToTransfer = ''
      this.transferringAfk = false
      // xmlHttp.send(null);
    },
    async sendTokens(){
      this.transferringAfk = true
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };
      const payload = {
        "recipient": this.userTransferAfk,
        "requested_amount": this.afkAmountToTransfer,
        "wallet": "AFK"
      }
      try{
        this.transferringAfk = false
        const transferResponse = await this.$axios.$post(this.baseUrl+'transactions/transactions/send/', payload, {headers})
        this.$toast.success(transferResponse.success)
        this.closeModal('afkTransferModal')
        this.getUserDetails()
        
      }catch(e){
        this.transferringAfk = false
          // this.$toast.error(e.response.data.detail)
          // this.importingWallet = false
          console.log(e)
      }
    },
    async getUserDetails(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };

      try{
        const updatedUserDetails = await this.$axios.$get(this.baseUrl+'auth/user/profile/', {headers})
        // updatedUserDetails.token = this.userDetails.token
        console.log('User ==>', updatedUserDetails)
        const userDetailsUpdated = 
          {
              username: updatedUserDetails.username,
              token:  this.userDetails.token,
              email: updatedUserDetails.email,
              phone: updatedUserDetails.phone,
              balance: +updatedUserDetails.balance,
              id: updatedUserDetails.id,
              eos_wallet: updatedUserDetails.eos_wallet,
              btc_wallet: updatedUserDetails.btc_wallet,
              eth_wallet: updatedUserDetails.eth_wallet,
              kyc_doc_type: updatedUserDetails.kyc_doc_type,
              kyc_document_front: updatedUserDetails.kyc_document_front,
              kyc_selfie: updatedUserDetails.kyc_selfie,
              kyc_status: updatedUserDetails.kyc_status,    
          }
        this.authenticate(
          updatedUserDetails
        )
      }catch(e){
          // this.$toast.error(e.response.data.detail)
          // this.importingWallet = false
          console.log(e)
      }
    },

    authenticate (user) {
      this.$store.commit('global/authenticateUser', user)
    },
    ...mapMutations({
      authenticate: 'global/authenticateUser'
    }),
  }
}
</script>

<style>
.sidebar{
  width:100%;
  height:100%;
  background-color:#1f3d74;
  padding:20px;
  transition: all 200ms ease-in;
}

  .modal-backdrop {
    z-index:99!important;
  }

h6.sidebar-heading{
  padding:10px;
  border-radius:2px;
  margin-bottom:7px;
  background-color:#264785;
  /* font-weight:700; */
  font-size:0.7em;
  color:#97ccf1;
}

.shadowed-box{
    box-shadow: 1px 1px 9px #0000000e;
}

nav{
  margin: 10px auto;
}

a.navigation{
  font-size:0.8em;
  color:#ffffffc7!important;
  display:block;
  padding:5px;
}

a.navigation:hover{
  color:#fff!important;
}

p {
  color:#fff!important;
  font-size:0.8em;
  margin-bottom:0;
}

a.navigation.active{
  color:#F9B330!important;
}

h6.token-balance{
  color:#F9B330!important;
  font-weight:700;
  font-size:2em;
}

a.token-purchase{
  color:#F9B330;
}

a.token-purchase:hover{
  color:#fff;
  text-decoration: none;
}

a.nav-closer{
  display:none;
}

button.transfer{
  background-color: #0c224d;
  color:#ffffffe0;
  font-weight:400;
  padding: 10px;
  width:unset;
  box-shadow: 1px 1px 5px #00000026;
}

button.transfer:hover{
  background-color: #143370;
}

@media only screen and (max-width: 990px) {
  .sidebar.closed {
    left: -100%;
    /* -ms-transform: translate(-100%,0px);
    -webkit-transform: translate(-100,0px);
    transform: translate(-100,0px);  */
  }
  .sidebar{
    position:fixed;
    width:100%;
    min-height:100vh;
    height:inherit;
    z-index:995;
    overflow-y:scroll;
  }
  a.nav-closer{
    display:inline-block;
    position:absolute;
    z-index:999;
    top:20px;
    right:20px;
    color:#ffffffd9!important;
    font-size:1em;
  }
  a.nav-closer:hover{
    color:#F9B330;
  }
}
</style>
