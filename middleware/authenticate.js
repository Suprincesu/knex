var knex=require('../db/knex');
var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    knex.select().from('users').where('token',token).then((user)=>{
        if(user.length>0){
            req.token=token;
            next();
        }else{
            return Promise.reject();
        }
    }).catch ((e)=>{
        res.status(401).send({error:'Must login to perfrom this action'});
    });
}

module.exports={authenticate}