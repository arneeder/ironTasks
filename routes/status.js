const router = require("express").Router();
const Status = require("../models/Staus")

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

module.exports = router;