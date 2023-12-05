const router = require('express').Router();

//注册用户子路由
router.use('/user',require('./user'))
router.use('/diary',require('./diary'))
router.use('/schedule',require('./schedule'))
router.use('/todo', require('./todo'))

module.exports = router;