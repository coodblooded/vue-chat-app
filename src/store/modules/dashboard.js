import axios from 'axios';

export default {
    namespaced: true,
    state: {
        org_channels:[{ text: 'VmitrBot' }],
        ord_firends:[]
    },
    mutations: {
        UpdateChannel(state, info){
            console.log("indp",info)
            state.org_channels = [].concat(info)
        },
        

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
            then((result))
        },
    }
}