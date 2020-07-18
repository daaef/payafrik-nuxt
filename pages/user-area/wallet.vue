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
                <span class="muted w-100 text-right d-block">0 AFK</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'btc' ?  'w-active' : '' ]">
              <a @click="changeWallet('btc')">
                <span class="d-block btc am-type mb-8 text-right bold w-title"
                  >Bitcoin</span
                >
                <span class="muted w-100 text-right d-block">0 BTC</span>
              </a>
            </li>
            <li class="mt-20 mb-20" :class="[ activeWallet === 'eth' ?  'w-active' : '' ]">
              <a @click="changeWallet('eth')">
                <span class="d-block eth am-type mb-8 text-right bold w-title"
                  >Ethereum</span
                >
                <span class="muted w-100 text-right d-block">0 ETH</span>
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
          <div class="wallet-description not-for-mobile c-white flex h-100">
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
          <div class="afk-wallet">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/Africoin.png" alt="" />
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
                <a href="#" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="wallet-chart">
                <p class="uppercase c-white small-text mt-20 mb-12">
                  Price Chart
                </p>
                <h2 class="light c-white">$1.00</h2>
                <p class="small-text muted">1 AFK</p>
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
        </div>


        <div class="wallet-content w-btc" v-if="activeWallet === 'btc'">
          <div class="wallet-description not-for-mobile c-white flex h-100">
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

          <div class="btc-wallet">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/bitcoin.png" alt="" />
                <h2 class="c-d-btc mt-8">
                  <span class="large-text">{{ +userDetails.btc_balance | formatNumber }}</span>BTC
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.btc_balance * btcData.current_price | formatNumber}} USD
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
                <a href="#" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="wallet-chart">
                <p class="uppercase c-white small-text mt-20 mb-12">
                  Price Chart
                </p>
                <h2 class="light c-white">${{ +btcData.current_price | formatNumber}}</h2>
                <p class="small-text muted">1 BTC</p>
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
        </div>


        <div class="wallet-content w-eth" v-if="activeWallet === 'eth'">
          <div class="wallet-description not-for-mobile c-white flex h-100">
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

          <div class="eth-wallet">
            <div class="w-100">
              <div class="w-100 text-center">
                <img height="40" src="../../assets/img/eth.png" alt="" />
                <h2 class="c-d-eth mt-8">
                  <span class="large-text">{{ +userDetails.eth_balance | formatNumber }}</span>ETH
                </h2>
                <h3 class="c-white light">
                  <span class="small-text mr-4">$</span>{{ +userDetails.eth_balance * ethData.current_price | formatNumber }} USD
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
                <a href="#" class="icon-btn">
                  <img
                    src="../../assets/img/exchange-icon.png"
                    height="35"
                    alt=""
                  />
                </a>
              </div>
              <div class="wallet-chart">
                <p class="uppercase c-white small-text mt-20 mb-12">
                  Price Chart
                </p>
                <h2 class="light c-white">${{ethData.current_price | formatNumber}}.00</h2>
                <p class="small-text muted">1 ETH</p>
                <canvas id="myChart"></canvas>
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
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      activeWallet: "afk"
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
  
  methods: {
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
      this.$store.commit("global/openFunctionModal", { class: modalActiveClass, wallet: activeWallet, currency: activeCurrency });
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
  beforeMount() {},
  mounted() {
    this.loadChart()
    console.log('BTCDATA ======', this.btcData)
    if (this.$route.query.active){
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
@media (max-width: 768px) {
  /* .not-for-mobile{
    display:none;
  } */

  .w-afk, .w-eth, .w-btc, .wallet-chart{
    width: 100%
  }

  .afk-wallet, .btc-wallet, .eth-wallet{
    margin:auto;
  }
}
</style>
