// const mysql = require("mysql")
// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"mysqlblog"
// })

// module.exports = db

const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mysqlblog"
})

db.connect((error)=>{
    if(error) return console.error("The Error: "+error.message)
    console.log("connected to my sql server")
})
module.exports = db