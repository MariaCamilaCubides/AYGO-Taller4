<template>
    <div class="bgImage centerAll">
      <div>
        <a
          class="material-card-content centerAll"
        >
          <img
            width="150px"
            src="@/assets/logo.png"
            alt="MCCM logo"
          >
        </a>
        <card
          external-card="card container material-card card-form-container"
          internal-card="material-card-content"
          url-help=""
        >
          <section
            slot="header"
            class="modal-card-body"
          >
            <p
              style="margin-top: 12px;"
              class="title"
            >
              <span>Sign in to your account</span>
            </p>
            <form @submit.prevent="validateBeforeSubmit">
              <b-notification
                :active="error != undefined"
                :closable="false"
                class="errorBanner"
                type="is-danger"
              >
                {{ error != undefined ? error : '' }}
              </b-notification>
              <div>
                <b-field
                  :label="'Email'"
                >
                  <b-input
                    id="email"
                    v-model="email"
                    name="email"
                    :type="'email'"
                    :placeholder="'Your email'"
                    autocomplete="username"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <b-field>
                  <template #label>
                    Password
                    <a
                      style="font-size: 14px;display:block;float:right;"
                      @click="resetPasswordOpen = true"
                    >Forgot your password?</a>
                  </template>
                  <b-input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    :password-reveal="password != ''"
                    placeholder="Your password"
                    autocomplete="current-password"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
              </div>
              <button
                type="submit"
                style="display: none;"
              >
                HIDDEN FOR LOGIN WITH ENTER
              </button>
            </form>
          </section>
          <div
            slot="footer"
            class="modal-card-body"
          >
            <button
              :class="{'is-loading': isLoading }"
              type="submit"
              class="button is-primary main-card-form-button"
              @click="validateBeforeSubmit"
            >
              Sign in
            </button>
          </div>
        </card>
        <div>
          <b-button
            expanded
            to="/register"
            class="button"
            tag="router-link"
            type="is-light"
          >
            Don't have an account? Sign up
          </b-button>
        </div>
        <b-modal :active.sync="resetPasswordOpen">
          <reset-password :current-email="email" />
        </b-modal>
      </div>
    </div>
  </template>
  
  <script>
  import resetPasswordModal from '@/components/authentication/SendResetPasswordModal.vue';
  import card from '@/components/cross/Card.vue';
  export default {
    name: 'LoginComponent',
    metaInfo: {
      title: 'Sign in',
    },
    components: {
      'reset-password': resetPasswordModal,
      card,
    },
    mixins: [],
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        error: undefined,
        resetPasswordOpen: false,
      };
    },
    methods: {
      updateValuesFromHtml() {
        // The @input and @change events are not called on some iOS browsers when tools like 1Password
        // fill out the login form, so the html has the right value but the v-model is empty
        // here we fill the v-model with the html value
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        this.email = emailInput ? emailInput.value : this.email;
        this.password = passwordInput ? passwordInput.value : this.password;
      },
      validateBeforeSubmit() {
        this.updateValuesFromHtml();
          if (!this.email || !this.password) {
            console.log('error')
            return;
          }
          this.login();    
      },
      showError(error) {
        this.isLoading = false;
        this.error = error;
      },
      async login() {
        this.isLoading = true;
        this.error = null;
        console.log('login')
      },
    },
  };
  </script>
  
  <style>
  .loginAndRegisterContainer{
    width:525px;
    padding-bottom: 1rem;
  }
  .loginAndRegisterContainerPhone{
    width:95%;
    padding-bottom: 1rem;
  }
  </style>
  
  <style scoped>
  .card-form-container {
    max-width: 750px;
  }
  </style>