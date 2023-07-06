const {validationResult} =require('express-validator')

//处理请求验证结果
exports.requestHandler = (req,res,next)=>{
    //validationResult函数获取req的验证结果。
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        console.error('requestvalidate验证失败')
        return res.status(400).json({errors:errors.array()})
    }
    next();
}