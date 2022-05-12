const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

// show all tasks of boards I am a member of
router.get('/', (req, res, next) => {
    
    const userId = req.payload._id
    
    Project.find({members: userId})
        .then( projects => {
            const myProjectIds = []
            
            projects.forEach( project => {
                myProjectIds.push(String(project._id))
            })
            Task.find({projects: {$in: myProjectIds}})
                .then( tasks => {
                    console.log({tasks})
                    res.status(200).json(tasks)
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    
});

module.exports = router;
