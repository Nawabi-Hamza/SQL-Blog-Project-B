const db = require("../db")

const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM `posts` ORDER BY id DESC"
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
//===========Create A Post in Page==========
const addPost = (req,res)=>{
    // console.log("add new post")
    const q = "INSERT INTO `posts`(`title`, `description`, `cat`, `img`, `user_id`) VALUES (?)"
    const value = [req.body.title ,req.body.description,req.body.cat,req.body.img,req.body.user_id]
    db.query(q,[value],(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.status(200).json({success:" Your Post Successfuly Uploaded..."})

    })
}

const updatePost = (req,res)=>{
    // console.log("updagte posts")
    const postId = req.params.id;
    // const q = "UPDATE `posts` SET `title`=?,`description`=?,`cat`=?,`img`=? WHERE id = ? AND user_id "
    // const q = "UPDATE `posts` SET `title`=?,`description`=?,`cat`=?,`img`=?,`user_id`=? WHERE  posts.id = 25"
    const q = "UPDATE `posts` SET `title` =?, `description` = ?, `cat` = ? ,`img`=? WHERE `posts`.`id` = ?;"
    // const u_id = 14
    const value = [req.body.title,req.body.description,req.body.cat,req.body.img]
    db.query(q,[ ...value,postId ],(error,data)=>{
        if(error) return res.status(500).json(error)
        return res.json(data)
    })
}


module.exports = {
    getPost, getPosts,deletePosts,updatePost,addPost
}