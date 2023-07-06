const {requestHandler} =require('./requestHandler')
const {body}=require('express-validator')
const User=require('../models/userSchema')

//注册请求合法性验证
exports.signupValidate = [
    body('username').matches(/^[a-zA-Z0-9]+$/).withMessage('Username must be alphanumeric')
      .isLength({ min: 5, max: 15 }).withMessage('Username must be between 5 and 15 characters'),
  
    body('password').matches(/^[a-zA-Z0-9]+$/).withMessage('Password must be alphanumeric')
      .isLength({ min: 5, max: 15 }).withMessage('Password must be between 5 and 15 characters'),
  
    body('confirmpassword').matches(/^[a-zA-Z0-9]+$/).withMessage('Confirmpassword must be alphanumeric')
      .isLength({ min: 5, max: 15 }).withMessage('Confirmpassword must be between 5 and 15 characters'),
  
      //自定义验证逻辑，这里通过查询数据库来验证 username 是否已被使用。
    body('username').custom(value => {
      return User.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject('Username already used.');
        }
      });
    }),
    requestHandler 
  ];

  //登录请求合法性验证
exports.loginValidate = [
    body('username').matches(/^[a-zA-Z0-9]+$/).withMessage('Username must be alphanumeric')
      .isLength({ min: 5, max: 15 }).withMessage('Username must be between 5 and 15 characters'),
  
    body('password').matches(/^[a-zA-Z0-9]+$/).withMessage('Password must be alphanumeric')
      .isLength({ min: 5, max: 15 }).withMessage('Password must be between 5 and 15 characters'),
  
    requestHandler 
    
  ];