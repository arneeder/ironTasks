const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
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

const Status = model("Status", statusSchema);

module.exports = Status;