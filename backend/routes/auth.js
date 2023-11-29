const express = require("express");
const router = express.Router();
const User = require("../model/UserSchema.js")

router.get("/home",(req,res)=>{
    res.send("Hello to the router page");
})

//login
router.post ("/login", async(req,res)=>{
    
    const {username, email, password}= req.body;
        if(!username || !email || !password){
            res.status(422).json({message:"please fill the data"});
        }
        try{
            const UserExist = await User.findOne({email:email});
            if(UserExist){
                res.status(422).json({message: "Email Already Exist"})
            }else{
                const addUser = await new User({username:req.body.username, email, password});
                await addUser.save();
                if(addUser){
                    res.status(201).json(addUser);
                    console.log(addUser);
                }else{
                    res.status(422).json({message: "Invalid Credentials"})
                }
            }

        }catch(err){
            console.log(err);
            res.status(500).json({err: "internal server error"});
        }
})



module.exports= router;