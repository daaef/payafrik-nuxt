<template>
  <!-- <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                        <img class="logo" src="../../assets/img/logo.png">
                        <div class="login-container shadowed-box">
                            <h6 class="font-weight-bold">PLEASE VERIFY YOUR PHONE NUMBER TO PROCEED</h6>

                            <input type="text" v-model="verificationCode" v-bind:class="formErrors.verificationCodeError === true ? 'has-error' : ''"         placeholder="Your verification code code (Sent via sms)">

                            <input type="text" v-model="phone" v-bind:class="formErrors.phoneError === true ? 'has-error' : ''" placeholder="Your phone number (with country code ege +234)">
                            <input type="password" v-model="password" v-bind:class="formErrors.passwordError === true ? 'has-error' : ''" placeholder="Your password">

                            <button class="login" v-if="!processing" @click="verifyPhone()">Verify Phone</button>
                            <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
  <section class="main-content">
    <main class="full">
      <section class="dash-body">
        <!-- <a href="#" class="modal-close">
              <img src="img/close.png" alt="" />
            </a> -->
        <!-- <div class="auth--content"> -->
        <div class="col-lg-5 ml-auto mr-auto text-center">
          <div class="w-100">
            <form class="w-100">
              <div class="w-100">
                <div class="welcome-text">
                  <div class="text-center">
                    <p class="w-100 c-white">Verify your</p>
                    <h1 class="w-100 c-white am-type mt-0 mb-50">
                      Phone number
                    </h1>
                  </div>
                </div>

                <div class="exchange centerdiv">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/iphone.png"
                      alt=""
                    />
                    <input
                      v-model="phone"
                      id="exchange-afk"
                      type="text"
                      placeholder="Enter Registered Phone Number"
                    />
                    <label for="exchange-afk">Phone Number</label>
                    <div class="exchange--dropdown"></div>
                  </div>
                </div>
                <p class="authhint">
                  Please add your phone code (eg: +234)
                </p>
                <div class="exchange centerdiv">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/right-arrow.png"
                      alt=""
                    />
                    <input
                      v-if="!viewPassword"
                      v-model="password"
                      type="password"
                      id="pin"
                      placeholder="Your 4 Digit PIN"
                    />
                    <input
                      v-if="viewPassword"
                      v-model="password"
                      type="text"
                      id="pin-text"
                      placeholder="Your 4 Digit PIN"
                    />
                    <label for="pin">PIN</label>
                    <!-- <div class="exchange--dropdown "> -->
                    <img
                      @click="toggleViewPassword()"
                      class="suffix-icon suffix password-toggle-switch"
                      src="../../assets/img/view.png"
                      alt=""
                    />
                    <!-- </div> -->
                  </div>
                </div>

                <div class="exchange centerdiv mt-3">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/iphone.png"
                      alt=""
                    />
                    <input
                      v-model="verificationCode"
                      id="exchange-afk"
                      type="text"
                      placeholder="Verification code sent to your SMS"
                    />
                    <label for="exchange-afk">Verification code</label>
                    <div class="exchange--dropdown"></div>
                  </div>
                </div>

                <div class="text-center mt-20 sub--btn--holder">
                  <div class="sub-button mt-20">
                    <button
                      v-if="!processing"
                      @click="verifyPhone($event)"
                      class="w-100"
                    >
                      Verify phone number
                    </button>
                    <button v-if="processing" disabled class="w-100">
                      verifying...
                    </button>
                  </div>
                </div>
                <div class="text-center mt-20">
                  <nuxt-link to="/signup"
                    ><p class="authhint">
                      New to PayAfrik?
                      <span class="reset-color">Sign Up</span>
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </form>
          </div>

          <!-- </div> -->
        </div>
      </section>
    </main>
  </section>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {},
  data() {
    return {
      password: "",
      baseUrl: process.env.baseUrl,
      phone: "",
      verificationCode: "",
      formErrors: {
        passwordError: false,
        phoneError: false,
        verificationCodeError: false
      },
      processing: false,
      viewPassword: false
    };
  },
  computed: {
    countryCodes() {
      return this.$store.state.global.countryCodes;
    }
  },
  mounted() {
    console.log(this.countryCodes);
  },
  methods: {
    toggleViewPassword() {
      this.viewPassword = !this.viewPassword;
    },

    async verifyPhone() {
      event.preventDefault();
      this.processing = true;

      if (this.password === "") {
        this.formErrors.passwordError = true;
        this.$toast.error("Please provide your password");
        this.processing = false;
        return;
      } else if (this.phone === "") {
        this.formErrors.phoneError = true;
        this.$toast.error("Please provide your phone number");
        this.processing = false;
        return;
      } else if (this.verificationCode === "") {
        this.formErrors.verificationCodeError = true;
        this.$toast.error("Please provide your verificationCode");
        this.processing = false;
        return;
      }

      let payload = {
        username: this.phone,
        password: this.password,
        nonce: this.verificationCode
      };
      console.log(payload);

      const headers = {
        "Content-Type": "application/json",
        "X-PFK-DT": "B"
      };

      try {
        const verificationResponse = await this.$axios.$post(
          this.baseUrl + "auth/accounts/verify-phone/",
          payload,
          { headers }
        );
        console.log(verificationResponse);
        const userDetails = {
          username: verificationResponse.data.username,
          token: verificationResponse.data.token,
          email: verificationResponse.data.email,
          phone: verificationResponse.data.phone,
          balance: +verificationResponse.data.balance,
          id: verificationResponse.data.id,
          eos_wallet: verificationResponse.data.eos_wallet,
          btc_wallet: verificationResponse.data.btc_wallet,
          eth_wallet: verificationResponse.data.eth_wallet,
          kyc_doc_type: verificationResponse.data.kyc_doc_type,
          kyc_document_front: verificationResponse.data.kyc_document_front,
          kyc_selfie: verificationResponse.data.kyc_selfie,
          kyc_status: verificationResponse.data.kyc_status
        };

        this.$cookies.set("userdetails", userDetails, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });

        // this.authenticate(signInResponse)
        this.$router.push("../user-area/dashboard");
        this.processing = false;
      } catch (e) {
        console.log(JSON.stringify(e));
        this.$toast.error(e.message);
        this.processing = false;
      }
    }
  }
};
</script>
<style>
.exchange {
  position: relative;
}

img.password-toggle-switch {
  position: absolute;
  top: 27px;
  left: 92% !important;
  color: #666;
  z-index: 999;
}

.suffix {
  cursor: pointer;
}

.prefix-icon,
.suffix-icon {
  width: 30px;
  filter: invert();
}

.prefix-icon {
  opacity: 0.5;
}

label {
  color: #0000ff;
}

p {
  color: #ffffffe5;
  margin-top: 15px;
  text-align: center;
}

.dash-body {
  margin-left: 5%;
}

@media (max-width: 768px) {
  .dash-body {
    margin-left: 0;
  }
}
</style>
