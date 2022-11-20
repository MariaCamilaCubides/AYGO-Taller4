const url = process.env.VUE_APP_API_URL;

export default {
    async getUser(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'users',
                    action: 'get',
                    data: {
                        userName: data.userName
                    }    
                })
            };
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            const userItem = JSON.parse(responseData.body);
            return userItem.Item;
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
            const responseData = await response.json();
            return responseData;
        } catch (e) {
            return null;
        }
    },

    async updateUser(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
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
                })
            };
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            return responseData;
        } catch (e) {
            return null;
        }
    },

    async updateUserStatus(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'users',
                    action: 'updateStatus',
                    data: {
                        userName: data.userName,
                        status: data.status
                    }  
                })
            };
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            return responseData;
        } catch (e) {
            return null;
        }
    },

    async getAllConnectedUsers(data) {   
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'users',
                    action: 'getAllConnectedUsers'
                })
            };
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            const users = JSON.parse(responseData.body);
            return users;
        } catch (e) {
            return [];
        }
    },
};