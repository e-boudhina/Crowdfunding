//const config = require("../config/auth.config");
const db = require("../../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const crypto = require("crypto");
const buffer = require("buffer");
const transport = require("../../config/nodemailer");
var fs = require("fs");
var path = require("path");
const ResetPasswordEmailTemplate = require("../../Templates/Emails/ResetPasswordEmail");
const VerificationEmailTemplateTemplate = require("../../Templates/Emails/VerificationEmail");

const makeAdmin = asyncHandler(async (req, res) => {
  if (!username) {
    res.status(400);
    throw Error("username is required");
  }
  const user = User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles.push(role._id);
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User is now admin!" });
        });
      })
    );
});

const signup = asyncHandler(async (req, res, next) => {
  //Getting form fields
  const { username, email, password } = req.body;
  //check if form contains required fields
  if (!username || !email || !password) {
    res.status(400);
    throw Error("Please add all fields");
  }
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
     verifyEmailToken: await generate_custom_token(),
     img: 
     req.file ? 
     {
      data: req.file.filename,
      contentType: 'image/png'
  } :
  {
    data: "alternative-profile.png",
    contentType: 'image/png'
}

    // verifyEmailToken: crypto.randomBytes(32).toString("hex") // this function can be either used synchronously or asynchronously
    //Read more about transforming an async function to a normal function
    // it had an error and a buffer as return callback

}
  );
  user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(async (err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          //sending email
          //if you remove the await the rest of the code will continue and a success message will be returned even though and error can be raised
          // you can however  remove it to make the request will be much faster
          console.log("Sending VerificationEmail Email...")
          await transport.sendMail(VerificationEmailTemplateTemplate(user))
              .then(() => console.log('Verification Email Sent Successfully!'))
              .catch(error => {
                console.log(error)
              });

          res.send({
            message:
              "User was registered successfully! Please check your inbox for email verification",
          });
        });
      });
    }
  });
});

const signin = asyncHandler(async (req, res) => {
  //Getting form fields
  const { username, password } = req.body;

  //check if form contains required fields
  if (!username || !password) {
    res.status(400);
    throw Error("Please add all fields");
  }

  User.findOne({
    username: req.body.username,
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
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        user: {
          id: user._id,
          roles: authorities,
          accessToken: token,
          username: user.username,
        },

        infos: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          verified: user.verified,
          email: user.email,
          password: user.password,
          phone: user.phone,
          image: user.img,
          birthdate: user.birthdate,
        },
      });
    });
});

const reset_password = asyncHandler(async (req, res) => {
  //console.log('reset password end point reached')
  const { username } = req.body;
  if (!username) {
    res.status(400);
    throw Error("Please provide a username");
  }
  //start
  const generatedResetPasswordToken = await generate_custom_token();
  //fetching the username email
  //Is there another way to write this besides chaining it using then?
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      // if you do not put return the request will be sent back but the rest of the code will continue to execute, which will cause an error
      return res.status(200).send({
        message: `There is no user registered under the username : "${username}"`,
      });
    }
    // console.log('this line')
    // if user exists
    user.resetPasswordToken = generatedResetPasswordToken;
    // Token will be valid for one hour ( in milliseconds)
    user.resetPasswordExpireToken = Date.now() + 3600000;
    user.save().then(async (result) => {
      // console.log(result)
      //if user saved

      //I  restructured this file for the third time by moving the templates to the templates directory + moved the node mail transport configuration to the "conf" directory.
      // I exported the Templates as function that take mailOptions dynamically  and exported them to be used here it to decreased the load here and minimize the code.
      console.log("Sending Reset Password Email...");
      await transport
        .sendMail(ResetPasswordEmailTemplate(user))
        .then(() => console.log("Reset Password Email Sent Successfully!"))
        .catch((error) => {
          console.log(error);
        });
      res.status(200).send({
        message: "Reset password email sent, please check your email!",
      });
    });
  });

  //end
  // (async () => {
  //   console.log(await generate_custom_token())
  // })()
  // these 2 method return the same value
  //console.log( await generate_custom_token())
  // generate_custom_token().then(data => {
  //   console.log(data);
  // });

  // res.status(200).send({
  //   message: "end point reached!",
  // });
});

const new_password = asyncHandler(async (req, res) => {
  //Getting form fields
  const newPassword = req.body.password;
  const sentPasswordResetToken = req.body.password_reset_token;

  //check if form contains required fields
  if (!newPassword || !sentPasswordResetToken) {
    res.status(400);
    throw Error("Please provide a valid password");
  }

  User.findOne({
    resetPasswordToken: sentPasswordResetToken,
    resetPasswordExpireToken: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      return res.status(422).send({
        error: "Try again, session expired",
      });
    }
    //hashSync did not work. Why? async/await?
    bcrypt
      .hash(newPassword, 8)
      .then((hashedPassword) => {
        //Updating user with new data
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireToken = undefined;
        user.save().then((savedUser) => {
          res.status(200).send({
            message:
              "Password updated, you can now login using your new password!",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

const verify_email = asyncHandler(async (req, res) => {
  //I removed most of the comments from this function since they are the same
  // if you would like to learn how it works you can check the "reset_password" above and follow along to understand

  const verifyEmailToken = req.params.verify_email_token;
  // console.log(verifyEmailToken)
  if (!verifyEmailToken) {
    res.status(400);
    throw Error("Please provide a valid verification token");
  }
  // else {
  //    return  res.status(200).send("here")
  // }

  User.findOne({ verifyEmailToken: verifyEmailToken }).exec((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!user) {
      return res.status(200).send({
        message: `There is no user registered using that token => ${verifyEmailToken} <= `,
      });
    }
    //else
    user.verified = true;
    user.verifyEmailToken = undefined;
    // you can send email notification here
    user.save().then((savedUser) => {
      res.status(200).send({
        message: `Thank you ${user.username}. Your account is now verified!`,
      });
    });
    // try to find away to move this code out of user.find one
  }); //end user find
});

//TO be developed later to make the code shorter
// can a const function returns a value using return?
const generate_custom_token = async () => {
  return await new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      //console.log("before converting: ", buffer)
      // Output : <Buffer 09 c6 b8 38 33 c2 c1 65 3d 6f 58 08 b6 9e 09 68 ec b8 bf 1d 60 c2 6e 25 be d3 a0 5d 3b 08 b8 00>
      if (err) {
        reject("error generating token");
      }
      resolve(buffer.toString("hex"));
      //console.log("After converting: ", buffer.toString('hex) value)
      // Output: 09c6b83833c2c1653d6f5808b69e0968ecb8bf1d60c26e25bed3a05d3b08b800
    });
  });
};

const resend_EmailToken = asyncHandler(async (req, res) => {

  const {userId} = req;
   if (!userId) {
    res.status(400);
    throw Error("Please provide a valid userId");
  }
   //Fetching the suer
  user = await User.findById(userId);
  //Checking if the user is already verified
   if (user.verified === true){
    return res.send({
      message:  `${user.username}, Your account is already verified!`,
    });
  }
   //else
  console.log("Resending VerificationEmail...")
  await transport.sendMail(VerificationEmailTemplateTemplate(user))
      .then(() => console.log('Resending Verification Email Sent Successful!'))
      .catch(error => {
        console.log(error)
      });

    res.send({
      message:
          "Please check your inbox again for email verification",
    });

});
//Defining the functions as consts than exporting them as an array like this is much easier than exporting them one by one
// you can simply look into module.export and see what are you exporting without scanning the entire file
module.exports = {
  signup,
  signin,
  reset_password,
  new_password,
  verify_email,
  resend_EmailToken,
  makeAdmin,
};
