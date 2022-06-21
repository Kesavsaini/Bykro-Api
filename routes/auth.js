const router=require("express").Router();
const User=require("../models/User");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");
//Register
router.post("/register",async(req,res)=>{
    const user=new User({
        name:req.body.firstname+" "+req.body.lastname,
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
    })
    try{
      const newuser=await user.save();
      res.status(200).json(newuser);
   }catch(err){
    console.log(err);
    res.json(err);
   }
});
//Login 
router.post("/login",async(req,res)=>{
    try{
      const user=await User.findOne({username:req.body.username});
      if(!user) res.status(401).json("Wrong Credentials");
      else{
        const hasedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_KEY).toString(CryptoJS.enc.Utf8);
        if(hasedPassword===req.body.password){
              const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.PASS_KEY,{expiresIn:"7d"}); 
              const {password,...other}=user._doc;
               res.status(200).json({...other,token});
        }else res.status(401).json("Wrong Credentials");
      } 
   }catch(err){
    console.log(err);
    res.json(err);
   }
});
module.exports=router;