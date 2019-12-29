<template>
    <div>
   <b-card-group deck>
    <!--
    <b-card
      header="featured"
      header-tag="header"
      footer="Card Footer"
      footer-tag="footer"
      title="Title"
    >
      <b-card-text>Header and footers using props.</b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card> -->

    <b-card title="" header-tag="header" footer-tag="footer">
      <template v-slot:header>
        <h6 class="mb-0">{{name}}</h6>
      </template>
      <b-card-text style=" height: 400px; overflow-y: scroll;  overflow-x: hidden;" class="scrollable-element"  id="testing">
        <div v-for="value in message" class="row" style="margin-bottom:3px">
          <div style="margin-left:20px">
            <div class="text-center">
            <v-avatar color="teal" size="40">
                <span class="white--text">{{value.avt}}</span>
              </v-avatar>
            </div>
          </div>
          <div style="margin-left:10px;">
              <p style="font-size:12px"><b>{{value.name}} {{value.time}}</b></p>
              <p style="margin-top:-15px"><b>{{value.msg}}</b></p>
          </div>           
        </div>
      </b-card-text>
      <template v-slot:footer>
    <div>
      <b-form-textarea
        id="textarea"
        v-model="input"
        placeholder="Enter something..."
        rows="2"
        max-rows="3"
        no-resize
        v-on:keyup.enter="onEnter"
      ></b-form-textarea>
        <!-- <div style="margin:10px 40%" >
          <b-button   v-if="input.length"  type="Submit" variant="primary" @click='AddNewMessage()'>Send</b-button>
        </div> -->
    </div>
      </template>
    </b-card>
  </b-card-group>
</div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'Main',
    porps: ['info'],

    beforeRouteEnter(to, form, next){
      next(vm => {
        var isValidUser = vm.$store.state.login_user.login
        if (isValidUser){
          return true
        }
        else {
          vm.$router.push('/login')
        }
          });
    },    
    data() {
      return {
        input: '',
        name: this.$route.params.nameType,
        search: '',
        chat_room:"",
        login_user_info: this.$store.state.login_user,
        message: [
          // {name:'Sandeep', msg:'This is from msag'},
          // {name:'Bot', msg:'This is from  bot'}
        ],

        socket : io(this.$baseUrl + ':8080')
      }
    },
    created () {
        this.emitSelected()
    },
    updated () {
      
        this.emitSelected()
        var scl = document.getElementById("testing")
        scl.scrollTop = scl.scrollHeight
    },    
    computed: {
        info () {
            const {nameType, id} = this.$route.params; 
            console.log(nameType, id)
            this.name = nameType

            return {
                name: "Sandeep",
                id: "12345678"
            }
        }
    },
    methods: {
    
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      emitSelected() {
          this.$emit("returninfo", this.input)
      },
      AddNewMessage() {
        // this.message.push({
        //   name:"pate",
        //   msg: this.input
        // })
        let data_user = {
          name:this.login_user_info.first_name + ' '+ this.login_user_info.last_name,
          msg: this.input,
          time:new Date().toLocaleTimeString('en-US', { hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric"}),
          avt: this.login_user_info.avt,
          room: this.$route.params.nameType

          }
        this.socket.emit('my_room_event', data_user);
        this.input = ''
        this.$emit("returninfo", this.input)
      },
      insert(emoji) {
            this.input += emoji
        },
       onEnter () {
       let data_user = {
          name:this.login_user_info.first_name + ' '+ this.login_user_info.last_name,
          msg: this.input,
          time:new Date().toLocaleTimeString('en-US', { hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric"}),
          avt: this.login_user_info.avt,
          room: this.$route.params.nameType

          }         
        this.socket.emit('my_room_event', data_user);
        this.input = ''
        this.$emit("returninfo", this.input)
  

    }
    },
    mounted () {
      this.socket.emit('join', {room:this.$route.params.nameType})
        this.socket.on('my_response',(mdata) => {
           this.message.push(mdata.data)
         });
    }
}
</script>

<style>
    .card-header{
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    height: 50%;
    }
    .card-body {
    -ms-flex: 1 1 auto;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    height: 500%
}
.card-footer {
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.scrollable-element {
  scrollbar-width: thin;
}

::-webkit-scrollbar {
    width: 1px;
}
</style>