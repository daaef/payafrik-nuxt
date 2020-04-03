<template>
    <section>
       <div class="container">

            <div class="row mb-3">
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-6">
                    <h6 class="text-uppercase mt-4">Payment items for {{activeBiller.billername}}</h6>
                    <div class="underline"></div>
                </div>
                <div class="col-md-2"></div>
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-4">
                    <input type="text" placeholder="Filter payment items" class="pull-right">
                </div>
            </div>

            <div v-if="loadingPaymentItems" class="text-center mt-5">
                <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                <p class="text-grey">Loading payment items...</p>
            </div>

            <div v-if="!loadingPaymentItems && paymentItems.length === 0" class="text-center mt-5">
                <img class="empty-state" src="../../../../assets/img/no_data.svg">
                <p class="text-grey">Sorry! No payment items found for this biller</p>
            </div>

            <div class="row" v-if="!loadingPaymentItems && paymentItems.length > 0">
                <div v-for="item of paymentItems" v-bind:key="item.paymentitemid" class="col-md-4 mb-4">
                    <div class="shadowed-box wrapper border-light">
                        <div class="md-title">
                            <h6>{{item.paymentitemname}}</h6>
                        </div>
                        <!-- <p>
                        CATEGORY: {{biller.categoryname}}
                        </p> -->
                        <a @click="openModal('purchaseModal', item)">Buy this item</a>
                    </div>
                </div>
            </div>

       </div>

        <!-- Purchase Modal -->
        <div class="modal fade" id="purchaseModal" tabindex="-1" role="dialog" aria-labelledby="purchaseModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div v-if="!paymentSuccess && !paymentFailed" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitleTitle">Pay for <strong>{{activeItem.paymentitemname}}</strong></h5>
                        <button @click="closeModal('purchaseModal')" type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Phone number</label>
                                    <input v-model="paymentDetails.phone" type="text" placeholder="Your phone number" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                                </div>
                                <div class="col-md-12">
                                    <label>Email Address</label>
                                    <input  v-model="paymentDetails.email" type="email" placeholder="Your email address" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                                </div>
                                <div class="col-md-12">
                                    <label>Customer ID: <strong class="text-uppercase">{{activeBiller.customerfield1}}</strong></label>
                                    <input v-model="paymentDetails.customerId" type="text" placeholder="Unique customer id for this product" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                                </div>
                                <div class="col-md-12">
                                    <label>Amount</label>
                                    <input type="number" :disabled='activeItem.fixed' v-model="paymentDetails.amount" placeholder="Payment amount" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                                </div>
                                <!-- <div class="col-md-12" v-if="activeBiller.customerfield2 !== ''">
                                    <label><strong>{{activeBiller.customerfield2}}</strong></label>
                                    <input type="text" placeholder="Your assigned import code" v-bind:class="formErrors.emailError === true ? 'has-error' : ''">
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 offset-md-4">
                                <button type="button" class="greyed-btn" @click="closeModal('purchaseModal')">Cancel</button>
                                </div>
                                <div class="col-md-4">
                                <button class="success-btn" v-if="!makingPayment" @click='checkTokenBalance()' type="button">Make Payment</button>
                                <!-- <button class="success-btn" v-if="!importingWallet" @click="importWallet" type="button">Import</button> -->
                                <button class="success-btn" v-if="makingPayment" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="paymentSuccess" class="modal-content animated fadeInUp">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitleTitle">Payment Sucessful</h5>
                        <button @click="closeModal('purchaseModal')" type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <img src="https://img.icons8.com/color/80/000000/checked--v1.png"/>
                                    <h6 class="success mt-2">Transaction Successful</h6>
                                    <p class="mt-2">Transaction Reference: <strong>{{pfkTransactionRef}}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 offset-md-8">
                                <button type="button" class="greyed-btn" @click="closeModal('purchaseModal')">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="paymentFailed" class="modal-content animated shake">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitleTitle">Payment Failed</h5>
                        <button @click="closeModal('purchaseModal')" type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <img src="https://img.icons8.com/office/80/000000/cancel.png"/>
                                    <h6 class="failed mt-2">Transaction Failed</h6>
                                    <p class="mt-2">Transaction Reference: <strong>12345678</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 offset-md-8">
                                <button type="button" class="greyed-btn" @click="closeModal('purchaseModal')">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    components: {},
    data(){
        return {
            interswitchBaseUrl: process.env.interswitchBaseUrl,
            baseUrl: process.env.baseUrl,
            billerId: this.$route.params.id,
            loadingPaymentItems: false,
            paymentItems: [],
            formErrors: {},
            activeItem: {},
            makingPayment: false,
            paymentDetails: {},
            paymentSuccess: false,
            paymentFailed: false,
            pfkTransactionRef: ''
        }
    },
    computed: {
        activeBiller () {
            return this.$store.state.global.activeBiller
        },
        userDetails () {
            return this.$store.state.global.authenticatedUser
        }
    },
    methods: {
        openModal(modalId, item) {
            if (item.amount !== '0'){
                this.paymentDetails.amount = +item.amount/100
                item.fixed = true
            }
            this.activeItem = item;
            $('#' + modalId).modal('show')    
        },
        closeModal(modalId) {
            this.activeItem = {};
            this.paymentSuccess = false;
            this.paymentFailed = false;
            $('#' + modalId).modal('hide')    
        },

        async getBillersItems() {
            this.loadingPaymentItems = true;
            try{
                const paymentItemsResponse = await this.$axios.$get(this.interswitchBaseUrl + 'biller/' + this.billerId)
                console.log(paymentItemsResponse)
                if(paymentItemsResponse.status === true && paymentItemsResponse.data){
                    this.paymentItems = paymentItemsResponse.data
                } else {
                    this.paymentItems = []
                }
                this.loadingPaymentItems = false
            }catch(e){
                // this.$toast.error(e.response.data.error)
                this.loadingPaymentItems = false
                console.log(e)
            }
        },
        checkTokenBalance() {
            this.makingPayment = true;
            // console.log('usertokenbalance: ', this.userDetails.balance);
            // console.log('paymentamount: ', this.paymentDetails.amount);

            if (this.paymentDetails.amount > this.userDetails.balance){
                this.$toast.error('Sorry, you do not have enough tokens to purchase this item');
                this.makingPayment = false
                return
            } else {
                this.validateCustomer()
            }
        },
        async validateCustomer() {
            this.makingPayment = true;
            let payload = {
                customerId: this.paymentDetails.customerId,
                paymentCode: this.activeItem.paymentCode,
            }               
            try{
                const validationResponse = await this.$axios.$post(this.interswitchBaseUrl+'validate-customer', payload)
                console.log('Signup Response', validationResponse)
                if (validationResponse.status === true){
                    this.sendPaymentAdvice()
                }

            } catch(e){
                this.$toast.error(e.response.data.detail)
                this.makingPayment = false
            }
        },
        async sendPaymentAdvice() {

            this.makingPayment = true;
            const headers = {
                'Content-Type': 'application/json',
                'pfk-user-token': this.userDetails.token,
            }
            
            let payload = {
                paymentCode: this.activeItem.paymentCode,
                customerId: this.paymentDetails.customerId,
                customerMobile: this.paymentDetails.phone,
                customerEmail: this.paymentDetails.email,
                amount: (this.paymentDetails.amount * 100).toString()
            }  
            try{
                const adviceResponse = await this.$axios.$post(this.interswitchBaseUrl+'payment-advice', payload, {headers})
                console.log('Signup Response', adviceResponse)
                if (adviceResponse.status === true && adviceResponse.data.responseCodeGrouping === 'SUCCESSFUL'){
                    let transactionRef = adviceResponse.data.payafrikTransactionRef
                    this.pfkTransactionRef = adviceResponse.data.payafrikTransactionRef
                    this.$toast.success('Successful')
                    this.paymentSuccess = true

                    this.getUserDetails()
                }

            } catch(e){
                console.log(e.response)
                this.paymentFailed = true
                this.$toast.error(e.response.data.name + ': ' + e.response.data.message)
                this.makingPayment = false
            }
        },

            async getUserDetails(){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': this.userDetails.token,
            };

            try{
                const updatedUserDetails = await this.$axios.$get(this.baseUrl+'auth/user/profile/', {headers})
                updatedUserDetails.token = this.userDetails.token
                console.log('User ==>', updatedUserDetails)
                this.authenticate(
                updatedUserDetails
                )
            }catch(e){
                this.$toast.error(e.response.data.detail)
                this.importingWallet = false
                console.log(e.response)
            }
            },

            authenticate (user) {
            this.$store.commit('global/authenticateUser', user)
            },
            ...mapMutations({
            authenticate: 'global/authenticateUser'
            }),

        async queryTransaction(transactionRef) {
             try{
                const paymentItemsResponse = await this.$axios.$get(this.interswitchBaseUrl + 'query-transaction/' + transactionRef)
                console.log(paymentItemsResponse)
                if(paymentItemsResponse.status === true && paymentItemsResponse.data){
                    this.paymentItems = paymentItemsResponse.data
                } else {
                    this.paymentItems = []
                }
                this.loadingPaymentItems = false
            }catch(e){
                // this.$toast.error(e.response.data.error)
                this.loadingPaymentItems = false
                console.log(e)
            }
        }

    },
    beforeMount() {
        this.getBillersItems()
        this.closeModal('purchaseModal');
        if(Object.entries(this.activeBiller).length === 0 && this.activeBiller.constructor === Object){
            this.$router.push('../')
        }
    }
}
</script>

<style scoped>
 p{
     color:#1a1919 !important;
 }
 .md-title h6{
     color:#332c2c;
     font-weight:500;
 }
 .modal-title{
     font-size:1.2em;
 }
</style>
