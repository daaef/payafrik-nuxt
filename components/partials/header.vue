<template>
  <header>
    <nav>
      <div class="balance">
        <img src="../../assets/img/logo.png" class="mobile-logo" alt="logo" />
        <span>AfriToken:</span>
        <h3>{{ +userDetails.balance | formatNumber }}</h3>
        <a class="tag-button" @click="openModal('cardRequestModal')"
          >Request Card</a
        >
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
        <a
          @click="openFunctionModal('profile--active')"
          data-link-class="profile--active"
        >
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
          <!-- <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/setting.png" alt="" />
              SETTING
            </a>
          </li> -->
          <li>
            <nuxt-link to="/user-area/support" class="mt-8">
              <img class="mr-1" src="../../assets/img/headset-solid.svg" style="width:28px;" alt="" />
              Support
            </nuxt-link>
          </li>
          <li>
            <a @click="signOut()" class=" mt-8">
              <img class="mr-8" src="../../assets/img/exit.png" alt="" />
              EXIT
            </a>
          </li>
        </ul>
        <div class="user-account">
          <a @click="openFunctionModal('profile--active')" data-link-class="profile--active">
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
                  <p>
                    You are about to request for a
                    <span class="warn">Payafrik Smart Card</span>.
                  </p>
                  <p>
                    with a smart card, you will be able to withdraw your tokens
                    at atm machines and make normal everyday cash
                    transactions.<br />Click on "Request Smart Card" below to
                    complete the request or "Cancel" to cancel
                  </p>
                  <p class="warn">
                    Please note, 2000 Tokens will be debited from your account
                  </p>
                  <label>Select card type</label>
                  <div class="row mb-2">
                    <div class="col-3">
                      <a
                        class="card-option"
                        @click="selectedCard = 'VERVE'"
                        :class="[selectedCard === 'VERVE' ? 'bordered' : '']"
                      >
                        <img src="../../assets/img/verve.svg" alt="" />
                      </a>
                    </div>
                    <div class="col-3">
                      <a
                        class="card-option"
                        @click="selectedCard = 'MASTERCARD'"
                        :class="[
                          selectedCard === 'MASTERCARD' ? 'bordered' : ''
                        ]"
                      >
                        <img src="../../assets/img/mastercard.svg" alt="" />
                      </a>
                    </div>
                    <div class="col-3">
                      <a
                        class="card-option"
                        @click="selectedCard = 'VISA'"
                        :class="[selectedCard === 'VISA' ? 'bordered' : '']"
                      >
                        <img src="../../assets/img/visa.svg" alt="" />
                      </a>
                    </div>
                  </div>
                  <label>Name on card</label>
                  <input
                    type="text"
                    class="mb-2"
                    placeholder="Your first name"
                    v-model="firstName"
                  />
                   <input
                    type="text"
                    class="mb-2"
                    placeholder="Your last name"
                    v-model="lastName"
                  />

                  <label>Delivery address</label>
                  <input v-model="addressLine1" type="text" class="mb-1" placeholder="Address line 1" />
                  <input v-model="addressLine2" type="text" class="mb-1" placeholder="Address line 2" />
                  <input v-model="city" type="text" class="mb-1" placeholder="City" />
                  <input v-model="country" type="text" class="mb-1" placeholder="Country" />
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
      baseUrl: process.env.baseUrl,
      profileImage: "../../assets/img/placeholder-profile.jpg",
      processing: false,
      selectedCard: "MASTERCARD",
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: ''
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
      return this.$store.state.authenticatedUser;
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

    openFunctionModal(modalActiveClass) {
      this.$store.commit("global/toggleSidebar");
      let data = {
        class: modalActiveClass
      };
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
      toggleTokenModal: "global/toggleTokenModal",
      toggleWithdrawalModal: "global/toggleTokenWithdrawalModal"
    }),

    async requestSmartCard() {
      if (this.firstName === ""){
        this.$toast.error('Please input your first name');
        return
      }
      if (this.lastName === ""){
        this.$toast.error('Please input your last name');
        return
      }
      if (this.addressLine1 === ""){
        this.$toast.error('Please input your delivery address');
        return
      }
      if (this.city === ""){
        this.$toast.error('Please input your delivery city');
        return
      }
      if (this.country === ""){
        this.$toast.error('Please input your delivery country');
        return
      }
      this.processing = true;
      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        address_line: this.addressLine1,
        address_line2: this.addressLine2,
        address_line3: "",
        city: this.city,
        country: this.country,
        card_type: this.selectedCard
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };
      try {
        const requestResponse = await this.$axios.$post(
          this.baseUrl + "utilities/cards/request-card/",
          payload,
          { headers }
        );
        console.log("request response", requestResponse);
        this.$toast.success("Card request successful!");
        this.processing = false;
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.error);
        this.processing = false;
      }
    }
  }
};
</script>

<style scoped>
ul.nav-links li a {
  color: #fff !important;
  text-decoration: none !important;
}
a {
  cursor: pointer !important;
}

.balance h3 {
  font-size: 1.5em;
}

a.tag-button {
  display: inline-block;
  padding: 3px 15px;
  border-radius: 50px;
  background-color: #f8ae30;
  color: #141f50;
  font-size: 0.9em;
  left: 170px;
  position: absolute;
}

a.tag-button:hover {
  background-color: #141f50;
  color: #f8ae30;
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

p.warn,
span.warn,
a.warn {
  font-weight: 700;
  color: #f8ae30;
}

label {
  font-weight: 500;
  color: #ffffffcb;
  font-size: 0.8em;
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

a.card-option {
  padding: 10px;
}

a.card-option.bordered {
  border-radius: 5px;
  border: 2px solid #f8ae30;
  display: block;
}
</style>
