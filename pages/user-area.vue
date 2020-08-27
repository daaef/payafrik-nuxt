<template>
  <div class="my-canvas" :class="canvasClass" >
    <BuyToken />
    <div class="profile--modal">
      <UserProfile />
    </div>
    <div class="withdraw--page--transfer--modals">
      <WithdrawToken />
      <section class="main-content">
        <MainSidebar />
        <main>
         <Header />
         <router-view />
        </main>
      </section>
      <TransferToken />
    </div>
    <walletModals />
  </div>
</template>

<script>
import MainSidebar from "~/components/partials/main-sidebar.vue";
import Header from "~/components/partials/header.vue";
import UserMain from "~/components/partials/user-main.vue";
import AfkTransferModal from "~/components/partials/afk-transfer-modal.vue";
import BuyToken from "~/components/partials/buy-token.vue";
import UserProfile from "~/components/partials/user-profile.vue";
import WithdrawToken from "~/components/partials/withdraw-token.vue";
import TransferToken from "~/components/partials/transfer-token.vue";
import WalletModals from "~/components/partials/wallet-modals.vue";

import { mapMutations } from "vuex";

export default {
  components: {
    MainSidebar,
    Header,
    UserMain,
    BuyToken,
    UserProfile,
    WithdrawToken,
    TransferToken,
    WalletModals
  },
  data() {
    return {
    };
  },
  computed: {
    chatBoxClosed() {
      return this.$store.state.global.chatBoxClosed;
    },
    isAuthenticated() {
      return this.$store.state.global.isAuthenticated;
    },
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    canvasClass() {
      return this.$store.state.global.canvasClass;
    }
  },
  methods: {
    toggleChatBox() {
      this.$store.commit("global/toggleChatBox");
    },
    toggleTokenModal() {
      this.$store.commit("global/toggleTokenModal");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleChatBox",
      toggleSidebar: "global/authenticateUser",
    }),

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    async checkLoginStatus() {
      console.log(this.$cookies.get("userdetails"));
      if (!this.$cookies.get("userdetails")) {
        this.$cookies.removeAll();
        this.$router.push("/login");
      } 
      // else {
      //   // this.authenticate(this.$cookies.get("userdetails"));
      //   await this.$store.dispatch('getUserDetails')

      // }
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

<style>

 .v-spacer{
   height: 100px;
   width: 100%;
 }

 .for-mobile{
   display: none;
 }

 .not-for-mobile{
   display: default;
 }

 @media (max-width: 768px) {
  .for-mobile{
    display: inline-block !important;
  }
 
  .not-for-mobile{
    display: none !important;
  }
 }


</style>
