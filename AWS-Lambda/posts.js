const dynamoDB = require('./helpers/dynamoDB');
const randomBytes = require('crypto').randomBytes;

exports.handler = async (action, data) => {
    let response;
    switch (action) {
        case 'create':
            response = await createPost(data);
            break;
            
        case 'getAllPosts':
            response = await getAllPosts();
            break;
        
        default:
            break;
    }
    return response;
};

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function createPost(data) {
    const postId = toUrlString(randomBytes(16));
    const post = await dynamoDB.createRecord('posts', {
        id: postId,
        userName: data.userName,
        message: data.message,
    });
    return {
        statusCode: 200,
        body: JSON.stringify(post)
    };
}

async function getAllPosts() {
    const posts = await dynamoDB.scanAll(
        'posts'
    );
    return {
        statusCode: 200,
        body: JSON.stringify(posts)
    };
}