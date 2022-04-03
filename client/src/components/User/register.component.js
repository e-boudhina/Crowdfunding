import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register, updateProfile , deleteUser , logout} from "../../actions/auth";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {clearMessage} from "../../actions/message";
import Spinner from "../Spinner";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vname = (value) => {
  if (value.length < 2 || value.length > 25) {
    return (
      <div className="alert alert-danger" role="alert">
        Must be between 2 and 25 characters.
      </div>
    );
  }
};
const vaddress = (value) => {
  if (value.length < 2 || value.length > 200) {
    return (
      <div className="alert alert-danger" role="alert">
        Must be between 2 and 200 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [passwordModified, setPasswordModified] = useState(false);
  var passwordModified = false ;
  const [birthdate, setBirthdate] = useState(new Date());
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [registerForm, setRegisterForm] = useState(true);
  const { infos: currentInfos } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentInfos) {
      setRegisterForm(false);
      setFormTitle("Profile Edit");
      setFirstName(currentInfos.firstName);
      setLastName(currentInfos.lastName);
      setUsername(currentInfos.username);
      setAddress(currentInfos.address);
      setEmail(currentInfos.email);
      setPhone(String(currentInfos.phone));
    } else {
      setFormTitle("Signup");
    }
    //Using return is like using componentWillUnmount hook
     return () => {dispatch(clearMessage())}
  },[currentInfos]);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };
 
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password) {
      passwordModified = true ;
    } else {
      passwordModified = false ;
    }
  };
  const vpassword = (value) => {
    if ( (value.length>0) && (value.length < 4 || value.length > 40)   ){
        return (
          <div className="alert alert-danger" role="alert">
            The password must be between 4 and 40 characters.
          </div>
        );
      }
  };
  const requiredPassword = (value) => {
    if (!value && !currentUser) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };





  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {

      console.log(
        "called " + currentUser.id,
        email,
        password,
        firstName,
        lastName,
        address,
        phone,
        birthdate
      );
      dispatch(updateProfile(
          currentUser.id,
          email,
          password,
          firstName,
          lastName,
          address,
          phone,
          birthdate,
          currentUser.accessToken    )
      )
        .then(() => {
          //Clearing the message is done using useEffect return
          navigate("/profile")
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setIsLoading(true)
      dispatch(
        register(username, email, password, firstName, lastName, address,birthdate,phone)
      )
        .then(() => {
          console.log('done')
          setIsLoading(false)
          setSuccessful(true);
          // dispatch(clearMessage())
          setTimeout(()=>{
                navigate('/login');
              }
              ,5000)
          //You can pust clear message here you need to put it on component unmount
          //dispatch(clearMessage())
        })
        .catch((error) => {
          console.log("here")
          setIsLoading(false)
          setSuccessful(false);
        });
    }
  };
  const deleteUserHandler = () => {
    console.log("clicked delete user");
    dispatch(deleteUser(currentUser.id))
      .then(() => {
        console.log("register component delete user-> then ");
      
          dispatch(logout());
     
      //  props.history.push("/tutorials");
     // navigate("/login")
      })
      .catch(e => {
        console.log(e);
      });
  };

  if (isLoading){
    return <Spinner/>
  }
  return (
    <div className="login-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="basic-login">
              <h3 className="text-center mb-60">{formTitle}</h3>

              <Form
                onSubmit={registerForm ? handleRegister : handleUpdate}
                ref={form}
              >
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />

                      <label htmlFor="firstName "> Name : </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={firstName}
                        onChange={onChangeFirstName}
                        validations={[required, vname]}
                      />

                      <label htmlFor="lastName "> Last name : </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={lastName}
                        onChange={onChangeLastName}
                        validations={[required, vname]}
                      />

                      <label htmlFor="address "> Address : </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={onChangeAddress}
                     
                      />

                      <label htmlFor="birthdate "> Birthdate : </label>
                      <DatePicker
                        selected={birthdate}
                        className="form-control"
                        name="birthdate"
                        value={birthdate}
                        onChange={(birthdate) => setBirthdate(birthdate)}
                        validations={[required]}
                      />

<label htmlFor="phone "> Phone number : </label>
                      <PhoneInput
                        name="phone"
                        country={"tn"}
                        value={phone}
                        validations={[required]}
                        onChange={(phone) => {
                          setPhone(phone);
                          console.log(phone);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                      />
                    </div>
          


                    <div className="form-group">
                      <label htmlFor="password"> Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[vpassword,requiredPassword]}
                      />
                    </div>





                    <div className="form-group">
                      {registerForm ? (
                        <button className="btn btn-black w-100">Sign Up</button>
                      ) : (
                        <button className="btn btn-black w-100">Update </button>
                      )}
                      <div className="or-divide">
                        <span>or</span>
                        </div>

          
                  
                    </div>
                  </div>
                )}
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
            {registerForm ? <> </> :  <button className="btn-border"  onClick={deleteUserHandler}>Delete </button>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
