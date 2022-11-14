import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Amplify, Auth } from 'aws-amplify';
import '@mdi/font/css/materialdesignicons.css';

import router from './router';
import Layout from './App.vue';
import { EmojiPickerPlugin } from 'vue-emoji-picker'

Vue.config.productionTip = true;

Vue.use(VueAxios, axios);
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});
Vue.use(EmojiPickerPlugin)
Amplify.configure({
  Auth: {      
      region: 'us-east-1',
      userPoolId: 'us-east-1_1asC3Bt4L',
      userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
  }
});

console.log('AUTH', Auth.configure());

const main = new Vue({
  router,
  render: (h) => h(Layout),
}).$mount('#app');

export { main, router };