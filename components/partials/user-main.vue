<template>
  <span>
    <!-- <div class="main"> -->

    <section v-if="!loadingData" class="dash-body">
      <div>
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">welcome to</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">PayAfrik.io</h1>
          </div>
        </div>
        <ul class="card-links">
          <li class="link-card">
            <a href="#">
              <div class="imge">
                <img src="../../assets/img/purse.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Manage your wallets &amp; make transactions
              </p>
              <p class="higlight text-center">Make Transactions</p>
            </a>
          </li>
          <li class="link-card active">
            <nuxt-link to="/user-area/mart">
              <div class="imge">
                <img src="../../assets/img/bills.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Pay your bills for utilities &amp; services
              </p>
              <p class="higlight text-center">Pay Bills</p>
            </nuxt-link>
          </li>
          <li class="link-card">
            <nuxt-link to="/user-area/exchange">
              <div class="imge">
                <img src="../../assets/img/exchange.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Exchange your cryptocurrencies with ease
              </p>
              <p class="higlight text-center">Exchange</p>
            </nuxt-link>
          </li>
          <li class="link-card">
            <a href="#">
              <div class="imge">
                <img src="../../assets/img/supporting.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Get professional support &amp; quality customer care
              </p>
              <p class="higlight text-center">Support</p>
            </a>
          </li>
        </ul>
        <div class="wallets--and--transactions">
          <div class="wallets">
            <h3 class="c-white">WALLETS</h3>
            <div class="table--holder">
              <table>
                <thead>
                  <tr>
                    <th class="text-left"><span>ASSET NAME</span></th>
                    <th>PRICE</th>
                    <th>24H CHANGE</th>
                    <th>MARKET CAP</th>
                    <th>30 DAY TREND</th>
                    <th>BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onclick="window.location='#';">
                    <td>
                      <span>
                        <img src="../../assets/img/Africoin.png" alt="" />
                        <span class="ml-16 d-block">
                          <span class="mb-4 d-block">Africoin</span>
                          <span class="muted">AFK</span>
                        </span>
                      </span>
                    </td>
                    <td>$1.00</td>
                    <td><span class="c-success">+0.3%</span></td>
                    <td>$3.21B</td>
                    <td>
                      <canvas id="myChart"></canvas>
                    </td>
                    <td><span class="c-afk">{{ +userDetails.afk_balance | formatNumber }}AFK</span></td>
                  </tr>
                  <tr onclick="window.location='#';">
                    <td>
                      <span>
                        <img src="../../assets/img/bitcoin.png" alt="" />
                        <span class="ml-16 d-block">
                          <span class="mb-4 d-block">Bitcoin</span>
                          <span class="muted">BTC</span>
                        </span>
                      </span>
                    </td>
                    <td>${{ btcData.current_price | formatNumber }}</td>
                    <td>
                      <span
                        :class="[
                          btcData.market_cap_change_percentage_24h > 0
                            ? 'c-success'
                            : 'c-alert'
                        ]"
                        >{{ btcData.market_cap_change_percentage_24h }}%</span
                      >
                    </td>
                    <td>${{ btcData.market_cap | formatNumber }}</td>
                    <td>
                      <canvas id="myChart1"></canvas>
                    </td>
                    <td><span class="c-btc">{{ +userDetails.btc_balance | formatNumber }}BTC</span></td>
                  </tr>
                  <tr onclick="window.location='#';">
                    <td>
                      <span>
                        <img src="../../assets/img/eth.png" alt="" />
                        <span class="ml-16 d-block">
                          <span class="mb-4 d-block">Ethereum</span>
                          <span class="muted">ETH</span>
                        </span>
                      </span>
                    </td>
                    <td>${{ ethData.current_price | formatNumber }}</td>
                    <td><span
                        :class="[
                          ethData.market_cap_change_percentage_24h > 0
                            ? 'c-success'
                            : 'c-alert'
                        ]"
                        >{{ ethData.market_cap_change_percentage_24h }}%</span></td>
                    <td>${{ ethData.market_cap | formatNumber }}</td>
                    <td>
                      <canvas id="myChart2"></canvas>
                    </td>
                    <td><span class="c-eth">{{ +userDetails.eth_balance | formatNumber }}BTC</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="add--more">
              <button class="blueish-btn btn">+Add More</button>
            </div> -->
          </div>
          <div class="transactions">
            <h3 class="c-white">TRANSACTIONS</h3>
            <table>
              <thead>
                <tr>
                  <th class="text-left"><span>TYPE</span></th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <div class="no-trans">
              <p class="c-white">No Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </span>
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
      toImport: "BTC",
      walletAddress: "",
      importingWallet: false,
      formErrors: {},
      baseUrl: process.env.baseUrl,
      userTransferAfk: "",
      afkAmountToTransfer: 0,
      transferringAfk: false,
      gettingBtcBalance: false,
      gettingEthBalance: false,
      ethBalance: 0,
      btcBalance: 0,
      importables: [
        {
          key: "BTC",
          name: "Bitcoin"
        },
        {
          key: "ETH",
          name: "Ethereum"
        },
        {
          key: "EOS",
          name: "EOS"
        }
      ],
      userTransactions: [],
      fetchingTransactions: false,
      loadingData: false,
      btcData: {},
      ethData: {}
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  methods: {
    openModal(modalId) {
      $("#" + modalId).modal("show");
    },
    closeModal(modalId) {
      $("#" + modalId).modal("hide");
    },
    startImport(toImport) {
      this.toImport = toImport;
      this.openModal("walletImportModal");
    },
    async importWallet() {
      if (this.walletAddress === "") {
        this.formErrors.walletAddressError = true;
      }
      this.importingWallet = true;
      let payload = {};

      switch (this.toImport) {
        case "BTC":
          payload = {
            btc_wallet: this.walletAddress,
            eth_wallet: this.userDetails.eth_wallet,
            eos_wallet: "eos_wallet"
          };
          break;
        case "ETH":
          payload = {
            btc_wallet: this.userDetails.btc_wallet,
            eth_wallet: this.walletAddress,
            eos_wallet: "eos_wallet"
          };
          break;
        case "EOS":
          payload = {
            btc_wallet: this.userDetails.btc_wallet,
            eth_wallet: this.userDetails.eth_wallet,
            eos_wallet: this.walletAddress
          };
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const importResponse = await this.$axios.$put(
          this.baseUrl + "auth/user/import-wallets/",
          payload,
          { headers }
        );
        if (importResponse.success === "updated") {
          this.$toast.success("Wallet imported successfully!");
          this.closeModal("walletImportModal");
          this.getUserDetails();
        }
        this.importingWallet = false;
        this.walletAddress = "";
      } catch (e) {
        this.$toast.error(e.response.data.detail);
        this.importingWallet = false;
        console.log(e.response);
      }
    },

    async getEthWalletBalance() {
      this.gettingEthBalance = true;
      console.log("getting ETH balance");
      var Web3 = require("web3");
      const testnet =
        "https://mainnet.infura.io/v3/463cd18d3029471d85efed20bdccb271";
      const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
      try {
        const balance = await web3.eth.getBalance(this.userDetails.eth_wallet);
        this.gettingEthBalance = false;
        console.log("balance", balance);
        this.ethBalance = +balance / 1000000000000000000;
        console.log(this.ethBalance);
      } catch (e) {
        this.gettingEthBalance = false;
        console.log(e);
      }
    },

    async getBtcWalletBalance() {
      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Authorization': this.userDetails.token,
      // };
      this.gettingBtcBalance = true;
      console.log("getting BTC balance");
      try {
        const btcWalletDetails = await this.$axios.$get(
          "https://blockchain.info/address/" +
            this.userDetails.btc_wallet +
            "?format=json&cors=true"
        );
        this.gettingBtcBalance = false;
        console.log("BTC->", btcWalletDetails);
        this.btcBalance = btcWalletDetails.final_balance / 100000000;
      } catch (e) {
        this.$toast.error(e.response.data.detail);
        this.gettingBtcBalance = false;
        console.log(e.response);
      }
    },

    async getUserDetails() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const updatedUserDetails = await this.$axios.$get(
          this.baseUrl + "auth/user/profile/",
          { headers }
        );
        updatedUserDetails.token = this.userDetails.token;
        console.log("User ==>", updatedUserDetails);
        this.getUserTransactions();
        this.getCoinMarketData();
        this.authenticate(updatedUserDetails);
      } catch (e) {
        this.$toast.error(e.response.data.detail);
        this.importingWallet = false;
        console.log(e.response);
      }
    },

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    ...mapMutations({
      authenticate: "global/authenticateUser",
      loadBTCData: "global/loadBTCData",
      loadEthData: "global/loadEthData"
    }),

    async getCoinMarketData() {
      this.loadingData = true;
      try {
        const coinMarketData = await this.$axios.$get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h"
        );
        // console.log("Coin Market Details ==>", coinMarketData);
        this.btcData = coinMarketData[0];
        this.ethData = coinMarketData[1];
        let btcSparkline = []
        for (let i = 0; i < 10; i++){
            btcSparkline.push(this.btcData.sparkline_in_7d.price[i])        
        }
        this.loadingData = false;
        // setTimeout(this.loadBTCChart(btcSparkline), 1000) 
        
        // console.log(this.btcData)
      } catch (e) {
        console.log(e);
        // this.$toast.error(e.response.data.detail);
        this.importingWallet = false;
      }
    },

    async getUserTransactions() {
      this.fetchingTransactions = true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const userTransactionsResponse = await this.$axios.$get(
          this.baseUrl + "transactions/transactions/",
          { headers }
        );

        if (userTransactionsResponse.results.length > 4) {
          for (let i = 0; i < 4; i++) {
            this.userTransactions.push(userTransactionsResponse.results[i]);
          }
        } else {
          this.userTransactions = userTransactionsResponse.results;
        }

        this.fetchingTransactions = false;
      } catch (e) {
        this.$toast.error(e.response);
        console.log(e.response);
        this.userTransactions = false;
      }
    },
    checkWallets() {
      if (this.userDetails.eth_wallet !== "") {
        console.log("look here for eth");
        this.getEthWalletBalance();
      }
      if (this.userDetails.btc_wallet !== "") {
        console.log("look here for btc");
        this.getBtcWalletBalance();
      }
    },

    loadBTCChart(sparklineData) {
      /*Chart 1*/

      console.log('sparkline data --------', sparklineData)
      
      var ctx = document.getElementById("myChart1");
      ctx.getContext("2d");
      ctx.height = 40;
      var options = {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        bezierCurve: false,
        color: "red",
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }
          ]
        },
        legend: {
          display: false
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
            "Tokyo",
            "Mumbai",
            "Mexico City",
            "Shanghai",
            "Sao Paulo",
            "New York",
            "Karachi",
            "Buenos Aires",
            "Delhi",
            "Moscow"
          ],
          datasets: [
            {
              label: "Series 1", // Name the series
              data: sparklineData, // Specify the data values array
              fill: false,
              lineTension: 0,
              borderColor: "#4451ff", // Add custom color border (Line)
              backgroundColor: "#4451ff", // Add custom color background (Points and Fill)
              borderWidth: 1 // Specify bar border width
            }
          ]
        },
        options: options
      });
    }
  },

  beforeMount() {
    // this.checkWallets()
    this.getUserDetails();
    console.log('BTC DATA+++++++++++++++++++++++++++++++++++++++', this.btcData)
  },
  mounted() {
    // this.loadBTCChart([500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811]) 
    // this.loadBTCChart()
    // this.getCoinMarketData()
    /*Chart 2*/
    // var ctx1 = document.getElementById("myChart");
    // ctx1.getContext("2d");
    // ctx1.height = 40;
    // var options = {
    //   responsive: true, // Instruct chart js to respond nicely.
    //   maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
    //   bezierCurve: false,
    //   color: "red",
    //   scales: {
    //     xAxes: [
    //       {
    //         gridLines: {
    //           display: false
    //         },
    //         ticks: {
    //           display: false //this will remove only the label
    //         }
    //       }
    //     ],
    //     yAxes: [
    //       {
    //         gridLines: {
    //           display: false
    //         },
    //         ticks: {
    //           display: false //this will remove only the label
    //         }
    //       }
    //     ]
    //   },
    //   legend: {
    //     display: false
    //   },
    //   elements: {
    //     line: {
    //       tension: 0
    //     },
    //     point: {
    //       radius: 0
    //     }
    //   }
    // };
    // var myChart1 = new Chart(ctx1, {
    //   type: "line",
    //   data: {
    //     labels: [
    //       "Tokyo",
    //       "Mumbai",
    //       "Mexico City",
    //       "Shanghai",
    //       "Sao Paulo",
    //       "New York",
    //       "Karachi",
    //       "Buenos Aires",
    //       "Delhi",
    //       "Moscow"
    //     ],
    //     datasets: [
    //       {
    //         label: "Series 1", // Name the series
    //         data: [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811], // Specify the data values array
    //         fill: false,
    //         lineTension: 0,
    //         borderColor: "#f98e12", // Add custom color border (Line)
    //         backgroundColor: "#f98e12", // Add custom color background (Points and Fill)
    //         borderWidth: 1 // Specify bar border width
    //       }
    //     ]
    //   },
    //   options: options
    // });
    /*Chart 3*/
    // var ctx2 = document.getElementById("myChart2");
    // ctx2.getContext("2d");
    // ctx2.height = 40;
    // var options = {
    //   responsive: true, // Instruct chart js to respond nicely.
    //   maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
    //   bezierCurve: false,
    //   color: "red",
    //   scales: {
    //     xAxes: [
    //       {
    //         gridLines: {
    //           display: false
    //         },
    //         ticks: {
    //           display: false //this will remove only the label
    //         }
    //       }
    //     ],
    //     yAxes: [
    //       {
    //         gridLines: {
    //           display: false
    //         },
    //         ticks: {
    //           display: false //this will remove only the label
    //         }
    //       }
    //     ]
    //   },
    //   legend: {
    //     display: false
    //   },
    //   elements: {
    //     line: {
    //       tension: 0
    //     },
    //     point: {
    //       radius: 0
    //     }
    //   }
    // };
    // var myChart2 = new Chart(ctx2, {
    //   type: "line",
    //   data: {
    //     labels: [
    //       "Tokyo",
    //       "Mumbai",
    //       "Mexico City",
    //       "Shanghai",
    //       "Sao Paulo",
    //       "New York",
    //       "Karachi",
    //       "Buenos Aires",
    //       "Delhi",
    //       "Moscow"
    //     ],
    //     datasets: [
    //       {
    //         label: "Series 1", // Name the series
    //         data: [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811], // Specify the data values array
    //         fill: false,
    //         lineTension: 0,
    //         borderColor: "#50599c", // Add custom color border (Line)
    //         backgroundColor: "#50599c", // Add custom color background (Points and Fill)
    //         borderWidth: 1 // Specify bar border width
    //       }
    //     ]
    //   },
    //   options: options
    // });
  }
};
</script>

<style>
a {
  color: #fff;
  text-decoration: none !important;
}

a p {
  text-decoration: none;
}

</style>
