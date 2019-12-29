import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import store from './store';
import axios from 'axios';
import { EmojiPickerPlugin } from 'vue-emoji-picker';
Vue.use(EmojiPickerPlugin)
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$baseUrl =  window.location.hostname ;
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
