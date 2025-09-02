const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const { readFile, writeFile } = require("../localDatabase/fileReadWrite");

const registrationController = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body

    // ===== validation ======
    let errors = {}
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!username) {
        errors.username = 'UserName is required'
    }
    if (!email) {
        errors.email = 'email is required'
    }
    if (!pattern.test(email)) {
        errors.email = 'enter a valid email'
    }
    if (!password) {
        errors.password = 'password is required'
    }
    if (!confirmPassword) {
        errors.confirmPassword = 'confirm password is required'
    }
    if (password != confirmPassword) {
        errors.confirmPassword = 'confirm password does not matched'
    }

    if (errors.username || errors.email || errors.password || errors.confirmPassword) {
        res.send({ errors })
    } else {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dearnasaruddin@gmail.com",
                pass: "javw yvak hdit lhhh",
            },
        });

        const info = await transporter.sendMail({
            from: 'Todo-Fullstack',
            to: email,
            subject: "Varify Your Email",
            // text: "Hello world",
            html: `<table align=center cellpadding=0 cellspacing=0 style=max-width:600px;background-color:#fff;margin-top:30px;border-radius:8px;overflow:hidden width=100%><tr><td style="background-color:#007bff;padding:30px 20px;color:#fff"align=center><h1 style=margin:0;font-size:24px>Confirm Your Email</h1><tr><td style="padding:30px 20px;color:#333"><p style="font-size:16px;line-height:1.6;margin:0 0 20px">Hello ${username},<p style=font-size:16px;line-height:1.6>Thank you for signing up for Todo-Fullstack! To complete your registration, please confirm your email address by clicking the button below.<div style="text-align:center;margin:30px 0"><a href=# style="background-color:#007bff;color:#fff;text-decoration:none;padding:14px 28px;border-radius:5px;display:inline-block;font-size:16px">Confirm Email</a></div><p style=font-size:14px;line-height:1.6;color:#555>If you did not create an account, no action is required. This link will expire in 24 hours.<tr><td style=background-color:#f5f5f5;text-align:center;padding:20px;font-size:12px;color:#999>© 2025 Todo-Fullstack. All rights reserved.</table>`,
        });

        // transporter.sendMail()

        const hash = await bcrypt.hash(password, 10);

        const userData = readFile()
        userData.push({
            username,
            email,
            password: hash,
        })
        writeFile(userData)

        res.send(`Account Created Successful. A varification mail is Sent to ${email}. Please, varify your email.`)
    }
}

module.exports = registrationController