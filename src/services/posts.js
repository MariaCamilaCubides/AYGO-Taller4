import axios from 'axios';

const url = `${process.env.VUE_APP_API_URL}/posts`;

export default {
    async getAllPosts(data) {
        try {
            const response = await axios.post(url,
                {
                    service: 'posts',
                    action: 'getAllPosts'
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

    async createPost(data) {
        try {
            await axios.post(url,
                {
                    service: 'posts',
                    action: 'create',
                    data: {
                        userName: data.userName,
                        message: data.message
                    }   
                },
                {
                    headers: {
                        "Authorization": data.token,
                        "content-type": "application/json"
                    }
                });
        } catch (e) {
            return null;
        }
    },
};