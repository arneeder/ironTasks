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
    statusColumns: {
        type: Array,
        required: true,
        default: ['To Do', 'Doing', 'Done']
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