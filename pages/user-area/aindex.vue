<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-2 no-padding">
                    <MainSidebar />
                </div>
                <div class="col-lg-10 no-padding">
                    <Header />
                    <!-- <router-view/> -->
                    <nuxt-child />
                    <!-- <UserMain /> -->
                </div>
            </div>
        </div>
        <a @click="toggleChatBox()" class="chat-bubble">
            <i v-if="chatBoxClosed === true" class="ti-comments"></i>
            <i v-if="chatBoxClosed === false" class="fa fa-times"></i>
        </a>
        <div v-if="chatBoxClosed === false" class="chat-box animated fadeInUp">
            <!-- <input type="text" placeholder="Username"> -->
            <div class="chat"></div>
            <div class="row">
                <div class="col-10" style="padding-right:0">
                    <input type="text" placeholder="Type your message">
                </div>
                <div class="col-2" style="padding-left:0">
                    <button><i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MainSidebar from '~/components/partials/main-sidebar.vue'
import Header from '~/components/partials/header.vue'
import UserMain from '~/components/partials/user-main.vue'
import { mapMutations } from 'vuex'

export default {
    components: {
        MainSidebar,
        Header,
        UserMain
    },
    data(){
        return {

        }
    },
    computed: {
        chatBoxClosed () {
            return this.$store.state.global.chatBoxClosed
        },
        isAuthenticated () {
            return this.$store.state.global.isAuthenticated
        },
    },
    methods: {
        toggleChatBox () {
            this.$store.commit('global/toggleChatBox')
        },
        ...mapMutations({
            toggleChatBox: 'global/toggleChatBox',
            toggleSidebar: 'global/authenticateUser'
        }),

        authenticate (user) {
            this.$store.commit('global/authenticateUser', user)
        },
        checkLoginStatus() {
            console.log(this.$cookies.get('userdetails'))
            if(!this.$cookies.get('userdetails'))
            {
                this.$cookies.removeAll()
                this.$router.push('../login')
            } else {
                this.authenticate( this.$cookies.get('userdetails') )
            }
        }
    },
    beforeMount() {
        this.checkLoginStatus()
    }
    
}
</script>

<style scoped>
    section{
        width:100%;
        min-height:100vh;
        height:inherit;
    }
    .no-padding{
        padding:0!important;
    }

    a.chat-bubble{
        text-align:center;
        display:flex;
        align-items: center;
        justify-content: center;
        width:50px;
        min-width:50px;
        height:50px;
        min-height:50px;
        border-radius: 50px;
        background-color: #F9B330;
        border: 2px solid #f1d8a8;
        color:#2e2d2d;
        font-size: 1em;
        position:fixed;
        bottom:20px;
        left:15%;
        z-index: 999;
        box-shadow: 2px 2px 10px #00000093
    }
    a.chat-bubble:hover{
        box-shadow: 2px 2px 10px #00000074;
        background-color: #e4a124;
    }
    .chat-box{
        width: 25%;
        height: 400px;
        position: fixed;
        bottom: 70px;
        left: 18%;
        box-shadow: 2px 2px 20px #0000002a;
        border-radius: 5px;
        background-color:#fff;
        padding: 10px;
    }
    .chat{
        width: 100%;
        height:320px;
        background: url('../../assets/img/support.svg') no-repeat center center;
        background-size:50%;
        opacity: 0.1;
    }

    .chat-box button{
        background-color: #2e2d2d;
        color:#ffffffdc;
    }

    .chat-box button:hover{
        background-color: #cac7c7dc;
        color:#2e2d2d;
    }

    @media only screen and (max-width: 990px) {
         a.chat-bubble{
            left:5%;
         }
        .chat-box{
            width: 40%;
            left: 10%;
        }
    }
    @media only screen and (max-width: 768px) {
        a.chat-bubble{
            left:1%;
        }
        .chat-box{
            width: 50%;
            left: 5%;
        }
    }
    @media only screen and (max-width: 768px) {
        .chat-box{
            width: 90%;
        }
    }
</style>
