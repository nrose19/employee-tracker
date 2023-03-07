// const mysql = require('mysql2');
import mysql from 'mysql2';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password2*22',
    database: 'employeeTracker_db',
});

connection.connect((err) => {
    if(err) throw err
});

export default connection;