
const jwt = require("jsonwebtoken")
const mysql = require("mysql")
const db = require("../db")
const bcrypt = require("bcryptjs")
const cookie = require("cookie-parser")


    // Register Section 
const register = (req,res)=>{
    // console.log("register function")
    // check if user already exist
    const q = "SELECT * FROM users WHERE email = ? OR name = ?"
    // const value = [req.body.name,req.body.email]
    db.query(q,[req.body.email,req.body.name],(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length) return res.status(409).json({error:"User Already Exist!"})
 
        // if check is be false or user not be in database the user will be register
        const q = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?)"
        // to hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const values = [req.body.name,req.body.email, hash]
        db.query(q,[values],(error,data)=>{
            if(error) return res.status(500).json(error)
            return res.status(200).json(({success:"User Created Successfully"}))
        })

    })
}

    // === Login Section ===
const login = (req,res)=>{
    const q = "SELECT * FROM users WHERE name = ?"
    db.query(q,[req.body.name],(error,data)=>{
        if(error) return res.status(500).json(error)
        if(data.length === 0) return res.status(404).json({error:"User Is Not In System Please Fisrt Sign In..."})

        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password)

        if(!isPasswordCorrect) return res.status(400).json({error:"please type correct password"})

        const token = jwt.sign({id:data[0].id},"jwtkey123")
        // to hide password just show user name and email
        const {password , ...other} = data[0]
        res.cookie("access-token",token,{
            httpOnly:true
        // }).status(200).json(data[0])
         }).status(200).json(other)

    })

}
const logout = (req,res)=>{
    res.clearCookie("access_token",{
    sameSite:"none",
    secre:true,
    }).status(200).json("user logout successfuly")
}
module.exports = {
   register,
   login,
   logout
}