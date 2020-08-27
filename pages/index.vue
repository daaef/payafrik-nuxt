<template>
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
                          <!-- <div class="exchange--dropdown "> -->
                            <img
                              @click="toggleViewPassword()"
                              class="suffix-icon suffix password-toggle-switch"
                              src="../assets/img/view.png"
                              alt=""
                            />
                          <!-- </div> -->
                        </div>
                      </div>
                      <nuxt-link to="/password-reset">
                          <p class="authhint">
                              Forgot Password?
                              <span class="reset-color">Reset</span>
                        </p>
                      </nuxt-link>
                       <p class="authhint text-center">
                        Need to confirm your phone number? <nuxt-link to="confirmation">Click here</nuxt-link>
                      </p>
                      <div class="text-center mt-20 sub--btn--holder">
                        <div class="sub-button mt-20">
                          <button v-if="!processing" @click="signIn($event)" class="w-100">Log In</button>
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

              <!-- </div> -->
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
    async signIn(e) {
      e.preventDefault();
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
          username: signInResponse.data.username,
          token: signInResponse.data.token,
          email: signInResponse.data.email,
          phone: signInResponse.data.phone,
          balance: +signInResponse.data.balance,
          id: signInResponse.data.id,
          eos_wallet: signInResponse.data.eos_wallet,
          btc_wallet: signInResponse.data.btc_wallet,
          eth_wallet: signInResponse.data.eth_wallet,
          kyc_doc_type: signInResponse.data.kyc_doc_type,
          kyc_document_front: signInResponse.data.kyc_document_front,
          kyc_selfie: signInResponse.data.kyc_selfie,
          kyc_status: signInResponse.data.kyc_status
        };

        this.$cookies.set("userdetails", userDetails, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });

        // this.authenticate(signInResponse)
        this.$router.push("../user-area/dashboard");

        // if (signInResponse.user.email === ""){
        //   this.$router.push("../update-info");
        // } else {
        //   this.$router.push("../user-area/dashboard");
        // }
        // this.processing = false;
      } catch (e) {
        // this.$toast.error(JSON.stringify(e.response.data.error));
        this.$toast.error(e.response.data.msg);
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
/* .section {
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
}*/

.exchange {
  position: relative;
}

img.password-toggle-switch {
  position: absolute;
  top: 27px;
  left: 92%!important;
  color: #666;
  z-index: 999;
}

.suffix{
  cursor: pointer;
}

.prefix-icon, .suffix-icon{
  width:30px;
  filter: invert();
}

.prefix-icon{
  opacity: 0.5;
}

label {
  color: #0000ff;
}

p{
  color: #ffffffe5;
  margin-top: 15px;
  text-align: center;
}

.dash-body {
  margin-left:5%;
}

@media (max-width: 768px) {
  .dash-body{
    margin-left: 0;
  }
}

</style>
