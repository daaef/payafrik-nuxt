<template>
    <section>
       <div class="container">

            <div class="row mb-3">
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-6">
                    <h6 class="text-uppercase mt-4">Payment items for biller</h6>
                    <div class="underline"></div>
                </div>
                <div class="col-md-2"></div>
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-4">
                    <input type="text" placeholder="Filter payment items" class="pull-right">
                </div>
            </div>

            <div v-if="loadingPaymentItems" class="text-center mt-5">
                <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                <p class="text-grey">Loading billers...</p>
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
                        <a>Buy this item</a>
                    </div>
                </div>
            </div>

       </div>
    </section>
</template>

<script>

export default {
    components: {},
    data(){
        return {
            interswitchBaseUrl: process.env.interswitchBaseUrl,
            billerId: this.$route.params.id,
            loadingPaymentItems: false,
            paymentItems: []
        }
    },
    computed: {},
    methods: {

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


    },
    beforeMount() {
        this.getBillersItems()
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
</style>
