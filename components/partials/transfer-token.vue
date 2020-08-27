<template>
          <section class="transfer--modal">
        <a @click="closeFunctionModal()" class="modal-close">
          <img src="../../assets/img/close.png" alt="" />
        </a>
        <div class="modal-content">
          <div class="main-modal">
            <div class="modal-title">
              <h3 class="light text-center">TRANSFER</h3>
              <h3 class="am-type">token</h3>
            </div>
            <div class="token-details">
              <p class="highlight">AVAILABLE TOKEN</p>
              <h1>{{ +userDetails.balance }}</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="transfer--info flex flex-center">
              <form class="text-center">
                <div class="mt-20">
                  <img src="../../assets/img/recipient.png" alt="" />
                  <input
                    id="rec-phone"
                    type="text"
                     v-model="userTransferAfk"
                    placeholder="The phone number of the user you are transferring"
                  />
                  <label for="rec-phone"
                    >Recipients <span class="c-white">Phone number</span></label
                  >
                </div>
                <p class="authhint text-right">
                  Please add country code eg: +234
                </p>
                <div class="mt-20">
                  <img src="../../assets/img/tokenam.png" alt="" />
                  <input
                    v-model="afkAmountToTransfer" type="number" 
                    id="token-am"
                    placeholder="How much you want to transfer"
                  />
                  <label for="token-am"
                    >Token <span class="c-white">Amount</span></label
                  >
                </div>
                <div class="text-right sub--btn--holder w-100">
                  <div class="sub-button mt-20 w-100">
                    <button v-if="!transferringAfk" @click="transferAfk()" class="w-100">TRANSFER</button>
                    <button v-if="transferringAfk" disabled class="w-100">TRANSFERRING TOKENS...</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
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
      transferringAfk: false,
      userTransferAfk: '',
      afkAmountToTransfer: 0,
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    userDetails() {
      return this.$store.state.authenticatedUser;
    }
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
    async transferAfk() {
      this.transferringAfk = true
      const payload = {
        "recipient": this.userTransferAfk,
        "requested_amount": this.afkAmountToTransfer,
        "wallet": 'AfriToken'
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }

      try{
        const transferResponse = await this.$axios.$post(this.baseUrl+'transactions/transactions/send/', payload, {headers})
        this.$toast.success('Transfer successful!')
        await this.$store.dispatch('getUserDetails')
        console.log('AFK TRansfer successfull...')
        this.transferringAfk = false
      } catch(e){
        console.log(e)
        this.$toast.error(e.response.data.error)
        this.transferringAfk = false
      }
    },
    closeFunctionModal() {
      this.$store.commit("global/closeFunctionModal");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal",
      closeFunctionModal: "global/closeFunctionModal"

    })
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
