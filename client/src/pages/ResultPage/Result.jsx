import axios from 'axios';
import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom'

export default function Result() {
    const params = useParams();
    const [prices, setPrices] = useState(null);
    const [model, setModel] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8080/prices")
        .then(response => {
            setPrices(response.data);
            return response;
        }).then(axios.get(`http://localhost:8080/model/${params.userId}/${params.modelId}`)
        .then(response => {
            setModel(response.data);
        }));
    }, [])


    if (!model || !prices) {
        return (
            <div>
                
            </div>
        )
    }
    console.log(model);
    console.log(prices);
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
    console.log(total);
    return (
        <div>
            
        </div>
    )
}
