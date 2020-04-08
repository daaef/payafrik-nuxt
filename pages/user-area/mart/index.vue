<template>
    <section>
        <div class="container">
            <md-tabs class="mt-4">
                <md-tab id="tab-home" md-label="Service Categories">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-uppercase mt-4">categories</h6>
                            <div class="underline"></div>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <input type="text" placeholder="Filter categories" class="pull-right">
                        </div>
                    </div>

                    <div v-if="loadingCategories" class="text-center mt-5">
                        <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                        <p class="text-grey">Loading categories...</p>
                    </div>
                    <div class="row">
                        <div v-for="category of billerCategories" v-bind:key="category.categoryid" class="col-md-4 mb-4">
                            <div class="shadowed-box wrapper border-light">
                                <div class="md-title">
                                    <h6>{{category.categoryname}}</h6>
                                </div><p>
                                {{category.categorydescription}}
                                </p>
                                <nuxt-link :to="{ name: 'user-area-mart-category-id', params: { id: category.categoryid }}">See Billers</nuxt-link>
                                
                            </div>
                        </div>
                    </div>
                </md-tab>

                <md-tab id="tab-pages" md-label="All Service Providers">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-uppercase mt-4">billers</h6>
                            <div class="underline"></div>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <input type="text" placeholder="Filter billers" class="pull-right">
                        </div>
                    </div>

                    <div v-if="loadingBillers" class="text-center mt-5">
                        <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                        <p class="text-grey">Loading billers...</p>
                    </div>
                    <div class="row">
                        <div v-for="biller of billers" v-bind:key="biller.billerid" class="col-md-4 mb-4">
                            <div class="shadowed-box wrapper border-light">
                                <div class="md-title">
                                    <h6>{{biller.billername}}</h6>
                                </div>
                                <p>
                                CATEGORY: {{biller.categoryname}}
                                </p>
                                <a>See Payment Items</a>
                            </div>
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
            loadingCategories:false,
            loadingBillers: true,
            billerCategories:[],
            billers:[]
        }
    },
    computed: {},
    methods: {
       async getBillerCategories(){
            this.loadingCategories = true;
            try{
                const categoriesResponse = await this.$axios.$get(this.interswitchBaseUrl+'categories')
                console.log(categoriesResponse)
                if(categoriesResponse.status === true){
                    this.billerCategories = categoriesResponse.data
                }
                this.loadingCategories = false
            }catch(e){
                // this.$toast.error(e.response.data.error)
                this.loadingCategories = false
                console.log(e)
            }
        },

        async getAllBillers() {
            this.loadingBillers = true;
            try{
                const billersResponse = await this.$axios.$get(this.interswitchBaseUrl+'billers')
                console.log(billersResponse)
                if(billersResponse.status === true){
                    this.billers = billersResponse.data
                }
                this.loadingBillers = false
            }catch(e){
                // this.$toast.error(e.response.data.error)
                this.loadingBillers = false
                console.log(e)
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
        this.getBillerCategories()
        this.getAllBillers()
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
 
</style>
