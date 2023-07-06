const router = require('express').Router();

//注册用户子路由
router.use('/user',require('./user'))
router.use('/diary',require('./diary'))


module.exports = router;