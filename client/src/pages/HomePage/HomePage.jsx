import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useHistory } from "react-router-dom";
import "./HomePage.scss"
import Login from '../LogIn/Login';

export default function HomePage() {
    let history = useHistory();
    // const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const login = (e) => {};

    const signUp = (e) => {};

    // if (localStorage.getItem("profile")){
    if (isLoggedIn){
        return (
            <div className="home">
                <div className="home__title">Home Constructor</div>
                <Link className="home__start" to="/build">Start Model Construction</Link>
            </div>
        )
    }

    return (
        <div className="home">
            <div className="home__title">Home Constructor</div>
            {/* <Input history={history}/> */}
            <Login login={login} signUp={signUp}/>
        </div>
    )
}

