<template>
  <div class="my-canvas">
    

    <!-- <div class="withdraw--page--transfer--modals"> -->
      <WithdrawToken />
      <BuyToken />
      <!-- <section class="withdraw--modal">
        <a href="#" class="modal-close">
          <img src="../assets/img/close.png" alt="" />
        </a>
        <div class="modal-content">
          <div class="main-modal">
            <div class="modal-title">
              <h3 class="light text-center">WITHDRAW</h3>
              <h3 class="am-type">token</h3>
            </div>
            <div class="token-details">
              <p class="highlight">AVAILABLE TOKEN</p>
              <h1>2,500.24</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="account--smart-card">
              <div class="bank--account">
                <h1 class="form-title text-right am-type c-white">
                  to Bank Account
                </h1>
                <form>
                  <div>
                    <img src="../assets/img/bank.png" alt="" />
                    <input
                      id="bank"
                      type="text"
                      placeholder="The bank you are transferring to"
                    />
                    <label for="bank">Bank</label>
                  </div>
                  <div class="mt-20">
                    <img src="../assets/img/recipient.png" alt="" />
                    <input
                      id="recipient"
                      type="text"
                      placeholder="The phone number of the user you are transferring to"
                    />
                    <label for="recipient"
                      >Recipients
                      <span class="c-white">Phone number</span></label
                    >
                  </div>
                  <div class="mt-20">
                    <img src="../assets/img/tokenam.png" alt="" />
                    <input
                      id="token"
                      type="text"
                      placeholder="How much you want to transfer"
                    />
                    <label for="token"
                      >Token <span class="c-white">Amount</span></label
                    >
                  </div>
                  <div class="text-right sub--btn--holder">
                    <div class="sub-button mt-20">
                      <button>WITHDRAW TO BANK</button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="smart--card">
                <h1 class="form-title text-left am-type c-white">
                  to smart Card
                </h1>
                <form>
                  <div>
                    <img src="../assets/img/user_name.png" alt="" />
                    <input
                      id="uname"
                      type="text"
                      placeholder="The user you are transferring to"
                    />
                    <label for="uname"
                      >Users <span class="c-white">Name</span></label
                    >
                  </div>
                  <div class="mt-20">
                    <img src="../assets/img/recipcard.png" alt="" />
                    <input
                      id="recsma"
                      type="text"
                      placeholder="The card number of the user you are transferring to"
                    />
                    <label for="recsma"
                      >Recipients
                      <span class="c-white">Card number</span></label
                    >
                  </div>
                  <div class="mt-20">
                    <img src="../assets/img/tokensmartam.png" alt="" />
                    <input
                      id="tokam"
                      type="text"
                      placeholder="How much you want to transfer"
                    />
                    <label for="tokam"
                      >Token <span class="c-white">Amount</span></label
                    >
                  </div>
                  <div class="sub-button mt-20">
                    <button>WITHDRAW TO CARD</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <section class="main-content">
        <MainSidebar />
        <main>
         <Header />
         <router-view />
        </main>
      </section>
      <section class="transfer--modal">
        <a href="#" class="modal-close">
          <img src="../assets/img/close.png" alt="" />
        </a>
        <div class="modal-content">
          <div class="main-modal">
            <div class="modal-title">
              <h3 class="light text-center">TRANSFER</h3>
              <h3 class="am-type">token</h3>
            </div>
            <div class="token-details">
              <p class="highlight">AVAILABLE TOKEN</p>
              <h1>2,500.24</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="transfer--info flex flex-center">
              <form class="text-center">
                <div class="mt-20">
                  <img src="../assets/img/recipient.png" alt="" />
                  <input
                    id="rec-phone"
                    type="text"
                    placeholder="The phone number of the user you are transferring to"
                  />
                  <label for="rec-phone"
                    >Recipients <span class="c-white">Phone number</span></label
                  >
                </div>
                <div class="mt-20">
                  <img src="../assets/img/tokenam.png" alt="" />
                  <input
                    id="token-am"
                    type="text"
                    placeholder="How much you want to transfer"
                  />
                  <label for="token-am"
                    >Token <span class="c-white">Amount</span></label
                  >
                </div>
                <div class="text-right sub--btn--holder w-100">
                  <div class="sub-button mt-20 w-100">
                    <button class="w-100">TRANSFER</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  <!-- </div> -->
</template>

<script>
import MainSidebar from "~/components/partials/main-sidebar.vue";
import Header from "~/components/partials/header.vue";
import UserMain from "~/components/partials/user-main.vue";
import AfkTransferModal from "~/components/partials/afk-transfer-modal.vue";
import BuyToken from "~/components/partials/buy-token.vue";
import WithdrawToken from "~/components/partials/withdraw-token.vue";

import { mapMutations } from "vuex";

export default {
  components: {
    MainSidebar,
    Header,
    UserMain,
    BuyToken,
    WithdrawToken
  },
  data() {
    return {};
  },
  computed: {
    chatBoxClosed() {
      return this.$store.state.global.chatBoxClosed;
    },
    isAuthenticated() {
      return this.$store.state.global.isAuthenticated;
    }
  },
  methods: {
    toggleChatBox() {
      this.$store.commit("global/toggleChatBox");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleChatBox",
      toggleSidebar: "global/authenticateUser"
    }),

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    checkLoginStatus() {
      console.log(this.$cookies.get("userdetails"));
      if (!this.$cookies.get("userdetails")) {
        this.$cookies.removeAll();
        this.$router.push("../login");
      } else {
        this.authenticate(this.$cookies.get("userdetails"));
      }
    }
  },
  beforeMount() {
    this.checkLoginStatus();
  }
};
</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none !important;
}
</style>
