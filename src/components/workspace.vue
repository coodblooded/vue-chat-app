<template>
  <div style="margin: 10% 30%" class="card card-style">
  <b-card no-body>
      <center>
        <div class="workspacde-heading">
        <h2>Sign in to your workspace</h2>
        </div>
      </center>
    <div style="margin: 5%">


    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div class="row workspace-fields" >
      <div>
      <b-form-group id="input-group-0" label="" label-for="input-0">
        <b-form-input
          id="input-0"
          v-model="form.domain"
          required
          placeholder="Enter your workspace URL"
        class="rta"></b-form-input>
      </b-form-group>  
      </div>      
      <div class="workspace-url">
      <b-form-group id="input-group-0" label="" label-for="input-0">
          <span>.vmitr.com</span>
        <!-- <b-form-input
          id="input-0"
          readonly=""
          placeholder="vmitr.com"
        ></b-form-input> -->
      </b-form-group>  
      </div> 
      </div>          

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
    name: 'WorkSpace',
    data() {
      return {
        form: {
          domain: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post('http://' + this.$baseUrl + ':8080/workspace', JSON.stringify(this.form))
          .then((result)  => {
            if (result.status === 200) {
              this.$store.commit('AddUserUrl', result.data)
              document.location.href = 'http://' +  result.data.login_url
            }

          })
          .catch(result => console.log(result))      
        },
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

.workspacde-heading {
    margin-top: 5%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
.workspace-fields{
    margin:  5% 10%;

}
.workspace-url{
    font-size: 1.2em;
    margin-left:10px;
   padding: 3% 0;
   font-weight: bolder;
}
.rta{
    direction: rtl;
    outline: 0;
    border-width: 0 0 2px;
    border-color: blue;
}
.rta:focus{
     border-color: green
}
/* .card-style{
        outline: 0;
    border-width: 0 0 2px;
    border-color: blue;
    
} */
</style>