import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../../config';
import "./SignUp.scss"


export default function SignUp(props) {
    // pop up from login page
    const [errMessage, seterrMessage] = useState("");

    const checkPass = (e, i) => {
        e.preventDefault();
        // console.log(e.target.form[1].value, e.target.value, e.target.form[2].value );
        if (e.target.form[i].value !== e.target.value) {
            seterrMessage("Passwords don't match.");
        } else {
            seterrMessage("");
        }
    };

    const signUp = (e) => {
        e.preventDefault();
        // console.log(e.target["email_sign"].value, e.target["password_sign"].value, e.target.salary.value)
        axios.post(`${API_URL}/user/signup`, {
            email: e.target["email_sign"].value,
            password: e.target["password_sign"].value,
            salary: e.target.salary.value
        }).then(response => {
            if (!response.data.message) {
                // success message?
                seterrMessage("");
                alert("Account creation successful!");
                props.cancel();
            }
        }).catch(err => {
            seterrMessage(err.response.data.message);
        })
    };

    return (
        <div className="signup__background" style={{display:props.display}}>
            <div className='signup'>
                <form action="" className='signup__form' method="post" id="signup__form" onSubmit={(event) => signUp(event)}>
                {/* <label className="signup__label" htmlFor="email">Email</label> */}
                <input
                  className="signup__field"
                  type="text"
                  name="email_sign"
                  id="email_sign"
                  placeholder="Email"
                  required
                ></input>
                {/* <label className="signup__label" htmlFor="password">Password</label> */}
                <input
                  className="signup__field"
                  type="password"
                  name="password_sign"
                  id="password_sign"
                  placeholder="Password"
                  minLength="8"
                  required
                  onChange={(e) => checkPass(e, 2)}
                ></input>
                {/* <label className="signup__label" htmlFor="password__re">Re-enter Password</label> */}
                <input
                  className="signup__field"
                  type="password"
                  name="password__re"
                  id="password__re"
                  placeholder="Retype password"
                  minLength="8"
                  required
                  onChange={(e) => checkPass(e, 1)}
                ></input>
                {/* <label className="signup__label" htmlFor="salary">What is your monthly salary?</label> */}
                <input
                  className="signup__field"
                  type="text"
                  name="salary"
                  id="salary"
                  placeholder="Enter monthly salary"
                  required
                  pattern="^[0-9]+$"
                ></input>
                </form>
                <div className="signup__button">
                    <button className="signup__submit" type="submit" form="signup__form" >Sign Up</button>
                    <button className="signup__cancel" type="click" onClick={props.cancel}  >Cancel</button>
                </div>
                <div className='signup__message'>{errMessage}</div>
            </div>
        </div>
    )
}
