import React, { useState } from 'react'
import SignUp from '../SignUp/SignUp';
import "./Login.scss"

export default function Login(props) {

    const [display, setDisplay] = useState("none");

    // toggle to display signup
    const handleSignUp = () => {
        setDisplay("block");
    };

    // toggle to hide signup
    const handleCancel = () => {
        setDisplay("none");
    };

    return (
        <>
        <div className='login'>
            <form action="" className='login__form' method="post" id="login__form" onSubmit={(event) => props.login(event)}>
                {/* <label className="login__label" htmlFor="email">Email: </label> */}
                <input
                className="login__field"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                required
                ></input>
                {/* <label className="login__label" htmlFor="password">Password: </label> */}
                <input
                className="login__field"
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                required
                ></input>
            </form>
            <button className="login__button" type="submit" form="login__form" >Log In</button>
            <hr />
            <button className='login__button login__button--signup' type='click' onClick={handleSignUp}>Create new account</button>
        </div>
        <div className='login__message'>{props.message}</div>
        <SignUp display={display} cancel={handleCancel}/>
        </>
    )
}
