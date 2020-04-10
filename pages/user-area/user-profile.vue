<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12 mt-3">
                    <h6 class="text-uppercase">USER PROFILE</h6>
                    <div class="underline"></div>
                </div>
                <div class="col-md-7 offset-md-1">
                    <p class="mb-4">Fill the form below with the details you want to change and click the save button. You can also upload your documents below in PDF, JPG or PNG formats</p>
                    <hr>
                    <div class="row">
                        <!-- <div class="col-md-4">
                            <div class="kyc-selfie mb-4 text-center">
                                <div>
                                    <p class="form-tip mb-3">Upload a photo<br> Could be a passport photograph or a selfie.</p>
                                    <input type="file" id="passport" ref="passport" name="passport" class="input-file" @change="onPassportFileChange">
                                    <label for="file"><i class="ti-upload"></i> choose a file</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="avatar">

                            </div>
                        </div> -->

                        <div class="col-md-6">
                            <!-- <input type="text" v-model='username' placeholder="Your username"> -->
                            <label>First Name</label>
                            <input type="text" v-model="firstname" placeholder="Your firstname">
                        </div>
                        <div class="col-md-6">                            
                            <label>Last Name</label>
                            <input type="text" v-model="lastname" placeholder="Your surname">
                        </div>

                        <div class="col-md-6">
                            <label>Username</label>
                            <input type="text" disabled v-model="userDetails.username" placeholder="Your username">
                        </div>
                        <div class="col-md-6">
                            <label>Email Address</label>
                            <input type="text" v-model="userDetails.email" disabled placeholder="Your Email Address">
                        </div>
                        <div class="col-md-6">
                            <label>Phone Number</label>
                            <input type="text" v-model="userDetails.phone" disabled placeholder="Your phone number">
                        </div>
                        <div class="col-md-6">
                            <label>Date of Birth</label>
                            <!-- <input type="text" v-model="dob" placeholder="Your date of birth"> -->
                            <md-datepicker v-model="dob">
                                <label>Select date of birth</label>
                            </md-datepicker>
                        </div>
                        <!-- <div class="col-md-9"></div> -->
                        <div class="col-md-3 mt-3"><button class="success-btn" disabled>Update Details</button></div>

                    </div>
                </div>

                <div class="col-md-3">
                     <h6 class="text-uppercase">KYC DOCUMENS</h6>
                    <!-- <div class="underline"></div> -->

                    <!-- <div class="kyc-selfie mb-4 text-center"> -->
                        <!-- <div>
                            <p class="form-tip mb-3">Upload a document<br> Could be a passport photograph or a selfie.</p>
                            <input type="file" name="file" id="file" class="input-file" />
                            <label for="file"><i class="ti-upload"></i> choose a file</label>
                        </div> -->
                        <button class="greyed-btn" data-toggle="modal" data-target="#uploadModal"><i class="ti-plus"></i> Add Document</button>
                    <!-- </div> -->

                    <hr>

                    <p v-if="userDetails.kyc_status === 'PENDING-DOC-UPLOAD'">
                        You need to upload your KYC Documents, please click on the "Add Document" button above to get started.
                    </p>
                    <p v-if="userDetails.kyc_status === 'PENDING-DOC-APPROVAL'">
                        Your uploaded documents are pending approval. You will be notified once approved.
                    </p>
                    <div class="row mt-4" v-if="userDetails.kyc_selfie !== ''">
                        <div class="col-md-12">
                            <img :src="userDetails.kyc_selfie" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC Selfie</p>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="userDetails.kyc_passport_page1 !== ''">
                        <div class="col-md-12">
                            <img :src="userDetails.kyc_passport_page1" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC International Passport (Front)</p>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="userDetails.kyc_passport_page2 !== ''">
                        <div class="col-md-12">
                            <img :src="userDetails.kyc_passport_page2" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC International Passport (Front)</p>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="userDetails.kyc_id_front !== ''">
                        <div class="col-md-12">
                            <img :src="userDetails.kyc_id_front" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC Regulatory ID (Front)</p>
                        </div>
                    </div>
                    <div class="row mt-4" v-if="userDetails.kyc_id_back !== ''">
                        <div class="col-md-12">
                            <img :src="userDetails.kyc_id_back" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC Regulatory ID (Back)</p>
                        </div>
                    </div>
                    <!-- <div class="row mt-4" v-if="userDetails.kyc_selfie !== ''">
                        <div class="col-md-12">
                            <img :src="baseUrl + userDetails.kyc_selfie" />
                        </div>
                        <div class="col-md-12">
                            <p class="mt-1">KYC Selfie</p>
                        </div>
                    </div> -->
                </div>
                    
                <!-- </div> -->
            </div>

            <!-- Upload kyc document modal -->
            <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitleTitle">Upload a Document</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                    <label>Document Type</label>
                                    <select v-model="documentType" placeholder="Select document type">
                                        <option value="">-- Select document type --</option>
                                        <!-- <option value="DRIVING-LICENCE">Drivers License</option> -->
                                        <option value="id">Govt Regulatory ID Card</option>
                                        <option value="passport">International Passport</option>
                                        <!-- <option value="birth-certificate">Birth Certificate</option> -->
                                        <option value="KYC-SELFIE">KYC Selfie/Passport photo</option>
                                    </select>

                                    <label>Document Side</label>
                                    <select v-model="documentSide" placeholder="Select document type">
                                        <option value="">-- Select side --</option>
                                        <option value="FRONT">Front</option>
                                        <option value="BACK">Back</option>
                                    </select>
                                    <!-- <input type="text" placeholder="Your assigned import code"> -->
                                        <p class="form-tip mb-3">Select a document to upload</p>
                                        <div class="row">
                                            <div class="col-md-4 offset-md-4">
                                                <!-- <input type="file" @change="onFileChange" class="input-file" /> -->
                                                <input type="file" id="file" ref="file" name="file" class="input-file" @change="onFileChange">
                                                <label for="file"><i class="ti-upload"></i> choose a file</label>
                                            </div>
                                        </div>
                                        <div class="row mt-4" v-if="image" >
                                            <div class="col-md-2">
                                                <img :src="image" />
                                            </div>
                                            <div class="col-md-10">
                                                <p class="mt-1">{{fileName}}</p>
                                            </div>
                                        </div>
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
                                        <button class="success-btn" v-if="!uploadingDoc" @click="uploadDoc()" type="submit">Upload</button>
                                        <button class="success-btn" v-if="uploadingDoc" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    components: {},
    computed: {
        userDetails () {
            return this.$store.state.global.authenticatedUser
        }
    },
    data(){
        return {
            dob: '',
            uploadingDoc:false,
            documentType:'',
            documentSide:'',
            baseUrl: process.env.baseUrl,
            uploadedFile: '',
            image: '',
            fileName:'',
            updatedUserDetails: {},
            firstname: '',
            lastname:'',
            dob:''
        }
    },
    methods: {
        resetFile() {
            this.$refs.file.value = '';
        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length){
                return;
            }
            this.uploadedFile = files[0]
            this.fileName = this.uploadedFile.name
            this.createImage(files[0]);
        },

        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        
        async uploadDoc(){
            this.uploadingDoc = true
            let formData = new FormData();
            formData.append('file', this.uploadedFile);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.userDetails.token,
            };

            try{
                const uploaded = await this.$axios.$post(this.baseUrl+'auth/kyc/' + this.documentType + '/' + this.documentSide + '/', formData, {headers})
                this.$toast.success('File uploaded successfully!')
                this.uploadedFile = ''
                this.image = ''
                this.fileName = ''
                this.getUserDetails()
                this.uploadingDoc = false
            }catch(e){
                this.$toast.error(e.response.data.detail)
                this.importingWallet = false
                console.log(e.response)
                this.uploadingDoc = false;
            }
        },

    async updateProfile() {
        this.processing = true;
        let payload = {
            firstname: this.username,
            lastname: this.countryCode + this.phone,
            dob: this.password1,
        }   

        console.log(payload)

        try{
            const signupResponse = await this.$axios.$post(this.baseUrl+'auth/accounts/signup/', payload)
            console.log('Signup Response', signupResponse)
            this.$router.push('../signup-success')

        } catch(e){
            this.$toast.error(e.response.data.detail)
            this.processing = false
        }
      },

    async getUserDetails(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.userDetails.token,
      };

      try{
        const updatedUserDetails = await this.$axios.$get(this.baseUrl+'auth/accounts/' + this.userDetails.id + '/', {headers})
        updatedUserDetails.token = this.userDetails.token
        console.log('updated user', updatedUserDetails)
        this.authenticate(
          updatedUserDetails
        )
      }catch(e){
          this.$toast.error(e.response.data.detail)
          this.importingWallet = false
          console.log(e.response)
      }
    },

    closeSideBar () {
        this.$store.commit('global/closeSidebar')
    },

    authenticate (user) {
        this.$store.commit('global/authenticateUser', user)
    },
    ...mapMutations({
        authenticate: 'global/authenticateUser',
        closeSideBar: 'global/closeSidebar'
    }),
    },
    beforeMount() {
        this.getUserDetails()
        console.log('User', this.userDetails)
        this.updatedUserDetails = this.userDetails
        this.firstname = this.userDetails.firstname
        this.lastname = this.userDetails.lastname
        this.dob = this.userDetails.dob
        this.closeSideBar()
    }
    
}
</script>

<style scoped>
    /* section{
        width:100%;
        min-height:100vh;
        height:inherit;
    }
    .no-padding{
        padding:0!important;
    } */

    p.form-tip{
        text-align:center!important;
    }

    .input-file {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    button.greyed-btn{
        font-weight:500;
        background-color: #f1f1f1;
        width: inherit!important;
    }

    .input-file + label {
        font-size: 0.8em;
        font-weight: 500;
        color:#646262de;
        background-color: #ececec;
        display: inline-block;
        transition:all ease 200ms;
        padding:1em;
        border-radius:3px;
    }

    .input-file:focus + label,
    .input-file + label:hover {
        background-color: #d4d1d1;
    }

    .input-file + label {
        cursor: pointer; /* "hand" cursor */
    }

    p{
        color:#1d1d1d!important;
    }
    .kyc-selfie{
        width:100%;
        height:200px;
        padding:10px;
        border:1px solid #d4d1d1;
        display:flex;
        align-items:center;
        position:relative;
    }
    @media only screen and (max-width: 990px) {

    }

</style>
