<template>
 <div class="modal fade" id="afkTransferModal" tabindex="-2" role="dialog" aria-labelledby="afkTransferModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="afkTransferModaTitle">Transfer Afrikoin to a user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <label>Recipient username</label>
                  <input v-model="userTransferAfk" type="text" placeholder="The user you are transferring to">
                  <label>Amount</label>
                  <input v-model="afkAmountToTransfer" type="number" placeholder="How much are you transferring?">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4 offset-md-4">
                  <button type="button" class="greyed-btn" data-dismiss="modal">Cancel</button>
                </div>
                <div class="col-md-4">
                  <button class="success-btn" v-if="!transferringAfk" @click="transferAfk()" type="button">Transfer</button>
                  <button class="success-btn" v-if="transferringAfk" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {},
  data(){
      return{
        transferringAfk: false,
        userTransferAfk: '',
        afkAmountToTransfer: 0,
      }
  },
  computed: {

  },
  methods: {
    openTransferModal() {
      $('#afkTransferModal').modal('show')    
    },
        async transferAfk() {
      this.transferringAfk = true
      const payload = {
        "recipient": this.userTransferAfk,
        "requested_amount": this.afkAmountToTransfer
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      }

      try{
        const transferResponse = await this.$axios.$put(this.baseUrl+'transactions/send-afk/', payload, {headers})
        this.$toastr.success('Transfer successful!')
        this.transferringAfk = false
      } catch(e){
        console.log(e.response)
        this.$toastr.error(e.response.data.detail)
        this.transferringAfk = false
      }
    }
  }
}
</script>

<style>

</style>
