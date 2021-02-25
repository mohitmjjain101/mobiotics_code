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

    let email1 = event.body.email
    let password1 = event.body.password
    console.log(email1 , password1, event)
    var query = `select * from user where emailid='${email1}' and password='${password1}';`;
    console.log(query , email1, password1)
    connection.connect();
    console.log('Connected!!');
    var responseresults = [];
    connection.query(query, function(error, results, fields) {
        if (error) throw error;
        console.log(fields, results, error)
        if(Array.isArray(results)){
            if(results.length >0){
                let res = JSON.parse(JSON.stringify(results));    
                responseresults = {
                    "authentication" : true,
                    "emailid" : res[0].emailid,
                    "id":res[0].id
                }
            }else {
                responseresults = {
                    "authentication" : false,
                    "emailid" : "",
                    "id":null
                }
            }
            
            
        }
        
    });

    return new Promise((resolve, reject) => {
        connection.end(err => {
            if (err)
                return reject(err);
            const response = {
                statusCode: 200,
                headers: { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '' // replace with hostname of frontend (CloudFront)
                },
                body: responseresults,
            };
            resolve(response);
        });
    });
};