<template>
  <header>
    <nav>
      <div class="balance">
        <img src="../../assets/img/logo.png" class="mobile-logo" alt="logo" />
        <span>AfriToken:</span>
        <h3>{{ +userDetails.balance | formatNumber }}</h3>
        <a class="tag-button" @click="openModal('cardRequestModal')">Request Card</a>
      </div>
      <ul class="nav-links">
        <li class="mr-32">
          <a @click="openFunctionModal('buy-token-active')">
            <img class="mr-8" src="../../assets/img/plus.png" alt="plus" />
            BUY TOKEN
          </a>
        </li>
        <li class="mr-32">
          <a @click="openFunctionModal('withdraw-active')">
            <img class="mr-8" src="../../assets/img/wallet.png" alt="wallet" />
            WITHDRAW
          </a>
        </li>
        <li>
          <a @click="openFunctionModal('transfer-token-active')">
            <img
              class="mr-8"
              src="../../assets/img/transfer.png"
              alt="transfer"
            />
            TRANSFER AFRITOKEN
          </a>
        </li>
      </ul>
      <div class="user-account">
        <a @click="openFunctionModal('profile--active')" data-link-class="profile--active">
          <img class="mr-12" src="../../assets/img/user.png" alt="user icon" />
          <span>{{ userDetails.username }}</span>
        </a>
      </div>
      <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />

      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>
      <div class="nav-dropdown">
        <div class="balance">
          <span>AfriToken:</span>
          <h3>{{ +userDetails.balance }}</h3>
        </div>
        <ul class="nav-links">
          <li>
            <a @click="openFunctionModal('buy-token-active')">
              <img class="mr-8" src="../../assets/img/plus.png" alt="plus" />
              BUY TOKEN
            </a>
          </li>
          <li>
            <a @click="openFunctionModal('withdraw-active')">
              <img
                class="mr-8"
                src="../../assets/img/wallet.png"
                alt="wallet"
              />
              WITHDRAW
            </a>
          </li>
          <li>
            <a @click="openFunctionModal('transfer-token-active')">
              <img
                class="mr-8"
                src="../../assets/img/transfer.png"
                alt="transfer"
              />
              TRANSFER AFRITOKEN
            </a>
          </li>
          <li class="active">
            <nuxt-link to="/user-area/dashboard" class=" mt-8">
              <img class="mr-8" src="../../assets/img/home.png" alt="" />
              HOME
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/user-area/wallet" class=" mt-8">
              <img class="mr-8" src="../../assets/img/side-wallet.png" alt="" />
              WALLET
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/user-area/mart" class=" mt-8">
              <img class="mr-8" src="../../assets/img/mart.png" alt="" />
              MART
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/user-area/exchange" class=" mt-8">
              <img
                class="mr-8"
                src="../../assets/img/side-exchange.png"
                alt=""
              />
              EXCHANGE
            </nuxt-link>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/chat.png" alt="" />
              CHAT
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/setting.png" alt="" />
              SETTING
            </a>
          </li>
          <li>
            <a @click="signOut()" class=" mt-8">
              <img class="mr-8" src="../../assets/img/exit.png" alt="" />
              EXIT
            </a>
          </li>
        </ul>
        <div class="user-account">
          <a href="#">
            <img
              class="mr-12"
              src="../../assets/img/user.png"
              alt="user icon"
            />
            <span>{{ userDetails.username }}</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Card Request Modal -->
    <div
      class="modal fade"
      id="cardRequestModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cardRequestModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">
              Make request for a Payafrik Smart Card
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
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>You are about to request for a <span class="warn">Payafrik Smart Card</span>.</p>
                  <p>with a smart card, you will be able to withdraw your tokens at atm machines and make normal everyday cash transactions.<br>Click on "Request Smart Card" below to complete the request or "Cancel" to cancel</p>
                  <p class="warn">Please note, 2000 Tokens will be debited from your account</p>
                  <label>Select card type</label>
                  <div class="row mb-2">
                    <div class="col-3">
                      <a class="card-option" @click="selectedCard='verve'" :class="[selectedCard === 'verve' ? 'bordered' : '']">
                        <img src="../../assets/img/verve.svg" alt="">
                      </a>
                    </div>
                    <div class="col-3">
                      <a class="card-option" @click="selectedCard='mastercard'" :class="[selectedCard === 'mastercard' ? 'bordered' : '']">
                        <img src="../../assets/img/mastercard.svg" alt="">
                      </a>
                    </div>
                    <div class="col-3">
                      <a class="card-option" @click="selectedCard='visa'" :class="[selectedCard === 'visa' ? 'bordered' : '']">
                        <img src="../../assets/img/visa.svg" alt="">
                      </a>
                    </div>
                  </div>
                  <label>Name on card</label>
                  <input type="text" class="mb-2" placeholder="your full name">

                  <label>Delivery address</label>
                  <input type="text" placeholder="Where we'll ship the card">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <button type="button" class="cancel" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7">
                  <button
                    class="success-btn"
                    v-if="!processing"
                    @click="requestSmartCard()"
                    type="submit"
                  >
                    Request Smart Card
                  </button>
                  <button class="success-btn" v-if="processing" disabled>
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      // userDetails: this.$cookies.get('user-details'),
      profileImage: "../../assets/img/placeholder-profile.jpg",
      processing: false,
      selectedCard: 'mastercard'
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    tokenWithdrawalModalActive() {
      return this.$store.state.global.tokenWithdrawalModalActive;
    },
    sidebarClosed() {
      return this.$store.state.global.sidebarClosed;
    },
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  methods: {
    openModal(modalId) {
      $("#" + modalId).modal("show");
      $(".modal-backdrop").hide();
    },
    openSideBar() {
      this.$store.commit("global/toggleSidebar");
    },
    openFunctionModal(modalActiveClass ) {
      let data = {
        class: modalActiveClass
      }
      this.$store.commit("global/openFunctionModal", data);
    },
    signOut() {
      this.$cookies.removeAll();
      this.$router.push("/login");
    },

    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },

    toggleTokenModal() {
      this.$store.commit("global/toggleTokenModal");
    },

    toggleWithdrawalModal() {
      this.$store.commit("global/toggleTokenWithdrawalModal");
    },

    ...mapMutations({
      toggleTokenModal: "global/toggleTokenModal" ,
      toggleWithdrawalModal: "global/toggleTokenWithdrawalModal",
    }),

    requestSmartCard() {

    }
  }
};
</script>

<style scoped>
ul.nav-links li a{
    color:#fff !important;
    text-decoration: none !important;
}
a{
  cursor: pointer !important;
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
} */
/* .header{
    height:80px;
    padding: 5px 0;
}

img{
    max-width:100%;
}

img.logo{
    width:50%;
    margin-top:20px;
}

.user-box{
    width:100%;
    min-height:100%;
    height:inherit;
    background-color: #1f3d74;
    border-radius:5px;
    color:#ffffffde;
    font-family: 'Poppins', sans-serif;
    font-size:0.8em;
    padding:10px;
}

.user-box i, 
.user-box a, 
.user-box > div{
    float:left;
    margin-right:5px;
    margin-left:10px;
}

.user-box i.ti-bell{
    font-size:2em;
}

.profile-picture{
    height:40px;
    min-width:40px;
    width:40px;
    border-radius:50%;
    border: 2px solid #F9B330;
    background: url('../../assets/img/placeholder-profile.jpg') no-repeat center center; 
    background: url('https://img.icons8.com/ultraviolet/40/000000/user-male-circle.png') no-repeat center center; 
    background-size:cover;
}

.dropdown-menu{
    padding:5px;
}

.dropdown-menu a{
    font-size:0.8em;
}

a.dropdown-item{
    padding: 1em;
}

a.nav-toggler{
    float:left;
    margin-right: 20px;
    margin-top: 20px;
    font-size:1em;
    display:none;
}

@media only screen and (max-width: 990px) {
  a.nav-toggler {
    display: inline-block;
  }
}

@media only screen and (max-width: 768px) {
    .header{
        height:inherit;
        padding:10px;
    }
    img.logo{
        width:30%;
        margin-bottom:20px;
    }
}

@media only screen and (max-width: 320px) {
    img.logo{
        width:40%;
    }
    .header{
        padding:5px;
    }
} */

.balance h3 {
  font-size:1.5em;
}

a.tag-button{
  display: inline-block;
  padding: 3px 15px;
  border-radius:50px;
  background-color: #F8AE30;
  color: #141F50;
  font-size: 0.9em;
  left: 170px;
  position: absolute;
}

a.tag-button:hover{
  background-color: #141F50;
  color: #F8AE30;
}

select {
  padding: 20px;
  color: #ffffff99;
  background: #111a3f;
  border: solid 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

#uploadModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}

.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

/* button.greyed-btn{
        font-weight:500;
        background-color: #f1f1f1;
        width: inherit!important;
    } */

#cardRequestModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}

.input-file + label {
  font-size: 0.8em;
  font-weight: 500;
  color: #8190ca;
  background-color: #111a3f !important;
  display: inline-block;
  transition: all ease 200ms;
  padding: 20px;
  border-radius: 3px;
  width: 100%;
}

.input-file:focus + label,
.input-file + label:hover {
  background-color: #d4d1d1;
}

.input-file + label {
  cursor: pointer; /* "hand" cursor */
}

#cardRequestModal .modal-header {
  margin-bottom: 15px;
  border: none !important;
}

#cardRequestModal .modal-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
}

#cardRequestModal .modal-header h5 {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
}

#cardRequestModal .modal-footer {
  border: none !important;
}

#cardRequestModal .modal-footer button {
  background: #11154b;
  color: #f6f6f6;
  border: solid #2832c3;
  padding: 10px 40px;
  border-radius: 25px;
  cursor: pointer;
}

#cardRequestModal .modal-footer button.cancel {
  border: solid transparent;
}

p.warn, span.warn, a.warn{
  font-weight: 700;
  color: #F8AE30;
}

label{
  font-weight: 500;
  color: #ffffffcb;
  font-size: 0.8em;;
}

input {
  padding: 20px;
  color: #ffffff99;
  background: #111a3f;
  border: solid 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

a.card-option{
  padding:10px;
}

a.card-option.bordered{
  border-radius:5px;
  border: 2px solid #F8AE30;
  display:block;
}
</style>
