const router=require("express").Router();
const stripe=require("stripe")(process.env.STRIPE_KEY)
router.post("/payment",async(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"INR"
    },(StripeErr,StripeRes)=>{
        if(StripeErr) res.status(500).json(StripeErr);
        else res.status(200).json(StripeRes);
    })
})
module.exports=router;