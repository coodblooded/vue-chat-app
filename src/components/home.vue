<template>
<!-- App.vue -->

<v-app>
  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <v-content>

  <div>
    <div >
    <h1 class="fnt-head">
      Start bringing your team together
    </h1>
    </div>
        <div class="row text-center btn-style" >
            <div class="text-center" >
                <router-link  v-if="urlchk" to='/register'>
                
                <v-btn x-large  rounded color="primary" dark >Sing UP</v-btn>
                </router-link>
                
            </div>
            <div class="text-center" style="margin:0 0 0 5%">
                    <router-link v-if="urlchk" to='/workspace'>
                    <v-btn x-large  rounded color="primary" dark>Login</v-btn>
                    </router-link>     
                    <router-link v-if="urlchk === false" to='/login'>
                    <v-btn x-large  rounded color="primary" dark>Login</v-btn>
                    </router-link>                      
            </div>
        </div>
  </div>

<router-view
></router-view>

</v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
import axios from 'axios'
import { join } from 'path'

export default {
    name: 'Home',
    data () {
      return {
        urlchk: this.$baseUrl === 'vmitr.com',
        org_details: {},
      }
    },
    computed:{
      GetOrgDetails(){
          this.$store.dispatch('user/GetOrgDetail', JSON.stringify({'url':this.$baseUrl}))
            .then(() => {
              this.org_details = this.$store.state.user.login_org_info
            })
            .catch(result => console.log(result)) 
          // axios.post('http://' + this.$baseUrl + ':8080/get_details', JSON.stringify({'url':this.$baseUrl}))
          // .then((result)  => {
          //   if (result.status === 200) {
          //     this.$store.commit('user/AddUserUrl', result.data)
          //     this.org_details = result.data
          //     return true
          //   }

          // })
          // .catch(result => console.log(result)) 
          },
          
      }
    }
</script>

<style scoped>
.fnt-head {
    margin: 5% 25%;
}
.btn-style{
    margin: 0% 40%;
}
</style>