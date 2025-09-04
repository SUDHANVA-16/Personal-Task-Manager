const mongoose = require('mongoose');
const taskSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        status: String,
        deadline: String
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Task", taskSchema);