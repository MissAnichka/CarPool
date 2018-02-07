const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    User.findAll({
        // only send user id & email!
        attributes: ['id', 'email']
    })
        .then(users => res.json(users))
        .catch(next)
})