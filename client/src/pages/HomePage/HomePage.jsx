import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'

export default function HomePage() {
    if (localStorage.getItem("profile")){
        return (
            <div className="home">
                <div className="home__title">Home Constructor</div>
                <Link to="/build">Start model construction</Link>
            </div>
        )
    }

    return (
        <div className="home">
            <div className="home__title">Home Constructor</div>
            <Input/>
        </div>
    )
}

