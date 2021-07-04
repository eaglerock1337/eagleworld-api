const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./api.db');

db.serialize( () => {
    db.run('DROP TABLE IF EXISTS Quotes');
    db.run('CREATE TABLE Quotes ( ' +
            'id PRIMARY KEY, ' +
            'quote TEXT NOT NULL, ' +
            'author TEXT NOT NULL, ' +
            'author_id TEXT, ' +
            'submitter TEXT NOT NULL, ' +
            'submitter_id TEXT )'
    );
});