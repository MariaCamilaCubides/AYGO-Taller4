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
                slot="header"
                class="modal-card-body"
              >
                <p
                  style="margin-top: 12px;"
                  class="title"
                >
                  Create your MCCM account
                </p>
                <div class="columns mb-0">
                  <b-field
                    label="First name"
                    class="column mb-0 field-column"
                  >
                    <b-input
                      id="firstName"
                      v-model="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Your first name"
                      focus
                      @focus="updateValuesFromHtml"
                    />
                  </b-field>
                  <b-field
                    label="Last name"
                    class="column mb-0 field-column"
                  >
                    <b-input
                      id="lastName"
                      v-model="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Your last name"
                      @focus="updateValuesFromHtml"
                    />
                  </b-field>
                </div>
                <b-field
                  label="Email"
                >
                  <b-input
                    id="email"
                    v-model="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
                <b-field
                  label="Password"
                >
                  <b-input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    :password-reveal="password != ''"
                    placeholder="Create a password"
                    autocomplete="new-password"
                    @focus="updateValuesFromHtml"
                  />
                </b-field>
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
                  Create account
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
  import card from '@/components/cross/Card.vue';
  import cognitoAuthentication from '@/helpers/cognitoAuthentications';
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
        password: '',
        isLoading: false,
        error: undefined,
        cognitoAuthentication,
      };
    },
    methods: {
      updateValuesFromHtml() {
        // The @input and @change events are not called on some iOS browsers when tools like 1Password
        // fill out the login form, so the html has the right value but the v-model is empty
        // here we fill the v-model with the html value
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        this.firstName = firstNameInput ? this.capitalizeFirstLeter(firstNameInput.value) : '';
        this.lastName = lastNameInput ? this.capitalizeFirstLeter(lastNameInput.value) : '';
        this.email = emailInput ? emailInput.value : this.email;
        this.password = passwordInput ? passwordInput.value : this.password;
      },
      async validateBeforeSubmit() {
        this.updateValuesFromHtml();
        this.register(this.firstName, this.lastName, this.email.toLowerCase(),
          this.password);
        console.log('Validar los datos')
      },
      register(name, lastName, email, password) {
        this.isLoading = true;
        // Automatically log the user in after successful signup.
        console.log('Registrar', name, lastName, email, password)
        this.cognitoAuthentication.signUp(name, password, email, '311292');
        this.$router.push('/home');
      },
      capitalizeFirstLeter(text) {
        const splitedText = text.split(' ');
        let finalText = '';
        splitedText.forEach((currentText) => {
          finalText += `${currentText.charAt(0).toUpperCase()}${currentText.slice(1)} `;
        });
        return finalText.trim();
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