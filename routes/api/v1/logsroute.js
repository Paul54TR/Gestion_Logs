const express = require('express');
const router = express.Router();

var Log = require('../../../models/logs');

// [POST] dominio.../api/v1/log/add
router.post('/log/add',(req,res)=>{
    var log = new Log();
    log.accountId = req.body.accountId;
    log.event = req.body.event;
    console.log("LOG A ENVIAR: ");
    console.log(log);
    log.save((err,logRegisted)=>{
        if(err)return res.status(500).send("ERROR AL GUARDAR REGISTRO");
        return res.status(200).send("REGISTRO EXITOSO DE : " + logRegisted);
    });
})

// [GET] dominio.../api/v1/log/:accoundId
router.get('/log/:accountId',(req,res)=>{
    Log.find({accountId: req.params.accountId},(err,result)=>{
        if(err)return res.status(500).send("ERROR AL CONSULTAR");
        if(!result) return res.status(400).send("No hay registros con esta cuenta"); 
        return res.send(result);
    })
})

// [GET] dominio.../api/v1/logs    LISTA
router.get('/logs',(req,res)=>{
   Log.find({},(err,result)=>{
        console.log(result);
        if(err) return res.status(500).send("ERROR AL GUARDAR EN BASE DE DATOS");
        if(!result) return res.status(400).send("NO HAY REGISTROS");        
        return res.status(200).send(result);
    });
})

module.exports = router;

