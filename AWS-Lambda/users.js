const dynamoDB = require('./helpers/dynamoDB');

exports.handler = async (action, data) => {
    let response;
    switch (action) {
        case 'create':
            response = await createUser(data);
            break;
            
        case 'patch':
            response = await patchUser(data);
            break;
            
        case 'get':
            response = await getUser(data);
            break;
            
        case 'updateStatus':
            response = await updateUserStatus(data);
            break;
            
        case 'getAllConnectedUsers':
            response = await getAllUsers(data);
            break;
        
        default:
            break;
    }
    return response;
};

async function createUser(data) {
    const user = await dynamoDB.createRecord('users', {
        userName: data.userName,
        email: data.email,
    });
    console.log('CREAR USUARIO', user);
    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
}

async function patchUser(data) {
    const user = await dynamoDB.updateRecord(
        'users',
        { userName: data.userName },
        "set #v1 = :name, #v2 = :lastName, #v3 = :city, #v4 = :birthday, #v5 = :phone",
        {
            "#v1": "name",
            "#v2": "lastName",
            "#v3": "city",
            "#v4": "birthday",
            "#v5": "phone",
        },
        {
            ":name": data.name,
            ":lastName": data.lastName,
            ":city": data.city,
            ":birthday": data.birthday,
            ":phone": data.phone,
        }
    );
     return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
}

async function getUser(data) {
    const user = await dynamoDB.getRecord('users', { userName: data.userName });
     return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
}

async function updateUserStatus(data) {
    const user = await dynamoDB.updateRecord(
        'users',
        { userName: data.userName },
        "set #v1 = :status",
        {
            "#v1": "status",
        },
        {
            ":status": data.status,
        }
    );
     return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
}

async function getAllUsers(data) {
    const users = await dynamoDB.scanAll(
        'users',
        'status = :this_status',
        {':this_status' : 1}
    );
    return {
        statusCode: 200,
        body: JSON.stringify(users)
    };
}