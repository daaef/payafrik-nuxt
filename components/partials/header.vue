<template>
  <header>
    <nav>
      <div class="balance">
        <img src="../../assets/img/logo.png" class="mobile-logo" alt="logo" />
        <span>AfriToken:</span>
        <h3>{{ +userDetails.balance }}</h3>
      </div>
      <ul class="nav-links">
        <li class="mr-32">
          <a href="#" @click="toggleTokenModal()">
            <img class="mr-8" src="../../assets/img/plus.png" alt="plus" />
            BUY TOKEN
          </a>
        </li>
        <li class="mr-32">
          <a href="#" @click="toggleWithdrawalModal()">
            <img class="mr-8" src="../../assets/img/wallet.png" alt="wallet" />
            WITHDRAW
          </a>
        </li>
        <li>
          <a href="#" data-link-class="transfer-token-active">
            <img
              class="mr-8"
              src="../../assets/img/transfer.png"
              alt="transfer"
            />
            TRANSFER AFRITOKEN
          </a>
        </li>
      </ul>
      <div class="user-account">
        <a href="#">
          <img class="mr-12" src="../../assets/img/user.png" alt="user icon" />
          <span>{{ userDetails.username }}</span>
        </a>
      </div>
      <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />

      <label for="navi-toggle" class="navigation__button">
        <span class="navigation__icon">&nbsp;</span>
      </label>
      <div class="nav-dropdown">
        <div class="balance">
          <span>AfriToken:</span>
          <h3>2,500.24</h3>
        </div>
        <ul class="nav-links">
          <li>
            <a href="#" data-link-class="buy-token-active">
              <img class="mr-8" src="../../assets/img/plus.png" alt="plus" />
              BUY TOKEN
            </a>
          </li>
          <li>
            <a href="#" data-link-class="withdraw-active">
              <img
                class="mr-8"
                src="../../assets/img/wallet.png"
                alt="wallet"
              />
              WITHDRAW
            </a>
          </li>
          <li>
            <a href="#" data-link-class="transfer-token-active">
              <img
                class="mr-8"
                src="../../assets/img/transfer.png"
                alt="transfer"
              />
              TRANSFER AFRITOKEN
            </a>
          </li>
          <li class="active">
            <a href="#" class=" mt-8">
              <img class="mr-8" src="../../assets/img/home.png" alt="" />
              HOME
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/side-wallet.png" alt="" />
              WALLET
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/mart.png" alt="" />
              MART
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img
                class="mr-8"
                src="../../assets/img/side-exchange.png"
                alt=""
              />
              EXCHANGE
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/chat.png" alt="" />
              CHAT
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/setting.png" alt="" />
              SETTING
            </a>
          </li>
          <li>
            <a href="" class=" mt-8">
              <img class="mr-8" src="../../assets/img/exit.png" alt="" />
              EXIT
            </a>
          </li>
        </ul>
        <div class="user-account">
          <a href="#">
            <img
              class="mr-12"
              src="../../assets/img/user.png"
              alt="user icon"
            />
            <span>{{ userDetails.username }}</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
  <!-- <div class="fixedNav">
        <div class="logo">
        <img src="../../assets/img/logo-.png" alt="" />
        </div>

        <div class="aside">
        <div class="avatar">
            <div v-if="userDetails.avatar !== ''" class="profile-picture" v-bind:style="{ backgroundImage: 'url(' + userDetails.avatar + ')' }" ></div>
            <div v-if="userDetails.avatar === ''" class="profile-picture" style="" ></div>
        </div>
        <img
            @click="openMenu()"
            id="navbutton"
            src="../../assets/img/menu-2.png"
            alt=""
        />
        </div>
    </div> -->
  <!-- <div class="header flex-display">
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
                        <div v-if="userDetails.avatar !== ''" class="profile-picture" v-bind:style="{ backgroundImage: 'url(' + userDetails.avatar + ')' }" ></div>
                        <div v-if="userDetails.avatar === ''" class="profile-picture" style="" ></div>
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
    </div> -->
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      // userDetails: this.$cookies.get('user-details'),
      profileImage: "../../assets/img/placeholder-profile.jpg"
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    tokenWithdrawalModalActive() {
      return this.$store.state.global.tokenWithdrawalModalActive;
    },
    sidebarClosed() {
      return this.$store.state.global.sidebarClosed;
    },
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  methods: {
    openSideBar() {
      this.$store.commit("global/toggleSidebar");
    },
    // ...mapMutations({
    //   toggleSidebar: 'global/toggleSidebar'
    // }),
    signOut() {
      this.$cookies.removeAll();
      this.$router.push("/login");
    },

    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },

    toggleTokenModal() {
      this.$store.commit("global/toggleTokenModal");
    },

    toggleWithdrawalModal() {
      this.$store.commit("global/toggleTokenWithdrawalModal");
    },

    ...mapMutations({
      toggleTokenModal: "global/toggleTokenModal" ,
      toggleWithdrawalModal: "global/toggleTokenWithdrawalModal"
    }),
  }
};
</script>

<style scoped>
ul.nav-links li a{
    color:#fff !important;
    text-decoration: none !important;
}
/* .profile-picture {
  height: 40px;
  min-width: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #f9b330;
  background: url("../../assets/img/placeholder-profile.jpg") no-repeat center
    center;
  background: url("https://img.icons8.com/ultraviolet/40/000000/user-male-circle.png")
    no-repeat center center;
  background-size: cover;
} */
/* .header{
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
    background: url('https://img.icons8.com/ultraviolet/40/000000/user-male-circle.png') no-repeat center center; 
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
} */
</style>
