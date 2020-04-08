<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 text-center">
                    <img src="../../assets/img/under_construction.svg" alt="">
                    <p>This section is still under construction... check back later please.</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    components: {
    },
    data(){
        return {}
    },
    computed: {},
    methods: {
        closeSideBar () {
        this.$store.commit('global/closeSidebar')
        },
        ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar'
        })
    },
    mounted(){
        },
    beforeMount() {
        this.closeSideBar()
    }
    
}
</script>
<style scoped>
img{
    width: 80%;
    max-width:100%;
    margin-top: 10vh;
}
p{
    color: #141414 !important;
    margin-top: 25px;
    font-size: 0.9em;
}
</style>