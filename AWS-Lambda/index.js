const users = require('./users');
const posts = require('./posts');


exports.handler = async (event, context, callback) => {
    let response;
    switch (event.service) {
        case 'users':
            response = await users.handler(event.action, event.data);
            break;
            
        case 'posts':
            response = await posts.handler(event.action, event.data);
            break;
        
        default:
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    Error: 'The request service is not available'
                })
            }
    }

    lambdaResponse(callback, response.statusCode, response.body);
};

function lambdaResponse(callback, statusCode, body) {
    callback(null, {
    statusCode,
    body,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
  });
}
