import React, {useEffect, useRef} from "react";
import {get_Users, ban_User, unban_User, delete_User, make_Admin, get_User} from "../../../actions/User/user";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {login} from "../../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const UpdateUser = (props) => {

    // const onChangeUsername = (e) => {
    //     const username = e.target.value;
    //     setUsername(username);
    // };
    const form = useRef();
    const checkBtn = useRef();
    const { message } = useSelector(state => state.message);

    const {username} = useParams()
    const user = useSelector((action) => action.payload);
   // console.log(route)
  // console.log(user)
   //  const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(username)
    useEffect(async () => {
        dispatch(get_User(username))
        // console.log(users.length)
    }, []);


    const handleUpdate= (e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            // dispatch(login(username, password))
            //     .then(() => {
            //         props.history.push("/profile");
            //         window.location.reload();
            //     })
            //     .catch(() => {
            //     });
        } else {

        }
    };

    return(
        <div className="card-body">
            <h4 className="card-title mb-4">Update user</h4>
            <form onSubmit={handleUpdate} ref={form}>
                <div className="row">
                <div className="col">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        disabled
                    />
                </div>
                    <div className="col">
                        <label htmlFor="username">FirstName</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            // value={phone}
                            // onChange={onChangePhone}
                            // validations={[required]}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor="username">LastName</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            // value={phone}
                            // onChange={onChangePhone}
                            // validations={[required]}
                        />
                    </div>


                </div>



                <div className="form-group">
                    <button className="btn btn-primary btn-block" >
                        <span>Update</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}
export default UpdateUser
