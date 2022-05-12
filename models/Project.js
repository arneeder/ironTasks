const { Schema, model } = require("mongoose");

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
    statusColumns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Staus'
        }
    ],
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