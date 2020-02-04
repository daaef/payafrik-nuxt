<template>
    <div class="section">
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
                            <input type="text" v-model='username' placeholder="Your username">
                            <input type="password" v-model='password' placeholder="Your password">
                            <button class="login" v-if="!processing" @click="signIn()">Login to your account</button>
                            <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                        </div>
                        <hr>
                        <p>New to Payafrik?  <nuxt-link to="/signup">Click here</nuxt-link> to signup </p>
                        <a href="#">forgot password?</a>
                         <!-- <nuxt-link to="/">forgot password?</nuxt-link> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            confirmationStatus: 'false'
        }
    },
    methods: {
        async signIn() {
            let payload = {
                username: this.username,
                password: this.password
            }
            this.processing = true;
            try{
                const signInResponse = await this.$axios.$post(this.baseUrl+'auth/accounts/signin/', payload)
                console.log(signInResponse)
                const userDetails = 
                    {
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
                        kyc_status: signInResponse.user.kyc_status,    
                    }

                    // avatar: ""
                    // balance: "183.0000"
                    // btc_wallet: "1Esmueaw9TKkWRstTcZNWADitwXb88TMsL"
                    // dob: null
                    // email: "johndoe@gmail.com"
                    // eos_wallet: "eos_wallet"
                    // eth_wallet: "0xACa094e28ae76AcCa3d77651b5B79Fb50E5721F1"
                    // first_name: ""
                    // gender: ""
                    // id: 7
                    // kyc_doc_number: ""
                    // kyc_doc_type: "DRIVING-LICENCE"
                    // kyc_document_back: null
                    // kyc_document_front: "users/johndoe/1571695566.png"
                    // kyc_selfie: null
                    // kyc_status: "PENDING-DOC-APPROVAL"
                    // last_name: ""
                    // phone: "23408063245678"
                    // timestamp: 1571698970.463651
                    // token: "gAAAAABdrjkaSqp5f1doEwEYR1Wzg3Kb5R_DfN000-8w5uyWiREdLZXlAPx0pv1Yk6NETHtZeNMaqTFY1XFPGKkge93khnhJIZRFK3MMufv1nKSA0-4e9Lw50ytodnND38yxCA0dC86LgAqRl6kQgXD3xS2zaVqx6whBuVhSRatbDkX2uiy4hC5eMdnTx8sl__pCJoEJ0UipEs69axBq_IceLASSOYaBl-VkfPyv-m-PNH4k6neEgg3eRHkgKqq04fvOk3IMsj6sNzar3O-9FM7pxXNIE2WufIDTgA3qsFUch9jkKrcnt_FBzyF0K3oxmpYQ8Bp1JasD"
                    // username: "johndoe"

                this.$cookies.set('userdetails', userDetails, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                })
               
                // this.authenticate(signInResponse)
                this.$router.push('../user-area/dashboard')
                this.processing = false
            }catch(e){
                this.$toast.error(e.response.data.error)
                this.processing = false
                console.log(e.response)
            }
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
</style>
