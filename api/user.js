var utils=require('../utils/authUtil');
var express = require('express');
const _=require('lodash');
const bcrypt=require('bcryptjs')
var knex=require('../db/knex');
var router = express.Router();
var {authenticate} = require('../middleware/authenticate');

router.post('/', (req, res, next)=> {
    var body=_.pick(req.body,['username','password']);
    if(body.username.length>5 && body.password.length>5){
        utils.encryptPassword(body.password,(hashedPassword,err)=>{
            knex('users').insert({
                username:body.username,
                password:hashedPassword
            }).then((user)=>{
                queryDB(body.username,hashedPassword,res)
            }).catch((e)=>{
                res.status(400).send({error:'User already exists'});
            })
        })
    }else{
        res.send({error:'Username & password must exceed 5 characters'});
    }   
});

router.post('/login',(req,res)=>{
    var body=_.pick(req.body,['username','password']);
    knex.select().from('users').where({username:body.username}).then((user)=>{
        if(user.length>0){
            utils.comparePassword(body.password,user[0].password,(sucess,error)=>{
                if(sucess){
                    utils.generateAuthToken(user[0],(token)=>{
                        knex('users').where('username',user[0].username)
                                     .update({
                                        token:token
                                     }).then(()=>{
                                        res.header('x-auth',token).send({status:'success'});
                                     })
                    });
                }else{
                    res.send({error:'Username or password incorect'});
                }
            })
        }else{
            res.send({error:'Username or password incorect'})
        }
    })
})

router.delete('/logout',authenticate,(req,res)=>{
    knex('users').where('token',req.token)
                 .update({
                     token:''
                 }).then(()=>{
                     res.send({success:'Logout successful'})
                 })
})

queryDB=function(username,password,res){
    knex.select().from('users').where({username:username,password:password}).then((user)=>{
        if(user.length>0){
            utils.generateAuthToken(user[0],(token)=>{
                knex('users').where('username',user[0].username)
                             .update({
                                 token:token
                             }).then(()=>{
                                 res.header('x-auth',token).send({status:'success'});
                             })
            })
        }else{
            res.status(404).send({'error':'Username or password incorrect.'})
        }
    })
}

module.exports = router;