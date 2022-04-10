import React, {useEffect, useRef, useState} from "react";
import {
    get_Users,
    ban_User,
    unban_User,
    delete_User,
    make_Admin,
    get_User,
    update_User
} from "../../../actions/User/user";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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

const UpdateUser = () => {



        // const [firstName,setFirstName] = useState('')
        // lastName:"",
        // phone:"",
        // birthdate: "",
        // adress: ""

    //const {user} = useParams()
    const location = useLocation()
    const currentUser = location.state
        // console.log(currentUser)

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
        //dispatch(get_User(username))
         console.log(form.current)
    }, [form]);


    const handleUpdate= (e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(update_User(form))
                .then(() => {

                })
                .catch(() => {
                });
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
                        value={currentUser.username}

                    />
                </div>
                    <div className="col">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            disabled
                            value={currentUser.email}
                        />
                    </div>


                    <div className="col">
                        <label htmlFor="username">FirstName</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={currentUser.firstName}
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
                             value={currentUser.lastName}
                            // onChange={onChangePhone}
                            // validations={[required]}
                        />
                    </div>
                </div>
                <div className="row">

                    <div className="col">
                        <label htmlFor="username">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={currentUser.phone}
                            // onChange={onChangePhone}
                            // validations={[required]}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="username">Birthdate</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={currentUser.birthdate}
                            // onChange={onChangePhone}
                            // validations={[required]}
                        />
                    </div>

                        <div className="col">
                            <label htmlFor="username">Adress</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={currentUser.address}
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
