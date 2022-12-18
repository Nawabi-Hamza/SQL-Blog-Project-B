const express = require('express')
const routes = express.Router()
const nodemailer = require("nodemailer")

// router.use(router())
var contactMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'hamza.nawabi119@gmail.com',
    pass: 'tvkfkmfywdghpvat'
    }
});
contactMail.verify((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("your message Send it")
    }
})
routes.get('/',(req,res)=>{
    res.send({message:"email section"})
})
routes.post("/",(req,res)=>{
// res.send("post methode") 
var emailto =" hamza.nawabi119@gmail.com   "
const name = req.body.name
const email = req.body.email
const message = req.body.message
const doctor = req.body.doctor
if(doctor==="Ahmadi"){
var emailto = "h.nawabi007@gmail.com"
}
else if(doctor==="Noori"){
var emailto = "zohaib.ayubi002@gmail.com"
}
else if(doctor==="Azizi"){
var emailto = "fayaz.nasrat10@gmail.com"
}
const mail = {
from:"hamza.nawabi119@gmail.com",
to:emailto,
subject:"message Send From The Nawabi Blog",
html:`
User_Name:<b>${name}</b><br/>
User_Mail:<b>${email}</b><br/>
User_Message:<b>${message}</b><br/>
Doctor_Name:<b>${doctor}</b><br/>
`
}
contactMail.sendMail(mail,(error)=>{
if(error){
    res.json(error)
}else{
    res.json({message:"We Recieved Your Message"})
}
}); 
})

module.exports = routes