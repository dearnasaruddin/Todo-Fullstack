const bcrypt = require('bcryptjs');
const { readFile } = require('../localDatabase/fileReadWrite');

const loginController = (req, res) => {
    const { email, password } = req.body

    // ===== validation ======
    let errors = {}
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!email) {
        errors.email = 'email is required'
    }
    if (!pattern.test(email)) {
        errors.email = 'enter a valid email'
    }
    if (!password) {
        errors.password = 'password is required'
    }

    if (errors.email || errors.password) {
        res.send({ errors })
    } else {
        const userData = readFile()
        const findUserbyEmail = userData.find((user) => user.email == email)

        bcrypt.compare(password, findUserbyEmail?.password, (err, response) => {
            if (!findUserbyEmail || !response) {
                errors.loginError = 'Invalid Credential'
                res.send({errors})
            }else{
                res.send({"success": "Login successful"})
            }
        })
    }
}

module.exports = loginController