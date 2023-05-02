const expreess = require('express');
const postRoute = expreess.Router();
const {PostModel} = require("../model/post.model")

postRoute.post("/",async(req,res)=>{
    try {
        const note = new PostModel(req.body)
        await note.save();
        res.status(200).send({"msg":"post is added in your DB"})
    } catch (error) {
        res.send(error)
    }
})

postRoute.get('/', async (req, res) => {
    try {
      const { device } = req.query;
      const filter = {};
      if (device) {
        filter.device = device;
      }
      const posts = await PostModel.find({ user: req.userId, ...filter });
      res.status(200).send(posts);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

postRoute.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const post = PostModel.findOne({_id:id})
    try {
        if(req.body.userID===post._id){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"the note is updated"})
        }
        else{
            res.send('you are not authorize person')
        }
    } catch (error) {
        res.send(error)
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const note = PostModel.find({_id:id})
    try {
        if(req.body.postID!==note._id){
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"data is deleted"})
        }
        else{
            res.send('you are not authorize person')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={
    postRoute
}