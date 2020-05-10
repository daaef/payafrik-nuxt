<template>
    <!-- <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                       <a href="https://payafrik.io"> <img class="logo" src="../assets/img/logo.png"></a>
                        <div class="login-container shadowed-box">
                        
                            <h6 class="font-weight-bold">RESET YOUR PASSWORD</h6>
                            <p>Please provide your registered phone number. We will send you a code via SMS which you will use to create a new password</p>
                            <input type="text" v-model='username' placeholder="Your registered phone number">
                            <p class="form-tip">Please add your phone code (eg: +234)</p>

                            <div v-if="codeSent">
                                <input type="text" v-model='resetCode' placeholder="Code sent to your phone number">
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
                            </div>

                            <div v-if="!codeSent">
                                <button class="login" v-if="!processing" @click="requestReset()">Request Password Reset</button>
                                <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                            </div>

                            <div v-if="codeSent">
                                <button class="login" v-if="!processing" @click="resetPassword()">Reset Password</button>
                                <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                            </div>
                        </div>
                        <hr>
                        <p>New to Payafrik?  <nuxt-link to="/signup">Click here</nuxt-link> to signup </p>
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
            <div class="auth--content">
              <div class="w-100">
                <form class="w-100">
                  <div class="flex flex-between flex-col flex-middle w-100">
                    <div class="welcome-text">
                      <div class="text-center">
                        <p class="w-100 c-white">Reset your PIN</p>
                        <!-- <h1 class="w-100 c-white am-type mt-0 mb-50">
                          PayAfrik Dashboard
                        </h1> -->
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

                    <div v-if="codeSent" class="exchange centerdiv mb-3">
                      <div>
                        <img
                          class="prefix-icon"
                          src="../assets/img/right-arrow.png"
                          alt=""
                        />
                        <input
                            v-model="resetCode"
                            type="text"
                            id="reset-code"
                            placeholder="Code sent to your phone"
                        />
                       
                        <label for="pin">Reset Code</label>
                      </div>
                    </div>

                    <div v-if="codeSent" class="exchange centerdiv">
                      <div>
                        <img
                          class="prefix-icon"
                          src="../assets/img/right-arrow.png"
                          alt=""
                        />
                        <input
                            v-if="!viewPassword"
                            v-model="password"
                            @keydown="enforceNumbersOnly($event)"
                            maxlength="4"
                            type="password"
                          id="pin"
                          placeholder="Your New 4 Digit PIN"
                        />
                        <input
                            v-if="viewPassword"
                            v-model="password"
                            type="text"
                            @keydown="enforceNumbersOnly($event)"
                            maxlength="4"
                          id="pin-text"
                          placeholder="Your New 4 Digit PIN"
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

                    <div v-if="!codeSent" class="text-center mt-20 sub--btn--holder">
                      <div class="sub-button mt-20">
                        <button v-if="!processing" @click="requestReset()" class="w-100">Request PIN Reset</button>
                        <button v-if="processing" disabled class="w-100">Requesting reset...</button>
                      </div>
                    </div>

                    <div v-if="codeSent" class="text-center mt-20 sub--btn--holder">
                      <div class="sub-button mt-20">
                        <button v-if="!processing" @click="resetPassword()" class="w-100">Reset PIN</button>
                        <button v-if="processing" disabled class="w-100">Resetting PIN...</button>
                      </div>
                    </div>


                    <div class="text-center mt-20">
                      <nuxt-link to="/signup"
                        ><p class="authhint">
                          New to PayAfrik?
                          <span class="reset-color">Sign Up</span>
                        </p></nuxt-link
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    components: {},
    data() {
        return{
            username: '',
            password: '',
            processing: false,
            baseUrl: process.env.baseUrl,
            confirmationStatus: 'false',
            viewPassword: false,
            codeSent: false,
            resetCode: ''
        }
    },
    methods: {
        toggleViewPassword () {
          this.viewPassword = !this.viewPassword
        },
        async requestReset() {
            let payload = {
                username: this.username,
            }
            this.processing = true;
            try{
                const requestResponse = await this.$axios.$post(this.baseUrl+'auth/user/request-password-reset/', payload)
                console.log(requestResponse)
                this.$toast.success('Password reset code sent successfully!')
                // this.authenticate(signInResponse)
                this.processing = false
                this.codeSent = true
            }catch(e){
                this.$toast.error(JSON.stringify(e.response.data.detail))
                
                this.processing = false
                console.log(e.response)
            }
        },
        async resetPassword() {
            let username = ''
            
            if (this.username.charAt(0) === '+') {
                username = this.username.substr(1)
            } else {
                username = this.username
            }

            let payload = {
                username: username,
                nonce: this.resetCode,
                password: this.password
            }
            console.log(payload)
            this.processing = true;
            try{
                const resetResponse = await this.$axios.$post(this.baseUrl+'auth/user/complete-password-reset/', payload)
                console.log(resetResponse)
                this.$toast.success('Password reset successfully!')
                // this.authenticate(signInResponse)
                this.$router.push('/login')
                this.processing = false
            }catch(e){
                this.$toast.error(JSON.stringify(e.response.data.error))
                
                this.processing = false
                console.log(e.response)
            }
        },

        enforceNumbersOnly (e) {  
            var key   = e.keyCode ? e.keyCode : e.which;
            if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
            )) e.preventDefault();
        },

        authenticate (user) {
            this.$store.commit('global/authenticateUser', user)
        },
        ...mapMutations({
            toggleSidebar: 'global/authenticateUser'
        })

    },
    mounted() {
        this.confirmationStatus = this.$route.query.confirmation
    }
}

</script>

<style scoped>
.section{
    background-color:#1f3d74;
    background: url('../assets/img/blockchain-bg.jpg') no-repeat center center;
    background-size:cover;
    padding:35px;
}
img.logo{
    width:30%;
    filter: brightness(0) invert(1) opacity(0.8);;
}
.login-container{
    background-color:#fff;
    border-radius:5px;
    padding:35px;
    padding-top:50px;
    width:100%;
    margin-top:75px;
}
.login-container p{
    color:#181818;
}
button.login{
    color:#ffffffde;
    background-color: #1fa545;
}
button.login:hover{
    color:#ffffffde;
    background-color: #13642a;
}
i.ti-check-box{
    font-size:1.5em;
    padding:5px;
}
p.confirm-success{
    margin-bottom:15px;
    color:#1fa545;
    font-size: 0.8em;
}
p > a{
    font-size:1em;
}
p{
    margin:0;
}
p, a{
    font-size:0.8em;
    color:#ffffffd4;
}
a{
    font-weight:700;
}
a.hover{
    color:#fffffffd;
    text-decoration:none;
}
h6{
    font-size:0.8em;
}
.password-container{
    position: relative;
}

a.password-toggle-switch{
    position: absolute;
    top:22px;
    right:15px;
    z-index:999;
    color:#666;
}
</style>
