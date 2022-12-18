const express = require("express")
const routes = express.Router()
const { register , login, logout } = require("../controler/authCotroller")
routes.get("/",(req,res)=>{
    res.send("this is router from auth")
})

routes.post("/register",register)
routes.post("/login",login)
routes.post("/logout",logout)


module.exports = routes;