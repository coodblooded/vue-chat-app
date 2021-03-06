/* eslint-disable eol-last */
/*eslint indent: [2, 4, {"SwitchCase": 1}]*/

import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/home.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import dashboard from '../dashborad/dashboard.vue'
import Main from '../dashborad/main.vue'
import WorkSpace from '../components/workspace.vue'
import Confirm from '../components/confirm.vue'
import AddUserChannel from '../components/AddUserInChannel.vue'
Vue.use(Router)

export default new Router ({
    'mode':'history',
    routes:[
        {
            path: '/',
            name: 'Home',
            component: home
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
          path: '/workspace',
          name: 'Work',
          component: WorkSpace
        },        
        {
          path: '/register',
          name: 'Register',
          component: register
        },     
        {
          path: '/confirm/:org_id/:user_id',
          name: 'Confirm',
          component: Confirm
        },             
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: dashboard,
          children: [
            {
              path: '/dashboard/channel/adduser/:id',
              name: 'AddNewUserInChannel',
              component: AddUserChannel
   
            } ,            
            {
              path: '/dashboard/:nameType/:id',
              name: 'DashboardIndu',
              component: Main
   
            }           
          ],          
        }                         
    ]
});