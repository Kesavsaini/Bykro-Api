const router=require("express").Router();
const stripe=require("stripe")("sk_test_51LEWozSGTyh3edWh8QxbSe9atVbmvZBOIhi3V0O3gAd0QFG9XkXxcTqIvqGDgloKSzG0jpnopGLin0nINYkHcXmn00JyqQuWx9")
router.post("/payment",async(req,res)=>{
    try{
        const paymentIntents=await stripe.paymentIntents.create({
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:"INR"
        });
        res.status.json(paymentIntents);
    }catch(err){
        res.json(err);
    }
})
module.exports=router;