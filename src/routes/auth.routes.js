const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup",async(req,res)=>{

    const {name,email,password} = req.body;

    const hash = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hash
    });

    res.json(user);

});


router.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.json({
            message:"User not found"
        });
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        return res.json({
            message:"Wrong password"
        });
    }

    const token = jwt.sign(
        {id:user._id},
        "secretkey"
    );

    res.json({
        token
    });

});

module.exports = router;