import axios from 'axios';

export default {
    namespaced: true,
    state: {
        org_channels:[],
        org_firends:[]
    },
    mutations: {
        UpdateChannel(state, info){
            console.log("ddd",info)
            state.org_channels = [{ text: 'VmitrBot', 'chn_id':0 }].concat(info)
        },
        UpdateFirends(state, info){
            state.org_firends = [].concat(info)
        }
        

    },
    actions: {
        AddNewChannel({commit}, chl_info){
            return axios.post('http://' + window.location.hostname + ':8080/channel', chl_info)
            .then((result)  => {
                commit('UpdateChannel',result.data)
            })
            .catch(result => console.log(result))        
        },
        GetAllChannel({commit}, org_info){
            let add_url = org_info.user_id + '/' + org_info.org_id
            return axios.get('http://' + window.location.hostname + ':8080/channel/' + add_url)
                .then((result) => {
                    commit('UpdateChannel',result.data)
                })
                .catch(result => console.log(result))
        },
        DeleteChannel({commit}, chl_info){
            console.log("form statte", chl_info)
            return axios.post('http://' + window.location.hostname + ':8080/channel_dlt', JSON.stringify(chl_info))
            .then((result))
        },
        InviteUser({commit}, info){
            console.log("form statte", info)
            axios.post('http://' + window.location.hostname + ':8080/invite', JSON.stringify(info))
            .then((result))
        },
        GetAllFriends({commit}, org_info){
            let add_url = org_info.user_id + '/' + org_info.org_id
            return axios.get('http://' + window.location.hostname + ':8080/firends/' + add_url)
                .then((result) => {
                    commit('UpdateFirends',result.data)
                })
                .catch(result => console.log(result))            
        }
    }
}