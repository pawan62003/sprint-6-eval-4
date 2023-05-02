const express = require('express');
const {UserModel} = require('../model/user.model')
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

userRoute.post('/register',(req,res)=>{
    console.log(req.body)
    const {name,email,password,gender} = req.body
    try {
        bcrypt.hash(password, 5,async(err, hash) => {
            const user = new UserModel({name,email,password:hash,gender})
            await user.save()
            res.status(200).send({'msg':'user data is added'})
        });
    } catch (error) {
        res.send({'err':error})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {password,email} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
               if(result){
                const token = jwt.sign({userID:user._id},'masai',{expiresIn:'12h'})
                res.status(200).send({"token":token})
               }
            })
        }
        else{
            res.status(200).send({"msg":"wrong input"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={
    userRoute
}