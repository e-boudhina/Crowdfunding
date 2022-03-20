//Email transport service configuration
//This code was used in resetting the password and email verification, I noticed that it was getting repeated so I moved in to the conf file for code clairy
// Every time we need it we simply call it
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({

    //Configuration
    host: process.env.MAIL_HOST,
    port: process.env.MAIl_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})
module.exports = transport
