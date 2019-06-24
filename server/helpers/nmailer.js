const nodemailer = require('nodemailer')

module.exports = async function (email) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    let info = await transporter.sendMail({
        from: 'CODETALK Team <admin@codetalk.com>',
        to: email,
        html: '<h1>Welcome to CODETALK</h1>'
    })
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}