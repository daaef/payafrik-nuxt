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
            <nuxt-link to="/user-area/mart">
              <div class="imge">
                <img src="../../assets/img/purse.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Manage your wallets &amp; make transactions
              </p>
              <p class="higlight text-center">Make Transactions</p>
            </nuxt-link>
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
            <nuxt-link to="/user-area/support">
              <div class="imge">
                <img src="../../assets/img/supporting.png" alt="purse" />
              </div>
              <p class="desc c-white text-center mb-8">
                Get professional support &amp; quality customer care
              </p>
              <p class="higlight text-center">Support</p>
            </nuxt-link>
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
                    <th class="trend text-center">30 DAY TREND</th>
                    <th>BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="wallet-row" @click="goToWallet('afk')">
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
                    <td class="trend">
                      <!-- <canvas id="myChart"></canvas> -->
                      <trend
                        :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                        auto-draw
                        smooth
                      >
                      </trend>
                    </td>
                    <td>
                      <span class="c-afk"
                        >{{ +userDetails.afk_balance | formatNumber }}AFK</span
                      >
                    </td>
                  </tr>
                  <tr  class="wallet-row" @click="goToWallet('btc')">
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
                    <td class="trend">
                      <!-- <canvas id="myChart1"></canvas> -->
                      <trend
                        :data="btcChartData"
                        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                        auto-draw
                        smooth
                      >
                      </trend>
                    </td>
                    <td>
                      <span class="c-btc"
                        >{{ +userDetails.btc_balance | formatNumber }}BTC</span
                      >
                    </td>
                  </tr>
                  <tr  class="wallet-row" @click="goToWallet('eth')">
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
                    <td>
                      <span
                        :class="[
                          ethData.market_cap_change_percentage_24h > 0
                            ? 'c-success'
                            : 'c-alert'
                        ]"
                        >{{ ethData.market_cap_change_percentage_24h }}%</span
                      >
                    </td>
                    <td>${{ ethData.market_cap | formatNumber }}</td>
                    <td class="trend">
                      <!-- <canvas id="myChart2"></canvas> -->
                      <trend
                        :data="ethChartData"
                        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                        auto-draw
                        smooth
                      >
                      </trend>
                    </td>
                    <td>
                      <span class="c-eth"
                        >{{ +userDetails.eth_balance | formatNumber }}BTC</span
                      >
                    </td>
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
                  <th class="text-left"><span>RECEIVER</span></th>
                  <th class="text-center">PLATFORM</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody v-if="userTransactions.length > 0">
                <tr v-for="transaction of userTransactions" :key="transaction.id">
                  <th class="text-left"><span>{{transaction.receiver}}</span></th>
                  <th class="text-center">{{transaction.sent_via}}</th>
                  <th>{{ + transaction.requested_amount}}</th>
                </tr>
              </tbody>
            </table>
            <div v-if="userTransactions.length === 0" class="no-trans">
              <p class="c-white">No Transactions</p>
            </div>
          </div>
        </div>

        <div class="wallets--and--transactions">
          <div class="wallets">
            <h3 class="c-white">PAYAFRIK PLATFORMS</h3>
            <div class="table--holder">
              <table>
                <!-- <thead>
                  <tr>
                    <th class="text-left"><span>ASSET NAME</span></th>
                    <th>PRICE</th>
                    <th>24H CHANGE</th>
                    <th>MARKET CAP</th>
                    <th class="trend text-center">30 DAY TREND</th>
                    <th>BALANCE</th>
                  </tr>
                </thead> -->
                <tbody>
                  <tr class="wallet-row">
                    <td>
                      <span>
                        <!-- <img src="../../assets/img/bitcoin.png" alt="" /> -->
                        <i class="fas fa-power-off fa-3x c-yellow"></i>
                        <span class="ml-16 d-block">
                          <span class="mb-4 d-block">Payafrik Power</span>
                          <p class="muted">This is literally <strong>power in your hands</strong>. A novel solution by payafrik that gives you full control of your Power Metres in Nigeria. Shut off you rpower, disconnect appliances and reload your metres remotely with payafrik power. <br> <a>Checkout Payafrik FixIt!</a></p>

                        </span>
                      </span>
                      
                    </td>
                    <td>
                    </td>
                  </tr>
                  <tr class="wallet-row">
                    <td>
                      <span>
                        <!-- <img src="../../assets/img/bitcoin.png" alt="" /> -->
                        <i class="fas fa-hammer fa-3x c-yellow"></i>
                        <span class="ml-16 d-block">
                          <span class="mb-4 d-block">Payafrik FixIt!</span>
                          <p class="muted">A solution that lets you order a repairman or artisan for all your daily home repair and instalation needs. Make payments for services using your payafrik tokens <br><a>Checkout Payafrik Power!</a> </p>
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="add--more">
              <button class="blueish-btn btn">+Add More</button>
            </div> -->
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
      // btcData: {},
      // btcChartData: [],
      // ethData: {},
      // ethChartData: [],

    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
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
    ethChartData() {
      return this.$store.state.ethChartData;
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
        // this.getCoinMarketData();
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
    commitBtc(data) {
      this.$store.commit("global/loadBTCData", data);
    },
    commitEth(data) {
      this.$store.commit("global/loadEthData", data);
    },
    ...mapMutations({
      authenticate: "global/authenticateUser",
      loadBTCData: "global/loadBTCData",
      loadEthData: "global/loadEthData"
    }),

    async getCoinMarketData() {
      // this.loadingData = true;
      try {
        const coinMarketData = await this.$axios.$get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h"
        );
        this.btcData = coinMarketData[0];
        this.ethData = coinMarketData[1];

        let btcSparkline = [];
        for (let i = 0; i < 50; i++) {
          btcSparkline.push(this.btcData.sparkline_in_7d.price[i]);
        }
        this.btcChartData = btcSparkline

        let ethSparkline = [];
        for (let i = 0; i < 50; i++) {
          ethSparkline.push(this.ethData.sparkline_in_7d.price[i]);
        }
        this.ethChartData = ethSparkline

        //TODO: commit data to store here
        this.commitBtc(this.btcData)
        this.commitEth(this.ethData)

        this.loadingData = false;
      } catch (e) {
        console.log(e);
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

        // if (userTransactionsResponse.results.length > 4) {
        for (let i = 0; i < 10; i++) {
          if(i < userTransactionsResponse.results.length) this.userTransactions.push(userTransactionsResponse.results[i]);
        }
        // } else {
        //   this.userTransactions = userTransactionsResponse.results;
        // }

        console.log('USER-TRANSACTIONS', this.userTransactions)

        this.fetchingTransactions = false;
      } catch (e) {
        this.$toast.error(e.response);
        console.log(e.response);
        this.userTransactions = false;
      }
    },
    checkWallets() {
      if (this.userDetails.eth_wallet !== "") {
        this.getEthWalletBalance();
      }
      if (this.userDetails.btc_wallet !== "") {
        this.getBtcWalletBalance();
      }
    },

    goToWallet (wallet) {
      this.$router.push({ name: 'user-area-wallet', query: { active: wallet }})
    }
  },

  beforeMount() {
    this.getUserDetails();
  },
  mounted() {
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

th.trend, td.trend{
  max-width: 180px !important;
}

tr.wallet-row{
  cursor:pointer;
}

.c-yellow {
  color: #F8AE30;
}

a.tag-button{
  /* display: inline-block; */
  padding: 3px 15px;
  border-radius:50px;
  background-color: #F8AE30;
  color: #141F50 !important;
  font-size: 0.9em;
  left: 170px;
  position: absolute;
  font-weight: 700;
}

a.tag-button:hover{
  background-color: #141F50;
  color: #F8AE30 !important;
}

</style>
