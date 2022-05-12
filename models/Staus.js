const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
        name: String,
        cluster: {
            type: String,
            enum: ['not started', 'in progress', 'completed'],
        }
    },
    {
        timestamps: true,
    }
);

const Task = model("Task", taskSchema);

module.exports = Task;