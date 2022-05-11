const router = require("express").Router();
const Project = require("../models/Project")

router.get('/', (req, res, next) => {
    const userId = req.payload._id

    Project.find({members: userId})
        .then( projects =>{
            res.status(200).json(projects)
        })
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    const currentUserId = req.payload._id
    
    const { name, description } = req.body
    const admins = [currentUserId]
    const members = [currentUserId]
    console.log({ name, description, admins, members });

    Project.create({ name, description, admins, members })
        .then( createdProject => res.status(201).json(createdProject))
        .catch(err => next(err))
});

module.exports = router;
