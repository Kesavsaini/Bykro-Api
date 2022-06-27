const router=require("express").Router();
const Product=require("../models/Product");
const { verifyTokenaAndAuthorization, verifyTokenaAndAdmin,verifyToken } = require("../verify");
//Add a Product
router.post('/newproduct',verifyTokenaAndAdmin,async(req,res)=>{
    const product=new Product(req.body);
    try{
       const newproduct=await product.save();
       res.status(200).json(newproduct);
    }catch(err){
        res.json(err);
    }
})
//Update product
router.put('/update/:id',verifyTokenaAndAdmin,async(req,res)=>{
    try{
       const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
       res.status(200).send(updatedproduct);
    }catch(err){
        res.json(err);
    }
});
//Delet product
router.delete('/delete/:id',verifyTokenaAndAdmin,async(req,res)=>{
    try{
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json("product is deleted");
    }catch(err){
        res.json(err);
    }
});
//Getting a product
router.get('/getproduct/:id',async(req,res)=>{
    try{
       const product=await Product.findById(req.params.id);
       res.status(200).send(product);
    }catch(err){
        res.json(err);
    }
});
//getting all product
router.get('/getallproduct',verifyToken,async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try{
        let products;
        if(qNew){
            products=await Product.find().sort({createdAt:-1}).limit(5);
        }else if(qCategory){
            products=await Product.find({categories:{$in:[qCategory]}});
        }else{
            products=await Product.find();
        }
       res.status(200).send(products);
    }catch(err){
        res.json(err);
    }
});
module.exports=router;