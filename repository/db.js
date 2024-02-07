const mysql = require('mysql2');
const data = require('./../db.json')


const getConnection = ()=>{
  
    return mysql.createConnection(data);

} 


  var conn = getConnection();
  module.exports = conn;