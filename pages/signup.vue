<template>
    <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                        <a href="https://payafrik.io"><img class="logo" src="../assets/img/logo.png"></a>
                        <div class="login-container shadowed-box">
                            <h6 class="font-weight-bold">SIGNUP</h6>
                            <input type="text" v-model="username" placeholder="Create a username" v-bind:class="formErrors.usernameError === true ? 'has-error' : ''">

                            <div class="row">
                                <div class="col-4" style="padding-right:0; border-top-right-radius:0px; border-bottom-right-radius:0px">
                                    <select v-model="countryCode">
                                        <option v-for="code in countryCodes" :value="code.code" :key="code.code">{{code.code}} - {{code.name}}</option>
                                    </select>
                                </div>
                                <div class="col-8" style="padding-left:0; border-top-left-radius:0px; border-bottom-left-radius:0px">
                                    <input type="text" style="border-left:1px solid #e3e3e3" v-model="phone" placeholder="Your phone number" v-bind:class="formErrors.phoneError === true ? 'has-error' : ''">
                                </div>
                            </div>
                            <input type="email" v-model="email" placeholder="Your email address" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                            <input type="password" v-on:input="calculatePasswordStrength()" v-bind:class="formErrors.passwordError === true ? 'has-error' : ''" v-model="password1" placeholder="Your password">
                            <div class="password-meter">
                                <div v-bind:style="{width: passwordScore}" v-bind:class="charAdded === true ? strengthClass : ''" class="password-strength"></div>
                            </div>
                            <p class="form-tip">A good password should be at least 8 characters long, contain a number, a special character (!@#$%), a capital letter</p>
                            <input type="password" v-model="password2" v-bind:class="{ 'has-error': formErrors.passwordError}" placeholder="Confirm your password">

                            <p class="form-tip"> By clicking button below, you agree to Payafrik's <a>terms of acceptable use</a></p>
                            <button class="login" v-if="!processing" @click="signUp()">Create yout payafrik account</button>
                            <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                        </div>
                        <hr>
                        <p>Aready have an account on Payafrik? <nuxt-link to="/login">Click here</nuxt-link> to login </p>
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
          password1:'',
          password2:'',
          email:'',
          strengthClass: 'weak',
          passwordScore: '0%',
          charAdded: false,
          baseUrl: process.env.baseUrl,
          username: '',
          phone: '',
          formErrors: {
              passwordError:false,
              usernameError:false,
              emailError:false,
              phoneError: false
          },
          processing: false,
          countryCode: '+234'
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
      calculatePasswordStrength() {
        let points = 0;
        if(this.password1.length > 0){
            this.charAdded = true
        }else {
            this.charAdded = false
            this.passwordScore = '0%'
            points = 0
        }
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if(format.test(this.password1)){
            points += 20
        }

        // check for number and caps
        var i=0;
        var character='';
        while (i <= this.password1.length){
            character = this.password1.charAt(i);
            if (!isNaN(character * 1)){
                points += 10
            }else{
                if (character == character.toUpperCase()) {
                   points += 10
                }
            }
            i++;
        }
        if(this.password1.length > 8){
            points += 20
            console.log(points)
        }

        // assign class
        if(this.password1.length > 8 && points < 30){
            this.strengthClass = 'weak'
        } else if (this.password1.length > 8 && points > 30 && points < 75){
            this.strengthClass = 'medium'
        } else if(this.password1.length > 8 && points > 75) {
            this.strengthClass = 'strong'
        }
        this.passwordScore = points + '%'
      },

       async signUp() {
        this.processing = true;
        let payload = {
            username: this.username,
            phone: this.countryCode + this.phone,
            password: this.password1,
            email: this.email
        }   

        console.log(payload)

        if(this.password1 !== this.password2){
            this.formErrors.passwordError = true
            this.$toast.error('Make sure both password match')
            return
        }

        if(this.username === ''){
            this.formErrors.usernameError = true
            this.processing = false
            return
        } else if (this.email === ''){
            this.formErrors.emailError = true
            this.processing = false
            return
        } else if (this.phone === ''){
            this.formErrors.phoneError = true
            this.processing = false;
            return
        }
        
        try{
            const signupResponse = await this.$axios.$post(this.baseUrl+'auth/accounts/signup/', payload)
            console.log('Signup Response', signupResponse)
            this.$router.push('../signup-success')

        } catch(e){
            this.$toast.error(e.response.data.detail)
            this.processing = false
        }
      }
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
    /* padding-top:50px; */
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
}
p.terms{
    font-size:0.8em;
    color:#999;
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
.password-meter{
    height: 5px;
    width: 100%;
    background-color: #eeeeee;
    margin-bottom:10px;
}
.password-strength{
    height:3px;
    margin-top:1px;
    width:50%;
    max-width:100%;
    background-color:#20a144;      
    transition: all 200ms ease;
}
.strong{
    background-color:#20a144;      
}
.weak{
    background-color:#a72920;
}
.medium{
    background-color:#ff8800;
}
</style>
