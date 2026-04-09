/*const express = require('express');
const taskModel = require("./models/task.model")



const app = express();
app.use(express.json());

app.post("/tasks", async (req, res) => {
    const data = req.body;
    await taskModel.create({
        title: data.title,
        description: data.description,
        
    })
    res.status(201).json({
        message: "Task created successfully"
    })
});
  

app.get("/tasks", async (req, res) => {
    const tasks = await taskModel.find();
    res.status(200).json({
        message: "Tasks retrieved successfully",
        data: tasks
    })
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
   // await taskModel.findByIdAndDelete(id);
   await taskModel.findByIdAndDelete({
    _id :id
   })

    res.status(200).json({
        message: "Task deleted successfully"
    })
});

app.patch("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await taskModel.findByIdAndUpdate(id, {
        title: data.title,
        description: data.description,
        progress: data.progress
    });

    res.status(200).json({
        message: "Task updated successfully"
    })
});

module.exports = app;

*/

const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const taskModel = require("./models/task.model")
const userModel = require("./models/user.model")

const auth = require("./middleware/auth")

const app = express();

app.use(express.json());
app.use(cors());



/* =====================
   AUTH ROUTES
===================== */

// Signup

app.post("/signup", async (req, res) => {

const {name,email,password} = req.body;

const hash = await bcrypt.hash(password,10);

await userModel.create({
name,
email,
password:hash
})

res.status(201).json({
message:"User created successfully"
})

});



// Login

app.post("/login", async (req, res) => {

const {email,password} = req.body;

const user = await userModel.findOne({email});

if(!user){

return res.json({
message:"User not found"
})

}

const match = await bcrypt.compare(password,user.password);

if(!match){

return res.json({
message:"Wrong password"
})

}

const token = jwt.sign(
{id:user._id},
"secretkey"
);

res.json({
token
})

});



/* =====================
   TASK ROUTES
===================== */


// Create Task

app.post("/tasks", auth, async (req, res) => {

const data = req.body;

await taskModel.create({

title: data.title,
description: data.description,
deadline: data.deadline,
reminder: data.reminder,
user:req.user.id

})

res.status(201).json({
message: "Task created successfully"
})

});



// Get Tasks

app.get("/tasks", auth, async (req, res) => {

const tasks = await taskModel.find({
user:req.user.id
});

res.status(200).json({

message: "Tasks retrieved successfully",
data: tasks

})

});



// Delete Task

app.delete("/tasks/:id", auth, async (req, res) => {

const id = req.params.id;

await taskModel.findByIdAndDelete({
_id: id
})

res.status(200).json({
message: "Task deleted successfully"
})

});



// Update Task

app.patch("/tasks/:id", auth, async (req, res) => {

const id = req.params.id;

const data = req.body;

await taskModel.findByIdAndUpdate(id, {

title: data.title,
description: data.description,
deadline:data.deadline,
reminder:data.reminder,
progress: data.progress

});

res.status(200).json({
message: "Task updated successfully"
})

});


module.exports = app;
