import axios from 'axios';

export default {
    namespaced: true,
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
    },
    actions: {
        UserLogin({ commit}, user_info) {
            return axios.post('http://' + window.location.hostname + ':8080/login', user_info)
            .then((result)  => {
                commit('AddUserInfo', result.data)
            })
            .catch(result => console.log(result))
        },
        WorkSpace({commit}, user_wks){
            return axios.post('http://' + window.location.hostname + ':8080/workspace', user_wks)
            .then((result)  => {
                commit('AddUserUrl', result.data)
            })
            .catch(result => console.log(result))      
          },
        GetOrgDetail({commit}, details) {
            return axios.post('http://' + window.location.hostname + ':8080/get_details', details)
            .then((result)  => {
                commit('AddUserUrl', result.data)
            })
            .catch(result => console.log(result)) 
        }
        }
}