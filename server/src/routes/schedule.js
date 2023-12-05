const router = require('express').Router()
const {param}=require('express-validator')
const {tokenValidate}=require('../controllers/tokenValidate')
const {objectIdValidate}=require('../controllers/objectIdValidate')
const {requestHandler}=require('../controllers/requestHandler')
const eventHandler = require('../controllers/eventHandler')

router.post('/',
tokenValidate,
eventHandler.create
)


router.get('/',
tokenValidate,
eventHandler.getAll
)

router.delete('/',
tokenValidate,
eventHandler.deleteEvent
)

module.exports = router

