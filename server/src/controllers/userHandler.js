//导入Mongoose用户模型
const User =require('../models/userSchema')
//导入 CryptoJS 库，用于加密密码
const CryptoJS =require('crypto-js')
// jsonwebtoken 库，用于生成用户身份验证的令牌
const jsonwebtoken =require('jsonwebtoken')

//导出注册函数
exports.register=async(req,res)=>{
    //结构赋值得到req中的密码
    const {password} =req.body;
    try{
	//对密码进行加密，并将加密后的密码存储回请求体中。
        req.body.password=CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        )
        //创建新用户，将请求体作为参数传递给 User.create 方法
        //并使用 await 等待操作完成。
        const user =await User.create(req.body)
        //使用 jsonwebtoken 库生成用户身份验证令牌。
        //令牌包含用户的 ID，并使用环境变量中的密钥进行签名，并设置令牌的过期时间
        const token =jsonwebtoken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:'24h'}
        )
        console.log("controllers/user.js/register 注册成功")
        //将包含用户信息和令牌的 JSON 响应发送回客户端，状态码为 200 表示成功。
        res.status(201).json({user,token})

    }catch(err){
        console.log("controllers/user.js/register 注册报错")
        res.status(500).json(err)
    }
}

//登录函数
exports.login=async(req,res)=>{
    //结构赋值得到req中的用户名和密码
    const {username,password}=req.body;
    
    try{
        //数据库中查找username，并选择返回的字段为 password 和 username。
    	//并使用 await 等待操作完成。
        const user=await User.findOne({username}).select('username password');
        if(!user){
            console.log('用户不存在')
            return res.status(401).json({
                errors:[
                    {
                        param:'username',
                        msg:'invalid username'

                    }
                ]
            })
        }
		//解密算法对user.password解密
        const decryptedPass =CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
		/* 解密后的数据默认以 WordArray 对象的形式存在的，通过调用 toString() 方法并传		递 CryptoJS.enc.Utf8 参数，可以将其转换为可读的字符串形式。*/
        ).toString(CryptoJS.enc.Utf8)
        
		//解密后的密码与用户提供的密码不匹配，则返回密码错误的错误信息
        if(decryptedPass!==password){
            console.log('密码错误')
            return res.status(401).json({
                errors:[
                    {
                        param:'password',
                        msg:'invalid password'

                    }
                ]
            })
        }
		//将用户对象中的密码字段设置为 undefined，以防止将密码返回给客户端。
        user.password=undefined;
        const token = jsonwebtoken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:'24h'}
        )

        console.log("controllers/user.js/login 登录成功")
        res.status(200).json({user,token})

    }catch(err){
        console.log("controllers/user.js/login 登录报错")
        res.status(500).json(err)
    }
}
