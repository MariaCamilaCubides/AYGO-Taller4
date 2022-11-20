const url = `${process.env.VUE_APP_API_URL}/posts`;

export default {
    async getAllPosts(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'posts',
                    action: 'getAllPosts' 
                })
            };
            const response = await fetch(url, requestOptions);
            const responseData = await response.json();
            const posts = JSON.parse(responseData.body);
            return posts;
        } catch (e) {
            return [];
        }
    },

    async createPost(data) {
        try {
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify({
                    service: 'posts',
                    action: 'create',
                    data: {
                        userName: data.userName,
                        message: data.message
                    }   
                })
            };
            const response = await fetch(url, requestOptions);
            console.log('hola', response)
            const responseData = await response.json();
            return responseData;
        } catch (e) {
            return null;
        }
    },
};