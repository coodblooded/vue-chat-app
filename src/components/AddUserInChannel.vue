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
          @change="AddNew($event)"
        ></v-select> 
            
        </v-card-text>
<v-list shaped>
      <v-list-item-group
        v-model="model"
        multiple>
        <template v-for="(item, i) in chn_frnds">
          <v-divider
            v-if="!item.first_name"
            :key="`divider-${i}`"
          ></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item.first_name"
            active-class="deep-purple--text text--accent-4"
          >
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.first_name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox
                  :input-value="true"
                  :true-value="item.first_name"
                  color="deep-purple accent-4"
                  @click="toggle1($event)"
                ></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>            

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
        selected: [],
        dialog: true,
        items: this.$store.state.dash.org_firends.map(item => item.name),
        select:null,
        chn_frnds:[...this.$store.state.dash.org_channels.filter((item) => item.chn_id == this.$route.params.id)][0].user_in_chn,
        model: 1,
      }
    },
    methods:{
        toggle1(e){
            
            e.stopPropagation()
            console.log("dcdscdsckdskc", e)
        },
        AddNew(e){
            console.log("dcdcds", e)

            this.chn_frnds.push({'first_name':e})
        }
    }
  }
</script>