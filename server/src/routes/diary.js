const router = require('express').Router()

const {param}=require('express-validator')
const {tokenValidate}=require('../controllers/tokenValidate')
const diaryHandler = require('../controllers/diaryHandler')
const {objectIdValidate}=require('../controllers/objectIdValidate')
const {requestHandler}=require('../controllers/requestHandler')

router.post('/',
tokenValidate,
diaryHandler.create
)

router.get('/',

tokenValidate,
diaryHandler.getAll


)


router.get('/allfavorites',
tokenValidate,
diaryHandler.getfavorites
)

router.get('/:diaryId',
param('diaryId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else{
        return Promise.resolve()
    }
}),
requestHandler, 
tokenValidate,
diaryHandler.getOne
)

router.put('/:diaryId',
param('diaryId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else{
        return Promise.resolve()
    }
    
}),
requestHandler, 
tokenValidate,
diaryHandler.update
)

router.delete('/:diaryId',
param('diaryId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else return Promise.resolve()
    
}),
requestHandler, 
tokenValidate,
diaryHandler.delete
)



module.exports = router

