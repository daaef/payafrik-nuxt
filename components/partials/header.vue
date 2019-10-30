<template>
    <div class="header flex-display">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                   <a @click="openSideBar()" class="nav-toggler"><i class="ti-align-right"></i></a>
                    <img class="logo" src="../../assets/img/logo.png">
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-3">
                    <div class="user-box shadowed-box flex-display">
                        <i class="ti-bell"></i>
                        <!-- <div class="profile-picture" v-bind:style="{ backgroundImage: 'url(' + profileImage + ')' }" ></div> -->
                        <div class="profile-picture" style="" ></div>
                        <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{userDetails.username}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <nuxt-link class="dropdown-item" to="/user-area/user-profile"><i class="ti-settings mr-2"></i>Profile settings</nuxt-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" @click="signOut()"><i class="ti-share mr-2"></i>Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import { mapState } from 'vuex'

export default {
  components: {},
  data(){
      return{
        // userDetails: this.$cookies.get('user-details'),
        profileImage: '../../assets/img/placeholder-profile.jpg'
      }
  },
  computed: {
    sidebarClosed () {
      return this.$store.state.global.sidebarClosed
    },
    userDetails () {
        return this.$store.state.global.authenticatedUser
    },
  },
  methods: {
    openSideBar () {
      this.$store.commit('global/toggleSidebar')
    },
    // ...mapMutations({
    //   toggleSidebar: 'global/toggleSidebar'
    // }),
    signOut(){
        this.$cookies.removeAll()
        this.$router.push('../login')
    }
  }
}
</script>

<style>
.header{
    height:80px;
    padding: 5px 0;
}

img{
    max-width:100%;
}

img.logo{
    width:50%;
    margin-top:20px;
}

.user-box{
    width:100%;
    min-height:100%;
    height:inherit;
    background-color: #1f3d74;
    border-radius:5px;
    color:#ffffffde;
    font-family: 'Poppins', sans-serif;
    font-size:0.8em;
    padding:10px;
}

.user-box i, 
.user-box a, 
.user-box > div{
    float:left;
    margin-right:5px;
    margin-left:10px;
}

.user-box i.ti-bell{
    font-size:2em;
}

.profile-picture{
    height:40px;
    min-width:40px;
    width:40px;
    border-radius:50%;
    border: 2px solid #F9B330;
    background: url('../../assets/img/placeholder-profile.jpg') no-repeat center center; 
    background-size:cover;
}

.dropdown-menu{
    padding:5px;
}

.dropdown-menu a{
    font-size:0.8em;
}

a.dropdown-item{
    padding: 1em;
}

a.nav-toggler{
    float:left;
    margin-right: 20px;
    margin-top: 20px;
    font-size:1em;
    display:none;
}

@media only screen and (max-width: 990px) {
  a.nav-toggler {
    display: inline-block;
  }
}

@media only screen and (max-width: 768px) {
    .header{
        height:inherit;
        padding:10px;
    }
    img.logo{
        width:30%;
        margin-bottom:20px;
    }
}

@media only screen and (max-width: 320px) {
    img.logo{
        width:40%;
    }
    .header{
        padding:5px;
    }
}
</style>
