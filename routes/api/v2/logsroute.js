const express = require('express');
const router = express.Router();
const security = require('../../../auth');
const jwt = require('jsonwebtoken');

var Log = require('../../../models/logs');


// [GET] dominio.../api/v2/jwt
router.get('/jwt',(req,res)=>{
    let privateKey = process.env.PASSWORD;
    let token = jwt.sign({"body" : "stuff"},privateKey,{algorithm: 'HS256'});
    res.send({token: token});
})

// [POST] dominio.../api/v2/log/add
router.post('/log/add',security,(req,res)=>{
    var log = new Log();
    log.accountId = req.body.accountId;
    log.event = req.body.event;
    console.log("LOG A ENVIAR: ");
    console.log(log);
    if(log.accountId!=null && log.event!=null){
    log.save((err,logRegisted)=>{
        if(err)return res.status(500).send("ERROR AL GUARDAR REGISTRO");
        return res.status(200).send(logRegisted);
    });

    }else{
        return res.status(500).send("Error al guardar Datos , se requiere el número de cuenta y la acción realizada");
    }
})

// [GET] dominio.../api/v2/log/:accoundId
router.get('/log/:accountId',security,(req,res)=>{
    Log.find({accountId: req.params.accountId},(err,result)=>{
        if(err)return res.status(500).send("ERROR AL CONSULTAR");
        if(!result) return res.status(400).send("No hay registros con esta cuenta"); 
        return res.send(result);
    })
})

// [GET] dominio.../api/v2/logs    LISTA
router.get('/logs',security,(req,res)=>{
   Log.find({},(err,result)=>{
        console.log(result);
        if(err) return res.status(500).send("ERROR AL GUARDAR EN BASE DE DATOS");
        if(!result) return res.status(400).send("NO HAY REGISTROS");        
        return res.status(200).send(result);
    });
})

module.exports = router;

