import React, { useState } from 'react'
import "./SignUp"


export default function SignUp(props) {
    // pop up from login page
    const [errMessage, seterrMessage] = useState("");
    const signUp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/user/signup", {
            email: e.target.email.value,
            password: e.taget.password.value,
            salary: e.target.salary.value
        }).then(response => {
            if (!response.data.message) {
                // success message?
                seterrMessage("");
                alert("Account creation successful!");
                props.cancel();
            } else {
                seterrMessage(response.data.message);
            }
        })
    };

    return (
        <div className='signup' style={{display:props.display}}>
            <form action="" className='signup__form' method="post" id="signup__form" onSubmit={(event) => signUp(event)}>
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
            <button className="signup__cancel" type="click" onClick={props.cancel}  >Cancel</button>
            <div className='signup__message'>{errMessage}</div>
        </div>
    )
}
