<template>
  <div>
    <aside>
      <div class="links--and--logo">
        <div class="logo">
          <img src="../../assets/img/logo.png" alt="logo" />
        </div>
        <ul>
          <!-- <li class="active"> -->
          <li>
            <nuxt-link to="/user-area/dashboard" active-class="active-link">
              <img class="mr-20" src="../../assets/img/home.png" alt="" />
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="wallet" active-class="active-link">
              <img
                class="mr-20"
                src="../../assets/img/side-wallet.png"
                alt=""
              />
              Wallet
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/user-area/mart" active-class="active-link">
              <img class="mr-20" src="../../assets/img/mart.png" alt="" />
              Mart
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/user-area/exchange" active-class="active-link">
              <img
                class="mr-20"
                src="../../assets/img/side-exchange.png"
                alt=""
              />
              Exchange
            </nuxt-link>
          </li>
          <!-- <li>
            <a href="">
              <img class="mr-20" src="../../assets/img/chat.png" alt="" />
              Chat
            </a>
          </li> -->
          <li>
            <nuxt-link to="/user-area/transactions" active-class="active-link">
              <img class="mr-20" src="../../assets/img/mart.png" alt="" />
              Transactions
            </nuxt-link>
          </li>
        </ul>
      </div>
      <ul class="main-links">
        <li>
          <a href="">
            <img class="mr-20" src="../../assets/img/setting.png" alt="" />
            Setting
          </a>
        </li>
        <li>
          <a @click="signOut()">
            <img class="mr-20" src="../../assets/img/exit.png" alt="" />
            Exit
          </a>
        </li>
      </ul>
    </aside>

    <!-- SIDEBAR -->
    <!-- <div class="sidebar_bg">
          <div class="sidebar">
            <div class="head">
              <div class="logo">
                <img src="../../assets/img/logo-.png" alt="" /><br>
                <a @click="signOut()" class="mt-3 mr-2"> Sign out</a>
              </div>

              <div class="aside">
                <div class="avatar">
                  <div v-if="userDetails.avatar !== ''" class="profile-picture" v-bind:style="{ backgroundImage: 'url(' + userDetails.avatar + ')' }" ></div>
                  <div v-if="userDetails.avatar === ''" class="profile-picture" style="" ></div>
                </div>

                <div @click="closeMenu()" class="closebutton">
                  <img src="../../assets/img/close.png" alt="" />
                </div>
              </div>
            </div>
          
            <div class="divider">
              <div class="yellow-dash"></div>
              <div class="thin-line"></div>
            </div>
            <div class="tokenbalance">
              <p class="title">AfriToken Balance</p>
              <div class="bal mb-4">
                {{+userDetails.balance}}
              </div>
            </div>
    
            <div class="tokenbuttons">
              <nuxt-link to="token-purchase">
                <div class="buttonIcon">
                  <img src="../../assets/img/icon-buy.png" alt="" />
                  <p>Buy</p>
                </div>
              </nuxt-link>
     
              <div class="dropdown">
                <a id="withdrawalButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <div class="buttonIcon">
                  <img src="../../assets/img/icon-withdraw.png" alt="" />
                  <p>Withdraw</p>
                </div>  
                </a>
                <div class="dropdown-menu" aria-labelledby="withdrawalButton">
                    <a class="dropdown-item" @click="openModal('tokenWithdrawal')"><i class="ti-share mr-2"></i>To an account</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item"><i class="ti-wallet mr-2"></i>To a smart card</a>
                </div>
              </div>
              <a @click="openModal('afkTransferModal')">
                <div class="buttonIcon">
                  <img src="../../assets/img/icon-withdraw.png" alt="" />
                  <p>Transfer AfriToken</p>
                </div>
              </a>
            </div>
         
            <div class="menubuttons">
              <div
                class="menuHeader header-business"
                @click="toggleBusiness()"
              >
                Your Business
              </div>
              <div class="businessList">
                <ul class="menuList businessMenuList">
                  <li><nuxt-link to="/user-area/dashboard" active-class="link-active">Dashboard</nuxt-link></li>
                  <li><nuxt-link to="/user-area/transactions" active-class="link-active">Transactions</nuxt-link></li>
                  <li><nuxt-link to="/user-area/wallet">Wallet</nuxt-link></li>
                  <li><nuxt-link to="/user-area/payouts" active-class="link-active">Payout</nuxt-link></li>
                  <li><nuxt-link to="/user-area/chats" active-class="link-active">Chat</nuxt-link></li>
                </ul>
              </div>

              <div
                class="menuHeader menuHeaderInactive header-services"
                @click="toggleServices()"
              >
                Other Services
              </div>
              <div class="serviceList">
                <ul class="menuList serviceMenuList">
                  <li>
                    <nuxt-link to="/user-area/mart" active-class="link-active">Mart</nuxt-link>
                  </li>
                  <li><nuxt-link to="/user-area/logistics" active-class="link-active">Logistics</nuxt-link></li>
                  <li><nuxt-link to="/user-area/loans"  active-class="link-active">Loan</nuxt-link></li>
                  <li><nuxt-link to="/user-area/loans" active-class="link-active">Investments</nuxt-link></li>
                </ul>
              </div>
              <div
                class="menuHeader menuHeaderInactive header-support"
                @click="toggleSupport()"
              >
                Support
              </div>
              <div class="supportList">
                <ul class="menuList supportMenuList">
                  <li><a href="">Contact Us</a></li>
                  <li><a href="">Documentation</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="cloud"></div>
        </div> -->
    <!-- END SIDEBAR -->
    <!-- <div class="sidebar" v-bind:class="sidebarClosed === true ? 'closed' : ''">
    <p>AFK Token Balance</p>
    <h6 class="token-balance">{{+userDetails.balance}}</h6>
    <div class="underline"></div>
    <nuxt-link to="token-purchase" class="token-purchase"> <i class="ti-server"></i> Buy tokens</nuxt-link><br>

    <div class="dropdown">
      <a id="withdrawalButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="token-purchase"> <i class="ti-wallet"></i> Wihdraw tokens</a>
      <div class="dropdown-menu" aria-labelledby="withdrawalButton">
          <a class="dropdown-item" @click="openModal('tokenWithdrawal')"><i class="ti-share mr-2"></i>To an account</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"><i class="ti-wallet mr-2"></i>To a smart card</a>
      </div>
    </div>

    <button id="transferButton"  @click="openModal('afkTransferModal')" class="transfer"> Transfer tokens <i class="ti-exchange-vertical mr-1"></i></button>

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
    <a @click="closeSideBar()" class="nav-closer"><i class="fa fa-times"></i></a> -->

    <!-- AFK Transfer Modal -->
    <div
      class="modal fade"
      id="afkTransferModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="afkTransferModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">
              Transfer AfriToken to a user
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Recipient phone number</label>
                  <input
                    v-model="userTransferAfk"
                    type="text"
                    placeholder="The phone number user you are transferring to"
                  />
                  <p class="form-tip">Please add phone code (eg: +234)</p>
                  <label>Amount</label>
                  <input
                    v-model="afkAmountToTransfer"
                    type="number"
                    placeholder="How much are you transferring?"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <button type="button" class="greyed-btn" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-4">
                  <button
                    class="success-btn"
                    v-if="!transferringAfk"
                    @click="sendTokens()"
                    type="button"
                  >
                    Transfer
                  </button>
                  <button class="success-btn" v-if="transferringAfk" disabled>
                    <i class="fa fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Token Withdrawal Modal -->
    <div
      class="modal fade"
      id="tokenWithdrawal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="afkTransferModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">
              Withdraw Your AfriTokens as Cash
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Bank</label>
                  <input
                    v-model="userTransferAfk"
                    type="text"
                    placeholder="The bank you a transferring to"
                  />
                  <label>Account number</label>
                  <input
                    v-model="userTransferAfk"
                    type="text"
                    placeholder="The account number you a transferring to"
                  />
                  <label>Withdral Amount (10,000 Minimum)</label>
                  <input
                    v-model="afkAmountToTransfer"
                    type="number"
                    placeholder="How much are you transferring?"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <button type="button" class="greyed-btn" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-4">
                  <button
                    class="success-btn"
                    v-if="!transferringAfk"
                    @click="transferAfk()"
                    type="button"
                  >
                    Withdraw
                  </button>
                  <button class="success-btn" v-if="transferringAfk" disabled>
                    <i class="fa fa-circle-notch fa-spin"></i>
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
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      userTransferAfk: "",
      afkAmountToTransfer: 0,
      transferringAfk: false,
      baseUrl: process.env.baseUrl
    };
  },
  computed: {
    sidebarClosed() {
      return this.$store.state.global.sidebarClosed;
    },
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  mounted() {
    console.log("the user ==>", this.userDetails);
  },
  methods: {
    openModal(modalId) {
      this.closeMenu();
      $("#" + modalId).modal("show");
    },
    closeModal(modalId) {
      $("#" + modalId).modal("hide");
    },
    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },
    ...mapMutations({
      toggleSidebar: "global/toggleSidebar",
      closeSideBar: "global/closeSidebar"
    }),

    signOut() {
      this.$cookies.removeAll();
      this.$router.push("/login");
    },
    async sendTokens() {
      this.transferringAfk = true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };
      const payload = {
        recipient: this.userTransferAfk,
        requested_amount: this.afkAmountToTransfer,
        wallet: "AfriToken"
      };
      try {
        this.transferringAfk = false;
        const transferResponse = await this.$axios.$post(
          this.baseUrl + "transactions/transactions/send/",
          payload,
          { headers }
        );
        this.$toast.success(transferResponse.success);
        this.closeModal("afkTransferModal");
        this.getUserDetails();
      } catch (e) {
        this.transferringAfk = false;
        // this.$toast.error(e.response.data.detail)
        // this.importingWallet = false
        console.log(e);
      }
    },
    async getUserDetails() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const updatedUserDetails = await this.$axios.$get(
          this.baseUrl + "auth/user/profile/",
          { headers }
        );
        // updatedUserDetails.token = this.userDetails.token
        console.log("User ==>", updatedUserDetails);
        const userDetailsUpdated = {
          username: updatedUserDetails.username,
          token: this.userDetails.token,
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
          kyc_status: updatedUserDetails.kyc_status
        };
        this.authenticate(updatedUserDetails);
      } catch (e) {
        // this.$toast.error(e.response.data.detail)
        // this.importingWallet = false
        console.log(e);
      }
    },

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    ...mapMutations({
      authenticate: "global/authenticateUser"
    }),

    toggleBusiness() {
      let businessList = document.querySelector(".businessList");
      let businessMenuList = document.querySelector(".businessMenuList");
      let otherServices = document.querySelector(".serviceList");
      let otherMenuServices = document.querySelector(".serviceMenuList");
      let supportList = document.querySelector(".supportList");
      let supportMenuList = document.querySelector(".supportMenuList");

      businessList.style.height = "190px";
      businessMenuList.style.display = "block";
      otherServices.style.height = "0px";
      otherMenuServices.style.display = "none";
      supportList.style.height = "0px";
      supportMenuList.style.display = "none";

      let headerBusiness = document.querySelector(".header-business");
      let headerServices = document.querySelector(".header-services");
      let headerSupport = document.querySelector(".header-support");
      headerBusiness.classList.remove("menuHeaderInactive");
      headerServices.classList.add("menuHeaderInactive");
      headerSupport.classList.add("menuHeaderInactive");
    },
    toggleServices() {
      let businessList = document.querySelector(".businessList");
      let businessMenuList = document.querySelector(".businessMenuList");
      let otherServices = document.querySelector(".serviceList");
      let otherMenuServices = document.querySelector(".serviceMenuList");
      let supportList = document.querySelector(".supportList");
      let supportMenuList = document.querySelector(".supportMenuList");

      businessList.style.height = "0px";
      businessMenuList.style.display = "none";
      otherServices.style.height = "160px";
      otherMenuServices.style.display = "block";
      supportList.style.height = "0px";
      supportMenuList.style.display = "none";

      let headerBusiness = document.querySelector(".header-business");
      let headerServices = document.querySelector(".header-services");
      let headerSupport = document.querySelector(".header-support");
      headerBusiness.classList.add("menuHeaderInactive");
      headerServices.classList.remove("menuHeaderInactive");
      headerSupport.classList.add("menuHeaderInactive");
    },
    toggleSupport() {
      let businessList = document.querySelector(".businessList");
      let businessMenuList = document.querySelector(".businessMenuList");
      let otherServices = document.querySelector(".serviceList");
      let otherMenuServices = document.querySelector(".serviceMenuList");
      let supportList = document.querySelector(".supportList");
      let supportMenuList = document.querySelector(".supportMenuList");

      businessList.style.height = "0px";
      businessMenuList.style.display = "none";
      otherServices.style.height = "0px";
      otherMenuServices.style.display = "none";
      supportList.style.height = "100px";
      supportMenuList.style.display = "block";

      let headerBusiness = document.querySelector(".header-business");
      let headerServices = document.querySelector(".header-services");
      let headerSupport = document.querySelector(".header-support");
      headerBusiness.classList.add("menuHeaderInactive");
      headerServices.classList.add("menuHeaderInactive");
      headerSupport.classList.remove("menuHeaderInactive");
    },

    closeMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "none";
    }
  }
};
</script>

<style scoped>
ul li a{
  color:#fff !important;
  text-decoration: none !important;
  cursor: pointer!important;
}

aside ul li{
  padding: 0!important;
}

aside ul li a {
  width:100%;
  padding:20px;
  height:100%;
}

aside ul li a.active-link{
  text-decoration: none !important;
  background-color: #162655;
}
/* .profile-picture {
  height: 40px;
  min-width: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #f9b330;
  background: url("../../assets/img/placeholder-profile.jpg") no-repeat center
    center;
  background: url("https://img.icons8.com/ultraviolet/40/000000/user-male-circle.png")
    no-repeat center center;
  background-size: cover;
}

.dropdown a {
  color: #202020;
} */
/* .sidebar{
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
} */
</style>
