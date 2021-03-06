const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

router.get('/', (req, res, next) => {
    
    const userId = req.payload._id
    
    Project.find({members: userId})
        .then( projects => {
            const myProjectIds = []
            
            projects.forEach( project => {
                myProjectIds.push(String(project._id))
            })
            Task.find({'projects.project': {$in: myProjectIds}})
                .then( tasks => {
                    res.status(200).json(tasks)
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
});

router.get('/project/:id', (req, res, next) => {
    
    const projectId = req.params.id

    Task.find({'projects.project': projectId})
        .then( tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => next(err))
});

router.post('/project/:id', (req, res, next) => {
    
    const { name, description, accountable, responsible, projects, statusCluster } = req.body
    const projectId = req.params.id

    Task.create( { name, description, accountable, responsible, projects } )
        .then( createdTask => res.status(201).json(createdTask))
        .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
    
    const taskId = req.params.id
    
    Task.findById(taskId)
        .populate('accountable')
        .populate('responsible')
        .then( task => {
            res.status(201).json(task)
            
}       )
        .catch(err => next(err))
});

router.put('/:id', (req, res, next) => {
    const taskId = req.params.id
    const task = req.body

    Task.findByIdAndUpdate(taskId, task)   
        .then( updatedTask => {
            console.log(updatedTask)
            res.status(201).json(task)
        })
        .catch(err => next(err))
});


module.exports = router;
