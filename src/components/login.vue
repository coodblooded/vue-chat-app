<template>
  <div style="margin: 10% 30%" class="card">
  <b-card no-body>
      <center>
        <div class="workspacde-heading">
        <h2>{{org_name}}</h2>
        </div>
      </center>    
    <div style="margin: 5%">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          class="field-style"
          
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter Password"
          type='password'
          class="field-style"

        ></b-form-input>
      </b-form-group>

      <center>
        <b-button type="submit" variant="primary" style="margin-right:10px;">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </center>

    </b-form>
    </div>
  </b-card>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Login',
    beforeRouteEnter(to, form, next){
      next(vm => {

        if (window.location.hostname === 'vmitr.com'){
          vm.$router.push('/workspace')
        }
        else {
          return true
        }
          });
    },    
    data() {
      return {
        org_name:this.$store.state.login_org_info.name,
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        evt.preventDefault()
        axios.post('http://' + this.$baseUrl + ':8080/login', JSON.stringify(this.form))
          .then((result)  => {
            if (result.status === 200) {
              this.$store.commit('AddUserInfo', result.data)
              this.$router.push({name:'Dashboard'})
            }

          })
          .catch(result => console.log(result))      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
      }

    }
  };
</script>

<style scoped>
.field-style{
    outline: 0;
    border-width: 0 0 2px;
    border-color: blue;
}
.workspacde-heading {
    margin-top: 5%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
</style>
