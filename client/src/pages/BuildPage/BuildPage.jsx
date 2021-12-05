import React, { Component } from 'react'
import axios from 'axios';

export default class BuildPage extends Component {
    state = {prices:null, model:{}, display:[
        {value: "block"},
        {value: "none"},
        {value: "none"},
        {value: "none"}
    ]};
    
    componentDidMount = () => {
        console.log("build did mount");
        const newState = this.state;
        const promise = axios.get("http://localhost:8080/prices")
        .then(response => {
            newState.prices = response.data;
            return response;
        });
        if (this.props.match.params.modelId){
            promise.axios.get(`http://localhost:8080/model/${localStorage.getItem("profile")}/${this.props.match.params.modelId}`)
            .then(response => {
                newState.model = response.data;
                return response;
            })
        }
        promise.then(response => this.setState(newState));
    }

    onClickNext = (id, e, key) => {
        e.preventDefault();
        const newState = this.state;
        newState.display[id].value = "none";
        newState.display[id+1].value = "block";
        newState.model[key] = e.target.form.elements[key].value;
        console.log(e.target.form.elements[key].value);
        this.setState(newState);
    }

    onChange = (e, key) => {
        const newState = this.state;
        newState.model[key] = e.target.form.elements[key].value;
        this.setState(newState);
    }

    onClickLast = (id, e) => {
        e.preventDefault();
        const newState = this.state;
        newState.display[id].value = "none";
        newState.display[id-1].value = "block";
        this.setState(newState);
    }

    onSumbit = (e) => {
        console.log(e.target.age.value);
        e.preventDefault();
        axios.post("http://localhost:8080/model", {
            style: this.state.model.style, 
            land: this.state.model.land, 
            location: this.state.model.location, 
            age: e.target.age.value, 
            userId: localStorage.getItem("profile")
        }).then(response => {
            console.log("created model"+response.data)
            this.props.history.push(`/result/${response.data[0]}`)
        });
    }

    render() {
        if (!this.state.prices) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <form action="" className="build__form" id="model__info" onSubmit={e => this.onSumbit(e)}>
                    <div className="build__group" style={{display: this.state.display[0].value}}>
                        <label>
                            <input type="radio" value="house" name="style" defaultChecked onChange={(e) => this.onChange(e, "style")}/>
                            House
                        </label>
                        <label>
                            <input type="radio" value="townhouse" name="style" onChange={(e) => this.onChange(e, "style")} />
                            Townhouse
                        </label>
                        <label>
                            <input type="radio" value="apratment" name="style" onChange={(e) => this.onChange(e, "style")} />
                            Apartment
                        </label>
                        <button className="bulid__next" type="button" onClick={(e) => this.onClickNext(0, e, "style")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[1].value}}>
                        <button className="bulid__prev" type="button" onClick={(e) => this.onClickLast(1, e)}>Previous</button>
                        <label>
                            <input type="radio" value="large" name="land" defaultChecked onChange={(e) => this.onChange(e, "land")}/>
                            Large land
                        </label>
                        <label>
                            <input type="radio" value="small" name="land" onChange={(e) => this.onChange(e, "land")}/>
                            Small land
                        </label>
                        <button className="bulid__next" type="button" onClick={(e) => this.onClickNext(1, e, "land")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[2].value}}>
                        <button className="bulid__prev" type="button" onClick={(e) => this.onClickLast(2, e)}>Previous</button>
                        <label>
                            <input type="radio" value="vancouver" name="location" defaultChecked onChange={(e) => this.onChange(e, "location")}/>
                            Vancouver
                        </label>
                        <label>
                            <input type="radio" value="toronto" name="location" onChange={(e) => this.onChange(e, "location")}/>
                            Toronto
                        </label>
                        <button className="bulid__next" type="button" onClick={(e) => this.onClickNext(2, e, "location")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[3].value}}>
                        <button className="bulid__prev" type="button" onClick={(e) => this.onClickLast(3, e)}>Previous</button>
                        <label>
                            <input type="radio" value="60" name="age" defaultChecked onChange={(e) => this.onChange(e, "age")}/>
                            Older higher than 50 years
                        </label>
                        <label>
                            <input type="radio" value="30" name="age" onChange={(e) => this.onChange(e, "age")}/>
                            Age between 50 years and 20 years
                        </label>
                        <label>
                            <input type="radio" value="10" name="age" onChange={(e) => this.onChange(e, "age")}/>
                            Newer than 20 years
                        </label>
                        <button type="submit" form="model__info" className="bulid__submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
