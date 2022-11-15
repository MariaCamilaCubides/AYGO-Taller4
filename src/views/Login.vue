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
                  :label="'User'"
                >
                  <b-input
                    id="user"
                    v-model="user"
                    v-validate="'required'"
                    name="user"
                    :placeholder="'Your username'"
                    autocomplete="username"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <span
                  v-show="errors.has('user')"
                  class="help is-danger"
                >User name is required</span>
                <b-field>
                  <template #label>
                    Password
                  </template>
                  <b-input
                    id="password"
                    v-model="password"
                    v-validate="'required'"
                    name="password"
                    type="password"
                    :password-reveal="password != ''"
                    placeholder="Your password"
                    autocomplete="current-password"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <span
                  v-show="errors.has('password')"
                  class="help is-danger"
                >Password is required</span>
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
      </div>
    </div>
  </template>
  
  <script>
  import card from '@/components/cross/Card.vue';
  import cognitoAuthentication from '@/helpers/cognitoAuthentications';
  import toastMessage from '@/helpers/toastMessage';

  export default {
    name: 'LoginComponent',
    metaInfo: {
      title: 'Sign in',
    },
    components: {
      card,
    },
    mixins: [],
    data() {
      return {
        user: '',
        password: '',
        isLoading: false,
        error: undefined,
        cognitoAuthentication,
      };
    },
    methods: {
      updateValuesFromHtml() {
        const userInput = document.getElementById('user');
        const passwordInput = document.getElementById('password');
        this.user = userInput ? userInput.value : this.user;
        this.password = passwordInput ? passwordInput.value : this.password;
      },
      async validateBeforeSubmit() {
        this.updateValuesFromHtml();
        const result = await this.$validator.validateAll();
        if (result) {
          this.login();  
        }  
      },
      async login() {
        this.isLoading = true;
        this.error = null;
        const login = await this.cognitoAuthentication.signIn(this.user, this.password)
        this.isLoading = false;
        if (!login.result) {
          toastMessage.showError(login.error);
          return;
        }
        this.$router.push('home');
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