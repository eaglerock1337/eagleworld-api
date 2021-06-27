const express = require('express');
const fortuneAPI = express.Router();

const execSync = require('child_process').exec;

fortuneAPI.get('/', (req, res, next) => {
    let optionString = '';
    switch (req.query.option) {
        case 'cowsay':
            optionString = ' | cowsay';
            break;
        case 'tuxsay':
            optionString = ' | cowsay -f tux';
            break;
    }

    execSync(`fortune${optionString}`, {}, function(error, stdout, stderr) {
        if (error) {
            let fortuneError = new Error(`Error running fortune: ${stderr}`);
            fortuneError.status = 500;
            next(fortuneError);
        } else {
            console.log(stdout);
            res.send({fortune: stdout});
        }
    });
});

module.exports = fortuneAPI;
