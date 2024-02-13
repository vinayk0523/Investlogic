const crypto = require('crypto');

const encryption = (password,salt) => {
    const hash = crypto.createHash('sha256');  
    const hashedText = hash.update(password + salt).digest('hex');
    return hashedText;

}

module.exports = {encryption}
