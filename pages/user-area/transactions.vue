<template>
  <section>
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
          <!-- <input
            type="text"
            placeholder="Filter by receiver"
            class="pull-right"
          /> -->
        </div>

        <div class="col-md-12">
          <!-- <input type="text" placeholder="Filter by receiver" class="pull-right"> -->
          <div class="container">
            <div class="row">
              <div class="col-md-3 text-right">
                <p class="mt-4">Filters:</p>
              </div>
              <div class="col-md-2" style="padding: 5px !important">
                <!-- <input v-model="filters.receiver" type="text" placeholder="Filter by receiver" class=""> -->
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
              <!-- <button :disabled="transfers.length >= transfersPagination.totalRecords" type="submit" @click="changePage('next')"> Load more records <i class="fa fa-angle-double-down ml-3" /></button> -->
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
  </section>
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

      let url =
        this.baseUrl +
        "transactions/transactions?status=" +
        this.filters.transactionStatus +
        "&min_date=" +
        this.formatDate(this.filters.minDate) +
        "&max_date=" +
        this.formatDate(this.filters.maxDate) +
        "&receiver=" +
        this.filters.receiver;
      // status=SUCCESSFUL&min_date=2020-03-22&receiver=shalomz

      //   console.log("THE FILTERS ====> ", url);
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
      this.transfers = []
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
        this.$toast.error(e.response);
        console.log(e.response);
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
    this.getUserPurchases();
  }
};
</script>

<style scoped>
p {
  color: #1a1919 !important;
}
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
</style>
