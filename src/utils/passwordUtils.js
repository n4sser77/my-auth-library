const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);

}

async function comparePasswords(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword,hashedPassword);
}

module.exports = { hashPassword, comparePasswords };