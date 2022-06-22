const router=require("express").Router();
const Cart=require("../models/Cart");
const { verifyTokenaAndAuthorization, verifyTokenaAndAdmin, verifyToken } = require("../verify");
//Add a cart
router.post('/newcart',verifyTokenaAndAuthorization,async(req,res)=>{
    const cart=new Cart(req.body);
    try{
       const newcart=await cart.save();
       res.status(200).json(newcart);
    }catch(err){
        res.json(err);
    }
});
//Update cart
router.put('/update/:id',verifyToken,async(req,res)=>{
    try{
       const updatedcart=await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).send(updatedcart);
    }catch(err){
        res.json(err);
    }
});
//Delet cart
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try{
       await Cart.findByIdAndDelete(req.params.id);
       res.status(200).json("cart is deleted");
    }catch(err){
        res.json(err);
    }
});
//Getting user cart
router.get('/getcart/:id',async(req,res)=>{
    try{
       const cart=await Cart.findOne({userrId:req.params.id});
       res.status(200).send(cart);
    }catch(err){
        res.json(err);
    }
});
//getting all carts
router.get('/getallcart',verifyTokenaAndAdmin,async(req,res)=>{
     try{
          const carts=await Cart.find();
          res.status(200).send(carts);
        }
       catch(err){
        res.json(err);
       }
});
module.exports=router;