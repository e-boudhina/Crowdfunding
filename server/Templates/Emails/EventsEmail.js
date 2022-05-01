
const EventEmailTemplate = (user) => {
    //console.log(user);
    return mailOptions = {
        from: process.env.MAIL_FROM,
        to: `${user.email}`,
        subject: "Joining your event",

        //for testing
        html: `<div className="email" style="
                            border: 1px solid black;
                            padding: 20px;
                            font-family: sans-serif;
                            line-height: 2;
                            font-size: 20px;
                            ">
             <h1>Hello ${user.username},</h1>
    

            <p>All the best,</p>
            <p>BucksBooks Team</p>
             </div>`

    }
}
module.exports = EventEmailTemplate
