<template>
    <section>

       <!-- MAIN BODY -->
        <div class="container mainbody centerVert">
          <!-- <div class="paddingTop20"></div> -->
          <!-- DASHBODY -->
          <div class="row">
            <div class="col-md-12">
              <div class="row purchaseCard centerCol">
                <div class="col-md-4 removepadding">
                  <img src="../../assets/img/takeoff.png" alt="" />
                </div>
                <div class="col-md-8">
                  <div class="formContent">
                    <p class="formTitle">Purchase AfriKoin</p>
                    <div class="divider">
                      <div class="yellow-dash"></div>
                      <div class="thin-line"></div>
                    </div>
                    <p class="desc">
                      You can use AFK tokens to carry out transactions on this
                      platform from purchasing utilities to other items in our
                      mart. you can also transfer them to your AFK mastercard
                      and make payments on physical machines or withdraw from an
                      ATM.
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="amountHolder">
                          <p class="info">BALANCE</p>
                          <p class="amount">22.00</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="amountHolder">
                          <p class="info">PREPAID</p>
                          <p class="amount">0.00</p>
                        </div>
                      </div>
                    </div>
                    <div class="divider">
                      <div class="yellow-dash"></div>
                      <div class="thin-line"></div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="formbutton">
                          <paystack
                            :amount="amount"
                            :email="email"
                            :paystackkey="paystackkey"
                            :reference="reference"
                            :callback="callback"
                            :close="close"
                            :embed="false"
                             class="yellowText text-uppercase"
                          >
                            > Buy with Cash
                          </paystack>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="formbutton">
                          <!-- <p class="yellowText">> BUY WITH CRYPTO</p> -->
                          <a class="yellowText text-uppercase" target="_blank"
                            href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b">
                            <span>> Buy with Crypto</span>
                          </a>
                          <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2 text-center">
            <div class="hero-content flex-display">
              <div>
                <h4 class="mb-2">Purchase Afrikoin</h4>
                <p>
                  You can buy any quantity of Afrikoin repeatedly, orders will be summarized and displayed in the PrePaid field.
                  After the transaction is processed, the coins are transferred to the balance sheet.
                </p>
                <hr>
                <div class="row">
                  <div class="col-md-6">
                    <h6>BALANCE</h6>
                    <h4>0.00</h4>
                  </div>
                  <div class="col-md-6">
                    <h6>PREPAID</h6>
                    <h4>0.00</h4>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-md-4 offset-md-2">
                    <paystack
                      :amount="amount"
                      :email="email"
                      :paystackkey="paystackkey"
                      :reference="reference"
                      :callback="callback"
                      :close="close"
                      :embed="false"
                    >
                      <i class="ti-wallet mr-2"></i>
                      Buy with Cash
                    </paystack>
                  </div>


                  <div class="col-md-4">
                    <a class="buy-with-crypto bitcoin"
                      href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b">
                      <span>Buy with Crypto</span>
                    </a>
                    <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
                    </script>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

  <!-- </div> -->
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
import paystack from 'vue-paystack'
export default {
  components: {
    paystack
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      paystackkey: "pk_test_0a74386a6032347f675dee2ba41fb9d47bba958d", //paystack public key
      email: "foobar@example.com", // Customer email
      amount: 1000000 // in kobo
    }
  },
  computed: {
    userDetails () {
        return this.$store.state.global.authenticatedUser
    },
    reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        return text;
    }
  },
  methods: {
      callback: function(response){
        console.log(response)
      },
      close: function(){
          console.log("Payment closed")
      },
      async getUserDetails(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };

      try{
        const updatedUserDetails = await this.$axios.$get(this.baseUrl+'auth/accounts/' + this.userDetails.id + '/', {headers})
        console.log('UPDATED USER', updatedUserDetails)
        updatedUserDetails.token = this.userDetails.token
        this.authenticate(
          updatedUserDetails
        )
      }catch(e){
          this.$toast.error(e.response.data.detail)
          this.importingWallet = false
          console.log(e.response)
      }
    },

    closeSideBar () {
      this.$store.commit('global/closeSidebar')
    },

    authenticate (user) {
      this.$store.commit('global/authenticateUser', user)
    },
    ...mapMutations({
      authenticate: 'global/authenticateUser',
      closeSideBar: 'global/closeSidebar'
    }),
  },
  beforeMount(){
    this.getUserDetails()
    this.closeSideBar()
  }
}

</script>

<style scoped>

.hero.section{
  min-height:80vh!important;
  height: inherit;
  /* background: url('../../assets/img/crypto-bg.jpg') no-repeat center center !important; */
  /* background-size: cover; */
}

/* .overlay{
  min-height:100vh;
  height: inherit;
  background-color:#ffffff2b;
  width:100%; */
/* } */

button{
  width:inherit;
  background: #f9b330;
}

button.bitcoin{
  background: #01afef;
}

a.bitcoin{
      padding:1em;
    font-size:0.8em;
    font-weight:700;
    border-radius:3px;
    border:none;
    outline:none;
    margin-bottom: 10px;
    margin-top: 10px;
    width:100%;  
    color:#fff;
    background: #01afef;
}

button.eth{
  background: #2a1ddf;
}

.hero-content{
  height: 100vh;
  position: relative;
}

.hero-content h4{
  color:#206781;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2em;
  font-weight:00;
  /* text-transform: uppercase; */
}

.hero-content p {
  font-size:0.8em;
  font-weight: 500;
  color:#242323!important;
}

.hero-content p small{
  text-transform: uppercase;
  font-weight:700;
  font-size:0.6em;
}

.progress-bar{
  height:20px;
  width: 500px;
  background-color:#e3e3e3;
  border-radius:5px;
  padding:5px;
  position:relative;
  margin-top:30px;
  margin-bottom:30px;
}

.progress{
  height:10px;
  width:5%;
  background-color: #f9b330;
  border-radius:5px;
  position: relative;
}

i.crypto-logo{
  font-size:1.5em;
  color: #F9B330;
  margin-bottom:10px;
}

@media only screen and (max-width: 1028px) {

}
</style>
