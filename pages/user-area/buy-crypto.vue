<template>
  <div class="dash-body">
    <div class="container">
      <div class="row">
        <div class="col-md-10 mr-auto ml-auto">
          <div class="w-100">
            <form>
              <div class="exchange">
                <span class="muted mt-5 mb-2 d-block"
                  >Select currency to buy</span
                >
                <div class="dropdown coin-options">
                  <a
                    v-if="toCurrency === 'AFK'"
                    class="coin-option afk dropdown-toggle w-100"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="../../assets/img/Africoin.png" alt="" />
                    <label for="exchange-afk"
                      >AFK <span class="c-white">Africoin</span>
                    </label>
                    <span class="rate">{{ dollarRates.afk }}</span>
                  </a>
                  <a
                    v-if="toCurrency === 'BTC'"
                    class="coin-option btc dropdown-toggle w-100"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="../../assets/img/bitcoin.png" alt="" />
                    <label for="exchange-btc"
                      >BTC <span class="c-white">Bitcoin</span>
                    </label>
                    <span class="rate">{{ dollarRates.btc }}</span>
                  </a>
                  <a
                    v-if="toCurrency === 'ETH'"
                    class="coin-option eth dropdown-toggle w-100"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="../../assets/img/eth.png" alt="" />
                    <label for="exchange-afk"
                      >ETH <span class="c-white">Ethereum</span>
                    </label>
                    <span class="rate">{{ dollarRates.eth }}</span>
                  </a>
                  <a
                    v-if="toCurrency === 'LTC'"
                    class="coin-option eth dropdown-toggle w-100"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="../../assets/img/litecoin.png"
                      style="width: 35px"
                      alt=""
                    />
                    <label for="exchange-afk"
                      >LTC <span class="c-white">Litecoin</span>
                    </label>
                    <span class="rate">{{ dollarRates.ltc }}</span>
                  </a>
                  <a
                    v-if="toCurrency === 'DASH'"
                    class="coin-option eth dropdown-toggle w-100"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="../../assets/img/dash.png"
                      style="width: 35px"
                      alt=""
                    />
                    <label for="exchange-afk"
                      >DASH <span class="c-white">Dash</span>
                    </label>
                    <span class="rate">{{ dollarRates.dash }}</span>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      v-if="toCurrency !== 'AFK'"
                      class="dropdown-item afk"
                      @click="toCurrency = 'AFK'"
                    >
                      <img src="../../assets/img/Africoin.png" alt="" />
                      <label>AFK <span class="c-white">Africoin</span></label>
                      <span class="rate">{{ dollarRates.afk }}</span>
                    </a>
                    <a
                      v-if="toCurrency !== 'BTC'"
                      class="dropdown-item btc"
                      @click="toCurrency = 'BTC'"
                    >
                      <img src="../../assets/img/bitcoin.png" alt="" />
                      <label for="exchange-afk"
                        >BTC <span class="c-white">Bitcoin</span></label
                      >
                      <span class="rate">{{ dollarRates.btc }}</span>
                    </a>
                    <a
                      v-if="toCurrency !== 'ETH'"
                      class="dropdown-item eth"
                      @click="toCurrency = 'ETH'"
                    >
                      <img src="../../assets/img/eth.png" alt="" />
                      <label for="exchange-afk"
                        >ETH <span class="c-white">Ethereum</span></label
                      >
                      <span class="rate">{{ dollarRates.eth }}</span>
                    </a>
                    <a
                      v-if="toCurrency !== 'LTC'"
                      class="dropdown-item eth"
                      @click="toCurrency = 'LTC'"
                    >
                      <img
                        src="../../assets/img/litecoin.png"
                        style="width: 35px"
                        alt=""
                      />
                      <label for="exchange-afk"
                        >LTC <span class="c-white">Litecoin</span></label
                      >
                      <span class="rate">{{ dollarRates.ltc }}</span>
                    </a>
                    <a
                      v-if="toCurrency !== 'DASH'"
                      class="dropdown-item eth"
                      @click="toCurrency = 'DASH'"
                    >
                      <img
                        src="../../assets/img/dash.png"
                        style="width: 35px"
                        alt=""
                      />
                      <label for="exchange-afk"
                        >DASH <span class="c-white">Dash</span></label
                      >
                      <span class="rate">{{ dollarRates.dash }}</span>
                    </a>
                  </div>
                </div>

                <div class="line--input mt-5 mb-4">
                  <span class="muted mb-2 d-block"
                  >How much do you need?</span
                >
                  <input
                    type="number"
                    :class="{
                      'c-btc': toCurrency === 'BTC',
                      'c-afk': toCurrency === 'AFK',
                      'c-eth': toCurrency === 'ETH',
                      'c-ltc': toCurrency === 'LTC',
                      'c-dash': toCurrency === 'DASH'
                    }"
                    placeholder="0.00"
                    v-model="exchangeAmount"
                    @keyup="checkKeyPress($event)"
                  />
                  <span class="wallet--name">{{ toCurrency }}</span>
                </div>

                <div class="sending--amnt flex flex-between">
                  <span v-if="toCurrency === 'AFK'" class="amount c-white">{{
                    (exchangeAmount * afkDollarRate) | formatNumber
                  }}</span>
                  <span v-if="toCurrency === 'BTC'" class="amount c-white">{{
                    (exchangeAmount * btcData.current_price) | formatNumber
                  }}</span>
                  <span v-if="toCurrency === 'ETH'" class="amount c-white">{{
                    (exchangeAmount * ethData.current_price) | formatNumber
                  }}</span>
                  <span v-if="toCurrency === 'LTC'" class="amount c-white">{{
                    (exchangeAmount * litecoinData.current_price) | formatNumber
                  }}</span>
                  <span v-if="toCurrency === 'DASH'" class="amount c-white">{{
                    (exchangeAmount * dashData.current_price) | formatNumber
                  }}</span>
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
                  <img
                    v-if="toCurrency === 'LTC'"
                    src="../../assets/img/litecoin.png"
                    height="50"
                    style="width:35px"
                    alt=""
                  />
                  <img
                    v-if="toCurrency === 'DASH'"
                    src="../../assets/img/dash.png"
                    height="50"
                    style="width:35px"
                    alt=""
                  />
                </div>
                <div>
                  <span class="c-white mb-4 d-block">You are buying</span>
                  <h6
                    :class="{
                      'c-btc': toCurrency === 'BTC',
                      'c-afk': toCurrency === 'AFK',
                      'c-eth': toCurrency === 'ETH',
                      'c-ltc': toCurrency === 'LTC',
                      'c-dash': toCurrency === 'DASH'
                    }"
                  >
                    {{ exchangeAmount }} {{ toCurrency }}
                  </h6>
                  <!-- <span class="small-text c-white">$0.00</span> -->
                  <span v-if="toCurrency === 'AFK'" class="small-text c-white"
                    >${{
                      (exchangeAmount * afkDollarRate) | formatNumber
                    }}</span
                  >
                  <span v-if="toCurrency === 'BTC'" class="small-text c-white"
                    >${{
                      (exchangeAmount * btcData.current_price) | formatNumber
                    }}</span
                  >
                  <span v-if="toCurrency === 'ETH'" class="small-text c-white"
                    >${{
                      (exchangeAmount * ethData.current_price) | formatNumber
                    }}</span
                  >
                  <span v-if="toCurrency === 'LTC'" class="small-text c-white"
                    >${{
                      (exchangeAmount * litecoinData.current_price)
                        | formatNumber
                    }}</span
                  >
                  <span
                    v-if="toCurrency === 'DASH'"
                    class="small-text c-white"
                    >${{
                      (exchangeAmount * dashData.current_price) | formatNumber
                    }}</span
                  >
                </div>
              </div>
              <div class="arrow--breakdown">
                <img src="../../assets/img/right.png" alt="" />
              </div>
              <div class="recieve-breakdown text-left">
                <div class="mb-16 ">
                  <img
                    src="../../assets/img/side-wallet.png"
                    height="50"
                    style="width:35px; opacity: 0.5"
                    alt=""
                  />
                  <!-- <img
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
                  <img
                    v-if="toCurrency === 'LTC'"
                    src="../../assets/img/litecoin.png"
                    height="50"
                    style="width:35px"
                    alt=""
                  />
                  <img
                    v-if="toCurrency === 'DASH'"
                    src="../../assets/img/dash.png"
                    height="50"
                    style="width:35px"
                    alt=""
                  /> -->
                </div>
                <div>
                  <span class="c-white mb-4 d-block">You will pay</span>
                  <h6
                    :class="{
                      'c-btc': toCurrency === 'BTC',
                      'c-afk': toCurrency === 'AFK',
                      'c-eth': toCurrency === 'ETH',
                      'c-ltc': toCurrency === 'LTC',
                      'c-dash': toCurrency === 'DASH'
                    }"
                  >
                    <span v-if="toCurrency === 'AFK'"
                      >{{
                        (exchangeAmount * nairaValues.afk) | formatNumber
                      }}</span
                    >
                    <span v-if="toCurrency === 'BTC'"
                      >{{
                        (exchangeAmount * nairaValues.btc) | formatNumber
                      }}</span
                    >
                    <span v-if="toCurrency === 'ETH'"
                      >{{
                        (exchangeAmount * nairaValues.eth) | formatNumber
                      }}</span
                    >
                    <span v-if="toCurrency === 'LTC'"
                      >{{
                        (exchangeAmount * nairaValues.ltc)
                          | formatNumber
                      }}</span
                    >
                    <span
                      v-if="toCurrency === 'DASH'"
                      >{{
                        (exchangeAmount * nairaValues.dash) | formatNumber
                      }}</span
                    >
                    <!-- {{ exchangeValue | formatNumberLong }}  -->
                    NGN
                  </h6>
                </div>
              </div>
            </div>

            <!-- <div class="text-center mt-20 sub--btn--holder">
              <div class="sub-button mt-20">
                <button
                  v-if="!exchanging"
                  @click="performExchange()"
                  class="w-100"
                >
                  EXCHANGE
                </button>
                <button v-if="exchanging" disabled class="w-100">
                  <i class="fa fa-circle-notch fa-spin"></i>
                </button>
              </div>
            </div> -->
            <div class="cash--crypto--btns text-center mt-5">
            <div>
              <div class="sub-button">
                <button v-if="!processing" @click="generateTransaction()" type="submit">
                  BUY WITH CASH
                </button>
                <button v-if="processing" type="submit">
                  <i class="fas fa-circle-notch fa-spin" />
                </button>
              </div>

              <div class="sub-button">
                <button
                    @click="openModal('buyWithTokenModal')"
                    target="_blank"
                  >
                    <!-- href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b" -->
                    BUY WITH TOKENS
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

        <!-- Cofirmation Modal -->
    <div
      class="modal fade"
      id="cryptoPurchaseConfirmationModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cryptoPurchaseConfirmationModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">
              Buy AfriTokens
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    You are about to pay for
                    <span class="warn">{{ exchangeAmount }} {{ toCurrency }}</span>.
                  </p>

                  <label>Amount due today:</label>
                  <h2 class="warn">
                    NGN <span v-if="toCurrency === 'AFK'">{{
                      (exchangeAmount * nairaValues.afk) | formatNumber
                    }}</span>
                    <span v-if="toCurrency === 'BTC'">{{
                      (exchangeAmount * nairaValues.btc) | formatNumber
                    }}</span>
                    <span v-if="toCurrency === 'ETH'">{{
                      (exchangeAmount * nairaValues.eth) | formatNumber
                    }}</span>
                    <span v-if="toCurrency === 'LTC'">{{
                      (exchangeAmount * nairaValues.ltc) | formatNumber
                    }}</span>
                    <span v-if="toCurrency === 'DASH'">{{
                      (exchangeAmount * nairaValues.dash) | formatNumber
                    }}</span>
                  </h2>

                  <label>Transaction Reference:</label>
                  <p>{{ transactionRef }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12 ml-auto mr-auto">
              <form
                name="form1"
                action="https://sandbox.interswitchng.com/collections/w/pay"
                method="post"
              >
                <input name="product_id" v-model="productId" type="hidden" />
                <input
                  name="pay_item_id"
                  v-model="paymentItemId"
                  type="hidden"
                />
                <input name="amount" v-model="amountToPay" type="hidden" />
                <input name="currency" v-model="currency" type="hidden" />
                <input
                  name="site_redirect_url"
                  v-model="redirectUrl"
                  type="hidden"
                />
                <input name="txn_ref" v-model="transactionRef" type="hidden" />
                <input name="cust_id" v-model="customerId" type="hidden" />
                <input name="cust_name" v-model="customerName" type="hidden" />
                <input name="hash" v-model="transactionHash" type="hidden" />
                <button class="w-100" type="submit">
                  <img
                    src="../../assets/img/interswitch_icon.png"
                    class="mr-2"
                  />PAY WITH INTERSWICH
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- Buy with crypto Modal -->
    <div
      class="modal fade"
      id="buyWithTokenModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="buyWithTokenModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">
              Buy {{toCurrency}}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    You are about to pay for
                    <span class="warn">{{ exchangeAmount }} {{ toCurrency }}</span> using Afritoken. Please click on the "PAY NOW" button to complete the transaction.
                  </p>

                  <!-- <label>Amount due today:</label>
                  <h2 class="warn">
                    NGN {{ (amountToPay / 100) | formatNumber }}
                  </h2> -->

                  <!-- <label>Transaction Reference:</label>
                  <p>{{ transactionRef }}</p> -->

                  <!-- <div class="dropdown coin-options">
                <a v-if="toCurrency === 'AFK'" class="coin-option afk dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/Africoin.png" alt="" />
                 <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span>
                </label>
                <span class="rate">Balance: {{ userDetails.afk_balance | formatNumberLong  }}</span>
                </a>
                <a v-if="toCurrency === 'BTC'" class="coin-option btc dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/bitcoin.png" alt="" />
                 <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span>
                </label>
                <span class="rate">Balance: {{ userDetails.btc_balance | formatNumberLong  }}</span>
                </a>
                <a v-if="toCurrency === 'ETH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/eth.png" alt="" />
                 <label for="exchange-afk"
                  >ETH <span class="c-white">Ethereum</span>
                </label>
                <span class="rate">Balance: {{ userDetails.eth_balance | formatNumberLong  }}</span>
                </a>
                <a v-if="toCurrency === 'LTC'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/litecoin.png" style="width:35px" alt="" />
                 <label for="exchange-afk"
                  >LTC <span class="c-white">Litecoin</span>
                </label>
                <span class="rate">Balance: {{ userDetails.ltc_balance | formatNumberLong  }}</span>
                </a>
                <a v-if="toCurrency === 'DASH'" class="coin-option eth dropdown-toggle w-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img src="../../assets/img/dash.png" style="width:35px" alt="" />
                 <label for="exchange-afk"
                  >Dash <span class="c-white">Dash</span>
                </label>
                <span class="rate">Balance: {{ userDetails.dash_balance | formatNumberLong  }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a v-if="toCurrency !== 'AFK'" class="dropdown-item afk" @click="toCurrency = 'AFK'">
                    <img src="../../assets/img/Africoin.png" alt="" />
                    <label>AFK <span class="c-white">Africoin</span></label>
                    <span class="rate">Balance: {{ userDetails.afk_balance | formatNumberLong  }}</span>
                  </a>
                  <a v-if="toCurrency !== 'BTC'" class="dropdown-item btc" @click="toCurrency = 'BTC'">
                    <img src="../../assets/img/bitcoin.png" alt="" />
                    <label for="exchange-afk">BTC <span class="c-white">Bitcoin</span></label>
                    <span class="rate">Balance: {{ userDetails.btc_balance | formatNumberLong  }}</span>
                  </a>
                  <a v-if="toCurrency !== 'ETH'" class="dropdown-item eth" @click="toCurrency = 'ETH'">
                    <img src="../../assets/img/eth.png" alt="" />
                    <label for="exchange-afk">ETH <span class="c-white">Ethereum</span></label>
                    <span class="rate">Balance: {{ userDetails.eth_balance | formatNumberLong  }}</span>
                  </a>
                  <a v-if="toCurrency !== 'LTC'" class="dropdown-item eth" @click="toCurrency = 'LTC'">
                    <img src="../../assets/img/litecoin.png" style="width:35px" alt="" />
                    <label for="exchange-afk">LTC <span class="c-white">Litecoin</span></label>
                    <span class="rate">Balance: {{ userDetails.litecoin_balance | formatNumberLong  }}</span>
                  </a>
                  <a v-if="toCurrency !== 'DASH'" class="dropdown-item eth" @click="toCurrency = 'DASH'">
                    <img src="../../assets/img/dash.png" style="width:35px" alt="" />
                    <label for="exchange-afk">DASH <span class="c-white">Dash</span></label>
                    <span class="rate">Balance: {{ userDetails.dash_balance | formatNumberLong }}</span>
                  </a>
                </div>
              </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12 ml-auto mr-auto">
              <button v-if="!purchasingWithCrypto" @click="purchaseWithTokens()" class="w-100" type="submit">
                PAY NOW
              </button>
              <button v-if="purchasingWithCrypto" class="w-100" type="submit">
                <i class="fas fa-circle-notch fa-spin" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.baseUrl,
      toCurrency: "AFK",
      exchangeAmount: "",
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
        btc: 0,
        ltc: 0,
        dash: 0
      }
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.authenticatedUser;
    },
    btcData() {
      return this.$store.state.btcData;
    },
    ethData() {
      return this.$store.state.ethData;
    },
    litecoinData() {
      return this.$store.state.litecoinData;
    },
    dashData() {
      return this.$store.state.dashData;
    }
  },
  created() {
    this.dollarRates = {
      afk: "1 AFK | $1",
      btc: "1 BTC | $" + this.btcData.current_price,
      eth: "1 ETH | $" + this.ethData.current_price,
      ltc: "1 LTC | $" + this.litecoinData.current_price,
      dash: "1 DASH | $" + this.dashData.current_price
    };
    console.log("BTCDATA++", this.btcData);

    this.getNairaValues();
  },
  methods: {
    openModal(modalId) {
      $("#" + modalId).modal("show");
      $(".modal-backdrop").hide();
    },

    closeModal(modalId) {
      $("#" + modalId).modal("hide");
    },

    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },

    checkKeyPress(event) {
      if (event.keyCode !== 13) {
        this.calculateRates();
      }
    },

    async getNairaValues() {
      // this.nairaValues.dash = await this.getExchangeRate("DASH");
      this.nairaValues.btc = await this.getExchangeRate("BTC");
      this.nairaValues.eth = await this.getExchangeRate("ETH");
      // this.nairaValues.ltc = await this.getExchangeRate("LTC");

      console.log("NAIRA VALUES", this.nairaValues);
    },

    async calculateRates() {
      // this.calculatingRate = true
      let rate = 0;
      let fromNairaValue = 0;
      let toNairaValue = 0;

      console.log("from: ", this.toCurrency);
      if (this.toCurrency === "ETH") {
        fromNairaValue = this.nairaValues.eth;
      } else if (this.toCurrency === "BTC") {
        fromNairaValue = this.nairaValues.btc;
      } else if (this.toCurrency === "AFK") {
        fromNairaValue = this.nairaValues.afk;
      } else if (this.toCurrency === "LTC") {
        fromNairaValue = this.nairaValues.ltc;
      } else if (this.toCurrency === "DASH") {
        fromNairaValue = this.nairaValues.dash;
      }

      console.log("to: ", this.toCurrency);
      if (this.toCurrency === "ETH") {
        toNairaValue = this.nairaValues.eth;
      } else if (this.toCurrency === "BTC") {
        toNairaValue = this.nairaValues.btc;
      } else if (this.toCurrency === "AFK") {
        toNairaValue = this.nairaValues.afk;
      } else if (this.toCurrency === "LTC") {
        toNairaValue = this.nairaValues.ltc;
      } else if (this.toCurrency === "DASH") {
        toNairaValue = this.nairaValues.dash;
      }

      rate = (fromNairaValue * this.exchangeAmount) / toNairaValue;
      this.exchangeValue = rate;
      // this.calculatingRate = false
      console.log(rate);
    },

    async getExchangeRate(currency) {
      const payload = {
        base: currency,
        quote: "NGN"
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const response = await this.$axios.$post(
          this.baseUrl + "exchange/utilities/check-rate/",
          payload,
          { headers }
        );
        console.log(response);
        return response.data.rate;
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.data.error);
        this.processing = false;
      }
    },

    swapCurrencies() {
      const tempFrom = this.toCurrency;
      const tempTo = this.toCurrency;
      this.toCurrency = tempTo;
      this.toCurrency = tempFrom;
    },

    // async performExchange() {
    //   this.exchanging = true;
    //   const payload = {
    //     amount: this.exchangeAmount,
    //     from_currency: this.toCurrency,
    //     to_currency: this.toCurrency
    //   };

    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: this.userDetails.token
    //   };

    //   try {
    //     const response = await this.$axios.$post(
    //       this.baseUrl + "exchange/barter/swap/",
    //       payload,
    //       { headers }
    //     );
    //     this.exchanging = false;
    //     console.log(response);
    //     this.$toast.success(response.msg);
    //   } catch (e) {
    //     console.log(e.response);
    //     this.$toast.error(e.response.data.detail);
    //     this.exchanging = false;
    //   }
    // },

    reference() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    calculateParams() {
      if (!this.tokens || this.tokens === 0) {
        return;
      }
      this.transactionRef = this.reference();
      this.amountToPay = this.tokens * this.pricePerToken * 100;
      this.redirectUrl =
        // "http://localhost:3000/user-area/payment-done?ref=" +
        "https://portal.payafrik.io/user-area/payment-done?ref=" +
        this.transactionRef +
        "&amount=" +
        this.amountToPay +
        "&prodId=" +
        this.productId;
      this.customerId = "CUST" + this.userDetails.username;
      this.customerName =
        this.userDetails.first_name + " " + this.userDetails.last_name;
      const macKey =
        "D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F";
      this.transactionHash = sha512(
        this.transactionRef +
          this.productId +
          this.paymentItemId +
          this.amountToPay +
          this.redirectUrl +
          macKey
      );
    },

    async generateTransaction() {
      this.processing = true;
      const payload = {
        amount: this.amountToPay/100,
        username: this.userDetails.username,
        receiptEmail: this.email,
        transactionType: "CASH",
        transactionStatus: "PENDING",
        pfkTransactionReference: this.transactionRef,
        interswitchTransactionRef: "",
        channel: "INTERSWITCH",
        transactionFor: this.toCurrency + "_PURCHASE",
      };

      const headers = {
        "Content-Type": "application/json",
        "pfk-user-token": this.userDetails.token
      };
      try {
        const response = await this.$axios.$post(
          this.interswitchBaseUrl + "transactions/new",
          payload,
          { headers }
        );
        console.log("request response", response);
        this.processing = false;
        this.openModal("cryptoPurchaseConfirmationModal");
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.error);
        this.processing = false;
      }
    },

    async purchaseWithTokens () {
      if (!this.exchangeAmount || this.exchangeAmount === 0) {
        this.$toast.error('Please select an amount greater than 0')
        return
      }
      if (!this.toCurrency || this.toCurrency === "") {
        this.$toast.error('Please choose a currency to buy')
        return
      }

      this.purchasingWithCrypto = true

      const payload = {
        amount: this.exchangeAmount,
        from_currency: "AFRITOKEN",
        to_currency: this.toCurrency
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }
      try{
        const requestResponse = await this.$axios.$post(this.baseUrl + 'exchange/barter/swap/', payload, {headers})
        console.log('request response', requestResponse)
        this.$toast.success('Token purchase successful!')
        this.purchasingWithCrypto = false
        this.closeModal('#buyWithTokenModal')
      } catch(e){
        console.log(e.response)
        this.$toast.error(JSON.stringify(e.response.data.error))
        this.purchasingWithCrypto = false
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
  .dash-body > .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row {
    height: 100%;
  }

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

a {
  cursor: pointer;
}

.coin-option {
  border-radius: 10px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  border: 2px solid;
  width: 100%;
  display: block;
}

.coin-option span.rate {
  color: #ffffffaf;
  display: inline-block;
  margin-top: 10px;
  margin-left: 35px;
  font-size: 12px;
}

.coin-option .dropdown-toggle::after {
  /* display: inline-block; */
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  float: right;
  margin-top: 10px;
}

.coin-option img {
  margin-top: -3px;
}

.coin-option.btc {
  border-color: #f8ae30;
}

.coin-option.btc label,
.dropdown-item.btc label {
  color: #f8ae30;
}

.coin-option.eth {
  border-color: #6d76bc;
}

.coin-option.eth label,
.dropdown-item.eth label {
  color: #6d76bc;
}

.coin-option.afk {
  border-color: #476efb;
}

.coin-option.afk label,
.dropdown-item.eth label {
  color: #476efb;
}

.dropdown.coin-options .dropdown-menu {
  width: 100%;
  padding: 15px;
  background-color: #0b1a4d;
  z-index: 999;
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
  display: block;
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
input#exchange-dash {
  border-color: #fff;
}
input#exchange-ltc {
  border-color: #a5a5a5;
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
  position: absolute;
  top: 0;
  left: 0;
}

.overlay i {
  color: #ffffffa7;
  margin-top: 50vh;
}

.exchange--breakdown {
    margin-top: 0;
  z-index: 1;
}

#cryptoPurchaseConfirmationModal .modal-content, #buyWithTokenModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}

#cryptoPurchaseConfirmationModal .modal-header, #buyWithTokenModal .modal-header {
  margin-bottom: 15px;
  border: none !important;
}

#cryptoPurchaseConfirmationModal .modal-header button, #buyWithTokenModal .modal-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
}

#cryptoPurchaseConfirmationModal .modal-header h5, #buyWithTokenModal .modal-header h5 {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
}

#cryptoPurchaseConfirmationModal .modal-footer, #buyWithTokenModal .modal-footer {
  border: none !important;
}

#cryptoPurchaseConfirmationModal .modal-footer button, #buyWithTokenModal .modal-footer button {
  background: #11154b;
  color: #f6f6f6;
  border: solid #2832c3;
  padding: 10px 40px;
  border-radius: 25px;
  cursor: pointer;
}

#cryptoPurchaseConfirmationModal .modal-footer button.cancel, #buyWithTokenModal .modal-footer button.cancel {
  border: solid transparent;
}
</style>
