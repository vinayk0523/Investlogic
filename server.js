const express = require('express')
const app = express()
const router = require('./routes');
const conn = require('../backend/repository/db');
const cors = require('cors');


app.listen(5000,()=>{
    console.log("port started of backend")
})


app.use(express.json())
app.use(cors())


conn.connect((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
      
    }
  });


  app.use('/userr', router);
