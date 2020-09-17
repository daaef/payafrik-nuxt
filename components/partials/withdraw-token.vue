<template>
  <section
    class="withdraw--modal">

   <!-- <section
    class="withdraw--modal" :class="[tokenWithdrawalModalActive ? 'withdraw-active' : '']"
  > -->
    <a @click="closeFunctionModal()" class="float-right">
      <img src="../../assets/img/close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="modal-title">
          <h3 class="light text-center">WITHDRAW</h3>
          <h3 class="am-type">token</h3>
        </div>
        <div class="token-details">
          <p class="highlight">AVAILABLE TOKEN</p>
          <h1>{{ +userDetails.balance }}</h1>
          <p class="light">1 AFK TOKEN = 1.00 NGN</p>
        </div>
        <div class="account--smart-card">
          <div class="bank--account">
            <h1 class="form-title text-right am-type c-white">
              to Bank Account
            </h1>
            <form>
              <div>
                <img src="../../assets/img/bank.png" alt="" />
                <Select id="bank" v-model="bank" style="width: 100%" placeholder="The bank you are transferring to">
                  <Option v-for="bank of banks" :key="bank.id" value="com">{{ bank.name }}</Option>
                </Select>
                <label for="bank">Bank</label>
              </div>
              <div class="mt-20 text-left phoneNum">
                <vue-country-code
                  class="prefix-icon"
                  @onSelect="onSelect"
                  :preferredCountries="['ng', 'us', 'gb']">
                </vue-country-code>
                <input
                  id="recipient"
                  type="text"
                  placeholder="The phone number of the user you are transferring to"
                />
                <div class="prefixNum">{{prefixNum}}</div>
                <label for="recipient"
                  >Recipients <span class="c-white">Phone number</span></label
                >
              </div>
              <div class="mt-20">
                <img src="../../assets/img/tokenam.png" alt="" />
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
            <h1 class="form-title text-left am-type c-white">to smart Card</h1>
            <form>
              <div>
                <img src="../../assets/img/user_name.png" alt="" />
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
                <img src="../../assets/img/recipcard.png" alt="" />
                <input
                  id="recsma"
                  type="text"
                  placeholder="The card number of the user you are transferring to"
                />
                <label for="recsma"
                  >Recipients <span class="c-white">Card number</span></label
                >
              </div>
              <div class="mt-20">
                <img src="../../assets/img/tokensmartam.png" alt="" />
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
  </section>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      bank: '',
      prefixNum: ''
    };
  },
  computed: {
    tokenWithdrawalModalActive() {
      return this.$store.state.global.tokenWithdrawalModalActive;
    },
    userDetails() {
      return this.$store.state.authenticatedUser;
    },
    banks() {
      return this.$store.state.banks
    }
  },
  methods: {
    onSelect({name, iso2, dialCode}) {
      console.log(`${dialCode}`);
      this.prefixNum = dialCode
    },
    signOut() {},
    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },
    toggleTokenWithdrawalModal() {
      this.$store.commit("global/toggleTokenWithdrawalModal");
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

<style>
.modal-close {
  cursor: pointer;
}
</style>
