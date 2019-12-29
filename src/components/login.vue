<template>
  <div style="margin: 10% 30%" class="card">
  <b-card no-body>
    <div style="margin: 5%">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter Password"
          type='password'
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
    data() {
      return {
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
