<template>
    <div>
    <!-- MAIN BODY -->
        <div  v-if="!loadingBillers && billers.length > 0"  class="container paddingTop50 mainbody">
          <div class="headerTitle">
            <nuxt-link to="/user-area/mart"><img src="../../../../assets/img/back.png" alt="" /></nuxt-link>
            <p class="mainTitle">{{billers[0].categoryname}} Billers</p>
          </div>
          <div class="dividerdark"></div>
          <div class="paddingTop20"></div>
          <!-- DASHBODY -->
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div v-for="biller of billers" v-bind:key="biller.billerid" class="col-md-4">
                    <div class="billercard">
                      <div class="cardrow">
                        <div class="imgHolder">
                          <!-- <img src="./img/9mobile.jpeg" alt="" /> -->
                        </div>
                        <div class="content">
                          <p>{{biller.billername}}</p>
                          <p class="cat">Category: {{biller.categoryname}}</p>
                          <div class="pay">
                            <a @click='setBillerAndNavigate(biller)'>See Payment Items</a>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          <!-- END DASHBODY -->
        </div>
        <div v-if="!loadingBillers && billers.length === 0" class="text-center mt-5">
            <img class="empty-state" src="../../../../assets/img/no_data.svg">
            <p class="text-grey">Sorry! No billers found for this category</p>
        </div>
        <div v-if="loadingBillers" class="text-center mt-5">
            <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
            <p class="text-grey">Loading billers...</p>
        </div>
    </div>
        <!-- END MAIN BODY -->
    <!-- <section>
       <div class="container">

            <div class="row mb-3">
                <div v-if="!loadingBillers && billers.length > 0" class="col-md-6">
                    <h6 class="text-uppercase mt-4">billers for category: {{billers[0].categoryname}}</h6>
                    <div class="underline"></div>
                </div>
                <div class="col-md-2"></div>
                <div v-if="!loadingBillers && billers.length > 0" class="col-md-4">
                    <input type="text" placeholder="Filter billers" class="pull-right">
                </div>
            </div>

            <div v-if="loadingBillers" class="text-center mt-5">
                <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                <p class="text-grey">Loading billers...</p>
            </div>

            <div v-if="!loadingBillers && billers.length === 0" class="text-center mt-5">
                <img class="empty-state" src="../../../../assets/img/no_data.svg">
                <p class="text-grey">Sorry! No billers found for this category</p>
            </div>

            <div class="row" v-if="!loadingBillers && billers.length > 0">
                <div v-for="biller of billers" v-bind:key="biller.billerid" class="col-md-4 mb-4">
                    <div class="shadowed-box wrapper border-light">
                        <div class="md-title">
                            <h6>{{biller.billername}}</h6>
                        </div>
                        <p>
                        CATEGORY: {{biller.categoryname}}
                        </p>
                        <a @click='setBillerAndNavigate(biller)'>See Payment Items</a>
                    </div>
                </div>
            </div>

       </div>
    </section> -->
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    components: {},
    data(){
        return {
            interswitchBaseUrl: process.env.interswitchBaseUrl,
            categoryId: this.$route.params.id,
            loadingBillers: false,
            billers: []
        }
    },
    computed: {},
    methods: {

        async getCategoryBillers() {
            this.loadingBillers = true;
            try{
                const billersResponse = await this.$axios.$get(this.interswitchBaseUrl + 'billers/category/' + this.categoryId)
                console.log(billersResponse)
                if(billersResponse.status === true && billersResponse.data){
                    this.billers = billersResponse.data
                } else {
                    this.billers = []
                }
                this.loadingBillers = false
            }catch(e){
                // this.$toast.error(e.response.data.error)
                this.loadingBillers = false
                console.log(e)
            }
        },

        ...mapMutations({
            toggleChatBox: 'global/setActiveBiller',
        }),

        setBillerAndNavigate (biller) {
            this.$store.commit('global/setActiveBiller', biller);
            console.log('working here...')
            this.$router.push(
                {
                    name: 'user-area-mart-biller-id', 
                    params: { 
                        id: biller.billerid 
                    }
                }
            )
        },


    },
    beforeMount() {
        this.getCategoryBillers()
    }
}
</script>

<style scoped>
 /* p{
     color:#1a1919 !important;
 }
 .md-title h6{
     color:#332c2c;
     font-weight:500;
 } */
 .imgHolder{
     min-height: 100px;
 }
</style>
