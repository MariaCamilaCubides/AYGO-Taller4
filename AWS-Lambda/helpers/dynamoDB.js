const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

async function createRecord(table, data) {
    return new Promise((resolve, reject) => {
        ddb.put({
            TableName: table,
            Item: {
                ...data,
                createdAt: new Date().toISOString(),
            },
        }, (err, data) => {
            if (err) { reject(err) }
            else {
                console.log('DATA', data);
                resolve(data);
            }
        });
    });
}

function updateRecord(table, key, updateExpression, attributeNames, attributeValues) {
    return new Promise((resolve, reject) => {
        ddb.update({
        TableName: table,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: attributeValues,
    }, (err, data) => {
            if (err) { reject(err) }
            else {
                console.log('DATA', data);
                resolve(data);
            }
        });
    });
}

function getRecord(table, key) {
    return new Promise((resolve, reject) => {
        ddb.get({
            TableName: table,
            Key: key,
        }, (err, data) => {
            if (err) { reject(err) }
            else {
                console.log('DATA', data);
                resolve(data);
            }
        });
    });
}

async function scanAll(table, filterExpression, expressionAttributes) {
    const params = {
        TableName : table,
    };
    if (filterExpression && expressionAttributes) {
        params.FilterExpression = filterExpression;
        params.ExpressionAttributeValues = expressionAttributes;
    }
    const scanResults = [];
    let items; 
    do{
        items =  await ddb.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
}

module.exports = {
    createRecord,
    updateRecord,
    getRecord,
    scanAll,
}