const express=require('express');
const bodyParser=require('body-parser');

var user=require('./api/user');

var port=process.env.PORT || 3000;
var knex=require('./db/knex');
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',user);

app.listen(port,()=>{
    console.log('Listening on port: ',port);
})