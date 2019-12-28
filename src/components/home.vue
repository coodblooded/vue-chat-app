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
            <div class="text-center">
                <router-link to='/register'>
                
                <v-btn x-large  rounded color="primary" dark >Sing UP</v-btn>
                </router-link>
                
            </div>
            <div class="text-center" style="margin:0 0 0 5%">
                    <router-link to='/workspace'>
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
export default {
    name: 'Home'
};
</script>

<style scoped>
.fnt-head {
    margin: 5% 25%;
}
.btn-style{
    margin: 0% 40%;
}
</style>