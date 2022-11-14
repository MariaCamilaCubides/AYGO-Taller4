import { Auth } from 'aws-amplify';

export default {
    async signUp(username, password, email) {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          
                },
                autoSignIn: {
                    enabled: true,
                }
            });
            return { result: true, user };
        } catch (error) {
            return { result: false, error: error.message };
        }
    },

    async resendConfirmationCode(username) {
        try {
            await Auth.resendSignUp(username);
            return { result: true };
        } catch (error) {
            return { result: false, error: error.message };
        }
    },

    async confirmSignUp(username, code) {
        try {
          await Auth.confirmSignUp(username, code);
          return { result: true };
        } catch (error) {
            return { result: false, error: error.message };
        }
    },

    async signIn(username, password) {
        try {
            const user = await Auth.signIn(username, password);
            return { result: true, user };
        } catch (error) {
            return { result: false, error: error.message };
        }
    },

    async signOut() {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            return { result: false, error: error.toString() };
        }
    },
}