<template>
    <div v-if="navbarVisible">
      <b-sidebar
        :open.sync="sidebarOpen"
        fullheight
        type="is-light"
      >
        <img
            width="150px"
            src="@/assets/logo.png"
            alt="MCCM logo"
          >
        <b-menu
          :accordion="false"
          :activable="false"
        >
          <div
            class="sidebar-menu-section"
            style="margin-top:30px"
          >
            <b-menu-list label="Workspace">
              <b-menu-item
                label="Home"
                icon="home"
                :to="{ name: 'home'}"
                tag="router-link"
                :active="'home' === currentRouteName"
              />
              <b-menu-item
                label="My account"
                icon="account"
                :to="{ path: `/${user.userName}/about`}"
                tag="router-link"
                :active="'editProfile' === currentRouteName"
              />
            </b-menu-list>
          </div>
        </b-menu>
      </b-sidebar>
      <b-navbar
        :style="navbarsStyle"
        :fixed-top="true"
        :mobile-burger="false"
      >
        <template #end>
          <b-navbar-dropdown
            :right="true"
            :arrowless="true"
          >
            <template #label>
              <span
                :class="{'is-navbar-active': currentRouteName === 'user'}"
              >
                <UserImage
                  :email="user.email"
                  :size="30"
                  :is-in-navbar="true"
                  :in-navbar-active="currentRouteName === 'user'"
                  :lazy="false"
                />
              </span>
            </template>
            <b-navbar-item
              :to="{ path: `/${user.userName}/about`}"
              tag="router-link"
              :active="currentRouteName === 'user'"
            >
              My profile
            </b-navbar-item>
            <hr class="navbar-divider">
            <b-navbar-item
              @click="logoutApp()"
            >
              Sign out
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>
  </template>
  
  <script>
  import UserImage from '@/components/cross/UserImage.vue';
  export default {
    name: 'NavBar',
    components: {
      UserImage,
    },
    data() {
      return {
        user: {
            userName: '',
            name: '',
            email: '',
        },
        sidebarOpen: true,
        mainLayoutWidth: 0,
      };
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      },
      navbarVisible() {
        console.log(this.currentRouteName)
        return this.currentRouteName && this.currentRouteName !== 'login' && this.currentRouteName !== 'register';
      },
      navbarsStyle() {
        return {
          padding: '0px 0px 0px 25%',
          marginLeft: '0',
        };
      },
    },
    watch: {
      sidebarOpen() {
        this.emitStyleForMainLayout();
      },
      $route(to, from) {
        if (from.path === '/') return;
      },
    },
    mounted() {
      // this.emitStyleForMainLayout();
    },
    methods: {
      emitStyleForMainLayout() {
        this.$nextTick(() => {
          let left = 0;
          let top = 53;
          const mainLayoutWidth = this.$screen.width - left;
          const mainLayoutHeight = this.$screen.height - top;
          this.setMainLayoutStyle({
            position: 'absolute',
            left: `${left}px`,
            top: `${top}px`,
            right: '0',
            padding: '10px 2% 2% 2%',
            // We store the MainLayout Size too, so if need to monitor changes in mainlayout size
            // in any place of app we simple monitor the mainLayoutStyle vuex value
            mainLayoutWidth,
            mainLayoutHeight,
          });
          this.mainLayoutWidth = mainLayoutWidth;
        });
      },
      logoutApp() {
        this.logout().then(() => this.$router.go('/login'));
      },
    },
  };
  </script>
  
  <style>
  .dropdown-item-router {
    padding: 0px !important;
    height: 50px;
  }
  .dropdownAction {
    color: black;
    cursor: pointer;
    padding: 15px 10px;
  }
  .navbar-margin-to-icons{
    position:relative; margin-right:2px;
  }
  .navbar-item.is-active {
      color: #632d8e !important;
  }
  .is-navbar-active {
      color: #632d8e !important;
  }
  .dropdown-scrollbar .dropdown-content::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.1);
    box-shadow: inset 0 0 3px rgba(0,0,0,0.1);
    background-color: #F5F5F5;
  }
  .dropdown-scrollbar .dropdown-content::-webkit-scrollbar
  {
    width: 12px;
  }
  .dropdown-scrollbar .dropdown-content::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #c1c1c1;
  }
  #secondNavbar{
    top:52px;
    z-index:29
  }
  #secondNavbar div {
    flex-shrink: 1;
  }
  #sidebar-close-container{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }
  #close-sidebar{
    padding: 0;
  }

  .sidebar-menu-section{
    padding-left:10px
  }
  .sidebarParentMenuItem >  a {
    color:#4a4a4a!important;
    background:none!important;
  }
  </style>