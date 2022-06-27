const router=require("express").Router();
const stripe=require("stripe")("sk_test_51LEWozSGTyh3edWh8QxbSe9atVbmvZBOIhi3V0O3gAd0QFG9XkXxcTqIvqGDgloKSzG0jpnopGLin0nINYkHcXmn00JyqQuWx9")
router.post("/payment",async(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"INR"
    },(StripeErr,StripeRes)=>{
        if(StripeErr) res.status(500).json(StripeErr),console.log(StripeErr);
        else res.status(200).json(StripeRes);
    })
})
module.exports=router;