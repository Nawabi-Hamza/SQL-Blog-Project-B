const db = require("../db")

const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM `posts`"
    db.query(q,[req.query.cat],(error,data)=>{
        if(error) return res.status(500).send(error);
        res.status(200).json(data)
    })
}

const getPost = (req,res)=>{
    const q = "SELECT p.id,name ,title ,description ,user_id, p.img ,cat, date FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?"
    db.query(q,[req.params.id],(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json(data[0])
    })
}
//===========Delete Post by Id Id============
const deletePosts = (req,res)=>{
    // console.log("delete posts")
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ?"
    db.query(q,postId,(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json({message:" Your Post Deleted Successfuly!"})
    })
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