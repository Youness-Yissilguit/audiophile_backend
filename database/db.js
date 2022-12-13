
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// let sql =  "SELECT products.*, categories.name as category_name FROM products inner join categories on products.category_id = categories.id;"
// pool.execute(sql, function(err, result){
//     if(err) throw err; 
//     console.log(result);
// })

module.exports = pool.promise();
