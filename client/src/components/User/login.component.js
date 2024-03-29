/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

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
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  //do not use the below line it will generate an error if the use is not authenticated - value can not be null
  // const { verified} = useSelector((state) => state.auth.infos.verified);
  const { infos: userInfo} = useSelector((state) => state.auth);
  const { user: currentUser} = useSelector((state) => state.auth);
  // const { user: myvar } = useSelector((state) => state.auth);

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
          //  props.history.push("/profile");
          dispatch(clearMessage());
          //navigate("/profile")
         // redirect()
          //  window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const registerHandle = () => {
    console.log("clicked register");

      //  props.history.push("/tutorials");
     navigate("/register")
  
  };


  // if (isLoggedIn && verified === true) {
  //   return <Navigate to="/profile" />;
  // }else if (isLoggedIn && verified === false){
  //   return <Navigate to={'/verify-email'}/>
  // }
  function redirect(){
  // if (currentUser && currentUser.infos.verified === true){
  //   //Outlet is like a middleware saying proceed to your route
  //   return <Navigate to="/profile" />;
  // }else if (currentUser && currentUser.infos.verified === false){
  //   return <Navigate to={'/verify-email'}/>
  // }
  }

  if (isLoggedIn){
    if (userInfo.verified === true){
      //Outlet is like a middleware saying proceed to your route
      return <Navigate to="/profile" />;
    }else if ( userInfo.verified === false){
      return <Navigate to={'/verify-email'}/>
    }
  }


  return (
    <div className="login-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="basic-login">
              <h3 className="text-center mb-60">Login From Here</h3>
              <Form onSubmit={handleLogin} ref={form}>
                <label htmlFor="username">
                  Username <span>**</span>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />

                <label htmlFor="password">
                  Password <span>**</span>{" "}
                </label>
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
            
              

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>

              <div className="or-divide">
                  <span>or</span>
                </div>
                <button className="btn w-100" onClick={registerHandle}>Register Now</button>

            </div>
          </div>
        </div>
      </div>
</div>
  );
};
export default Login;
