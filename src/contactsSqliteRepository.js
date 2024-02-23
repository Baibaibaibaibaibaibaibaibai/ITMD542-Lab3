const db = require('./database.js'); // 假设database.js在同一目录下

const repo = {
    queryAll: async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM contacts", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },
    queryById: async (uuid) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM contacts WHERE id = ?", [uuid], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
    create: async (contact) => {
        const { firstName, lastName, email, notes } = contact;
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO contacts (id, firstName, lastName, email, notes, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
                    [id, firstName, lastName, email, notes, createdAt], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(id);
                    });
        });
    },
    deleteById: async (uuid) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM contacts WHERE id = ?", [uuid], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    },
    update: async (contact) => {
        const { id, firstName, lastName, email, notes } = contact;
        return new Promise((resolve, reject) => {
            db.run("UPDATE contacts SET firstName = ?, lastName = ?, email = ?, notes = ? WHERE id = ?",
                    [firstName, lastName, email, notes, id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
        });
    },
};

module.exports = repo;
