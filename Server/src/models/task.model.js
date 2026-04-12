const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    deadline: {
        type: Date
    },

    reminder: {
        type: String,
    },

    progress: {
        type: String,
        default: "pending"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;