const express = require("express")
const routes = express.Router()
const { getPost,getPosts,addPost,deletePosts,updatePost } = require("../controler/postController")
// routes.get("/",(req,res)=>{
//     res.send("welcome to test")
// })
// show all post
routes.get("/",getPosts)

// one post 
routes.get("/:id",getPost)

// delete post 
routes.delete("/:id",deletePosts)

// create a post 
routes.post("/",addPost)

// update post
routes.patch("/:id",updatePost)

module.exports = routes;