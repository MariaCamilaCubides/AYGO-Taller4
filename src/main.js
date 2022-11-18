import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import { Amplify, Auth } from 'aws-amplify';
import { EmojiPickerPlugin } from 'vue-emoji-picker'

import '@mdi/font/css/materialdesignicons.css';

import router from './router';
import store from './store'
import Layout from './App.vue';

Vue.config.productionTip = true;

Vue.use(VueAxios, axios);
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});
Vue.use(EmojiPickerPlugin);
Vue.use(VeeValidate);

Amplify.configure({
  Auth: {      
      region: process.env.VUE_APP_REGION,
      userPoolId: process.env.VUE_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.VUE_APP_USER_POOL_WEB_CLIENT_ID,
  }
});
Auth.configure();

const main = new Vue({
  router,
  store,
  render: (h) => h(Layout),
}).$mount('#app');

export { main, router };