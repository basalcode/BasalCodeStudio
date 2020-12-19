const bcrypt = require('bcrypt');
const saltRounds = require('../../.private/security/bcrypt').saltRounds;

module.exports = {
    hash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) reject(new Error(err));

                resolve(hash);
            });
        }); 
    },
    compare: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) reject(new Error(err));

                resolve(result);
            });
        });
    }
}