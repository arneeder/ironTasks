const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
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
    statuses: {
        type: Array,
        required: true
    },
    parentProject: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    childProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
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