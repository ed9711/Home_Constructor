import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/" className="nav__item">Home</Link>
            <Link to={"/profile"} className="nav__item">Profile</Link>
        </div>
    )
}
