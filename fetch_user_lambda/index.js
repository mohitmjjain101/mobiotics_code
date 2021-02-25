var mysql = require('mysql');
const username = process.env.RDS_USERNAME //process.env.databaseUser;
const password = process.env.RDS_PASSWORD; //process.env.databasePassword;
const host = process.env.RDS_HOSTNAME //process.env.databaseHost;
console.log('Loading function');
exports.handler = (event, context, callback) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: process.env.RDS_DATABASE
    });

    let id = event.body.id
    
    var query = `select * from user where id=${id}`;
    console.log(event.body)
    console.log(query)
 
    connection.connect();
    console.log('Connected!!');
    var responseresults = [];
    connection.query(query, function(error, results, fields) {
        if (error) throw error;
        console.log(fields, results, error)
        responseresults= JSON.parse(JSON.stringify(results));    
        
    });

    return new Promise((resolve, reject) => {
        connection.end(err => {
            if (err)
                return reject(err);
            const response = {
                statusCode: 200,
                body: responseresults,
            };
            resolve(response);
        });
    });
};