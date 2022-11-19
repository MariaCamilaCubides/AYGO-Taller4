import axios from 'axios';

const url = `${process.env.VUE_APP_API_URL}/users`;

export default {
    async getUser(data) {
        try {
            const response = await axios.post(url,
                {
                    service: 'users',
                    action: 'get',
                    data: {
                        userName: data.userName
                    }   
                },
                {
                    headers: {
                        "Authorization": data.token,
                        "content-type": "application/json"
                    }
                });
            return response;
        } catch (e) {
            return null;
        }
    },

    async createUser(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'users',
                    action: 'create',
                    data: {
                        userName: data.userName,
                        email: data.email
                    }  
                })
              };
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            // const response = await axios.post(url,
            //     {
            //         service: 'users',
            //         action: 'create',
            //         data: {
            //             userName: data.userName,
            //             email: data.email
            //         }   
            //     },
            //     {
            //         headers: {
            //             "Authorization": data.token,
            //             "content-type": "application/json"
            //         }
            //     });
            console.log('RESPONSE', response);
            console.log(data)
            return data;
        } catch (e) {
            return null;
        }
    },

    async updateUser(data) {
        try {
            const response = await axios.post(url,
                {
                    service: 'users',
                    action: 'patch',
                    data: {
                        userName: data.userName,
                        name: data.name,
                        lastName: data.lastName,
                        email: data.email,
                        city: data.city,
                        birthday: data.birthday,
                        phone: data.phone
                    }
                },
                {
                    headers: {
                        "Authorization": data.authToken,
                        "content-type": "application/json"
                    }
                });
            return response;
        } catch (e) {
            return null;
        }
    },

    async updateUserStatus(data) {
        try {
            const response = await axios.post(url,
                {
                    service: 'users',
                    action: 'updateStatus',
                    data: {
                        userName: data.userName,
                        status: data.status
                    }
                },
                {
                    headers: {
                        "Authorization": data.authToken,
                        "content-type": "application/json"
                    }
                });
            return response;
        } catch (e) {
            return null;
        }
    },

    async getAllConnectedUsers(data) {
        try {
            const response = await axios.post(url,
                {
                    service: 'posts',
                    action: 'getAllConnectedUsers'
                },
                {
                    headers: {
                        "Authorization": data.token,
                        "content-type": "application/json"
                    }
                });
            return response;
        } catch (e) {
            return null;
        }
    },
};