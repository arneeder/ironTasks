const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
    {
        name: String,
        cluster: {
            type: String,
            enum: ['not started', 'in progress', 'completed'],
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Status = model("Status", statusSchema);

module.exports = Status;