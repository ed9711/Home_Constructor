import React from 'react';
import axios from "axios";
import "./Input.scss";
import { API_URL } from '../../config';

export default function Input(props) {
    // console.log(props.history);
    // decapitated function, could be used for other user inputs in the future
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/user/`, {salary:e.target.salary.value})
        .then(response => {
            localStorage.setItem("profile", JSON.stringify(response.data[0]))
            props.history.push('/build');
          }
        ).catch(error => console.error(error));
      };

    return (
        <div className="input">
            <form className="inputform" action="#" method="post" id="form" onSubmit={(event) => handleSubmit(event)}>
            <label className="inputform__lable" htmlFor="salary">
              What is your monthly salary?
            </label>
            <input
              className="inputform__field"
              type="text"
              name="salary"
              id="salary"
              placeholder="monthly salary..."
              required
              pattern="^[0-9]+$"
            ></input>
          </form>
          <button className="inputform__submit" type="submit" form="form" >
            Start model construction
          </button>
        </div>
    )
}
