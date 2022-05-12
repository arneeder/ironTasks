const { Schema, model } = require("mongoose");

const projectReferenceSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: 'Status',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        accountable: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        responsible: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        parentTask: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        childTasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: null
            }
        ],
        projects: [ projectReferenceSchema ],
    },
    {
        timestamps: true,
    }
);

const Task = model("Task", taskSchema);

module.exports = Task;