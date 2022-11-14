import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
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

const main = new Vue({
  router,
  render: (h) => h(Layout),
}).$mount('#app');

export { main, router };