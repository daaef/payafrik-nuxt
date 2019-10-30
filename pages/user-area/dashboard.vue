<template>
    <section>
        <UserMain />
    </section>
</template>

<script>
import UserMain from '~/components/partials/user-main.vue'

export default {
    components: {
        UserMain
    },
    data(){
        return {}
    },
    computed: {},
    methods: {},
    beforeMount() {}
    
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
