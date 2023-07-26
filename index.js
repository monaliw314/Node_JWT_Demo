const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "secretkey";

app.get('/',(req,res)=>{
    res.json({
        message: "this is demo api"
    })
});

app.post('/login',(req,res)=>{
    const user = {
        id : 1,
        userName : 'monali w',
        email : 'monali@.com'
    }

    jwt.sign({user},secretKey,{expiresIn: '300s'},(err,token)=>{
        if (err) {
            res.status(500).json({ error: 'Failed to generate token' });
          } else {
            res.json({ token: token });
          }
    })
})

app.post('/profile',verifyToken,(req,res)=>{
    res.json('success');
})

function verifyToken(req,res,next){
    const token = req.headers['x-access-token'];

    if(!token) 
        return res.status(403).send('Authentication token required');

    jwt.verify(token,secretKey,(err,data)=>{    
        if(err){
            res.send({
                result : "invalid token"
            })
        }else{
            req.user = data;
            next();
         }    
    })
}

app.listen(6000,()=>{
    console.log("app is running on 6000 port");
});
