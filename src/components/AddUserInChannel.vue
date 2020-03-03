<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-text>
        <v-select
          v-model="select"
          :items="items"
          label="Select"
          required
        ></v-select> 
        <v-list>
   <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>                   
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    beforeRouteEnter(to, form, next){
      next(vm => {
        var isValidUser = vm.$store.state.user.login_user.login
        if (isValidUser){
          return true
        }
        else {
          vm.$router.push('/login')
        }
          });
    },      
    data () {
      return {
        dialog: true,
        items: [...this.$store.state.dash.org_firends.filter((item) => item.name)],
        select:null,
        chn_frnds:[
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
        }
        ],
        model: 1,
      }
    },
  }
</script>