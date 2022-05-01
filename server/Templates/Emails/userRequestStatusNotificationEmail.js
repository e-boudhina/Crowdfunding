
const userRequestStatusNotificationEmailTemplate = (user, incubator, userRequest) => {
    //console.log(user);
    // <h2><a href="${process.env.BASE_ADDRESS}/services/${user.resetPasswordToken}" className="btn btn-black">Click on this link to reset your password: </h2>
    return mailOptions = {
        from:  process.env.MAIL_FROM,
        to: `${user.email}`,
        subject: `Your Office Space Request has been ${userRequest.status?"Approved":" Rejected"}`,

        //for testing
        html:   `<div className="email" style="
                            border: 1px solid black;
                            padding: 20px;
                            font-family: sans-serif;
                            line-height: 2;
                            font-size: 20px;
                            ">
             <h1>Hello ${user.username},</h1>
            <p>The request you submitted on the ${userRequest.createdAt} has been ${userRequest.status?"Approved":" Rejected"} by the incubator ${incubator.firstName+" "+incubator.lastName} </p>
            <p>If you would like to request further information you can email him using his email adress:  ${incubator.email}</p>
            <p>You can also reach him directly on his sellphone:  ${incubator.phone}</p>
    

            
            <h3>${userRequest.status?"Congratulations,":" Regards,"}</h3>
            <h3>All the best,</>
            <h3>BucksBooks Team</h3>
             </div>`

    }
}
module.exports =userRequestStatusNotificationEmailTemplate
