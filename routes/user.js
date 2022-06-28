const router=require("express").Router();
const CryptoJS = require("crypto-js");
const User=require("../models/User");

const { verifyTokenaAndAuthorization, verifyTokenaAndAdmin } = require("../verify");
//Update User
router.put('/update/:id',verifyTokenaAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
    }
    try{
       const updateduser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       const {password,...other}=updateduser._doc;
       res.status(200).send(other);
    }catch(err){
        res.json(err);
    }
});
//Delet user
router.delete('/delete/:id',verifyTokenaAndAuthorization,async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("User is deleted");
    }catch(err){
        res.json(err);
    }
});
//Getting a user
router.get('/getuser/:id',verifyTokenaAndAuthorization,async(req,res)=>{
    try{
       const user=await User.findById(req.params.id);
       const {password,...other}=user._doc;
       res.status(200).send(other);
    }catch(err){
        res.json(err);
    }
});
//getting all user
router.get('/getalluser',verifyTokenaAndAdmin,async(req,res)=>{
    const qurey=req.query.new;
    try{
       const users= qurey? await User.find().sort({createdAt:-1}).limit(5):await User.find();
       res.status(200).send(users);
    }catch(err){
        res.json(err);
    }
});
//Getting user Stats
router.get('/getuserstats',verifyTokenaAndAdmin,async(req,res)=>{
    const date=new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1));
    try{
      const data=await User.aggregate([
        {
            $match:{createdAt:{$gte:lastyear}}
        },{
            $project:{month:{$month:"$createdAt"}}
        },
        {
        $group:{
           _id:"$month",
           total:{$sum:1}
        }
       }
      ]);
      res.status(200).json(data);
    }catch(err){
        res.json(err);
    }
});
module.exports=router;