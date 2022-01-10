import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useHistory } from "react-router-dom";
import "./HomePage.scss"
import axios from 'axios';
import Login from "../Login/Login";
import { API_URL } from '../../config';

export default function HomePage() {
    let history = useHistory();
    // const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const login = (e) => {
        e.preventDefault()
        axios.post(`${API_URL}/user/login`, {
            email: e.target.email.value,
            password: e.target.password.value
        }).then(response => {
            if (response.data.token) {
                sessionStorage.setItem("id", response.data.id);
                sessionStorage.setItem("profile", response.data.token);
                setIsLoggedIn(true);
            }
        }).catch(err => {
            setErrorLogin(true);
            setErrorMsg(err.response.data.message);
        });
    };

    // if (localStorage.getItem("profile")){
    if (sessionStorage.getItem("profile") || isLoggedIn){
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
            <Login login={login} message={errorMsg}/>
        </div>
    )
}

