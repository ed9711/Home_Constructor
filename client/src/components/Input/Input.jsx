import React from 'react'
import axios from "axios";

export default function Input(props) {
    const handleSubmit = (e, props) => {
        e.preventDefault();
        console.log(props.props);
        axios.post("http://localhost:8080/user/", {salary:e.target.salary.value})
        .then(response => {
            localStorage.setItem("profile", JSON.stringify(response.data[0]))
            props.props.push('/build');
          }
        ).catch(error => console.error(error));
      };

    return (
        <div>
            <form action="#" method="post" className="inputform" id="form" onSubmit={(event) => handleSubmit(event, props)}>
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
