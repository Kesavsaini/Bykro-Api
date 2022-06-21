const express=require("express");
const app=express();
const mongoose= require("mongoose");
const authRoute=require("./routes/auth")
const dotenv=require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("Dbconnected")}).catch((err)=>{console.log(err)});
app.use(express.json());
app.use('/api/auth',authRoute);
app.listen(5000,()=>{
    console.log("Server is running")
});