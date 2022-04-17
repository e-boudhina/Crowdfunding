
const VerificationEmailTemplateTemplate = (user) => {
    //console.log(user);
    return mailOptions = {
        from:  process.env.MAIL_FROM,
        to: `${user.email}`,
        subject: "Verify your email address",

        //for testing
        html:   `<div className="email" style="
                            border: 1px solid black;
                            padding: 20px;
                            font-family: sans-serif;
                            line-height: 2;
                            font-size: 20px;
                            ">
             <h1>Hello ${user.username},</h1>
           <h2><a href="${process.env.BASE_ADDRESS}/verify-email/${user.verifyEmailToken}" className="btn btn-black">Click on this link to verify your email: </h2>
    
            <p>All the best,</p>
            <p>BucksBooks Team</p>
             </div>`

    }
}
module.exports = VerificationEmailTemplateTemplate
