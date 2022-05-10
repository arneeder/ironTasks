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
        status: String
      }],
    isDone: Boolean
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;