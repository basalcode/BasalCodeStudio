const bcrypt = require('bcrypt');
const saltRounds = require('../../../.private/bcrypt').saltRounds;

module.exports = {
    hash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (!err) {
                    resolve(hash);
                } else {
                    const HASHING_FAILD = 'Fail to hash password!';
                    reject(HASHING_FAILD);
                }
            });
        }); 
    },
    compare: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    const COMPARE_FAILD = 'Faild to compare password!';
                    reject(COMPARE_FAILD);
                }
            });
        });
    }
}


