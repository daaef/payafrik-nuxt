<template>
    <div class="container">
        <div v-if="!processing" class="text-center mt-5">
            <i class="fas facircle-notch fa-spin c-white"></i>
        </div>
        <div v-if="!processing">
            <div class="row">
                <div class="col-md-12 text-center">
                    <img src="https://img.icons8.com/color/80/000000/checked--v1.png"/>
                    <h6 class="yellow mt-2">Transaction Successful</h6>
                    <p class="mt-2">Transaction Reference: <strong>{{transactionRef}}</strong></p>
                    <p class="mt-2">Transaction Reference: <strong>{{transactionData.PaymentReference}}</strong></p>
                    
                    <p><strong>Interswitch Response:</strong> {{transactionData.ResponseDescription}}</p>
                </div>
            </div>

            <!-- <div class="row">
                <div class="col-md-12 text-center">
                    <img src="https://img.icons8.com/office/80/000000/cancel.png"/>
                    <h6 class="failed mt-2">Transaction Failed</h6>
                    <p class="mt-2">Transaction Reference: <strong>{{transactionRef}}</strong></p>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
    var sha512 = require('js-sha512');
    export default {
        data () {
            return {
                interswitchBaseUrl: process.env.interswitchBaseUrl,
                processing: false,
                transactionData: {},
                transactionRef: ''
            }
        },
        methods: {
            async verifyPayment () {
                this.processing = true
                const ref = this.$route.query.ref
                const productId = this.$route.query.prodId
                const amount = this.$route.query.amount
                this.transactionRef = ref

                const url = this.interswitchBaseUrl + 'query-transaction/webpay/' +ref + '/' + amount + '/' + productId 
                try{
                    const response = await this.$axios.$get(url)
                    console.log('VERIFICATION RESPONSE +++++', response)
                    this.transactionData = response.data
                    this.processing = false
                }catch(e){
                    // this.$toast.error(e.response.data.error)
                    this.loadingPaymentItems = false
                    console.log(e)
                    this.processing = false
                }
            }
        },
        mounted () {
            this.verifyPayment()
        },
        beforeMount () {

        }
    }
</script>

<style scoped>
p {
    color: #fff;
}
.yellow{
    color: #D38B28;
}
.failed {
    color: #ec2e2e;
}
</style>