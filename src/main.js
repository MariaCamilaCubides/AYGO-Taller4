import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import VueCrontab from 'vue-crontab';
import { Amplify, Auth } from 'aws-amplify';
import { EmojiPickerPlugin } from 'vue-emoji-picker'

import '@mdi/font/css/materialdesignicons.css';

import router from './router';
import store from './store'
import Layout from './App.vue';

Vue.config.productionTip = true;

Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});
Vue.use(EmojiPickerPlugin);
Vue.use(VeeValidate);
Vue.use(VueCrontab);

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