import Vue from 'vue';
import Vuex from 'vuex';
import user from '../store/modules/user'
import dashboard from '../store/modules/dashboard'
Vue.use(Vuex);

export default new Vuex.Store ({
    modules: {
        'user': user,
        'dash': dashboard
    }
});

