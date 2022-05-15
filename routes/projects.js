const router = require("express").Router();
const mongoose = require('mongoose');
const Project = require("../models/Project");
const Status = require("../models/Status");

router.get('/', (req, res, next) => {
    const userId = req.payload._id

    Project.find({members: userId})
        .then( projects =>{
            res.status(200).json(projects)
        })
        .catch(err => next(err))
});

router.post('/', async (req, res, next) => {
    
    const currentUserId = req.payload._id
    
    const { name, description } = req.body
    const admins = [currentUserId]
    const members = [currentUserId]
    const tasksByStatus = []
    try {
        await Status.find({isDefault: true})
            .then( statusses => {

                statusses.forEach(status => {tasksByStatus.push({
                    status: String(status._id),
                    tasks: []
                })})
            })
            .catch(err => next(err))
        Project.create({ name, description, admins, members, tasksByStatus })
            .then( createdProject => res.status(201).json(createdProject))
            .catch(err => next(err))
    }
    catch(err) {next(err)}
});

router.get('/:id', (req, res, next) => {
    const projectId = req.params.id
    console.log('project id route is triggered');
    Project.findById(projectId)
        .populate('admins')
        .populate('members')
        // .populate('tasksByStatus')
        .populate({
            path: 'tasksByStatus',
            populate: {
                path: 'status',
                model: 'Status'
            }
        })
        .populate({
            path: 'tasksByStatus',
            populate: {
                path: 'tasks',
                model: 'Task'
            }
        })
        .then( project => {
            res.status(200).json(project)
        })
        .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
    const projectId = req.params.id
    Project.findByIdAndDelete(projectId)
        .then( () => {
            res.status(200).json({ message: 'project deleted' })
        })
        .catch(err => next(err))
});

router.put('/:id', (req, res, next) => {
    const { oldProject, statusId, taskId } = req.body
    const taskObject = mongoose.Types.ObjectId(taskId)

    oldProject.tasksByStatus.find( statusCol => String(statusCol.status) === String(statusId)).tasks.push(taskObject)

    Project.findByIdAndUpdate(req.params.id,
        oldProject
        , { new: true })
        .then( project =>
            res.status(200).json(project) 
        )
        .catch(err => next(err))
});


module.exports = router;
