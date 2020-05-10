<template>
  <section
    class="withdraw--modal"
    :class="[tokenWithdrawalModalActive ? 'active' : '']"
  >
    <a @click="toggleTokenWithdrawalModal" class="float-right">
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
                <img src="../../assets/img/bank.png" alt="" />
                <input
                  id="bank"
                  type="text"
                  placeholder="The bank you are transferring to"
                />
                <label for="bank">Bank</label>
              </div>
              <div class="mt-20">
                <img src="../../assets/img/recipient.png" alt="" />
                <input
                  id="recipient"
                  type="text"
                  placeholder="The phone number of the user you are transferring to"
                />
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
    return {};
  },
  computed: {
    tokenWithdrawalModalActive() {
      return this.$store.state.global.tokenWithdrawalModalActive;
    }
  },
  methods: {
    signOut() {},
    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },
    toggleTokenWithdrawalModal() {
      this.$store.commit("global/toggleTokenWithdrawalModal");
    },
    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal"
    })
  }
};
</script>

<style>
.withdraw--modal {
  margin-left: -100% !important;
  width: 100% !important; 
  position: fixed;
  top: 0;
  z-index: 999;
}

.withdraw--modal.active {
  margin-left: 0px !important;
  background-color: #131c4b !important;
  width: 100% !important;
  overflow:scroll;
  height: inherit;
}


.modal-close {
  cursor: pointer;
}
</style>
