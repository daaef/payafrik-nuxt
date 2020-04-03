<template>
    <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                        <img class="logo" src="../../assets/img/logo.png">
                        <div class="login-container shadowed-box">
                            <!-- <p><i class="ti-check-box"></i> Account confirmed successfully</p> -->
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
    </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
    components: {},
        data() {
        return {
            password:'',
            baseUrl: process.env.baseUrl,
            phone: '',
            verificationCode: '',
            formErrors: {
                passwordError:false,
                phoneError: false,
                verificationCodeError: false
            },
            processing: false,
        }
    },  
    computed: {
        countryCodes () {
                return this.$store.state.global.countryCodes
            }
    },
    mounted() {
        console.log(this.countryCodes)
    },
  methods: {

    async verifyPhone() {
        this.processing = true;

        if(this.password === ''){
            this.formErrors.passwordError = true
            this.$toast.error('Please provide your password')
            this.processing = false;
            return
        }

        else if (this.phone === ''){
            this.formErrors.phoneError = true
            this.$toast.error('Please provide your phone number')
            this.processing = false;
            return
        }
        else if (this.verificationCode === ''){
            this.formErrors.verificationCodeError = true
            this.$toast.error('Please provide your verificationCode')
            this.processing = false;
            return
        }

        let payload = {
            username: this.phone,
            password: this.password,
            nonce: this.verificationCode,
        }   
        console.log(payload)

        const headers = {
        'Content-Type': 'application/json',
        'X-PFK-DT': 'B',
        };
        
        try{
            const verificationResponse = await this.$axios.$post(this.baseUrl+'auth/accounts/verify-phone/', payload, {headers})
            console.log(verificationResponse)
            const userDetails = 
                {
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
                    kyc_status: verificationResponse.data.kyc_status,    
                }

            this.$cookies.set('userdetails', userDetails, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            
            // this.authenticate(signInResponse)
            this.$router.push('../user-area/dashboard')
            this.processing = false

        } catch(e){
            console.log(JSON.stringify(e))
            this.$toast.error(e.message)
            this.processing = false
        }
    }
  }
}

</script>
<style>

.section{
    background-color:#1f3d74;
    background: url('../../assets/img/blockchain-bg.jpg') no-repeat center center;
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
    padding-top:30px;
    width:100%;
    margin-top:25px;
}
button.login{
    color:#ffffffde;
    background-color: #1fa545;
}
button.login:hover{
    color:#ffffffde;
    background-color: #13642a;
}
p > a{
    font-size:1em;
}
p{
    margin:0;
    color:#1fa545;
    margin-bottom: 20px;
}
p, a{
    font-size:0.8em;
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
</style>
