const jsonwebtoken =require('jsonwebtoken');
const User =require('../models/userSchema')

//令牌验证中间件
//令牌验证函数
const tokenDecode = (req)=>{
    //取出请求头中authorization字段信息
    const bearerHeader =req.headers['authorization'];
    //如果存在该字段则对令牌做具体操作
    if(bearerHeader){
        //取出令牌部分
        const bearer = bearerHeader.split(' ')[1];
        try{
            //令牌解密
            const decodedToken = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            )
            //返回解密后令牌
            return decodedToken;
        }catch{
            //如果有错误则false返回
            return false;
        }   
     //如果不存在该字段则false返回
    }else{
        return false;
    }
}
//暴露令牌验证中间件
exports.tokenValidate = async(req,res,next)=>{
    //调用tokenDecode令牌验证函数，传入req参数，得到解密后令牌 
    const decodedToken=tokenDecode(req);
    //解密后令牌存在则对解密后令牌做具体操作
    if(decodedToken){
        //根据解密后令牌的id查询数据库信息
        //（加密时使用的mongoose生成的唯一id，也就是数据库信息id）
        const user=await User.findById(decodedToken.id);
        //查询不到user，返回401，
        if(!user) {
            console.error('令牌验证中间件报错')
            return res.status(401).json('unathorized')
        }
        req.user=user;
        next();
    }else{
        console.error('令牌验证中间件报错，无法生成解密令牌')
        res.status(401).json('unathorized')
    }
}