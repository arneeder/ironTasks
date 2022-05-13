const router = require("express").Router();
const Status = require("../models/Status");
const Project = require("../models/Project");

router.get('/', (req, res, next) => {
    Status.find()
        .then( statusses => res.status(200).json(projects))
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    
    const { name, cluster } = req.body
    
    Status.create( { name, cluster } )
    .then( createdStatus => res.status(201).json(createdStatus))
        .catch(err => next(err))
});

router.get('/project/:id', (req, res, next) => {
    
    const projectId = req.params.id

    Project.findById(projectId)
        .populate({
            path: 'tasksByStatus',
            populate: {
                path: 'status',
                model: Status
            }
        })
        .then( project => res.status(200).json(project.tasksByStatus))
        .catch(err => next(err))
});

module.exports = router;