<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title @click="getDashboard()">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="margin-left:5%" >
                    <v-avatar color="blue" size="40" v-if="child.avt">
                        <span class="white--text" style="margin:0 10% 0 0">{{ child.avt }}</span>
                    </v-avatar>
                <router-link :to="{name: 'DashboardIndu',
                                    params: {
                                    nameType: child.text,
                                    id: '2455'
                                    }}" exact style="margin-right:10px;">
                               {{ child.text }}
                </router-link>
                
                </v-list-item-title>
                
              </v-list-item-content>
              <v-menu bottom left>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            dark
                            icon
                            v-on="on"
                          >
                            <v-icon style="color:gray;">mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list v-if="item.chnl">
                          <v-list-item 
                            v-for="(item, i) in items_action"
                            :key="i"
                            @click="item.mth({'chn_id':child.chn_id})"
                          >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list v-else>
                        <v-list-item 
                            v-for="(item, i) in frnd_actions"
                            :key="i"
                            @click="item.mth({'frn_id':child.id})"
                          >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>                        
                  </v-menu>        
                   </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon
              bottom
              color="pink"
              dark
              fab
              fixed
              @click="dialog = !dialog"              
            v-if="item.crt"
              >{{ item.icon }}</v-icon>
              <v-icon            
              v-else="item.crt"
              >{{ item.icon }}</v-icon>              
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-if="item.crt">
                {{ item.text }}
              </v-list-item-title>
              <v-list-item-title v-else="item.crt">
                {{ item.text }}
              </v-list-item-title>              
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Welcome {{login_user_info.org_name}}</span>
      </v-toolbar-title>

      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>

        <router-view @returninfo="rdata => text = rdata" :key="$route.fullPath"></router-view>

    </v-content>

    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      v-if="this.$router.currentRoute.name === 'Dashboard'"

      @click="showModal"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  <b-modal ref="modal-1" id="modal-1" centered title="Add New Team Member" cancel-disabled no-close-on-backdrop>
    <div class="d-block">
            <b-form-group>
        <b-form-input
          id="input-1"
          v-model="invalit_email"
          type="email"
          required
          placeholder="Enter email"
          class="field-style"
          
        ></b-form-input>
      </b-form-group>
    </div>
     <div slot="modal-footer">
            <b-btn variant="primary" @click="InviteFirnds()">Send Invite</b-btn>
       </div>
  </b-modal>

    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create Channel
        </v-card-title>
        
        <v-container>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-avatar
                  size="40px"
                  class="mx-3"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  v-model="chn"
                  placeholder="Name"
                  required="true"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="AddNewChannel()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Main from './main.vue'
import axios from 'axios'
import AddUserChannel from '../components/AddUserInChannel.vue'
  export default {

    props: {
      source: String,
    },
    components:{
      Main,
      AddUserChannel
    },
    beforeRouteEnter(to, form, next){
      next(vm => {
        var isValidUser = vm.$store.state.user.login_user.login
        if (isValidUser){
          return true
        }
        else {
          vm.$router.push(name='Login')
        }
          });
    },
    data() { 
      return {
      login_user_info: this.$store.state.user.login_user,
      input: "",
      dialog: false,
      drawer: null,
      invalit_email:'',
      items_action: [
        { title: 'Remove', mth: this.RemoveTest },
        { title: 'Update', mth:'Update' },
        { title: 'Add', mth: this.AddNewUsrs },
      ],
      frnd_actions:[
        { title: 'Remove', mth:this.RemoveTest },
        { title: 'Update', mth:'Update' },        
      ],
      chn: '',
      items: [
        { icon: 'mdi-contacts', text: 'Contacts',
        'icon-alt': 'mdi-chevron-down',
         model: false,
         crt:false,
        children: [
            { text: 'Abhijeet', avt:'AJ' },
            { text: 'Neelesh', avt:'NS' },
            { text: 'Roopali', avt:'RS' },
            { text: 'Anjali', avt:'AP' },
          ],
         },
        { icon: 'mdi-history', text: 'Frequently contacted', crt:false },
        { icon: 'mdi-plus', text: 'Create New Channel', crt:true },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Channels',
          model: false,
          chnl: true,
          crt:false,
          children: [
          ],
        },
        { icon: 'mdi-message', text: 'Send feedback',crt:false }
      ],
      }
    },
    created(){
          let user_id = this.$store.state.user.login_user.user_id
          let ord_id = this.$store.state.user.login_user.org_id
          if (this.$store.state.user.login_user.login) {
          this.$store.dispatch('dash/GetAllChannel',  {"user_id":user_id, "org_id":ord_id})
            .then(() => {
                this.items[3].children =  this.$store.state.dash.org_channels
            })
            .catch(() => console.log("eroro"))
          this.$store.dispatch('dash/GetAllFriends',  {"user_id":user_id, "org_id":ord_id})
            .then(() => {
                console.log("get firnds")
                this.items[0].children =  this.$store.state.dash.org_firends
            })
            .catch(() => console.log("eroro"))
            
          return true            
          }

    },
    methods: {
        selectinfo () {          
            this.$router.push({name:'DashboardIndu',
                              nameType:this.items.text,
                              id:'1234'})          
        },
        InviteFirnds(){
          console.log("Send Email to user")
          axios.post('http://' + window.location.hostname + ':8080/invite', JSON.stringify({"user_email":this.invalit_email,"organization_id":this.$store.state.user.login_user.org_id}))
            .then(() => {                
                this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
            })
            .catch(() => console.log("eroro"))  
            console.log("Send ss to user")        
        },
        AddNewChannel(){
          this.items[3].children.push({text:this.chn})
          this.dialog = false
          axios.post('http://' + this.$baseUrl + ':8080/channel', JSON.stringify({"name":this.chn, "organization_id":this.$store.state.user.login_user.org_id, "user_id":this.$store.state.user.login_user.user_id}))
          .then((result)  => {
            if (result.status === 200) {
              console.log(result.data)
            }
          })
          .catch(result => console.log(result))
          this.chn = ""

        },
        getDashboard(){
          if (this.$route.name !== 'Dashboard') this.$router.push({name:'Dashboard'})
           
        },
        showModal() {
          this.invalit_email = ''
          this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
        },
        hideModal() {
          this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },

        RemoveTest(obj){
            this.$store.dispatch('dash/DeleteChannel', obj)
              .then((result) => {
                if(result.status === 203){
                    let user_id = this.login_user_info.user_id
                    let ord_id = this.login_user_info.org_id
                    this.$store.dispatch('dash/GetAllChannel',  {"user_id":user_id, "org_id":ord_id})
                      .then(() => {
                          this.items[3].children =  this.$store.state.dash.org_channels
                      })
                      .catch(() => console.log("Get Error"))
                    }                    
              })
              .catch(() => console.log("Delete Error"))
        },
        AddNewUsrs(obj){
          let path = `/dashboard/channel/${obj.chn_id}` 
          if (this.$route.path !== path){
          this.$router.push({ name:'AddNewUserInChannel', params:{ id: obj.chn_id}})

          }
        }
    }
  }
</script>


<style scoped>
.field-style{
    outline: 0;
    border-width: 0 0 2px;
    border-color: blue;
}
</style>