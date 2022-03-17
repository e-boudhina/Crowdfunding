//const config = require("../config/auth.config");
const db = require("../../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler')

const crypto = require('crypto')
const buffer = require("buffer");
const transport = require("../../config/nodemailer");

const signup = asyncHandler(async (req, res) => {

    //Getting form fields
    const {username, email, password} = req.body

    //check if form contains required fields
    if(!username || !email || !password){
        res.status(400)
        throw Error('Please add all fields')
    }
        var generated_token
        //Read more about transforming an async function to a normal function
         // it had an error and a buffer as return callback
        //  var buffer= crypto.randomBytes(32)
        // generated_token=  buffer.toString("hex")

        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        verified: 0,
        address: req.body.address,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        verifyEmailToken: crypto.randomBytes(32).toString("hex")

    });
    user.save(async (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        //sending email
        //if you remove the await the rest of the code will continue and a success message will be returned even though and error can be raised
        // However if you remove it the request will be much faster
        await basic_email_template(user)

        if (req.body.roles) {
            Role.find(
                {
                    name: {$in: req.body.roles}
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({message: err});
                            return;
                        }
                        res.send({message: "User was registered successfully!"});
                    });
                }
            );
        } else {
            Role.findOne({name: "user"}, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "User was registered successfully!"});
                });
            });
        }

    });
  }
  );

  const signin = asyncHandler(async (req, res) => {

          //Getting form fields
          const {username, password} = req.body

          //check if form contains required fields
          if(!username || !password){
              res.status(400)
              throw Error('Please add all fields')
          }

    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, process.env.secret, {
          expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          user : {  
          id: user._id,
          roles: authorities,
          accessToken: token,
          username: user.username
          ,} ,
  
          infos : {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            verified: user.verified,
            email: user.email,
          }


        });
        
      });
  }
  );

  const reset_password = asyncHandler(async (req, res) => {
      //console.log('reset password end point reached')
      const {username} = req.body
          if(!username){
              res.status(400)
              throw Error('Please provide a username')
          }

      crypto.randomBytes(32, (err,buffer)=>{
          if (err){
            console.log(err)
          }
          //console.log("before converting: ", buffer)
          // Output : <Buffer 09 c6 b8 38 33 c2 c1 65 3d 6f 58 08 b6 9e 09 68 ec b8 bf 1d 60 c2 6e 25 be d3 a0 5d 3b 08 b8 00>
          const generatedResetPasswordToken = buffer.toString("hex")
          //console.log("After converting: ", emailToken)
          // Output: 09c6b83833c2c1653d6f5808b69e0968ecb8bf1d60c26e25bed3a05d3b08b800
          //fetching the username email
          //Is there another way to write this besides chaining it using then?
          User.findOne({username: username}).then(user => {
              if (!user){
                  // if you do not put return the request will be sent back but the rest of the code will continue to execute, which will cause an error
                  return res.status(400).send({
                      error: `There is no user registered under the username : "${username}"`
                  })
              }
              // console.log('this line')
              // if user exists
              user.resetPasswordToken = generatedResetPasswordToken
                  // Token will be valid for one hour ( in milliseconds)
              user.resetPasswordExpireToken = Date.now()+ 3600000
                user.save().then(async (result) => {
                    // console.log(result)
                    //if user saved
                    // content
                    const text = 'TEXT EXAMPLE'
                    //I already moved the node mail transport configuration to the "conf" directory. However, I still need to make email templates as a function and export it.
                    await transport.sendMail({
                        from: process.env.MAIL_FROM,
                        to: `${user.email}`,
                        subject: "Resetting your password",
                        //for testing
                        html: `<div className="email" style="
                            border: 1px solid black;
                            padding: 20px;
                            font-family: sans-serif;
                            line-height: 2;
                            font-size: 20px;
                            ">
             <h1>Hello ${user.username},</h1>
            <h2><a href="${process.env.BASE_ADDRESS}/new-password/${user.resetPasswordToken}" className="btn btn-black">Click on this link to reset your password: </h2>
            <p>${text}</p>

            <p>All the best,</p>
            <p>BucksBooks Team</p>
             </div>`
                    })

                    res.status(200).send({
                        message: "Reset password email sent, please check your email!"
                    })


                })
              })

      })
  }
  );


const new_password = asyncHandler(async (req, res) => {

    //Getting form fields
    const newPassword = req.body.password
    const sentPasswordResetToken = req.body.password_reset_token

    //check if form contains required fields
    if(!newPassword || !sentPasswordResetToken){
        res.status(400)
        throw Error('Please provide a valid password')
    }


    User.findOne({resetPasswordToken: sentPasswordResetToken, resetPasswordExpireToken: {$gt: Date.now() }
    }).then((user)=>{
        if (!user){
            return res.status(422).send({
                error: "Try again, session expired"
                }
            )
        }
        //hashSync did not work. Why? async/await?
        bcrypt.hash(newPassword,8).then((hashedPassword) => {
            //Updating user with new data
            user.password = hashedPassword
            user.resetPasswordToken = undefined
            user.resetPasswordExpireToken = undefined
            user.save().then((savedUser)=>{
                res.status(200).send({
                    message: "Password updated, you can now login using your new password!"
                })
            })
        }).catch(err=>{
            console.log(err);
        })
    })

});


const verify_email = asyncHandler(async (req, res) => {
        //I removed most of the comments from this function since they are the same
        // if you would like to learn how it works you can check the "reset_password" above and follow along to understand

    const verifyEmailToken= req.params.verify_email_token
    // console.log(verifyEmailToken)
    if(!verifyEmailToken){
        res.status(400)
        throw Error('Please provide a valid verification token')
    }
    // else {
    //    return  res.status(200).send("here")
    // }

    User.findOne({verifyEmailToken: verifyEmailToken}).exec((err, user) => {
        if (err) {
            return res.status(400).send({message: err});
        }
        if (!user) {
            return res.status(200).send({message: `There is no user registered using that token => ${verifyEmailToken} <= `});
        }
        //else
        user.verified = true
        user.verifyEmailToken = undefined
        // you can send email notification here
        user.save().then((savedUser)=>{
            res.status(200).send({
                message: `Thank you ${user.username}. Your account is now verified!`
            })
        })
        // try to find away to move this code out of user.find one




        })//end user find

   })

//TO be developed later to make the code shorter
// can a const function returns a value using return?
function generate_custom_token(){
    crypto.randomBytes(32, (err,buffer)=>{
        if (err){
            console.log(err)
        }
        return buffer.toString("hex")
    })
}
const basic_email_template = async (user) => {
    const text = 'TEXT EXAMPLE'
    //I already moved the node mail transport configuration to the "conf" directory. However, I still need to make email templates as a function and export it.
    await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: `${user.email}`,
        subject: "Verify email",
        //for testing
        html: `<div className="email" style="
                            border: 1px solid black;
                            padding: 20px;
                            font-family: sans-serif;
                            line-height: 2;
                            font-size: 20px;
                            ">
             <h1>Hello ${user.username},</h1>
            <h2><a href="${process.env.BASE_ADDRESS}/verify-password/${user.verifyEmailToken}" className="btn btn-black">Click on this link to verify your email: </h2>
            <p>${text}</p>

            <p>All the best,</p>
            <p>BucksBooks Team</p>
             </div>`
    })
}

  //Defining the functions as consts than exporting them as an array like this is much easier than exporting them one by one
// you can simply look into module.export and see what are you exporting without scanning the entire file
module.exports = { signup, signin,reset_password, new_password, verify_email}
