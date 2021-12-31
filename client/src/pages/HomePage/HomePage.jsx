import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useHistory } from "react-router-dom";
import "./HomePage.scss"
import Login from '../LogIn/Login';
import axios from 'axios';

export default function HomePage() {
    let history = useHistory();
    // const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const login = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login", {
            username: e.target.email.value,
            password: e.target.password.value
        }).then(response => {
            if (response.data.token) {
                sessionStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
            } else {
                setErrorLogin(true);
                setErrorMsg(response.data.error.message);
            }
        })
    };

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
            <Login login={login}/>
        </div>
    )
}

