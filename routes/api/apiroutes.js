const express = require('express');

const app = express();
const apiv1 = require('./v1/logsroute');
const apiv2 = require('./v2/logsroute');
//  dominio.../api/v1/
app.use('/v1',apiv1);

app.use('/v2',apiv2);

module.exports = app;