const Post = require("../model/postModel");

const createPost = async (req,res) =>{
    try {
        const { favourite, id } = req.body;
        if (favourite === false) {
                await Post.deleteOne({ id : id, createdBy: req.authUserId._id}) 
                return res.send({ message: "Favorite Remove successfully." });
        }
        const post = new Post({
          favourite: favourite,
          id : id,
          createdBy: req.authUserId._id,
        });
        await post.save();
        res.send({ message : "Favorite Add successfully." } );  
    } catch (error) {
        res.status(500).send("something went wrong !");
    }
}

const getByUserPost = async (req,res) =>{
    try {
        const { _id } = req.authUserId;
        const post = await Post.find({ createdBy: _id });
        res.send(post);

    } catch (error) {
        res.status(500).send("something went wrong !");
    }
}

module.exports = {
    createPost,
    getByUserPost
}