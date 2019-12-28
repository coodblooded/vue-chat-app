<template>
  <div style="margin: 10% 30%" class="card">
  <b-card no-body>
    <div style="margin: 4%">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div class="row" style="margin-left:2px">
      <div>
      <b-form-group id="input-group-0" label="" label-for="input-0">
        <b-form-input
          id="input-0"
          v-model="form.domain"
          required
          placeholder="Enter Your Domain"
        ></b-form-input>
      </b-form-group>  
      </div>      
      <div>
      <b-form-group id="input-group-0" label="" label-for="input-0">
        <b-form-input
          id="input-0"
          readonly=""
          placeholder="vmitr.com"
        ></b-form-input>
      </b-form-group>  
      </div> 
      </div>       
      <b-form-group id="input-group-1" label="" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.first_name"
          required
          placeholder="Enter First Name"
        ></b-form-input>
      </b-form-group>    
      <b-form-group id="input-group-1" label="" label-for="input-11">
        <b-form-input
          id="input-11"
          v-model="form.last_name"
          required
          placeholder="Enter Last Name"
        ></b-form-input>
      </b-form-group>             
      <b-form-group
        id="input-group-2"
        label=""
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Enter Password"
          type='password'
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.confirm_pass"
          required
          placeholder="Confirm Password"
          type='password'
          :state="validation" 
        ></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Your Password should be match.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>        
      </b-form-group>
      <center>
        <b-button type="submit" variant="primary" style="margin-right:10px">Submit</b-button>
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
    name: 'Register',
    data() {
      return {
        form: {
            email: '',
            password: '',
            confirm_pass: '',
            last_name: '',
            first_name: '',
            domain:''
        },
        show: true
      }
    },
    computed: {
      validation() {
        if (this.form.confirm_pass.length > 0)
        {
        return this.form.password === this.form.confirm_pass

        }
      },
    },
    methods: {

      onSubmit(evt) {
        evt.preventDefault()
        axios.post(this.$baseUrl + '/register', JSON.stringify(this.form))
          .then((result)  => {

            if (result.status === 200) {
              this.$router.push('/login')
            }

          })
          .catch(result => console.log(result))
        // alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        this.form.confirm_pass = ''
        this.form.domain = ''
        // Trick to reset/clear native browser form validation state
      }
    }
  };
</script>
