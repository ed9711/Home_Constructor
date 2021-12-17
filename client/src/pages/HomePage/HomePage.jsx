import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useHistory } from "react-router-dom";
import "./HomePage.scss"

export default function HomePage() {
    let history = useHistory();
    if (localStorage.getItem("profile")){
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
            <Input history={history}/>
        </div>
    )
}

