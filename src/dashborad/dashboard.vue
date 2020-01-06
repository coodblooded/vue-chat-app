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
                    <v-avatar color="blue" size="48" v-if="child.avt">
                        <span class="white--text headline" style="margin:0 10% 0 0">{{ child.avt }}</span>
                    </v-avatar>
                <router-link :to="{name: 'DashboardIndu',
                                    params: {
                                    nameType: child.text,
                                    id: '2455'
                                    }}" exact>
                               {{ child.text }}
                </router-link>
                 
                </v-list-item-title>
              </v-list-item-content>
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
        <span class="hidden-sm-and-down">Welcome Vmitr</span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      /> -->
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

        <!-- <Main 
        :info="text"
        @returninfo="rdata => text = rdata"
        /> -->
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

  <b-modal id="modal-1" centered title="Add New Team Member" cancel-disabled>
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
  </b-modal>

      <!-- <b-modal id="modal-center" centered title="Add New Team Member">
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
  </b-modal> -->
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

  export default {

    props: {
      source: String,
    },
    components:{
      Main
    },
    beforeRouteEnter(to, form, next){
      next(vm => {
        var isValidUser = vm.$store.state.login_user.login
        if (isValidUser){
          return true
        }
        else {
          vm.$router.push(name='Login')
        }
          });
    },
    data: () => ({
        input: "",
      dialog: false,
      drawer: null,
      invalit_email:'',
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
          crt:false,
          children: [
            { text: 'VmitrBot' }
          ],
        },
        { icon: 'mdi-message', text: 'Send feedback',crt:false }
      ],
    }),
    methods: {
        selectinfo () {
            this.$router.push({name:'DashboardIndu',
                              nameType:this.items.text,
                              id:'1234'})
          
        },
        AddNewChannel(){
          this.items[3].children.push({text:this.chn})
          this.dialog = false
          axios.post('http://' + this.$baseUrl + ':8080/channel', JSON.stringify({"name":this.chn, "organization_id":this.$store.state.login_user.org_id}))
          .then((result)  => {
            if (result.status === 200) {
              console.log(result.data)
              // this.$store.commit('AddUserInfo', result.data)
              // this.$router.push({name:'Dashboard'})
            }

          })
          .catch(result => console.log(result))
          this.chn = ""

        },
        getDashboard(){
           this.$router.push({name:'Dashboard'})
        },
        showModal() {
          this.invalit_email = ''
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
        hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
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