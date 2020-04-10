<template>
    <section>
        <div class="container">
            <h6 class="text-uppercase">TRANSACTIONS</h6>
            <div class="underline"></div>
            <md-tabs class="mt-4">
                <md-tab id="tab-home" md-label="Token Transfers">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-uppercase mt-4">Transfers</h6>
                            <p>Showing <strong>{{transfers.length}}</strong> records of <strong>{{transfersPagination.totalRecords}}</strong> </p>

                            <div class="underline"></div>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <input type="text" placeholder="Filter by receiver" class="pull-right">
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

                            <ul v-for="transaction of transfers" :key="transaction.id" class="list-table body-row row">
                                <li class="col-md-1"><i class="fa fa-circle small" v-bind:class="transaction.status === 'SUCCESSFUL' ? 'text-success' : 'text-danger'"></i></li>
                                <li class="col-md-1 text-lowercase">{{transaction.status}}</li>
                                <li class="col-md-4"><strong>{{+transaction.sent_amount}}</strong> tokens to {{transaction.receiver}}</li>
                                <li class="col-md-3">{{transaction.memo}}</li>
                                <li class="col-md-2 text-right">{{new Date (transaction.created).toDateString()}}</li>
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
                    <hr>
                    <div v-if="transfersPagination.totalRecords > transfersPagination.itemsPerPage" class="pagination">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3">
                                    <button class="float-left" type="submit"  @click="getUserTransactions(previousPageUrl)" :disabled="previousPageUrl==='' || previousPageUrl === null"><i class="fa fa-angle-double-left" /> Previous Page</button>
                                </div>
                                <div class="col-md-6 text-center">
                                    <!-- <button :disabled="transfers.length >= transfersPagination.totalRecords" type="submit" @click="changePage('next')"> Load more records <i class="fa fa-angle-double-down ml-3" /></button> -->
                                </div>
                                <div class="col-md-3">
                                    <button class="float-right" :disabled="nextPageUrl==='' || nextPageUrl === null" type="submit" @click="getUserTransactions(nextPageUrl)"> Next Page <i class="fa fa-angle-double-right" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </md-tab>

                <md-tab id="tab-pages" md-label="Item purchases">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-uppercase mt-4">Purchases</h6>
                            <div class="underline"></div>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <input type="text" placeholder="Filter by item" class="pull-right">
                        </div>
                    </div>

                    <div> 
                        <div v-if="purchases.length > 0">
                            <ul class="list-table header-row row not-for-mobile">
                                <li class="col-md-1 text-right"></li>
                                <li class="col-md-1">Status</li>
                                <li class="col-md-2">Reference</li>
                                <li class="col-md-4">Interswitch Ref</li>
                                <li class="col-md-2">Description</li>
                                <li class="col-md-1 text-right">Date</li>
                            </ul>

                            <ul v-for="transaction of purchases" :key="transaction._id" class="list-table body-row row">
                                <li class="col-md-1"><i class="fa fa-circle small" v-bind:class="transaction.transactionStatus === 'SUCCESSFUL' ? 'text-success' : 'text-danger'"></i></li>
                                <li class="col-md-1 text-lowercase">{{transaction.transactionStatus}}</li>
                                <li class="col-md-2 text-lowercase">{{transaction.pfkTransactionReference}}</li>
                                <li class="col-md-4">{{transaction.interswitchTransactionRef}}</li>
                                <li class="col-md-2">{{transaction.transactionData}}</li>
                                <li class="col-md-1 text-right">{{new Date (transaction.createdAt).toDateString()}}</li>
                            </ul>
                        </div>
                        
                        <div v-if="purchases.length === 0 && !loadingPurchases">
                            <p>No purchase transactions found for this user</p>
                        </div>

                        <div v-if="loadingPurchases" class="text-center mt-5">
                            <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                            <p class="text-grey">Loading purchase transactions...</p>
                        </div>

                    </div>
                   
                </md-tab>
            </md-tabs>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    components: {},
    data(){
        return {
            baseUrl: process.env.baseUrl,
            interswitchBaseUrl: process.env.interswitchBaseUrl,
            loadingPurchases:false,
            loadingTransfers: false,
            nextPageUrl: '',
            previousPageUrl: '',
            transfersPagination: {
                page: 1,
                itemsPerPage: 10,
                totalRecords: 0,
            },
            transfers:[],
            purchases:[]
        }
    },
    computed: {},
    computed: {
        userDetails () {
            return this.$store.state.global.authenticatedUser
        }
    },
    methods: {
        changePage(direction) {
            if (direction === 'next'){
                this.transfersPagination.page += 1
            } else {
                this.transfersPagination.page -= 1
            }
            this.getUserTransactions()
        },
        async getUserTransactions (url) {
            // this.transfers = []
            this.loadingTransfers = true
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userDetails.token,
            };

            try{
                const userTransactionsResponse = await this.$axios.$get(url, {headers})
                console.log('User transactions ==>', userTransactionsResponse)

                if (this.transfersPagination.itemsPerPage > userTransactionsResponse.count) {
                    this.transfersPagination.itemsPerPage = userTransactionsResponse.count
                }

                this.nextPageUrl = userTransactionsResponse.next
                this.previousPageUrl = userTransactionsResponse.previous

                this.transfersPagination.totalRecords = userTransactionsResponse.count
                this.transfers = userTransactionsResponse.results
                this.loadingTransfers = false

            }catch(e){
                this.$toast.error(e.response)
                console.log(e.response)
                this.loadingTransfers = false
            }
        },

        async getUserPurchases () {
            // this.transfers = []
            this.loadingPurchases = true
            const headers = {
                'Content-Type': 'application/json',
                'pfk-user-token': this.userDetails.token,
            };

            try{
                const userPurchasesResponse = await this.$axios.$get(this.interswitchBaseUrl+'transactions/user/', {headers})
                console.log('User transactions ==>', userPurchasesResponse)
                // if (this.transfersPagination.itemsPerPage > userTransactionsResponse.count) {
                //     this.transfersPagination.itemsPerPage = userTransactionsResponse.count
                // }
                // this.transfersPagination.totalRecords = userTransactionsResponse.count
                this.purchases = userPurchasesResponse.data.transactions
                this.loadingPurchases = false
            }catch(e){
                this.$toast.error(e.message)
                console.log(e.message)
                this.loadingPurchases = false
            }
        },

        closeSideBar () {
            this.$store.commit('global/closeSidebar')
        },
        ...mapMutations({
            toggleSidebar: 'global/toggleSidebar',
            closeSideBar: 'global/closeSidebar'
        })
    },
    beforeMount() {
        this.getUserTransactions(this.baseUrl+'transactions/transactions')
        this.getUserPurchases()
    }
}
</script>

<style scoped>
 p{
     color:#1a1919 !important;
 }
 button {
     width:unset;
 }

.md-title h6{
     color:#332c2c;
     font-weight:500;
 }

 .pagination{
     width:100% !important;
     position:relative;
     overflow:hidden;
 }
 
</style>
