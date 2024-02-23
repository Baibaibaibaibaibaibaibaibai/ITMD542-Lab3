const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/contacts.db');

// 连接数据库
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the contacts database.');
});

// 初始化联系人表
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    notes TEXT,
    createdAt TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

module.exports = db;
