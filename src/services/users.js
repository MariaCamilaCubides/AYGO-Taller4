import axios from 'axios';

const url = `${'https://7basf3nw96.execute-api.us-east-1.amazonaws.com/v1'}/users`;

export default {
    async getUser(data) {
        const currentUser = await axios.get(`${url}?userName=${data.userName}`,{
            headers: {
                Authorization: data.authToken
            }
        });
        return currentUser;
    },

    async createUser(data) {
        console.log('CREATE USER', data.token)
        try {
            const response = await axios.post(`${url}`,
                {
                    userName: data.userName,
                    email: data.email,
                },
                {
                    headers: {
                        "Authorization": data.token,
                        "content-type": "application/json"
                    }
                });
            console.log('create user response', response);
        } catch (e) {
            console.log(e)
        }
    },

    async updateUser(data) {
        await axios.post(`${url}`,{
            headers: {
                Authorization: data.authToken
            },
            body: JSON.stringify({
                userName: data.userName,
                name: data.name,
                lastName: data.lastName,
                birthday: data.birthday,
                phone: data.phone,
                email: data.email,
            })
        });
    },

    async deleteUser(data) {
        await axios.delete(`${url}?userName=${data.userName}`,{
            headers: {
                Authorization: data.authToken
            }
        });
    },
};