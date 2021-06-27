const express = require('express');
const apiRouter = express.Router();

const fortuneAPI = require('./fortune');
apiRouter.use('/fortune', fortuneAPI);

module.exports = apiRouter;
