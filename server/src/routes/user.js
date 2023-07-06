const router = require('express').Router()
const {register,login} = require('../controllers/userHandler')

const {signupValidate,loginValidate}=require('../controllers/requestValidate')
const {tokenValidate}=require('../controllers/tokenValidate')


//注册路由
router.post('/signup',
    //注册信息合法性验证
    signupValidate,
    //注册操作
    register
)

//登录
router.post('/login',
    //登录信息合法性验证
    loginValidate,
    //登录操作
    login
)
//令牌验证路由：因为登录和注册都属于无authorization的操作，所以令牌验证要单独写
router.post('/verify-token',
    tokenValidate,
    (req,res)=>{
        res.status(200).json({user:req.user})
    }
)

module.exports = router