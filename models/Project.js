const { Schema, model } = require("mongoose");

const statusColumn = new Schema(
    {
        status: {
            type: Schema.Types.ObjectId,
            ref: 'Status'
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        timestamps: true,
    }
)

const projectSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: String,
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tasksByStatus: [ statusColumn ],
    parentProject: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    },
    childProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default: null
        }
    ],
  },
  {
    timestamps: true,
  }
);


const Project = model("Project", projectSchema);

module.exports = Project;