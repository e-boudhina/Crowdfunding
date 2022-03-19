import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../../actions/auth";
import DatePicker from "react-datepicker"
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
const vpassword = (value) => {
  if (value.length < 4 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 4 and 40 characters.
      </div>
    );
  }
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

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
  }
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  }
const onChangeAddress = (e) => {
  const address = e.target.value;
  setAddress(address);
}
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeBirthDate = (e) => {
    const birthdate = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password , firstName, lastName , address))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };
  return (
    <div className="login-area pt-120 pb-120">
<div className="container">
  <div className="row">
    <div className="col-lg-8 offset-lg-2">
      <div className="basic-login">
      <h3 className="text-center mb-60">Signup From Here</h3>
        <Form onSubmit={handleRegister} ref={form}>
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

<label htmlFor="lastName "> Last name  : </label>
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
                  validations={[required, vaddress]}
                />

<label htmlFor="birthdate "> Birthdate : </label>
                <DatePicker
                selected={birthdate}
                  className="form-control"
                  name="birthdate"
                  value={birthdate}
                  onChange={birthdate => setBirthdate(birthdate)}
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
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-black w-100">Sign Up</button>
                <div className="or-divide"><span>or</span></div>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
    </div>
  </div>
</div>
</div>
  );
};
export default Register;