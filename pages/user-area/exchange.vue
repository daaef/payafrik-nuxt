<template>
  <section class="dash-body">
    <div v-if="calculatingRate" class="overlay animated fadeIn">
      <div class="row">
        <div class="col-2 ml-auto mr-auto text-center">
          <i class="fas fa-circle-notch fa-spin fa-2x ml-auto mr-auto"></i>
          <p class="c-white">Calculating rates...</p>
        </div>
      </div>
    </div>
    <div style="height:10px;"></div>
    <div class="exchange--content not-for-mobile">
      <div class="w-100">
        <form class="w-100">
          <div class="flex flex-between flex-middle w-100">
            <div class="exchange">
              <span class="muted mb-10 d-block"
                >Select currency to exchange</span
              >
              <div class="row" style="height: 70px;">
                <div class="col-1 mr-1">
                  <a @click="fromCurrency = 'AFK'"
                    ><img src="../../assets/img/Africoin.png" alt=""
                  /></a>
                </div>
                <div class="col-1 mr-1">
                  <a @click="fromCurrency = 'BTC'"
                    ><img src="../../assets/img/bitcoin.png" alt=""
                  /></a>
                </div>
                <div class="col-1 mr-2">
                  <a @click="fromCurrency = 'ETH'"
                    ><img src="../../assets/img/eth.png" alt=""
                  /></a>
                </div>
              </div>
              <div v-if="fromCurrency === 'AFK'">
                <img src="../../assets/img/Africoin.png" alt="" />
                <input
                  id="exchange-afk"
                  type="text"
                  disabled
                  v-model="dollarRates.afk"
                />
                <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="fromCurrency === 'BTC'">
                <img src="../../assets/img/bitcoin.png" alt="" />
                <input
                  id="exchange-btc"
                  type="text"
                  disabled
                  placeholder="0.00 BTC | $0.00 USD"
                  v-model="dollarRates.btc"
                />
                <label style="color:#f8ae30" for="exchange-afk"
                  >BTC <span class="c-white">Bitcoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="fromCurrency === 'ETH'">
                <img src="../../assets/img/eth.png" alt="" />
                <input
                  id="exchange-eth"
                  type="text"
                  disabled
                  placeholder="0.00 ETH | $0.00 USD"
                  v-model="dollarRates.eth"
                />
                <label style="color: #6d76bc" for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>

              <div class="line--input mt-64 mb-4">
                <input
                  type="text"
                  :class="{
                    'c-btc': fromCurrency === 'BTC',
                    'c-afk': fromCurrency === 'AFK',
                    'c-eth': fromCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="exchangeAmount"
                  @keydown="checkKeyPress($event)"
                />
                <span class="wallet--name">{{ fromCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
              <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              >
            </div>
            <div class="exchange--btn">
              <a @click="swapCurrencies()">
                <img src="../../assets/img/exchangebtn.png" alt="" />
              </a>
            </div>
            <div class="recieve">
              <span class="muted mb-10 d-block"
                >Select currency to recieve</span
              >
              <div class="row" style="height: 70px;">
                <div class="col-1 mr-1">
                  <a @click="toCurrency = 'AFK'"
                    ><img src="../../assets/img/Africoin.png" alt=""
                  /></a>
                </div>
                <div class="col-1 mr-1">
                  <a @click="toCurrency = 'BTC'"
                    ><img src="../../assets/img/bitcoin.png" alt=""
                  /></a>
                </div>
                <div class="col-1 mr-2">
                  <a @click="toCurrency = 'ETH'"
                    ><img src="../../assets/img/eth.png" alt=""
                  /></a>
                </div>
              </div>

              <div v-if="toCurrency === 'AFK'">
                <img src="../../assets/img/Africoin.png" alt="" />
                <input
                  id="exchange-afk"
                  type="text"
                  disabled
                  placeholder="1 AFK = 0.0010457 BTC"
                />
                <label style="color: #476efb" for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="toCurrency === 'BTC'">
                <img src="../../assets/img/bitcoin.png" alt="" />
                <input
                  id="exchange-btc"
                  type="text"
                  disabled
                  placeholder="1 BTC = 0.0010457 AFK"
                />
                <label style="color:#f8ae30" for="exchange-afk"
                  >BTC <span class="c-white">Bitcoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="toCurrency === 'ETH'">
                <img src="../../assets/img/eth.png" alt="" />
                <input
                  id="exchange-eth"
                  type="text"
                  disabled
                  placeholder="1 ETH = 0.0010457 BTC"
                />
                <label style="color: #6d76bc" for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>

              <div class="line--input mt-64 mb-4">
                <input
                  type="text"
                  :class="{
                    'c-btc': toCurrency === 'BTC',
                    'c-afk': toCurrency === 'AFK',
                    'c-eth': toCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="toValue"
                  disabled
                />
                <span class="wallet--name">{{ toCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
              <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              >
            </div>
          </div>
        </form>
        <div class="exchange--breakdown flex-middle">
          <div class="exchange-breakdown text-right">
            <div class="mb-16">
              <img
                v-if="fromCurrency === 'AFK'"
                src="../../assets/img/Africoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="fromCurrency === 'BTC'"
                src="../../assets/img/bitcoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="fromCurrency === 'ETH'"
                src="../../assets/img/eth.png"
                height="50"
                alt=""
              />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You are exchanging</span>
              <h2
                :class="{
                  'c-btc': fromCurrency === 'BTC',
                  'c-afk': fromCurrency === 'AFK',
                  'c-eth': fromCurrency === 'ETH'
                }"
              >
                {{ exchangeAmount }} {{ fromCurrency }}
              </h2>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
          <div class="arrow--breakdown">
            <img src="../../assets/img/right.png" alt="" />
          </div>
          <div class="recieve-breakdown text-left">
            <div class="mb-16">
              <img
                v-if="toCurrency === 'AFK'"
                src="../../assets/img/Africoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="toCurrency === 'BTC'"
                src="../../assets/img/bitcoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="toCurrency === 'ETH'"
                src="../../assets/img/eth.png"
                height="50"
                alt=""
              />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You will receive</span>
              <h2
                :class="{
                  'c-btc': toCurrency === 'BTC',
                  'c-afk': toCurrency === 'AFK',
                  'c-eth': toCurrency === 'ETH'
                }"
              >
                {{ exchangeValue | formatNumberLong }} {{ toCurrency }}
              </h2>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-20 sub--btn--holder">
          <div class="sub-button mt-20">
            <button v-if="!exchanging" @click="performExchange()" class="w-100">EXCHANGE</button>
            <button v-if="exchanging" disabled class="w-100"><i class="fa fa-circle-notch fa-spin"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div class="for-mobile">
      <div class="w-100">
        <form>
          <div class="exchange">
            <span class="text-right muted mb-10 d-block"
                >Select currency to exchange</span
              >
              <div class="row" style="height: 70px;">
                <div class="col-2 ml-auto">
                  <a @click="fromCurrency = 'AFK'"
                    ><img src="../../assets/img/Africoin.png" alt=""
                  /></a>
                </div>
                <div class="col-2">
                  <a @click="fromCurrency = 'BTC'"
                    ><img src="../../assets/img/bitcoin.png" alt=""
                  /></a>
                </div>
                <div class="col-2">
                  <a @click="fromCurrency = 'ETH'"
                    ><img src="../../assets/img/eth.png" alt=""
                  /></a>
                </div>
              </div>
              <div v-if="fromCurrency === 'AFK'">
                <img src="../../assets/img/Africoin.png" alt="" />
                <input
                  id="exchange-afk"
                  type="text"
                  disabled
                  v-model="dollarRates.afk"
                />
                <label style="color: #476efb" for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="fromCurrency === 'BTC'">
                <img src="../../assets/img/bitcoin.png" alt="" />
                <input
                  id="exchange-btc"
                  type="text"
                  disabled
                  placeholder="0.00 BTC | $0.00 USD"
                  v-model="dollarRates.btc"
                />
                <label style="color:#f8ae30" for="exchange-afk"
                  >BTC <span class="c-white">Bitcoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="fromCurrency === 'ETH'">
                <img src="../../assets/img/eth.png" alt="" />
                <input
                  id="exchange-eth"
                  type="text"
                  disabled
                  placeholder="0.00 ETH | $0.00 USD"
                  v-model="dollarRates.eth"
                />
                <label style="color: #6d76bc" for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>

            <span class="text-right muted mb-10 mt-3 d-block"
                >Select currency to recieve</span
              >
              <div class="row" style="height: 70px;">
                <div class="col-2 ml-auto text-center">
                  <a @click="toCurrency = 'AFK'"
                    ><img src="../../assets/img/Africoin.png" alt=""
                  /></a>
                </div>
                <div class="col-2 text-center">
                  <a @click="toCurrency = 'BTC'"
                    ><img src="../../assets/img/bitcoin.png" alt=""
                  /></a>
                </div>
                <div class="col-2 text-center">
                  <a @click="toCurrency = 'ETH'"
                    ><img class="ml-auto mr-auto" src="../../assets/img/eth.png" alt=""
                  /></a>
                </div>
              </div>
            <div v-if="toCurrency === 'AFK'">
                <img src="../../assets/img/Africoin.png" alt="" />
                <input
                  id="exchange-afk"
                  type="text"
                  disabled
                  placeholder="1 AFK = 0.0010457 BTC"
                />
                <label style="color: #476efb" for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="toCurrency === 'BTC'">
                <img src="../../assets/img/bitcoin.png" alt="" />
                <input
                  id="exchange-btc"
                  type="text"
                  disabled
                  placeholder="1 BTC = 0.0010457 AFK"
                />
                <label style="color:#f8ae30" for="exchange-afk"
                  >BTC <span class="c-white">Bitcoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div v-if="toCurrency === 'ETH'">
                <img src="../../assets/img/eth.png" alt="" />
                <input
                  id="exchange-eth"
                  type="text"
                  disabled
                  placeholder="1 ETH = 0.0010457 BTC"
                />
                <label style="color: #6d76bc" for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>

            <div class="line--input mt-64 mb-4">
                <input
                  type="text"
                  :class="{
                    'c-btc': fromCurrency === 'BTC',
                    'c-afk': fromCurrency === 'AFK',
                    'c-eth': fromCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="exchangeAmount"
                  @keydown="checkKeyPress($event)"
                />
                <span class="wallet--name">{{ fromCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
              <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              >
          </div>
        </form>

        <div class="text-center mt-5 mb-5">
          <div class="exchange--btn">
           <a @click="swapCurrencies()">
                <img src="../../assets/img/exchangebtn.png" alt="" />
              </a>
          </div>
        </div>

        <form>
          <div class="recieve">
            <div class="line--input mt-64 mb-4">
                <input
                  type="text"
                  :class="{
                    'c-btc': toCurrency === 'BTC',
                    'c-afk': toCurrency === 'AFK',
                    'c-eth': toCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="toValue"
                  disabled
                />
                <span class="wallet--name">{{ toCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
              <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              >
          </div>
        </form>

        <div class="exchange--breakdown w-100">
          <div class="exchange-breakdown text-right">
            <div class="mb-16">
              <img
                v-if="fromCurrency === 'AFK'"
                src="../../assets/img/Africoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="fromCurrency === 'BTC'"
                src="../../assets/img/bitcoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="fromCurrency === 'ETH'"
                src="../../assets/img/eth.png"
                height="50"
                alt=""
              />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You are exchanging</span>
              <h6
                :class="{
                  'c-btc': fromCurrency === 'BTC',
                  'c-afk': fromCurrency === 'AFK',
                  'c-eth': fromCurrency === 'ETH'
                }"
              >
                {{ exchangeAmount }} {{ fromCurrency }}
              </h6>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
          <div class="arrow--breakdown">
            <img src="../../assets/img/right.png" alt="" />
          </div>
          <div class="recieve-breakdown text-left">
            <div class="mb-16">
              <img
                v-if="toCurrency === 'AFK'"
                src="../../assets/img/Africoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="toCurrency === 'BTC'"
                src="../../assets/img/bitcoin.png"
                height="50"
                alt=""
              />
              <img
                v-if="toCurrency === 'ETH'"
                src="../../assets/img/eth.png"
                height="50"
                alt=""
              />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You will receive</span>
              <h6
                :class="{
                  'c-btc': toCurrency === 'BTC',
                  'c-afk': toCurrency === 'AFK',
                  'c-eth': toCurrency === 'ETH'
                }"
              >
                {{ exchangeValue | formatNumberLong }} {{ toCurrency }}
              </h6>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-20 sub--btn--holder">
          <div class="sub-button mt-20">
            <button v-if="!exchanging" @click="performExchange()" class="w-100">EXCHANGE</button>
            <button v-if="exchanging" disabled class="w-100"><i class="fa fa-circle-notch fa-spin"></i></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.baseUrl,
      fromCurrency: "AFK",
      exchangeAmount: 0,
      toCurrency: "BTC",
      toValue: 0,
      afkDollarRate: 1,
      calculatingRate: false,
      exchanging: false,
      exchangeValue: 0,
      dollarRates: {}
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    },
    btcData() {
      return this.$store.state.global.btcData;
    },
    ethData() {
      return this.$store.state.global.ethData;
    }
  },
  created () {
    this.dollarRates =  {
        afk: '1 AFK | $1',
        btc: '1 BTC | $' + this.btcData.current_price,
        eth: '1 ETH | $'  + this.btcData.current_price 
      }
      console.log('BTCDATA++',this.btcData)
  },
  methods: {
    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },

    checkKeyPress(event) {
      if(event.keyCode==13) this.calculateRates();
    },

    async calculateRates () {
      this.calculatingRate = true
      let rate = 0
      const fromNairaValue = await this.getExchangeRate(this.fromCurrency)
      const toNairaValue = await this.getExchangeRate(this.toCurrency)
      rate = (+fromNairaValue * +this.exchangeAmount) / toNairaValue
      this.exchangeValue = rate
      this.calculatingRate = false
    },

    async getExchangeRate(currency) {
      const payload = {
        base: currency,
        quote: "NGN"
      };

      const headers = {
        "Content-Type": "application/json",
        'Authorization': this.userDetails.token,
      };

      try {
        const response = await this.$axios.$post(
          this.baseUrl + "exchange/utilities/check-rate/",
          payload,
          { headers }
        );
        return response.data.rate
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.data.error);
        this.processing = false;
      }
    },

    swapCurrencies() {
      const tempFrom = this.fromCurrency;
      const tempTo = this.toCurrency;
      this.fromCurrency = tempTo;
      this.toCurrency = tempFrom;
    },

    async performExchange() {
      this.exchanging = true
      const payload = {
        amount: this.exchangeAmount,
        buying_wallet: this.fromCurrency,
        selling_wallet: this.toCurrency
      };

      const headers = {
        "Content-Type": "application/json",
        'Authorization': this.userDetails.token,
      };

      try {
        const response = await this.$axios.$post(
          this.baseUrl + "exchange/barter/buy/",
          payload,
          { headers }
        );
        this.exchanging = false
        console.log(response)
        this.$toast.success(response.data)
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.detail);
        this.exchanging = false;
      }

    },

    ...mapMutations({
      toggleSidebar: "global/toggleSidebar",
      closeSideBar: "global/closeSidebar"
    })
  },
  mounted() {},
  beforeMount() {
    this.closeSideBar();
  }
};
</script>
<style scoped>
a{
  cursor:pointer;
}
.exchange--content {
  height: inherit !important;
}
.main-content main .dash-body > div {
  padding-bottom: 50px;
  overflow-y: unset !important;
}

input#exchange-afk {
  border-color: #476efb;
}
input#exchange-btc {
  border-color: #f8ae30;
}
input#exchange-eth {
  border-color: #6d76bc;
}

.c-yellow {
  color: #f8ae30;
}

.c-blue {
  color: #476efb;
}

.overlay {
  width: 100%;
  height: 50vh;
  z-index: 999;
  background-color: #466dfb99;
  position:absolute;
  top:0;
  left:0;
}

.overlay i{
  color: #ffffffa7;
  margin-top: 50vh;
}
</style>
