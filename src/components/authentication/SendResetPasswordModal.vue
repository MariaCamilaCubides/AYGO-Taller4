<template>
    <form
      action=""
      @submit.prevent="validateBeforeSubmit"
    >
      <div class="card modal-material-card modal-card-small">
        <div class="modal-card-header">
          <p>Reset your password</p>
        </div>
        <section class="modal-card-body">
          <p>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <br>
          <b-notification
            :active="error != undefined"
            :closable="false"
            class="errorBanner"
            type="is-danger"
          >
            {{ error != undefined ? error.message : '' }}
          </b-notification>
          <br v-show="error != undefined">
          <b-field
            :type="'is-danger'"
            label="Email"
          >
            <b-input
              v-model="recoverEmail"
              v-validate="'required'"
              name="email"
              type="email"
              placeholder="Your email"
            />
          </b-field>
        </section>
        <footer class="card-footer has-text-centered modal-card-footer">
          <a
            class="button force-right"
            type="button"
            @click="$parent.close()"
          >Return to sign in</a>
          <button
            :class="{'is-loading': isLoading }"
            type="submit"
            style="margin-left:6px"
            class="button is-primary"
          >
            Continue
          </button>
        </footer>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    name: 'SendResetPasswordModal',
    props: {
      currentEmail: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isLoading: false,
        recoverEmail: undefined,
        error: undefined,
      };
    },
    created() {
      this.recoverEmail = this.currentEmail || '';
    },
    methods: {
      validateBeforeSubmit() {
            console.log('REVISAR TODO');
            this.sendResetPassword(this.recoverEmail);
      },
      sendResetPassword(email) {
        this.error = undefined;
        this.isLoading = true;
        console.log('enviar email', email);
      },
    },
  };
  </script>
  
  <style scoped>
  .errorBanner {
    margin:0px;
    padding:8px;
  }
  </style>