import React from 'react'
import "./SignUp"

export default function SignUp() {
    // pop up from login page

    return (
        <div className='signup'>
            <form action="" className='signup__form' method="post" id="signup__form" onSubmit={(event) => handleSubmit(event)}>
            <label className="signup__label" htmlFor="email">Email</label>
            <input
              className="signup__field"
              type="text"
              name="email"
              id="email"
              placeholder="example@email.com"
              required
              pattern=""
            ></input>
            <label className="signup__label" htmlFor="password">Password</label>
            <input
              className="signup__field"
              type="text"
              name="password"
              id="password"
              required
              pattern=""
            ></input>
            <label className="signup__label" htmlFor="password__re">Re-enter Password</label>
            <input
              className="signup__field"
              type="text"
              name="password__re"
              id="password__re"
              required
              pattern=""
            ></input>
            <label className="signup__label" htmlFor="salary">What is your monthly salary?</label>
            <input
              className="signup__field"
              type="text"
              name="salary"
              id="salary"
              placeholder="monthly salary..."
              required
              pattern="^[0-9]+$"
            ></input>
            </form>
            <button className="signup__submit" type="submit" form="signup__form" >Sign Up</button>
        </div>
    )
}
