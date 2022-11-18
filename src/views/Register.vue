<template>
    <div class="bgImage centerAll">
      <div>
        <a
          class="material-card-content centerAll"
        >
          <img
            width="150px"
            src="@/assets/logo.png"
            alt="Boardgent logo"
          >
        </a>
        <card external-card="card container material-card card-form-container">
          <form
            slot="Pre-header"
            action=""
            @submit.prevent="validateBeforeSubmit"
          >
            <card
              class="material-card-content"
              url-help=""
            >
              <section
                v-if="validateEmail"
                slot="header"
                class="modal-card-body"
              >
                <p
                  style="margin-top: 12px;"
                  class="title"
                >
                  Verify your MCCM account
                </p>
                <div v-if="validateEmail">
                  <b-field
                    label="Authentication code"
                  >
                    <b-input
                      v-model="validationCode"
                      v-validate="'required'"
                      name="validationCode"
                      placeholder="6-Digit code"
                      autocomplete="off"
                      type="text"
                      inputmode="numeric"
                      pattern="[0-9]*"
                    />
                  </b-field>
                  <span
                    v-show="errors.has('validationCode')"
                    class="help is-danger"
                  >The code is required</span>
                  <div style="display: flex;justify-content: center;">
                    <b-icon
                      style="margin-top:4px;"
                      icon="email"
                    />
                    <p>
                      A verification code for your account has been sent to your email.
                    </p>
                  </div>
                </div>
              </section>
              <section
                v-else
                slot="header"
                class="modal-card-body"
              >
                <p
                  style="margin-top: 12px;"
                  class="title"
                >
                  Create your MCCM account
                </p>
                <b-field
                  label="User name"
                >
                  <b-input
                    id="user"
                    v-model="user"
                    v-validate="'required'"
                    name="user"
                    type="text"
                    placeholder="Your user"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <span
                  v-show="errors.has('user')"
                  class="help is-danger"
                >User name is required</span>
                <b-field
                  label="Email"
                >
                  <b-input
                    id="email"
                    v-model="email"
                    v-validate="'required'"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <span
                  v-show="errors.has('email')"
                  class="help is-danger"
                >Email is required</span>
                <b-field
                  label="Password"
                >
                  <b-input
                    id="password"
                    v-model="password"
                    v-validate="'required'"
                    name="password"
                    type="password"
                    :password-reveal="password != ''"
                    placeholder="Create a password"
                    autocomplete="new-password"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <span
                  v-show="errors.has('password')"
                  class="help is-danger"
                >Password is required</span>
              </section>
              <hr class="footerLine">
              <div
                slot="footer"
                class="modal-card-body"
              >
                <button
                  :class="{'is-loading': isLoading }"
                  class="button is-primary main-card-form-button"
                >
                  {{ validateEmail ? 'Verify account':'Create account' }}
                </button>
              </div>
            </card>
          </form>
        </card>
        <div>
          <b-button
            expanded
            to="/login"
            class="button"
            tag="router-link"
            type="is-light"
          >
            Have an account? Sign in
          </b-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  import card from '@/components/cross/Card.vue';
  import cognitoAuthentication from '@/helpers/cognitoAuthentications';
  import toastMessage from '@/helpers/toastMessage';
  import users from '@/services/users';

  export default {
    name: 'RegisterComponent',
    metaInfo: {
      title: 'Register',
    },
    components: {
      card,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        user: '',
        password: '',
        isLoading: false,
        error: undefined,
        cognitoAuthentication,
        validateEmail: false,
        validationCode: '',
        users,
      };
    },
    methods: {
      ...mapMutations(['authUser']),
      updateValuesFromHtml() {
        const emailInput = document.getElementById('email');
        const userInput = document.getElementById('user');
        const passwordInput = document.getElementById('password');
        this.email = emailInput ? emailInput.value : this.email;
        this.user = userInput ? userInput.value : this.user;
        this.password = passwordInput ? passwordInput.value : this.password;
      },
      async validateBeforeSubmit() {
        this.updateValuesFromHtml();
        if (this.validateEmail) {
          if (!this.validationCode || this.validationCode.length !== 6) {
            this.errors.add({
              field: 'validationCode',
              msg: 'The code is required',
            });
            return;
          }
          this.signIn();
        } else {
          const result = await this.$validator.validateAll();
          if (result) {
            this.register();
          }
        }
      },
      async register() {
        this.isLoading = true;
        const register = await this.cognitoAuthentication.signUp(
          this.user,
          this.password,
          this.email
        );
        this.isLoading = false;
        if (!register.result) {
          toastMessage.showError(register.error);
          return;
        }
        this.validateEmail = true;
      },
      async signIn() {
        await this.cognitoAuthentication.confirmSignUp(this.user, this.validationCode)
        const signInResult = await this.cognitoAuthentication.signIn(this.user, this.password)
        console.log(signInResult)
        if (!signInResult.result) {
          toastMessage.showError('An error occurred with the automatic login');
          return;
        }
        const { user } = signInResult;
        this.authUser(user);
        const userSession = user.getSignInUserSession();
        const idToken = userSession.getIdToken();
        const token = idToken.getJwtToken();
        const payload = idToken.decodePayload();
        const x = {
          userName: payload['cognito:username'],
          email: payload.email,
          authToken: token,
        }
        this.users.createUser(x)
        toastMessage.showSuccess('Your account has been successfully created.')
        this.$router.push(`${this.user}/about`);
      },
    },
  };
  </script>
  
  <style scoped>
  .loginAndRegisterContainer{
    width:525px;
    padding-bottom: 1rem;
  }
  .loginAndRegisterContainerPhone{
    width:95%;
    padding-bottom: 1rem;
  }
  .card-form-container {
    max-width: 750px;
  }
  </style>
  
  <style>
    .field-column .field {
      display: flex;
      flex-direction: column;
    }
  </style>