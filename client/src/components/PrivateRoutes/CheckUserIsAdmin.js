import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const CheckUserIsAdmin= () => {
    //Checking if currentUser exists
    const { user: currentUser } = useSelector((state) => state.auth);
    //console.log("user is verified?"+verified)

    if (currentUser.roles.includes("ROLE_ADMIN")){
        //Outlet is like a middleware saying proceed to your route
        return <Outlet/>
    }else {
    return  <Navigate to={'/'}/>
}
    //return currentUser ? <Outlet/>: <Navigate to={'/login'}/>
}
export default CheckUserIsAdmin
