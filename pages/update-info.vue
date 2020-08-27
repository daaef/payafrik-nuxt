<template>
      <section class="main-content">
        <main class="full">
          <section class="dash-body">
            <!-- <a href="#" class="modal-close">
              <img src="img/close.png" alt="" />
            </a> -->
            <!-- <div class="auth--content"> -->
              <div class="col-lg-5 ml-auto mr-auto text-center">
                <div class="w-100">
                  <form class="w-100">
                    <div class="w-100">
                      <div class="welcome-text mt-5">
                        <div class="text-center">
                          <p class="w-100 c-white">Please provide the following information to access the</p>
                          <h1 class="w-100 c-white am-type mt-0 mb-50">
                            PayAfrik Dashboard
                          </h1>
                        </div>
                      </div>

                      <div class="exchange centerdiv">
                        <div>
                          <img
                            class="prefix-icon"
                            src="../assets/img/iphone.png"
                            alt=""
                          />
                          <input
                              v-model='firstname'
                              id="exchange-afk"
                              type="text"
                              placeholder="Your First Name"
                          />
                          <label for="exchange-afk">First Name</label>
                          <div class="exchange--dropdown"></div>
                        </div>
                      </div>

                      <div class="exchange centerdiv mt-3">
                        <div>
                          <img
                            class="prefix-icon"
                            src="../assets/img/iphone.png"
                            alt=""
                          />
                          <input
                              v-model='lastname'
                              id="exchange-afk"
                              type="text"
                              placeholder="Your Surname"
                          />
                          <label for="exchange-afk">Last Name</label>
                          <div class="exchange--dropdown"></div>
                        </div>
                      </div>

                      <div class="exchange centerdiv mt-3">
                        <div>
                          <img
                            class="prefix-icon"
                            src="../assets/img/iphone.png"
                            alt=""
                          />
                          <input
                              v-model='email'
                              id="exchange-afk"
                              type="email"
                              placeholder="Enter an active email address"
                          />
                          <label for="exchange-afk">Email Address</label>
                          <div class="exchange--dropdown"></div>
                        </div>
                      </div>
                      <p class="authhint">
                        Please add an active email address
                      </p>


                      <div class="text-center mt-20 sub--btn--holder">
                        <div class="sub-button mt-20">
                          <button v-if="!processing" @click="updateDetails($event)" class="w-100">Update Information</button>
                          <button v-if="processing" disabled class="w-100">Updating...</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

              <!-- </div> -->
            </div>
          </section>
        </main>
      </section>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      firstname: "",
      lastname: "",
      email:"",
      processing: false,
      baseUrl: process.env.baseUrl,
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.global.authenticatedUser;
    }
  },
  methods: {
    async updateDetails(event) {
      event.preventDefault()
      if(this.firstname === '' || this.lastname === '' || this.email === ''){
        this.$toast.error("Please complete all fields")
        return
      }
      let payload = {
        first_name: this.firstname,
        last_name: this.lastname,
        email:this.email
      };
      this.processing = true;

      const headers = {
        "Content-Type": "application/json",
        "Authorization": this.$cookies.get('userdetails').token
      };

      try {
        const response = await this.$axios.$put(
          this.baseUrl + "auth/user/edit-profile/",
          payload,
          {headers}
        );
        console.log(response);

        // this.authenticate(signInResponse)
        this.$router.push("../user-area/dashboard");
        this.processing = false;
      } catch (e) {
        this.$toast.error(e.response.data.detail);

        this.processing = false;
        console.log(e.response);
      }
    },

    authenticate(user) {
      this.$store.commit("global/authenticateUser", user);
    },
    ...mapMutations({
      toggleSidebar: "global/authenticateUser"
    })
  },
  mounted() {
    this.confirmationStatus = this.$route.query.confirmation;
  }
};
</script>

<style scoped>

.exchange {
  position: relative;
}

img.password-toggle-switch {
  position: absolute;
  top: 27px;
  left: 92%!important;
  color: #666;
  z-index: 999;
}

.suffix{
  cursor: pointer;
}

.prefix-icon, .suffix-icon{
  width:30px;
  filter: invert();
}

.prefix-icon{
  opacity: 0.5;
}

label {
  color: #0000ff;
}

p{
  color: #ffffffe5;
  margin-top: 15px;
  text-align: center;
}

.dash-body {
  margin-left:5%;
}

@media (max-width: 768px) {
  .dash-body{
    margin-left: 0;
  }
}

</style>
