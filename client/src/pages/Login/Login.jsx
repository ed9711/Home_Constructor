import React, { useState } from 'react'
import SignUp from '../SignUp/SignUp';
import "./Login"

export default function Login(props) {

    const [display, setDisplay] = useState("none");

    const handleSignUp = () => {
        setDisplay("block");
    };

    const handleCancel = () => {
        setDisplay("none");
    };

    const signUp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/user/signup", {
            email: e.target.email.value,
            password: e.taget.password.value,
            salary: e.target.salary.value
        }).then(response => {
            if (response.data.success) {
                // success message?
                setDisplay("none");
            }
        })
    };

    return (
        <>
        <div className='login'>
            <form action="" className='login__form' method="post" id="login__form" onSubmit={(event) => props.login(event)}>
                <label className="login__label" htmlFor="email">Email</label>
                <input
                className="login__field"
                type="text"
                name="email"
                id="email"
                placeholder="example@email.com"
                required
                ></input>
                <label className="login__label" htmlFor="password">Password</label>
                <input
                className="login__field"
                type="text"
                name="password"
                id="password"
                required
                ></input>
            </form>
            <button className="login__submit" type="submit" form="login__form" >Log In</button>
            <hr />
            <button className='login__submit' type='click' onClick={handleSignUp}>Create new account</button>
        </div>
        <SignUp display={display} signup={signUp} cancel={handleCancel}/>
        </>
    )
}
