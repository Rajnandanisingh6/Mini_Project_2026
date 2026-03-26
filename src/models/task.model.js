const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    deadline: {
        type: Date,
       
    },
    progress:{
        type: String,
        default:"pending"
    },
    


});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
