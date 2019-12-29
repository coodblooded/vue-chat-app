import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store ({
    state: {
        login_user:{
            login:false
        },
        login_org_info:{
            login_url:"vmitr.com",
            name: 'Vmitr'
        }

    },
    mutations: {
        AddUserInfo(state, info){
            state.login_user = info
        },
        AddUserUrl(state, url){
            state.login_org_info= url
        }      
    }
});

