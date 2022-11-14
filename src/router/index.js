import Vue from 'vue';
import Router from 'vue-router';

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
  /* {
    name: 'profile',
    path: '/profile',
    component: Vue.component('profile', () => import('@/views/Profile.vue')),
  }, */
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

function userIsAuthenticated() {
    return false;

}

router.beforeEach(async (to, from, next) => {
  
    const authenticated = await userIsAuthenticated();
  
    // Define what to do when user visits root
    if (to.path === '/') {
      if (authenticated) return next('/home');
      return next('/login');
    }

    return next();
});

export default router;