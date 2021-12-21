import axios from 'axios';
import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom'
import "./Result.scss"

export default function Result() {
    const params = useParams();
    const [prices, setPrices] = useState(null);
    const [model, setModel] = useState(null);
    const [salary, setSalary] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/prices")
        .then(response => {
            setPrices(response.data);
            return response;
        }).then(axios.get(`http://localhost:8080/model/${params.userId}/${params.modelId}`)
        .then(response => {
            setModel(response.data);
        }).then(axios.get(`http://localhost:8080/user/${params.userId}`)
        .then(response => {
            setSalary(response.data.salary);
        })));
    }, [params.userId, params.modelId])


    if (!model || !prices || !salary) {
        return (
            <div>
                
            </div>
        )
    }
    // console.log(model);
    // console.log(prices);
    // console.log(salary);
    let total = 0;
    total += parseInt(prices[`${model.style}_${model.land}`]);
    if (model.location === "vancouver"){
        total = total * 2.2;
    } else {
        total = total * 2;
    }
    if (model.age > 50) {
        total = total * 0.5;
    } else if (model.age > 20) {
        total = total * 0.8;
    }
    const month = (Math.log(1+(total*0.95*0.0025)/(salary/3))/Math.log(1+0.0025));

    return (
        <div className="result">
            <div className="result__title">Your home price is estimated at ${total}</div>
            <div className="result__detail">At a interest rate of 3% a year, 
            with your monthly take home salary of ${Math.round(salary * 100) / 100} and 5% down payment, 
            it is recommended that you take out a {Math.round(month/12) + 1} years loan.</div>

            <ul className="result__detail">
                {/* <li className="result__item">Model Id: {model.id}</li> */}
                <li className="result__item">Location: {model.location}</li>
                <li className="result__item">Type: {model.style}</li>
                <li className="result__item">Land size: {model.land}</li>
            </ul>
        </div>
    )
}
