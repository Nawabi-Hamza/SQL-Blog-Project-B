const db = require("../db")

const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM `posts`"
    db.query(q,[req.query.cat],(error,data)=>{
        if(error) return res.status(500).send(error);
        res.status(200).json(data)
    })
}

const getPost = (req,res)=>{
    res.send("get post")
}
const deletePosts = (req,res)=>{
    console.log("delete posts")
}
const updatePost = (req,res)=>{
    console.log("updagte posts")
}
const addPost = (req,res)=>{
    console.log("add post")
}

module.exports = {
    getPost, getPosts,deletePosts,updatePost,addPost
}