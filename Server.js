const db = require("./db")
const express = require("express")
const cors = require("cors")
// const { Router,json } =  require("express")
const app = express()
app.use(express.json())
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(cookieParser())

const port = 4000
// this is for do not stop the server we use cluster
const cluster = require("cluster")
if(cluster.isMaster){
    for(var i=0; i < 2 ; i++ ){
        cluster.fork()
    }
    cluster.on("exit",(worker)=>{
        console.log("worker "+worker.id+" died..")
        cluster.fork()
    })
}else{

         // =======Create DataBase In Sql Page ========
// app.get("/cdb",(req,res)=>{
//     const q = "CREATE DATABASE mysqlblog"
//     db.query(q,(error,data)=>{
//         if(error) return res.status(500).json(error)
//         console.log({success:"Database created successfuly"})
//         console.log(data)
//     })
// })
        // ========Create User Table In Sql Page========
app.get("/cTable",(req,res)=>{
    const q = `CREATE TABLE users(id int not null primary key auto_increment , name varchar(45), email varchar(45), password varchar(255) )`
    db.query(q,(error,data)=>{
        if(error) return res.status(500).json(error)
        console.log({success:"Database created successfuly"})
        console.log(data)
    })
})  

  // ========Insert User In Table ========
app.post("/InT",(req,res)=>{
    const q = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?)"
    const values = [req.body.name,req.body.email,req.body.password]
    db.query(q,[values],(error,data)=>{
        if(error) return res.status(500).json(error)
        console.log({success:"Database created successfuly"})
        console.log(data)
    })
})      
    // =========Drop Table========== 
app.get("/DropT",(req,res)=>{
    const q = "DROP TABLE  users"
    db.query(q,(error,data)=>{
        if(error) return res.status(500).json(error)
        console.log({success:"TABLE DROPT successfuly"})
        console.log(data)
    })
})  


// routes require
const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
// const contactRoutes = require("./routes/contactRoutes")

// use routes which required

app.use("/auth",authRoutes)
app.use("/posts",postRoutes)
// app.use("/contactEmail",contactRoutes)









// this is for connection to port 
app.get('/',(req,res)=>{
    res.send({message:"welcome to backend"})
})
app.listen(port,()=>{
    console.log(`server is running in ${port} port`)
    })      
// this is from cluster
}

