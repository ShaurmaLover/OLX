const mySQL = require("mysql2")

require("dotenv").config()

let host = process.env.HOST_URL
let port = process.env.PORT
let user = process.env.DB_USER
let password = process.env.PASSWORD
let db_name = process.env.DATABASE_NAME

const connection = mySQL.createConnection({
    host,
    user,
    password,
    port,
    database: db_name
})

connection.connect(async (err)=> {
    if (err) {
        console.error("Error connecting :" + err.stack)
        return
    }
})

module.exports = connection