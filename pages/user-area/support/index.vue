<template>
  <section class="dash-body">
    <div class="utrans--content">
      <div class="w-100">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">user</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">Support</h1>
          </div>
        </div>
      </div>
      <div class="w-100 text-right">
        <button @click="openModal('newTicketModal')"><i class="fas fa-headset fa-lg warn mr-2"></i> Contact support with an issue</button>
      </div>

        <div v-if="!loadingTickets && tickets.length === 0" class="text-center mt-5">
            <img class="empty-state" src="../../../assets/img/no_data.svg">
            <p class="c-white">You have not created any support tickets. <br> If you need help with an issue <a @click="openModal('newTicketModal')" class="warn">Click here now</a> to create a support ticket</p>
        </div>
        <div v-if="loadingTickets" class="text-center mt-5">
            <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
            <p class="c-white">Loading your support tickets...</p>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-6" v-for="ticket of tickets" :key="ticket.id">
                    <nuxt-link nuxt-link :to="{ name: 'user-area-support-ticketId', params: { ticketId: ticket.id }}" class="ticket">
                        <p class="warn">ISSUE #{{ticket.id}}</p>
                        <p class="c-white">{{ticket.subject}}</p>
                        <p class="c-white">{{ticket.replies.length}} replies</p>
                        <p class="c-white"><strong>Created on:</strong> {{ new Date(ticket.created).toDateString() }}</p>
                        <span v-if="ticket.status==='NEW'" class="badge badge-pill badge-warning float-right">{{ ticket.status }}</span>
                        <span v-if="ticket.status==='IN_PROGRESS'" class="badge badge-pill badge-primary float-right">{{ ticket.status }}</span>
                        <span v-if="ticket.status==='CLOSED'" class="badge badge-pill badge-success float-right">{{ ticket.status }}</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>

    <!-- New Ticket Modal -->
    <div
      class="modal fade"
      id="newTicketModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newTicketModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleTitle">
              Contact support
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>Please fill the form below to leave a message with any issues you are facing and a member of our support team will be in touch with you</p>
                </div>

                <div class="col-md-12">
                    <label>Ticket Title</label>
                    <input
                        v-model="newTicket.title"
                        type="text"
                        placeholder="The ticket subject"
                    />
                    <label>Ticket Category</label>
                    <select v-model="newTicket.category">
                      <option value="">--Select Category--</option>
                      <option value="COMPLAINT">Complaint</option>
                      <option value="BUG">Bug</option>
                    </select>
                    <label>Ticket Body</label>
                    <textarea v-model="newTicket.body" placeholder="What is the complaint?"></textarea>

                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <button type="button" class="cancel" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7">
                  <button
                    class="success-btn"
                    v-if="!creatingTicket"
                    @click="createSupportTicket()"
                    type="submit"
                  >
                    Create Support Ticket
                  </button>
                  <button class="success-btn" v-if="creatingTicket" disabled>
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </button>
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
import { mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      baseUrl: process.env.baseUrl,
      loadingTickets: false,
      nextPageUrl: "",
      previousPageUrl: "",
      ticketsPagination: {
        page: 1,
        itemsPerPage: 10,
        totalRecords: 0
      },
      filters: {
        minDate: "",
        maxDate: "",
        receiver: "",
        transactionStatus: ""
      },
      tickets: [],
      creatingTicket: false,
      newTicket: {
        category: ''
      }
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.authenticatedUser;
    }
  },
  methods: {
    openModal(modalId) {
      $("#" + modalId).modal("show");
      $(".modal-backdrop").hide();
    },
    closeModal(modalId) {
      $("#" + modalId).modal("hide");
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    async getTickets() {
      this.loadingTickets = true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token,
      };

      try {
        const ticketsResponse = await this.$axios.$get(this.baseUrl + 'utilities/tickets/', { headers });
        this.tickets = ticketsResponse.results

        this.tickets.forEach(ticket => {
            let ticketBodyArray = ticket.content.split("|")
            ticket.username = ticketBodyArray[0]
            ticket.name = ticketBodyArray[1]
            ticket.subject = ticketBodyArray[2]
            ticket.body = ticketBodyArray[3]
        });

        this.$store.commit('global/loadTickets',  this.tickets)
        console.log('SUPPORT TICKETS ===>', this.tickets)

        this.nextPageUrl = ticketsResponse.next;
        this.previousPageUrl = ticketsResponse.previous;

        this.ticketsPagination.totalRecords = ticketsResponse.count;
        this.loadingTickets = false;
      } catch (e) {
        this.$toast.error(e.response.data.detail);
        console.log(e.response);
        this.loadingTickets = false;
      }
    },

    async createSupportTicket() {
      this.creatingTicket = true
      if(!this.newTicket.body || this.newTicket.body === ''){
        return
      }
      this.processing = true;
      console.log(this.newTicket)
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.userDetails.token,
      };

      const ticketContent = this.userDetails.username + '|'
        + this.userDetails.first_name + ' '
        + this.userDetails.last_name + '|'
        + this.newTicket.title + '|'
        + this.newTicket.body

      const requestBody = {
        content: ticketContent,
        customer: this.newTicket.username
      }

      try {
        const createResponse = await this.$axios.$post(this.baseUrl + 'utilities/tickets/create-ticket/', requestBody, { headers });
        console.log("Ticket create response ==>", createResponse);
        this.$toast.success('Support ticket created successfully');
        this.getTickets()
        this.closeModal('newTicketModal')
        this.creatingTicket = false;
      } catch (e) {
          this.creatingTicket = false
        this.$toast.error(e.response);
        console.log(e.response);
        this.processing = false;
      }
    },

    closeSideBar() {
      this.$store.commit("global/closeSidebar");
    },
    ...mapMutations({
      toggleSidebar: "global/toggleSidebar",
      closeSideBar: "global/closeSidebar"
    })
  },
  beforeMount() {
      this.getTickets()
  }
};
</script>

<style scoped>
button {
  width: unset;
}

@media (max-width: 767px) {
  button {
    width: 100%;
  }
}

.md-title h6 {
  color: #332c2c;
  font-weight: 500;
}

.pagination {
  width: 100% !important;
  position: relative;
  overflow: hidden;
}

td {
  color: #ffffffe5 !important;
  padding: 5px;
}

td.status {
  /* max-width: 50px !important; */
  text-transform: lowercase;
}

.pagination button {
  background: #0c0a3c;
    color: #ffffff99;
    /* border: solid 1px #f9921b; */
    padding: 15px;
    cursor: pointer;
    border:none;
}

#newTicketModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}

.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

/* button.greyed-btn{
    font-weight:500;
    background-color: #f1f1f1;
    width: inherit!important;
} */

#newTicketModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}


input, select, textarea {
  padding: 15px;
  color: #ffffff99;
  background: #111a3f;
  border: solid 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

textarea{
    height: 150px;
}


.input-file + label {
  font-size: 0.8em;
  font-weight: 500;
  color: #8190ca;
  background-color: #111a3f !important;
  display: inline-block;
  transition: all ease 200ms;
  padding: 20px;
  border-radius: 3px;
  width: 100%;
}

.input-file:focus + label,
.input-file + label:hover {
  background-color: #d4d1d1;
}

.input-file + label {
  cursor: pointer; /* "hand" cursor */
}

#newTicketModal .modal-header {
  margin-bottom: 15px;
  border: none !important;
}

#newTicketModal .modal-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
}

#newTicketModal .modal-header h5 {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
}

#newTicketModal .modal-footer {
  border: none !important;
}

#newTicketModal .modal-footer button {
  background: #11154b;
  color: #f6f6f6;
  border: solid #2832c3;
  padding: 10px 40px;
  border-radius: 25px;
  cursor: pointer;
}

#newTicketModal .modal-footer button.cancel {
  border: solid transparent;
}

a.ticket{
  background: #0c0b3a;
  padding: 20px;
  height:150px;
  margin-bottom:20px;
  transition: all 0.3s ease-in-out;
  margin-top:20px;
  display:block;
  border: 2px solid transparent;
}

a.ticket p{
    margin-top: 2px;
    margin-bottom: 2px;
}

a.ticket:hover{
  background: #141B49;
  border: 2px solid #0c0b3a;

}

button {
  padding: 20px;
  color: rgba(255, 255, 255, 0.6);
  background: #0c0b3a;
  border: solid 0;
  transition: all 0.3s ease-in-out;
}

button:hover{
  background: #121058;
}
</style>
