import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/login',
    component: Vue.component('loginComponent', () => import('@/views/Login.vue')),
  },
  {
    path: '/register',
    component: Vue.component('registerComponent', () => import('@/views/Register.vue')),
  },
  {
    name: 'home',
    path: '/home',
    component: Vue.component('homeComponent', () => import('@/views/Home.vue')),
  },
  {
    name: 'editProfile',
    path: '/:profile/about',
    component: Vue.component('editProfileComponent', () => import('@/views/EditProfile.vue')),
  },
];

Vue.use(Router);
const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (from.params.tab || from.params.page || from.params.actionTab || from.params.tabPage) {
      return {};
    }
    return { x: 0, y: 0 };
  },
  routes,
});

async function userIsAuthenticated() {
  try {
    if (store.state && store.state.authData && store.state.authData.token) return true;
  } catch {
    //
  }
  return false;
}

router.beforeEach(async (to, from, next) => {
  
    const authenticated = await userIsAuthenticated();

    if (!authenticated && to.path !== '/login') {
      return next('/login');
    }
  
    // Define what to do when user visits root
    if (to.path === '/') {
      return next('/home');
    }

    return next();
});

export default router;