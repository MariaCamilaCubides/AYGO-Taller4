import { Auth } from 'aws-amplify';

export default {
    async signUp(username, password, email, phone_number) {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          // optional
                    phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log('usuario', user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    } ,  

    async signIn(username, password) {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user);
        } catch (error) {
            console.log('error signing in', error);
        }
    },

    async signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}