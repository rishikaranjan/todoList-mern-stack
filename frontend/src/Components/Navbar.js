import { Link, useNavigate } from "react-router-dom";
import {Store} from '../Store'
import { useContext } from "react";


export const Navbar = () => {

    const navigate = useNavigate();

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const signoutHandler = () => {

        ctxDispatch({type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        navigate('/signin');

    }


    return (
        <div className="navbar">

            <img src = ""/>
            <h1>Welcome {userInfo.name}</h1>

            <Link to ='/signin'>
            <h3 onClick={signoutHandler}>Sign Out</h3>
            </Link>
            

            

        </div>
    )
}