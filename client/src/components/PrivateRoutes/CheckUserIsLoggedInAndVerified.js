import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const CheckUserIsLoggedInAndVerified = () => {
    //Checking if currentUser exists
    const { user: currentUser } = useSelector((state) => state.auth);
    //Checking if his email is verified
    const {verified} = useSelector((state)=> state.auth.infos)

    //console.log("user is verified?"+verified)

    if (currentUser && verified === true){
        //Outlet is like a middleware saying proceed to your route
        return <Outlet/>
    }else if (currentUser && verified === false){
        return <Navigate to={'/verify-email'}/>
    }else {
        return  <Navigate to={'/login'}/>
    }
    //return currentUser ? <Outlet/>: <Navigate to={'/login'}/>
}
export default CheckUserIsLoggedInAndVerified
