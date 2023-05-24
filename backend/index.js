const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();

app.use(cors());
app.use(bodyparser.json());


//connect Mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port:3307
});

//check database connecrtion
db.connect(err => {
    if(err){console.log('err')}
    console.log('Database Connected Scuccessfully!!')
})

//get All data
app.get('/users',(req,res)=>{
    //console.log('Get All User');
    let qrr = `SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'All user Data',
                data:results
            });
        };
    });
});

//get single data by ID
app.get('/user/:id',(req,res)=>{
    //console.log(req.params.id);
    let qrId =req.params.id;
    let qr = `SELECT * FROM users where id = ${qrId}`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Get data by ID",
                data:results
            });
        }else{
            res.send({
                message:"Data not found !"
            });
        }
    });
});
//post data
app.post('/user',(req,res)=>{
    //console.log(req.body,'Post data success')
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr  = `insert into users(fullname,email,mobile)
    value('${fullName}','${eMail}','${Mobile}')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data added successful!",
            data:results
        })
    })
})

//update data
app.put('/user/:id',(req,res)=>{
    //console.log(req.body,"updated data")
    
    let uID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr = `update users set fullname = '${fullName}' ,email = '${eMail}' ,
    mobile = '${Mobile}' where id = ${uID}`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data Updated successfull",
        })
    })
})
//delete data
app.delete('/user/:id',(req,res)=>{
    let uID = req.params.id;
    let qr = `delete from users where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data deleted successfull"
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server is runing on 3000 PORT, test");
})
