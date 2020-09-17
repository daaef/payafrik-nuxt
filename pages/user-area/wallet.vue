<template>
  <section class="dash-body">
    <div>
      <div class="welcome-text">
        <div class="text-center">
          <h1 class="w-100 c-white am-type mt-0 mb-0 text-large light">
            Wallets
          </h1>
          <div class="for-mobile mt-3">
            <div class="container">
              <div class="row">
                <div class="col-4">
                  <a @click="changeWallet('afk')" :class="[ activeWallet === 'afk' ?  'warn' : '' ]">
                    <span class="d-block afk am-type mb-8 text-right bold w-title"
                    >Africoin</span
                    >
                    <span class="muted w-100 text-right d-block">0 AFK</span>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="changeWallet('btc')" :class="[ activeWallet === 'btc' ?  'warn' : '' ]">
                    <span class="d-block btc am-type mb-8 text-right bold w-title"
                    >Bitcoin</span
                    >
                    <span class="muted w-100 text-right d-block">0 BTC</span>
                  </a>
                </div>
                <div class="col-4">
                  <a @click="changeWallet('eth')" :class="[ activeWallet === 'eth' ?  'warn' : '' ]">
                    <span class="d-block eth am-type mb-8 text-right bold w-title"
                    >Ethereum</span
                    >
                    <span class="muted w-100 text-right d-block">0 ETH</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap flex-between flex-stretch mt-3">
        <div class="wallet-sidebar not-for-mobile">
          <ul>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'afk' ?  'w-active' : '' ]">
              <a @click="changeWallet('afk')">
                <span class="d-block afk am-type mb-8 text-right bold w-title"
                >Africoin</span
                >
                <span class="muted w-100 text-right d-block">{{ userDetails.afk_balance | formatNumberLong }} AFK</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'btc' ?  'w-active' : '' ]">
              <a @click="changeWallet('btc')">
                <span class="d-block btc am-type mb-8 text-right bold w-title"
                >Bitcoin</span
                >
                <span class="muted w-100 text-right d-block">{{ userDetails.btc_balance | formatNumberLong }} BTC</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'eth' ?  'w-active' : '' ]">
              <a @click="changeWallet('eth')">
                <span class="d-block eth am-type mb-8 text-right bold w-title"
                >Ethereum</span
                >
                <span class="muted w-100 text-right d-block">{{ userDetails.eth_balance | formatNumberLong }} ETH</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'ltc' ?  'w-active' : '' ]">
              <a @click="changeWallet('ltc')">
                <span class="d-block ltc am-type mb-8 text-right bold w-title"
                >LiteCoin</span
                >
                <span class="muted w-100 text-right d-block">{{ userDetails.ltc_balance | formatNumberLong }} LTC</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'dash' ?  'w-active' : '' ]">
              <a @click="changeWallet('dash')">
                <span class="d-block dash am-type mb-8 text-right bold w-title"
                >Dash</span
                >
                <span
                  class="muted w-100 text-right d-block">{{ userDetails.dash_balance | formatNumberLong }} DASH</span>
              </a>
            </li>
            <!-- <li class="mt-40 mb-20">
              <a href="#" class="btn dashed">
                + Add more
              </a>
            </li> -->
          </ul>
        </div>


        <div class="wallet-content w-afk" v-if="activeWallet === 'afk'">
          <div class="afk-wallet w-100">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/Africoin.png" alt=""/>
                <h2 class="c-d-afk mt-8">
                  <span class="large-text">0</span>AFK
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>0.00 USD
                </h3>
              </div>
              <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                <button
                  class="normal-btn afk-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--send"
                  @click="openFunctionModal('wallet-modal-active', 'send', 'afk')"
                >
                  Send
                </button>
                <button
                  class="normal-btn afk-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--recieve"
                  @click="openFunctionModal('wallet-modal-active', 'receive', 'afk')"
                >
                  Recieve
                </button>
                <a @click="openModal('buyCryptoModal')" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="flex flex-middle">
                <div class="w-100 wallet-chart">
                  <p class="uppercase c-white small-text mt-20 mb-12">
                    Price Chart
                  </p>
                  <h2 class="light c-white">$1.00</h2>
                  <p class="small-text muted">1 AFK</p>
                  <trend
                    :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
                  >
                  </trend>
                </div>
                <div class="w-32 wallet-description not-for-mobile c-white flex h-100">
                  <p>
                    <span class="uppercase wall-desc d-block mb-4">Description</span>
                    <span class="small-text"
                    >PayAfrik offers a cryptocurrency wallet with which users can
                accept cryptocurrencies for services rendered & pay with
                cryptocurrencies for services received. The PayAfrik wallet can
                receive and send value anywhere.</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-100 mt-50 mb-50 overflow-auto">
              <Table class="w-100" border :columns="columns5" :data="data5"></Table>
            </div>
          </div>
        </div>


        <div class="wallet-content w-btc" v-if="activeWallet === 'btc'">
          <div class="btc-wallet w-100">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/bitcoin.png" alt=""/>
                <h2 class="c-d-btc mt-8">
                  <span class="large-text">{{ +userDetails.btc_balance | formatNumberLong }}</span>BTC
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.btc_balance * btcData.current_price |
                  formatNumber}} USD
                </h3>
              </div>
              <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                <button
                  class="normal-btn btc-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--send"
                  @click="openFunctionModal('wallet-modal-active', 'send', 'btc')"
                >
                  Send
                </button>
                <button
                  @click="openFunctionModal('wallet-modal-active', 'receive', 'btc')"
                  class="normal-btn btc-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--recieve"
                >
                  Recieve
                </button>
                <a @click="openModal('buyCryptoModal')" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="w-100 flex flex-middle">
                <div class="w-100 wallet-chart">
                  <p class="uppercase c-white small-text mt-20 mb-12">
                    Price Chart
                  </p>
                  <h2 class="light c-white">${{ +btcData.current_price | formatNumber}}</h2>
                  <p class="small-text muted">1 BTC</p>
                  <trend
                    :data="btcChartData"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
                  >
                  </trend>
                </div>
                <div class="w-32 wallet-description not-for-mobile c-white flex h-100">
                  <p>
                    <span class="uppercase wall-desc d-block mb-4">Description</span>
                    <span class="small-text"
                    >PayAfrik offers a cryptocurrency wallet with which users can
                accept cryptocurrencies for services rendered & pay with
                cryptocurrencies for services received. The PayAfrik wallet can
                receive and send value anywhere.</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-100 mt-50 mb-50 overflow-auto">
              <Table class="w-100" border :columns="columns5" :data="data5"></Table>
            </div>
          </div>
        </div>


        <div class="wallet-content w-eth" v-if="activeWallet === 'eth'">

          <div class="eth-wallet w-100">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/eth.png" alt=""/>
                <h2 class="c-d-eth mt-8">
                  <span class="large-text">{{ +userDetails.eth_balance | formatNumberLong }}</span>ETH
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.eth_balance * ethData.current_price |
                  formatNumber }} USD
                </h3>
              </div>
              <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                <button
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--send"
                  @click="openFunctionModal('wallet-modal-active', 'send', 'eth')"
                >
                  Send
                </button>
                <button
                  @click="openFunctionModal('wallet-modal-active', 'receive', 'eth')"
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--recieve"
                >
                  Recieve
                </button>
                <a @click="openModal('buyCryptoModal')" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="flex flex-middle">
                <div class="w-100 wallet-chart">
                  <p class="uppercase c-white small-text mt-20 mb-12">
                    Price Chart
                  </p>
                  <h2 class="light c-white">${{ethData.current_price | formatNumber}}.00</h2>
                  <p class="small-text muted">1 ETH</p>
                  <trend
                    :data="ethChartData"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
                  >
                  </trend>
                </div>
                <div class="w-32 wallet-description not-for-mobile c-white flex h-100">
                  <p>
                    <span class="uppercase wall-desc d-block mb-4">Description</span>
                    <span class="small-text"
                    >PayAfrik offers a cryptocurrency wallet with which users can
                accept cryptocurrencies for services rendered & pay with
                cryptocurrencies for services received. The PayAfrik wallet can
                receive and send value anywhere.</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-100 mt-50 mb-50 overflow-auto">
              <Table class="w-100" border :columns="columns5" :data="data5"></Table>
            </div>
          </div>
        </div>

        <div class="wallet-content w-ltc" v-if="activeWallet === 'ltc'">

          <div class="ltc-wallet w-100">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/litecoin.png" style="width:35px" alt=""/>
                <h2 class="c-d-eth mt-8">
                  <span class="large-text">{{ +userDetails.ltc_balance | formatNumberLong }}</span>LTC
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.ltc_balance * litecoinData.current_price |
                  formatNumber }} USD
                </h3>
              </div>
              <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                <button
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--send"
                  @click="openFunctionModal('wallet-modal-active', 'send', 'ltc')"
                >
                  Send
                </button>
                <button
                  @click="openFunctionModal('wallet-modal-active', 'receive', 'ltc')"
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--recieve"
                >
                  Recieve
                </button>
                <a @click="openModal('buyCryptoModal')" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="flex flex-middle">
                <div class="w-100 wallet-chart">
                  <p class="uppercase c-white small-text mt-20 mb-12">
                    Price Chart
                  </p>
                  <h2 class="light c-white">${{litecoinData.current_price | formatNumber}}.00</h2>
                  <p class="small-text muted">1 LTC</p>
                  <trend
                    :data="litecoinChartData"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
                  >
                  </trend>
                </div>
                <div class="w-32 wallet-description not-for-mobile c-white flex h-100">
                  <p>
                    <span class="uppercase wall-desc d-block mb-4">Description</span>
                    <span class="small-text"
                    >PayAfrik offers a cryptocurrency wallet with which users can
                accept cryptocurrencies for services rendered & pay with
                cryptocurrencies for services received. The PayAfrik wallet can
                receive and send value anywhere.</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-100 mt-50 mb-50 overflow-auto">
              <Table class="w-100" border :columns="columns5" :data="data5"></Table>
            </div>
          </div>
        </div>


        <div class="wallet-content w-dash" v-if="activeWallet === 'dash'">

          <div class="dash-wallet w-100">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/dash.png" style="width:35px" alt=""/>
                <h2 class="c-d-eth mt-8">
                  <span class="large-text">{{ +userDetails.dash_balance | formatNumberLong }}</span>LTC
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.dash_balance * dashData.current_price |
                  formatNumber }} USD
                </h3>
              </div>
              <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                <button
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--send"
                  @click="openFunctionModal('wallet-modal-active', 'send', 'dash')"
                >
                  Send
                </button>
                <button
                  @click="openFunctionModal('wallet-modal-active', 'receive', 'dash')"
                  class="normal-btn eth-bordered mr-20"
                  data-link-class="wallet-modal-active"
                  data-modal="wallet--recieve"
                >
                  Recieve
                </button>
                <a @click="openModal('buyCryptoModal')" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="flex flex-middle">
              <div class="w-100 wallet-chart">
                <p class="uppercase c-white small-text mt-20 mb-12">
                  Price Chart
                </p>
                <h2 class="light c-white">${{dashData.current_price | formatNumber}}.00</h2>
                <p class="small-text muted">1 DASH</p>
                <trend
                  :data="dashChartData"
                  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                  auto-draw
                  smooth
                >
                </trend>
              </div>
              <div class="w-32 wallet-description not-for-mobile c-white flex h-100">
                <p>
                  <span class="uppercase wall-desc d-block mb-4">Description</span>
                  <span class="small-text"
                  >PayAfrik offers a cryptocurrency wallet with which users can
                accept cryptocurrencies for services rendered & pay with
                cryptocurrencies for services received. The PayAfrik wallet can
                receive and send value anywhere.</span
                  >
                </p>
              </div>
              </div>
            </div>
            <div class="w-100 mt-50 mb-50 overflow-auto">
              <Table class="w-100" border :columns="columns5" :data="data5"></Table>
            </div>
          </div>
        </div>


      </div>
    </div>

    <!-- Card Request Modal -->
    <div
      class="modal fade"
      id="buyCryptoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="buyCryptoModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">
              Swap your AfriTokens for Cryptocurrency
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
                  <p>You are about to convert your available <span class="warn">AfriTokens</span> to cryptocurrency.</p>
                  <p>Please select the currency you want to receive below and enter the amount of AfriTokens you would
                    like to convert</p>
                  <label>Select card type</label>
                  <select v-model="cryptoToReceive">
                    <option value="">Select currency to receive</option>
                    <option value="AFK">Africoin</option>
                    <option value="BTC">Bitcoin</option>
                    <option value="ETH">Ethereum</option>
                    <option value="BTC">LiteCoin</option>
                    <option value="DASH">Dash</option>
                  </select>
                  <label>Amount</label>
                  <input v-model="amount" type="number" class="mb-2" placeholder="Amount in AfriTokens">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <button type="button" class="cancel" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7">
                  <button
                    class="success-btn"
                    v-if="!processing"
                    @click="requestConversion()"
                    type="submit"
                  >
                    Request Conversion
                  </button>
                  <button class="success-btn" v-if="processing" disabled>
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="../../assets/js/vendor/modernizr-3.8.0.min.js"></script>
<script src="../../assets/js/plugins.js"></script>
<script src="../../assets/js/main.js"></script>
<script>
  import {mapMutations} from "vuex";

  export default {
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        activeWallet: "afk",
        processing: false,
        amount: 0,
        cryptoToReceive: '',
        columns5: [
          {
            title: 'Sender',
            key: 'sender'
          },
          {
            title: 'Recipient',
            key: 'recipient'
          },
          {
            title: 'Date',
            key: 'date',
            sortable: true
          },
          {
            title: 'Amount',
            key: 'amount',
            sortable: true
          },
          {
            title: 'Fee',
            key: 'fee'
          },
          {
            title: 'Status',
            key: 'status'
          }
        ],
        data5: [
          {
            sender: '6636648895225118227A',
            recipient: '5122649909528953260A',
            date: '12 Sep 2020, 07:52:31 PM',
            amount: '41,963.75551266 AFK',
            fee: '0.1 AFK',
            status: 'pending',
          },
          {
            sender: '8121279739113519378A',
            recipient: '16293716040102736949A',
            date: '12 Sep 2020, 08:02:17 PM',
            amount: '66.75916143 AFK',
            fee: '0.1 AFK',
            status: 'pending',
          },
          {
            sender: '6024558328335565503A',
            recipient: '6687808873757044786A',
            date: '01 Sep 2020, 11:59:23 PM',
            amount: '66.7105674 AFK',
            fee: '0.1 AFK',
            status: 'pending',
          },
          {
            sender: '15610359283786884938A',
            recipient: '4323687997019448151A',
            date: '01 Sep 2020, 11:53:41 PM',
            amount: '41,963.75551266 AFK',
            fee: '0.1 AFK',
            status: 'pending',
          },
          {
            sender: '6636648895225118227A',
            recipient: '5122649909528953260A',
            date: '12 Sep 2020, 07:52:31 PM',
            amount: '2,614.7384 AFK',
            fee: '0.1 AFK',
            status: 'pending',
          },
        ]
      };
    },
    computed: {
      userDetails() {
        return this.$store.state.authenticatedUser;
      },
      btcData() {
        return this.$store.state.btcData;
      },
      btcChartData() {
        return this.$store.state.btcChartData;
      },
      ethData() {
        return this.$store.state.ethData;
      },
      litecoinData() {
        return this.$store.state.litecoinData;
      },
      dashData() {
        return this.$store.state.dashData;
      },
      ethChartData() {
        return this.$store.state.ethChartData;
      },
      litecoinChartData() {
        return this.$store.state.litecoinChartData;
      },
      dashChartData() {
        return this.$store.state.dashChartData;
      },
    },
    methods: {
      openModal(modalId) {
        $("#" + modalId).modal("show");
        $(".modal-backdrop").hide();
      },
      changeWallet(wallet) {
        this.activeWallet = wallet;
        setTimeout(() => {
          this.loadChart()
        }, 500)
      },
      closeSideBar() {
        this.$store.commit("global/closeSidebar");
      },
      ...mapMutations({
        toggleSidebar: "global/toggleSidebar",
        closeSideBar: "global/closeSidebar",
        openFunctionModal: "global/openFunctionModal"
      }),

      openFunctionModal(modalActiveClass, activeWallet, activeCurrency) {
        this.$store.commit("global/openFunctionModal", {
          class: modalActiveClass,
          wallet: activeWallet,
          currency: activeCurrency
        });
      },

      async requestConversion() {
        if (!this.amount || this.amount === 0) {
          this.$toast.error('Please select an amount greater than 0')
          return
        }
        if (!this.cryptoToReceive || this.cryptoToReceive === "") {
          this.$toast.error('Please choose a currency to receive')
          return
        }

        this.processing = true

        const payload = {
          amount: this.amount,
          from_currency: "AFRITOKEN",
          to_currency: this.cryptoToReceive
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': this.userDetails.token,
        }
        try {
          const requestResponse = await this.$axios.$post(this.baseUrl + 'exchange/barter/swap/', payload, {headers})
          console.log('request response', requestResponse)
          this.$toast.success('Conversion request successful!')
          this.processing = false
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.error)
          this.processing = false
        }
      },

      loadChart() {
        var ctx = document.getElementById("myChart");
        ctx.getContext("2d");
        var options = {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
          bezierCurve: false,
          color: "red",
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true //this will remove only the label
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true //this will remove only the label
                }
              }
            ]
          },
          legend: {
            display: true
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0
            }
          }
        };
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July"
            ],
            datasets: [
              {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
              }
            ]
          },
          options: options
        });

        ctx.style.height = "174px";
        ctx.style.maxHeight = "174px";
        ctx.style.width = "100%";
      }
    },
    beforeMount() {
    },
    mounted() {
      // this.loadChart()
      console.log('BTCDATA ======', this.btcData)
      if (this.$route.query.active) {
        // console.log('theres a query')
        this.changeWallet(this.$route.query.active)
      }

    },
    beforeMount() {
      this.closeSideBar();
    }
  };
</script>

<style scoped>

  a.tag-button {
    display: inline-block;
    padding: 3px 15px;
    border-radius: 50px;
    background-color: #F8AE30;
    color: #141F50;
    font-size: 0.9em;
    left: 170px;
    position: absolute;
  }

  a.tag-button:hover {
    background-color: #141F50;
    color: #F8AE30;
  }

  select {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  #buyCryptoModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /* button.greyed-btn{
          font-weight:500;
          background-color: #f1f1f1;
          width: inherit!important;
      } */

  #buyCryptoModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  #buyCryptoModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #buyCryptoModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #buyCryptoModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #buyCryptoModal .modal-footer {
    border: none !important;
  }


  #buyCryptoModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #buyCryptoModal .modal-footer button.cancel {
    border: solid transparent;
  }

  p.warn, span.warn, a.warn {
    font-weight: 700;
    color: #F8AE30;
  }

  label {
    font-weight: 500;
    color: #ffffffcb;
    font-size: 0.8em;;
  }

  input {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  a.icon-btn {
    cursor: pointer;
  }

  a.card-option.bordered {
    border-radius: 5px;
    border: 2px solid #F8AE30;
    display: block;
  }

  @media (max-width: 768px) {
    /* .not-for-mobile{
      display:none;
    } */
    .w-afk, .w-eth, .w-btc, .w-ltc, .w-dash .wallet-chart {
      width: 100%
    }

    .afk-wallet, .btc-wallet, .eth-wallet, .dash-wallet, .ltc-wallet {
      margin: auto;
    }
  }
</style>
