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
              <!-- <span class="muted mb-10 d-block"
                >Select currency to exchange</span
              > -->

              <div class="dropdown coin-options">
                <a v-if="fromCurrency === 'AFK'" class="coin-option afk dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/Africoin.png" alt="" /> 
                 <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span>
                </label>
                <span class="rate">{{ dollarRates.afk }}</span>
                </a>
                <a v-if="fromCurrency === 'BTC'" class="coin-option btc dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/bitcoin.png" alt="" /> 
                 <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span>
                </label>
                <span class="rate">{{ dollarRates.btc }}</span>
                </a>
                <a v-if="fromCurrency === 'ETH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/eth.png" alt="" /> 
                 <label for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span>
                </label>
                <span class="rate">{{ dollarRates.eth }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a v-if="fromCurrency !== 'AFK'" class="dropdown-item afk" @click="fromCurrency = 'AFK'">
                    <img src="../../assets/img/Africoin.png" alt="" /> 
                    <label>AFK <span class="c-white">Africoin</span></label>
                    <span class="rate">{{ dollarRates.afk }}</span>
                  </a>
                  <a v-if="fromCurrency !== 'BTC'" class="dropdown-item btc" @click="fromCurrency = 'BTC'">
                    <img src="../../assets/img/bitcoin.png" alt="" /> 
                    <label for="exchange-afk">BTC <span class="c-white">Bitcoin</span></label>
                    <span class="rate">{{ dollarRates.btc }}</span>
                  </a>
                  <a v-if="fromCurrency !== 'ETH'" class="dropdown-item eth" @click="fromCurrency = 'ETH'">
                    <img src="../../assets/img/eth.png" alt="" /> 
                    <label for="exchange-afk">ETH <span class="c-white">Ethereum</span></label>
                    <span class="rate">{{ dollarRates.eth }}</span>
                  </a>
                </div>
              </div>

              <div class="line--input mt-64 mb-4">
                <input
                  type="number"
                  :class="{
                    'c-btc': fromCurrency === 'BTC',
                    'c-afk': fromCurrency === 'AFK',
                    'c-eth': fromCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="exchangeAmount"
                  @keyup="checkKeyPress($event)"
                />
                <span class="wallet--name">{{ fromCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span v-if="fromCurrency === 'AFK'" class="amount c-white">0.00</span>
                <span v-if="fromCurrency === 'BTC'" class="amount c-white">{{ exchangeAmount * btcData.current_price | formatNumber }}</span>
                <span v-if="fromCurrency === 'ETH'" class="amount c-white">{{ exchangeAmount * ethData.current_price | formatNumber }}</span>
                <span class="currency c-white">USD</span>
              </div>
              <!-- <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              > -->
            </div>
            <div class="exchange--btn">
              <a @click="swapCurrencies()">
                <img src="../../assets/img/exchangebtn.png" alt="" />
              </a>
            </div>
            <div class="recieve">
              <!-- <span class="muted mb-10 d-block"
                >Select currency to recieve</span
              > -->
              <div class="dropdown coin-options">
                <a v-if="toCurrency === 'AFK'" class="coin-option afk dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/Africoin.png" alt="" /> 
                 <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span>
                </label>
                <span class="rate">{{ dollarRates.afk }}</span>
                </a>
                <a v-if="toCurrency === 'BTC'" class="coin-option btc dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/bitcoin.png" alt="" /> 
                 <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span>
                </label>
                <span class="rate">{{ dollarRates.btc }}</span>
                </a>
                <a v-if="toCurrency === 'ETH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/eth.png" alt="" /> 
                 <label for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span>
                </label>
                <span class="rate">{{ dollarRates.eth }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a v-if="toCurrency !== 'AFK'" class="dropdown-item afk" @click="toCurrency = 'AFK'">
                    <img src="../../assets/img/Africoin.png" alt="" /> 
                    <label>AFK <span class="c-white">Africoin</span></label>
                    <span class="rate">{{ dollarRates.afk }}</span>
                  </a>
                  <a v-if="toCurrency !== 'BTC'" class="dropdown-item btc" @click="toCurrency = 'BTC'">
                    <img src="../../assets/img/bitcoin.png" alt="" /> 
                    <label for="exchange-afk">BTC <span class="c-white">Bitcoin</span></label>
                    <span class="rate">{{ dollarRates.btc }}</span>
                  </a>
                  <a v-if="toCurrency !== 'ETH'" class="dropdown-item eth" @click="toCurrency = 'ETH'">
                    <img src="../../assets/img/eth.png" alt="" /> 
                    <label for="exchange-afk">ETH <span class="c-white">Ethereum</span></label>
                    <span class="rate">{{ dollarRates.eth }}</span>
                  </a>
                </div>
              </div>

              <div class="line--input mt-64 mb-4">
                <input
                  type="number"
                  :class="{
                    'c-btc': toCurrency === 'BTC',
                    'c-afk': toCurrency === 'AFK',
                    'c-eth': toCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="exchangeValue"
                  disabled
                />
                <span class="wallet--name">{{ toCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <!-- <span class="amount c-white">0.00</span> -->
                <span v-if="toCurrency === 'AFK'" class="amount c-white">{{ exchangeValue * afkDollarRate | formatNumber }}</span>
                <span v-if="toCurrency === 'BTC'" class="amount c-white">{{ exchangeValue * btcData.current_price | formatNumber }}</span>
                <span v-if="toCurrency === 'ETH'" class="amount c-white">{{ exchangeValue * ethData.current_price | formatNumber }}</span>
                <span class="currency c-white">USD</span>
              </div>
              <!-- <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              > -->
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
              <!-- <span class="small-text c-white">$0.00</span> -->
              <span v-if="fromCurrency === 'AFK'" class="small-text c-white">${{ exchangeAmount * afkDollarRate | formatNumber }}</span>
              <span v-if="fromCurrency === 'BTC'" class="small-text c-white">${{ exchangeAmount * btcData.current_price | formatNumber }}</span>
              <span v-if="fromCurrency === 'ETH'" class="small-text c-white">${{ exchangeAmount * ethData.current_price | formatNumber }}</span>
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
              <!-- <span class="small-text c-white">$0.00</span> -->
              <span v-if="fromCurrency === 'AFK'" class="small-text c-white">${{ exchangeValue * afkDollarRate | formatNumber }}</span>
              <span v-if="fromCurrency === 'BTC'" class="small-text c-white">${{ exchangeValue * btcData.current_price | formatNumber }}</span>
              <span v-if="fromCurrency === 'ETH'" class="small-text c-white">${{ exchangeValue * ethData.current_price | formatNumber }}</span>
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
             <div class="dropdown coin-options">
                <a v-if="fromCurrency === 'AFK'" class="coin-option afk dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/Africoin.png" alt="" /> 
                 <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span>
                </label>
                <span class="rate">{{ dollarRates.afk }}</span>
                </a>
                <a v-if="fromCurrency === 'BTC'" class="coin-option btc dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/bitcoin.png" alt="" /> 
                 <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span>
                </label>
                <span class="rate">{{ dollarRates.btc }}</span>
                </a>
                <a v-if="fromCurrency === 'ETH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/eth.png" alt="" /> 
                 <label for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span>
                </label>
                <span class="rate">{{ dollarRates.eth }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a v-if="fromCurrency !== 'AFK'" class="dropdown-item afk" @click="fromCurrency = 'AFK'">
                    <img src="../../assets/img/Africoin.png" alt="" /> 
                    <label>AFK <span class="c-white">Africoin</span></label>
                    <span class="rate">{{ dollarRates.afk }}</span>
                  </a>
                  <a v-if="fromCurrency !== 'BTC'" class="dropdown-item btc" @click="fromCurrency = 'BTC'">
                    <img src="../../assets/img/bitcoin.png" alt="" /> 
                    <label for="exchange-afk">BTC <span class="c-white">Bitcoin</span></label>
                    <span class="rate">{{ dollarRates.btc }}</span>
                  </a>
                  <a v-if="fromCurrency !== 'ETH'" class="dropdown-item eth" @click="fromCurrency = 'ETH'">
                    <img src="../../assets/img/eth.png" alt="" /> 
                    <label for="exchange-afk">ETH <span class="c-white">Ethereum</span></label>
                    <span class="rate">{{ dollarRates.eth }}</span>
                  </a>
                </div>
              </div>

            <span class="text-right muted mb-10 mt-3 d-block"
                >Select currency to recieve</span
              >
              <div class="dropdown coin-options">
                <a v-if="toCurrency === 'AFK'" class="coin-option afk dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/Africoin.png" alt="" /> 
                 <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span>
                </label>
                <span class="rate">{{ dollarRates.afk }}</span>
                </a>
                <a v-if="toCurrency === 'BTC'" class="coin-option btc dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/bitcoin.png" alt="" /> 
                 <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span>
                </label>
                <span class="rate">{{ dollarRates.btc }}</span>
                </a>
                <a v-if="toCurrency === 'ETH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/eth.png" alt="" /> 
                 <label for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span>
                </label>
                <span class="rate">{{ dollarRates.eth }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a v-if="toCurrency !== 'AFK'" class="dropdown-item afk" @click="toCurrency = 'AFK'">
                    <img src="../../assets/img/Africoin.png" alt="" /> 
                    <label>AFK <span class="c-white">Africoin</span></label>
                    <span class="rate">{{ dollarRates.afk }}</span>
                  </a>
                  <a v-if="toCurrency !== 'BTC'" class="dropdown-item btc" @click="toCurrency = 'BTC'">
                    <img src="../../assets/img/bitcoin.png" alt="" /> 
                    <label for="exchange-afk">BTC <span class="c-white">Bitcoin</span></label>
                    <span class="rate">{{ dollarRates.btc }}</span>
                  </a>
                  <a v-if="toCurrency !== 'ETH'" class="dropdown-item eth" @click="toCurrency = 'ETH'">
                    <img src="../../assets/img/eth.png" alt="" /> 
                    <label for="exchange-afk">ETH <span class="c-white">Ethereum</span></label>
                    <span class="rate">{{ dollarRates.eth }}</span>
                  </a>
                </div>
              </div>

            <div class="line--input mt-64 mb-4">
                <input
                  type="number"
                  :class="{
                    'c-btc': toCurrency === 'BTC',
                    'c-afk': toCurrency === 'AFK',
                    'c-eth': toCurrency === 'ETH'
                  }"
                  placeholder="0.00"
                  v-model="exchangeAmount"
                  @keyup="checkKeyPress($event)"
                />
                <span class="wallet--name">{{ fromCurrency }}</span>
              </div>

              <div class="sending--amnt flex flex-between">
                <span v-if="fromCurrency === 'AFK'" class="amount c-white">{{ exchangeAmount * afkDollarRate | formatNumber }}</span>
                <span v-if="fromCurrency === 'BTC'" class="amount c-white">{{ exchangeAmount * btcData.current_price | formatNumber }}</span>
                <span v-if="fromCurrency === 'ETH'" class="amount c-white">{{ exchangeAmount * ethData.current_price | formatNumber }}</span>
                <span class="currency c-white">USD</span>
              </div>
              <!-- <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              > -->
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
                  type="number"
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
                <!-- <span class="amount c-white">0.00</span> -->
                <span v-if="toCurrency === 'AFK'" class="small-text c-white">{{ exchangeValue * afkDollarRate | formatNumber }}</span>
                <span v-if="toCurrency === 'BTC'" class="small-text c-white">{{ exchangeValue * btcData.current_price | formatNumber }}</span>
                <span v-if="toCurrency === 'ETH'" class="small-text c-white">{{ exchangeValue * ethData.current_price | formatNumber }}</span>
                <span class="currency c-white">USD</span>
              </div>
              <!-- <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              > -->
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
              <!-- <span class="small-text c-white">$0.00</span> -->
              <span v-if="fromCurrency === 'AFK'" class="small-text c-white">${{ exchangeAmount * afkDollarRate | formatNumber }}</span>
              <span v-if="fromCurrency === 'BTC'" class="small-text c-white">${{ exchangeAmount * btcData.current_price | formatNumber }}</span>
              <span v-if="fromCurrency === 'ETH'" class="small-text c-white">${{ exchangeAmount * ethData.current_price | formatNumber }}</span>
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
              <!-- <span class="small-text c-white">$0.00</span> -->
              <span v-if="toCurrency === 'AFK'" class="small-text c-white">${{ exchangeValue * afkDollarRate | formatNumber }}</span>
              <span v-if="toCurrency === 'BTC'" class="small-text c-white">${{ exchangeValue * btcData.current_price | formatNumber }}</span>
              <span v-if="toCurrency === 'ETH'" class="small-text c-white">${{ exchangeValue * ethData.current_price | formatNumber }}</span>
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
      dollarRates: {},
      nairaValues: {
        afk: 365,
        eth: 0,
        btc: 0
      }
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    },
    btcData() {
      return this.$store.state.btcData;
    },
    ethData() {
      return this.$store.state.ethData;
    }
  },
  created () {
    this.dollarRates =  {
      afk: '1 AFK | $1',
      btc: '1 BTC | $' + this.btcData.current_price,
      eth: '1 ETH | $'  + this.ethData.current_price 
    }
    console.log('BTCDATA++',this.btcData)

    this.getNairaValues()
  },
  methods: {
    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },

    checkKeyPress(event) {
      if (event.keyCode !==13 && event.keyCode !==8) {
        this.calculateRates();
      }
    },

    async getNairaValues() {
      this.nairaValues.btc = await this.getExchangeRate('BTC')
      this.nairaValues.eth = await this.getExchangeRate('ETH')
    },

    async calculateRates () {
      // this.calculatingRate = true
      let rate = 0
      let fromNairaValue = 0 
      let toNairaValue = 0

      if (this.fromCurrency === 'ETH'){
        fromNairaValue = this.nairaValues.eth
      } else if (this.fromCurrency === 'BTC') {
        fromNairaValue = this.nairaValues.btc
      } else if (this.fromCurrency === 'AFK') {
        fromNairaValue = fromNairaValue.afk
      }

      if (this.toCurrency === 'ETH'){
        toNairaValue = this.nairaValues.eth
      } else if (this.toCurrency === 'BTC') {
        toNairaValue = this.nairaValues.btc
      } else if (this.toCurrency === 'AFK') {
        toNairaValue = fromNairaValue.afk
      }

      rate = (+fromNairaValue * +this.exchangeAmount) / toNairaValue
      this.exchangeValue = rate
      // this.calculatingRate = false
      console.log(this.rate)
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
        from_currency: this.fromCurrency,
        to_currency: this.toCurrency
      };

      const headers = {
        "Content-Type": "application/json",
        'Authorization': this.userDetails.token,
      };

      try {
        const response = await this.$axios.$post(
          this.baseUrl + "exchange/barter/swap/",
          payload,
          { headers }
        );
        this.exchanging = false
        console.log(response)
        this.$toast.success(response.msg)
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

a{
  cursor:pointer;
}

.coin-option{
  border-radius: 10px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  border: 2px solid;
  width:100%;
  display:block;
}

.coin-option span.rate{
  color: #ffffffaf;
  display: inline-block;;
  margin-top: 10px;
  margin-left: 35px;
  font-size: 12px;
}

.coin-option .dropdown-toggle::after {
  /* display: inline-block; */
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent;
  float: right;
  margin-top: 10px;
}

.coin-option img {
  margin-top: -3px;
}

.coin-option.btc{
  border-color: #f8ae30;
}

.coin-option.btc label, .dropdown-item.btc label{
  color: #f8ae30;
}

.coin-option.eth{
  border-color: #6d76bc;
}

.coin-option.eth label, .dropdown-item.eth label{
  color: #6d76bc
}

.coin-option.afk{
  border-color: #476efb;
}

.coin-option.afk label,  .dropdown-item.eth label{
  color: #476efb
}

.dropdown.coin-options .dropdown-menu {
  width:100%;
  padding:15px;
  background-color: #0b1a4d;
}

.dropdown-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: transparent;
  display: block;
  position: relative;
}

.dropdown-item label {
  font-size: 13px;
}

.dropdown-item span.rate {
  font-size: 12px;
  margin-top: 20px;
  display:block;
  margin-left: 40px;
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
