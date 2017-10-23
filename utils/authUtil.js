const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
var knex=require('../db/knex');

const secret='abc123';

generateAuthToken=function(user,callback){
    var access='auth';
    var token=jwt.sign({
        _id:user.id,
        access
    },secret).toString();
    callback(token);
}

validateToken=function(token,callback){
    jwt.verify(token,secret,(err,decoded){
        if(err){
            callback(err);
        }else{
            callback(decoded);
        }
    })
}

encryptPassword=function(password,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hashedPassword)=>{
            if(err){
                callback(err);
            }
            callback(hashedPassword);
        })
    })
}

comparePassword=function(password,hashedPassword,callback){
    bcrypt.compare(password,hashedPassword,(err,res)=>{
        if(res){
            callback(res);
        }else{
            callback(err);
        }
    })
}

module.exports={
    generateAuthToken,
    encryptPassword,
    comparePassword,
    validateToken
};

