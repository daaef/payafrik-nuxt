<template>
  <section class="dash-body">
    <div class="utrans--content">
      <div class="w-100">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">user</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">Transactions</h1>
          </div>
        </div>
        <!-- <form> -->
        <div class="row trans--grid mt-20 w-100 flex-between">
          <div>
            <input
              type="text"
              v-model="filters.transactionStatus"
              class="normal--input"
              placeholder="Status"
            />
          </div>
          <div>
            <input
              type="date"
              v-model="filters.minDate"
              class="normal--input"
              placeholder="Date From"
            />
          </div>
          <div>
            <input
              type="date"
              v-model="filters.maxDate"
              class="normal--input"
              placeholder="Date To"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="filters.receiver"
              class="normal--input"
              placeholder="Filter by Receiver"
            />
          </div>
          <div>
            <input
              type="submit"
              @click="applyFilters()"
              class="normal--input"
              value="Apply"
            />
          </div>
        </div>
        <!-- </form> -->
        <div class="mt-20">
          <div class="text-right c-dim-white">
            Showing {{ transfers.length }} of {{ transfersPagination.totalRecords }}
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Transaction</th>
                <th>Memo/Remarks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction of transfers" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td class="status">{{ transaction.status }}</td>
                <td>
                  <strong>{{ +transaction.sent_amount }}</strong> tokens to
                  {{ transaction.receiver }}
                </td>
                <td>{{ transaction.memo }}</td>
                <td>{{ new Date(transaction.created).toDateString() }}</td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="
              transfersPagination.totalRecords >
                transfersPagination.itemsPerPage
            "
            class="pagination mt-3 mb-5"
          >
              <div class="row ml-1">
                <div class="col-md-3">
                  <button
                    class="w-100"
                    type="submit"
                    @click="getUserTransactions(previousPageUrl)"
                    :disabled="
                      previousPageUrl === '' || previousPageUrl === null
                    "
                  >
                    <i class="fa fa-angle-double-left" /> Previous Page
                  </button>
                </div>
                <div class="col-md-6 text-center"></div>
                <div class="col-md-3 text-right ">
                  <button
                    class="w-100"
                    :disabled="nextPageUrl === '' || nextPageUrl === null"
                    type="submit"
                    @click="getUserTransactions(nextPageUrl)"
                  >
                    Next Page <i class="fa fa-angle-double-right" />
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <section>
    <div class="container">
      <div class="row mb-3 mt-4">
        <div class="col-md-6">
          <h6 class="text-uppercase">TRANSACTIONS</h6>
          <p>
            Showing <strong>{{ transfers.length }}</strong> records of
            <strong>{{ transfersPagination.totalRecords }}</strong>
          </p>

          <div class="underline"></div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-4">

        </div>

        <div class="col-md-12">
          <div class="container">
            <div class="row">
              <div class="col-md-3 text-right">
                <p class="mt-4">Filters:</p>
              </div>
              <div class="col-md-2" style="padding: 5px !important">
                <select v-model="filters.transactionStatus">
                  <option value="">Status</option>
                  <option value="FAILED">Failed</option>
                  <option value="SUCCESSFUL">Successful</option>
                </select>
              </div>
              <div class="col-md-2" style="padding: 5px !important">
                <date-picker
                  placeholder="Date from"
                  format="yyyy/MM/dd"
                  v-model="filters.minDate"
                />
              </div>
              <div class="col-md-2" style="padding: 5px !important">
                <date-picker
                  placeholder="Date to"
                  format="yyyy/MM/dd"
                  v-model="filters.maxDate"
                />
              </div>
              <div class="col-md-2" style="padding: 5px !important">
                <input
                  v-model="filters.receiver"
                  type="text"
                  placeholder="Filter by receiver"
                  class=""
                />
              </div>
              <div class="col-md-1" style="padding: 5px !important">
                <button @click="applyFilters()">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="transfers.length > 0">
          <ul class="list-table header-row row not-for-mobile">
            <li class="col-md-1 text-right"></li>
            <li class="col-md-1">Status</li>
            <li class="col-md-4">Transaction</li>
            <li class="col-md-3">Memo/Remarks</li>
            <li class="col-md-2 text-right">Date</li>
          </ul>

          <ul
            v-for="transaction of transfers"
            :key="transaction.id"
            class="list-table body-row row"
          >
            <li class="col-md-1 text-center">
              <i
                class="fa fa-circle small"
                v-bind:class="
                  transaction.status === 'SUCCESSFUL'
                    ? 'text-success'
                    : 'text-danger'
                "
              ></i>
            </li>
            <li class="col-md-1 text-lowercase">{{ transaction.status }}</li>
            <li class="col-md-4">
              <strong>{{ +transaction.sent_amount }}</strong> tokens to
              {{ transaction.receiver }}
            </li>
            <li class="col-md-3">{{ transaction.memo }}</li>
            <li class="col-md-2 text-right">
              {{ new Date(transaction.created).toDateString() }}
            </li>
          </ul>
        </div>

        <div v-if="transfers.length === 0 && !loadingTransfers">
          <p>No transfer transactions found for this user</p>
        </div>

        <div v-if="loadingTransfers" class="text-center mt-5">
          <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
          <p class="text-grey">Loading token transfers...</p>
        </div>
      </div>
      <hr />
      <div
        v-if="
          transfersPagination.totalRecords > transfersPagination.itemsPerPage
        "
        class="pagination"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <button
                class="float-left"
                type="submit"
                @click="getUserTransactions(previousPageUrl)"
                :disabled="previousPageUrl === '' || previousPageUrl === null"
              >
                <i class="fa fa-angle-double-left" /> Previous Page
              </button>
            </div>
            <div class="col-md-6 text-center">
            </div>
            <div class="col-md-3">
              <button
                class="float-right"
                :disabled="nextPageUrl === '' || nextPageUrl === null"
                type="submit"
                @click="getUserTransactions(nextPageUrl)"
              >
                Next Page <i class="fa fa-angle-double-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->
</template>

<script>
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.baseUrl,
      interswitchBaseUrl: process.env.interswitchBaseUrl,
      loadingPurchases: false,
      loadingTransfers: false,
      nextPageUrl: "",
      previousPageUrl: "",
      transfersPagination: {
        page: 1,
        itemsPerPage: 10,
        totalRecords: 0
      },
      transfers: [],
      purchases: [],
      filters: {
        minDate: "",
        maxDate: "",
        receiver: "",
        transactionStatus: ""
      }
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    applyFilters() {
      if (
        this.filters.minDate === "" &&
        this.filters.maxDate === "" &&
        this.filters.receiver === "" &&
        this.filters.transactionStatus === ""
      ) {
        return;
      }

      // let url =
      //   this.baseUrl +
      //   "transactions/transactions?status=" +
      //   this.filters.transactionStatus +
      //   "&min_date=" +
      //   this.formatDate(this.filters.minDate) +
      //   "&max_date=" +
      //   this.formatDate(this.filters.maxDate) +
      //   "&receiver=" +
      //   this.filters.receiver;
      let url =
        this.baseUrl +
        "transactions/transactions?status=" +
        this.filters.transactionStatus +
        "&min_date=" +
        this.filters.minDate +
        "&max_date=" +
        this.filters.maxDate +
        "&receiver=" +
        this.filters.receiver;
      // status=SUCCESSFUL&min_date=2020-03-22&receiver=shalomz

      // console.log("THE FILTERS ====> ", url);
      this.getUserTransactions(url);
    },

    changePage(direction) {
      if (direction === "next") {
        this.transfersPagination.page += 1;
      } else {
        this.transfersPagination.page -= 1;
      }
      this.getUserTransactions();
    },
    async getUserTransactions(url) {
      this.transfers = [];
      this.loadingTransfers = true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token
      };

      try {
        const userTransactionsResponse = await this.$axios.$get(url, {
          headers
        });
        console.log("User transactions ==>", userTransactionsResponse);

        if (
          this.transfersPagination.itemsPerPage > userTransactionsResponse.count
        ) {
          this.transfersPagination.itemsPerPage =
            userTransactionsResponse.count;
        }

        this.nextPageUrl = userTransactionsResponse.next;
        this.previousPageUrl = userTransactionsResponse.previous;

        this.transfersPagination.totalRecords = userTransactionsResponse.count;
        this.transfers = userTransactionsResponse.results;
        this.loadingTransfers = false;
      } catch (e) {
        this.$toast.error(e.response.data.detail);
        console.log(e.response.data.detail);
        this.loadingTransfers = false;
      }
    },

    async getUserPurchases() {
      // this.transfers = []
      this.loadingPurchases = true;
      const headers = {
        "Content-Type": "application/json",
        "pfk-user-token": this.userDetails.token
      };

      try {
        const userPurchasesResponse = await this.$axios.$get(
          this.interswitchBaseUrl + "transactions/user/",
          { headers }
        );
        console.log("User transactions ==>", userPurchasesResponse);
        // if (this.transfersPagination.itemsPerPage > userTransactionsResponse.count) {
        //     this.transfersPagination.itemsPerPage = userTransactionsResponse.count
        // }
        // this.transfersPagination.totalRecords = userTransactionsResponse.count
        this.purchases = userPurchasesResponse.data.transactions;
        this.loadingPurchases = false;
      } catch (e) {
        this.$toast.error(e.message);
        console.log(e.message);
        this.loadingPurchases = false;
      }
    },

    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },
    ...mapMutations({
      toggleSidebar: "global/toggleSidebar",
      closeSideBar: "global/closeSidebar"
    })
  },
  beforeMount() {
    this.getUserTransactions(this.baseUrl + "transactions/transactions");
    // this.getUserPurchases();
  }
};
</script>

<style scoped>
button {
  width: unset;
}

.md-title h6 {
  color: #332c2c;
  font-weight: 500;
}

.pagination {
  width: 100% !important;
  position: relative;
  overflow: hidden;
}

td {
  color: #ffffffe5 !important;
  padding: 5px;
}

td.status {
  /* max-width: 50px !important; */
  text-transform: lowercase;
}

.pagination button {
  background: #0c0a3c;
    color: #ffffff99;
    /* border: solid 1px #f9921b; */
    padding: 15px;
    cursor: pointer;
    border:none;
}
</style>
