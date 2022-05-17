const router = require("express").Router();
const User = require("../models/User")
const Project = require("../models/Project")

router.get('/', (req, res, next) => {
    User.find()
        .then( users => res.status(200).json(users) )
        .catch( err => next(err) )
});

router.get('/project/:id')

    const projectId = req.params.id

    Project.findById(projectId)
        .populate('members')
        .then( project => res.status(200).json(project.users) )
        .catch( err => next(err) )

module.exports = router;