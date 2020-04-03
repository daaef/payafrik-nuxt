<template>
    <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                        <img class="logo" src="../../assets/img/logo.png">
                        <div class="login-container shadowed-box">
                            <!-- <p><i class="ti-check-box"></i> Account confirmed successfully</p> -->
                            <h6 class="font-weight-bold">PLEASE VERIFY YOUR PHONE NUMBER TO PROCEED</h6>

                            <input type="text" placeholder="Your activation code (Sent via sms)">
                            <input type="text" placeholder="Your username">
                            <input type="password" placeholder="Your password">

                            <button class="login">Proceed to your dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {}
}
</script>

<style>

.section{
    background-color:#1f3d74;
    background: url('../../assets/img/blockchain-bg.jpg') no-repeat center center;
    background-size:cover;
    padding:35px;
}
img.logo{
    width:30%;
    filter: brightness(0) invert(1) opacity(0.8);;
}
.login-container{
    background-color:#fff;
    border-radius:5px;
    padding:35px;
    padding-top:30px;
    width:100%;
    margin-top:25px;
}
button.login{
    color:#ffffffde;
    background-color: #1fa545;
}
button.login:hover{
    color:#ffffffde;
    background-color: #13642a;
}
p > a{
    font-size:1em;
}
p{
    margin:0;
    color:#1fa545;
    margin-bottom: 20px;
}
p, a{
    font-size:0.8em;
}
a{
    font-weight:700;
}
a.hover{
    color:#fffffffd;
    text-decoration:none;
}
h6{
    font-size:0.8em;
}
</style>
