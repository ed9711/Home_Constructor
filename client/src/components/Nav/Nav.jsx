import React from 'react'
import {Link } from 'react-router-dom'
import "./Nav.scss"

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/" className="nav__item nav__item--home">Home</Link>
            <Link to={"/profile"} className="nav__item nav__item--profile">Profile</Link>
        </div>
    )
}
