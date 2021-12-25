import React from 'react'
import "./Login"

export default function Login() {
    return (
        <div className='login'>
            <form action="" className='login__form' method="post" id="login__form" onSubmit={(event) => handleSubmit(event)}>
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
            <button className='login__submit' type='click'>Create new account</button>
        </div>
    )
}
