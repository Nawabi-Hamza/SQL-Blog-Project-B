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

// create a post 
routes.post("/",addPost)

// delete post 
routes.delete("/:id",deletePosts)

// update post
routes.patch("/:id",updatePost)

module.exports = routes;