const jwt=require("jsonwebtoken");
const verifyToken=async(req,res,next)=>{
    const token=req.header.token;
    if(token){
    try{
     const acsesstoken=token.split(" ")[1];
     jwt.verify(acsesstoken,process.env.PASS_KEY,(err,user)=>{
        if(err){
            res.json(err);
        }else{
            req.user=user;
            next();
        }
     })
   }catch(err){
    res.json(err);
   }
}else res.status(401).json("Unauthorized");
}
const verifyTokenaAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.params.id===req.user.id || req.user.isAdmin){
            next();
         }else{
            res.status(403).json("You are not allowed to do it");
         }
    });
    
}
module.exports={verifyToken,verifyTokenaAndAuthorization};