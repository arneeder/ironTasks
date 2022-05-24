const router = require("express").Router();
const User = require("../models/User")
const Project = require("../models/Project")
const Task = require("../models/Task")

router.get('/', (req, res, next) => {
    User.find()
        .then( users => {
            res.status(200).json(users)
        } )
        .catch( err => next(err) )
});

router.get('/:id', (req, res, next) => {
    
    const userId = req.params.id
    
    User.findById(userId)
        .then( user => {
            res.status(200).json(user)
        } )
        .catch( err => next(err) )
});

router.put('/:id', (req, res, next) => {

    const userId = req.params.id
    const updateParameter = req.body
    console.log(req.body);

    User.findByIdAndUpdate(userId, updateParameter)
        .then( user => {
            res.status(201).json(user)
        })
        .catch( err => next(err) )
    
});

router.get('/project/:id', (req, res, next) => {
    
    const projectId = req.params.id

    Project.findById(projectId)
        .populate('members')
        .then( project => {
            res.status(200).json(project.members)
        } )
        .catch( err => next(err) )

});

router.get('/task/:id', (req, res, next) => {
    
    const taskId = req.params.id

    Task.findById(taskId)
        .populate('accountable')
        .populate('responsible')
        .then( task => {
             members = {
                accountable: task.accountable,
                responsible: task.responsible
             }
            res.status(200).json(members)
        } )
        .catch( err => next(err) )

});



module.exports = router;