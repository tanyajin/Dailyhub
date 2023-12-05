const router = require('express').Router()
const {tokenValidate}=require('../controllers/tokenValidate')
const todoHandler = require('../controllers/todoHandler')
const {param}=require('express-validator')

router.get('/',
tokenValidate,
todoHandler.getAll

)

router.post('/',
tokenValidate,
todoHandler.create

)


router.put('/complete/:taskId',
param(':taskId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else return Promise.resolve()
    
}),

tokenValidate,
todoHandler.complete

)


router.delete('/delete/:taskId',
param('taskId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else return Promise.resolve()
    
}),

tokenValidate,
todoHandler.delete
)


// router.put('/update/:taskId',
// param('taskId').custom(value=>{
//     if(!objectIdValidate(value)){
//         return Promise.reject('invalid taskId')
//     }else{
//         return Promise.resolve()
//     }
    
// }),
// tokenValidate,
// todoHandler.update
// )




module.exports = router
