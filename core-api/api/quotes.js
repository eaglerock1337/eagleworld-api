const express = require('express');
const quoteAPI = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./api.db');

quoteAPI.param('quoteId', (req, res, next, id) => {

});

quoteAPI.get('/', (req, res, next) => {
    db.all('SELECT * FROM Quotes', (err, data) => {
        if (err) {
            next(err);
        } else {
            res.send({quotes: data});
        }
    });
});

quoteAPI.post('/', (req, res, next) => {
    const quote = req.body.quote;
    if (!quote.quote || !quote.author || !quote.submitter) {
        let respErr = new Error('Missing required quote field (quote, author, or submitter)');
        respErr.status = 400;
        next(respErr);
    }

    let insertValues = `${quote.quote}, ${quote.author}, ${quote.submitter},`;
    let insertFields = `quote, author, submitter`;

    if (quote.authorId) {
        insertValues += `, ${quote.authorId}`;
        insertFields += ', author_id';
    }

    if (quote.submitterId) {
        insertValues += `, ${quote.submitter_id}`;
        insertFields += ', submitter_id';
    }

    db.run(`INSERT INTO Quotes ( ${insertFields} ) VALUES ( ${insertValues} )`, function(err) {
        if (err) {
            let respErr = new Error(`Database error: ${err}`);
            respErr.status = 500;
            next(respErr);
        }

        db.get(`SELECT * FROM Quotes WHERE id = ${this.lastID}`, (err, row) => {
            if (err) {
                let respErr = new Error(`Unable to retrieve new quote: ${err}`);
                respErr.status = 500;
                next(respErr);
            }

            res.status(201).send({ quote: row });
        });
    });
});

quoteAPI.post('/search', (req, res, next) => {
    const searchParams = req.body.search;
    if (!searchParams.searchType || !searchParams.searchText) {
        let respErr = new Error('Search fields missing...both "searchType" and "searchText" should be present under "search"');
        respErr.status = 400;
        next(respErr);
    }
    
    const searchQuery = `${searchParams.searchType} LIKE '%${searchParams.searchText}'`;

    db.all(`SELECT * FROM Quotes ${searchQuery}`, (err, data) => {
        if (err) {
            next(err);
        } else if (!data) {
            let respErr = new Error('Search returned no results');
            respErr.status = 404;
            next(respErr);
        } else {
            res.send({quotes: data});
        }
    });
});


module.exports = fortuneAPI;
