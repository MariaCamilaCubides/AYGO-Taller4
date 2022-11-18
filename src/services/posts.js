import axios from 'axios';

const url = `${url}/posts`;

export default {
    async getAllPosts(data) {
        const allPosts = await axios.get(url,{
            headers: {
                Authorization: data.authToken
            }
        });
        return allPosts;
    },

    async createPost(data) {
        await axios.post(`${url}`,{
            headers: {
                Authorization: data.authToken
            },
            body: data.post
        });
    },

    async deletePost(data) {
        await axios.delete(`${url}?id=${data.postId}`,{
            headers: {
                Authorization: data.authToken
            }
        });
    },
};