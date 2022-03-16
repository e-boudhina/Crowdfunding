/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef , useEffect  } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="login-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="basic-login">
              
                <h3 className="text-center mb-60">Login From Here</h3>
                <Form onSubmit={handleLogin} ref={form}>
                  
                    <label htmlFor="username">Username <span>**</span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required]}
                    />
                 
                  
                    <label htmlFor="password">Password <span>**</span> </label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required]}
                    />
                  
                  <div className="login-action mb-20 fix">
                  <span className="forgot-login f-right">
                     <a href="/reset-password">Lost your password?</a>
                    </span>
                    </div>
                    <button className="btn btn-black w-100" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      Login
                    </button>
                    <div className="or-divide">
                      <span>or</span>
                      </div>
                    <button className="btn w-100">Register Now</button>
                    
                
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
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
export default Login;
