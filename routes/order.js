const router=require("express").Router();
const Order=require("../models/Order");
const { verifyTokenaAndAuthorization, verifyTokenaAndAdmin, verifyToken } = require("../verify");
//Add a order
router.post('/neworder',verifyToken,async(req,res)=>{
    const order=new Order(req.body);
    try{
       const neworder=await order.save();
       res.status(200).json(neworder);
    }catch(err){
        console.log(err);
        res.json(err);
    }
});
//Update order
router.put('/update/:id',verifyTokenaAndAdmin,async(req,res)=>{
    try{
       const updatedorder=await Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).send(updatedorder);
    }catch(err){
        res.json(err);
    }
});
//Delet order
router.delete('/delete/:id',verifyTokenaAndAdmin,async(req,res)=>{
    try{
       await Order.findByIdAndDelete(req.params.id);
       res.status(200).json("order is deleted");
    }catch(err){
        res.json(err);
    }
});
//Getting user order
router.get('/getorder/:id',verifyTokenaAndAdmin,async(req,res)=>{
    try{
       const order=await Order.findOne({userrId:req.params.id});
       res.status(200).send(order);
    }catch(err){
        res.json(err);
    }
});
//getting all orders
router.get('/getallorder',verifyTokenaAndAdmin,async(req,res)=>{
     try{
          const orders=await Order.find();
          res.status(200).send(orders);
        }
       catch(err){
        res.json(err);
       }
});
//Income stats
router.get('/income',verifyTokenaAndAdmin,async(req,res)=>{
    const date=new Date();
    const lastmonth=new Date(date.setMonth(date.getMonth()-1));
    const previousmonth=new Date(new Date().setMonth(lastmonth.getMonth()-1));
    try{
        const data=await Order.aggregate([
        {$match:{createdAt:{$gte:previousmonth}}},
        {$project:{month:{$month:"$createdAt"}}},
        {$group:{_id:"$month",total:{$sum:"$amount"}}}
       ]);
       res.status(200).json(data)
    }catch(err){
        res.json(err);
    }
})
module.exports=router;