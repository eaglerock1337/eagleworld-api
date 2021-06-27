const express = require('express');
const eagleworldAPI = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

const morgan = require('morgan');
eagleworldAPI.use(morgan('dev'));

const cors = require('cors');
eagleworldAPI.use(cors());

eagleworldAPI.use(express.json());

const apiRouter = require('./api/api');
eagleworldAPI.use('/api', apiRouter);

const errorhandler = require('errorhandler');
eagleworldAPI.use(errorhandler);

eagleworldAPI.listen(PORT, HOST, console.log(`Eagleworld Core API listening on port ${PORT}`));

module.exports = eagleworldAPI;