const router = require("express").Router();
const User = require("../models/User")
const Project = require("../models/Project")

router.get('/', (req, res, next) => {
    User.find()
        .then( users => {
            console.log('All Users: ', users);
            res.status(200).json(users)
        } )
        .catch( err => next(err) )
});

router.get('/project/:id', (req, res, next) => {
    
    const projectId = req.params.id

    Project.findById(projectId)
        .populate('members')
        .then( project => {
            console.log('Project Members: ', project.members)
            res.status(200).json(project.members)
        } )
        .catch( err => next(err) )

});



module.exports = router;