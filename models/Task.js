const { Schema, model } = require("mongoose");

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
    projects: [{
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
        type: String
    }],
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed']
    }
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;