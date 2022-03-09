const Register = () =>{
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="basic-login">
                        <h3 className="text-center mb-60">Signup From Here</h3>
                        <form action="#">
                            <label htmlFor="name">Username <span>**</span></label>
                            <input id="name" type="text" placeholder="Enter Username or Email address..." />
                            <label htmlFor="email-id">Email Address <span>**</span></label>
                            <input id="email-id" type="text" placeholder="Enter Username or Email address..." />
                            <label htmlFor="pass">Password <span>**</span></label>
                            <input id="pass" type="password" placeholder="Enter password..." />
                            <div className="mt-10" />
                            <button className="btn btn-black w-100">Register Now</button>
                            <div className="or-divide"><span>or</span></div>
                            <button className="btn w-100">login Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
