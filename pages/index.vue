<template>
  <!-- <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                       <a href="https://payafrik.io"> <img class="logo" src="../assets/img/logo.png"></a>
                        <div class="login-container shadowed-box">
                         <p v-if="confirmationStatus==='true'" class="confirm-success"><i class="text-success ti-check-box"></i>
                            Your account has been confirmed. You can now login
                         <p>
                            <h6 class="font-weight-bold">LOG IN TO YOUR PAYAFRIK DASHBOARD</h6>
                            <input type="text" v-model='username' placeholder="Your registered phone number">
                            <p class="form-tip">Please add your phone code (eg: +234)</p>
                            <div class="password-container">
                                <input
                                    v-if="!viewPassword"
                                    v-model="password"
                                    type="password"
                                    placeholder="Your password"
                                >
                                <input
                                    v-if="viewPassword"
                                    v-model="password"
                                    type="text"
                                    placeholder="Your password"
                                >
                                <a class="password-toggle-switch" @click="toggleViewPassword()"><i :class="viewPassword === true ? 'far fa-lg fa-eye-slash' : 'far fa-lg fa-eye'" /></a>
                            </div>
                            <button class="login" v-if="!processing" @click="signIn()">Login to your account</button>
                            <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                        </div>
                        <hr>
                        <p>New to Payafrik?  <nuxt-link to="/signup">Click here</nuxt-link> to signup </p>
                        <nuxt-link to="password-reset">forgot password?</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
  <!-- <div class="my-canvas"> -->
    <!-- <div class="withdraw--page--transfer--modals"> -->
      <section class="main-content">
        <main class="full">
          <section class="dash-body">
            <!-- <a href="#" class="modal-close">
              <img src="img/close.png" alt="" />
            </a> -->
            <div class="auth--content">
              <div class="w-100">
                <form class="w-100">
                  <div class="flex flex-between flex-col flex-middle w-100">
                    <div class="welcome-text">
                      <div class="text-center">
                        <p class="w-100 c-white">log into</p>
                        <h1 class="w-100 c-white am-type mt-0 mb-50">
                          PayAfrik Dashboard
                        </h1>
                      </div>
                    </div>

                    <div class="exchange centerdiv">
                      <div>
                        <img
                          class="prefix-icon"
                          src="../assets/img/iphone.png"
                          alt=""
                        />
                        <input
                            v-model='username'
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
                          src="../assets/img/right-arrow.png"
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
                        <div class="exchange--dropdown ">
                          <img
                            @click="toggleViewPassword()"
                            class="suffix-icon suffix"
                            src="../assets/img/view.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <nuxt-link to="/password-reset">
                        <p class="authhint">
                            Forgot Password?
                            <span class="reset-color">Reset</span>
                      </p>
                    </nuxt-link>
                    <div class="text-center mt-20 sub--btn--holder">
                      <div class="sub-button mt-20">
                        <button v-if="!processing" @click="signIn()" class="w-100">Log In</button>
                        <button v-if="processing" disabled class="w-100">Logging in...</button>
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
            </div>
          </section>
        </main>
      </section>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      username: "",
      password: "",
      processing: false,
      baseUrl: process.env.baseUrl,
      confirmationStatus: "false",
      viewPassword: false
    };
  },
  methods: {
    toggleViewPassword() {
      this.viewPassword = !this.viewPassword;
    },
    async signIn() {
        console.log("signing in...")
      let payload = {
        username: this.username,
        password: this.password
      };
      this.processing = true;
      try {
        const signInResponse = await this.$axios.$post(
          this.baseUrl + "auth/accounts/signin/",
          payload
        );
        console.log(signInResponse);
        const userDetails = {
          username: signInResponse.user.username,
          token: signInResponse.user.token,
          email: signInResponse.user.email,
          phone: signInResponse.user.phone,
          balance: +signInResponse.user.balance,
          id: signInResponse.user.id,
          eos_wallet: signInResponse.user.eos_wallet,
          btc_wallet: signInResponse.user.btc_wallet,
          eth_wallet: signInResponse.user.eth_wallet,
          kyc_doc_type: signInResponse.user.kyc_doc_type,
          kyc_document_front: signInResponse.user.kyc_document_front,
          kyc_selfie: signInResponse.user.kyc_selfie,
          kyc_status: signInResponse.user.kyc_status
        };

        this.$cookies.set("userdetails", userDetails, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });

        // this.authenticate(signInResponse)
        this.$router.push("../user-area/dashboard");
        this.processing = false;
      } catch (e) {
        this.$toast.error(JSON.stringify(e.response.data.error));

        this.processing = false;
        console.log(e.response);
      }
    },

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    ...mapMutations({
      toggleSidebar: "global/authenticateUser"
    })
  },
  mounted() {
    this.confirmationStatus = this.$route.query.confirmation;
  }
};
</script>

<style scoped>
.section {
  background-color: #1f3d74;
  background: url("../assets/img/blockchain-bg.jpg") no-repeat center center;
  background-size: cover;
  padding: 35px;
}
img.logo {
  width: 30%;
  filter: brightness(0) invert(1) opacity(0.8);
}
.login-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 35px;
  padding-top: 50px;
  width: 100%;
  margin-top: 75px;
}
button.login {
  color: #ffffffde;
  background-color: #1fa545;
}
button.login:hover {
  color: #ffffffde;
  background-color: #13642a;
}
i.ti-check-box {
  font-size: 1.5em;
  padding: 5px;
}
p.confirm-success {
  margin-bottom: 15px;
  color: #1fa545;
  font-size: 0.8em;
}
p > a {
  font-size: 1em;
}
p {
  margin: 0;
}
p,
a {
  font-size: 0.8em;
  color: #ffffffd4;
}
a {
  font-weight: 700;
}
a.hover {
  color: #fffffffd;
  text-decoration: none;
}
h6 {
  font-size: 0.8em;
}
.password-container {
  position: relative;
}

a.password-toggle-switch {
  position: absolute;
  top: 22px;
  right: 15px;
  z-index: 999;
  color: #666;
}

.suffix{
    cursor: pointer;
}
</style>
