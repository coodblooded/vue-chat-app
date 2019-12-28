import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store ({
    state: {
        login_user:{
            login:false
        },
        login_url:"vmitr.com"
    },
    mutations: {
        AddUserInfo(state, info){
            state.login_user = info
        },
        AddUserUrl(state, url){
            state.login_url = url
        }      
    }
});

