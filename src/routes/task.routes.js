const express = require("express");

const router = express.Router();

const Task = require("../models/task.model");

const auth = require("../middleware/auth");

router.post("/task",auth,async(req,res)=>{

    const {title,description,reminder} = req.body;

    const task = await Task.create({
        title,
        description,
        reminder,
        user:req.user.id
    });

    res.json(task);

});


router.get("/task",auth,async(req,res)=>{

    const task = await Task.find({
        user:req.user.id
    });

    res.json(task);

});

module.exports = router;