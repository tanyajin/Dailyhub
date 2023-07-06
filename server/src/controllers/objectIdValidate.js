const mongoose =require('mongoose')

//验证参数是否为有效的objectId
//此处id是mongoose模式默认生成的，同时也是数据库数据的id
exports.objectIdValidate=(id)=>{
   return mongoose.Types.ObjectId.isValid(id);
}