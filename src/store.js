import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authData: {
            userName: '',
            email: '',
            token: '',
        },
        connectedUsers: 0,
    },
    mutations: {
        authUser(state, user) {
            const userSession = user.getSignInUserSession();
            const idToken = userSession.getIdToken();
            const token = idToken.getJwtToken();
            console.log(token);
            const payload = idToken.decodePayload();
            state.authData = {
                userName: payload['cognito:username'],
                email: payload.email,
                token,
            };
        },
        increaseConnectedUsers(state) {
            state.connectedUsers +=1;
        },
        decreaseConnectedUsers(state) {
            state.connectedUsers -=1;
        }
    },
    actions: {

    }
})