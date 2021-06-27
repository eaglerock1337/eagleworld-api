const express = require('express');
const apiRouter = express.Router();

const fortuneAPI = require('./api/fortune');
apiRouter.use('/fortune', fortuneAPI);

module.exports = apiRouter;
