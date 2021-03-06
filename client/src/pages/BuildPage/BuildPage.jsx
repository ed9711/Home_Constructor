import React, { Component } from 'react'
import axios from 'axios';
import Model from '../../components/Model/Model';
import { Canvas } from '@react-three/fiber'
import "./BuildPage.scss";
import { API_URL } from '../../config';

export default class BuildPage extends Component {
    state = {prices:null, id:sessionStorage.getItem("id"), model:{}, display:[
        {value: "flex"},
        {value: "none"},
        {value: "none"},
        {value: "none"}
    ]};
    
    componentDidMount = () => {
        // console.log("build did mount");
        const newState = this.state;
        // grab prices after mounting
        axios.get(`${API_URL}/prices`)
        .then(response => {
            newState.prices = response.data;
            // return response;
        })
        .then(response => {
            // if changing existing model
            if (this.props.match.params.modelId){
                axios.get(`${API_URL}/model/${sessionStorage.getItem("id")}/${this.props.match.params.modelId}`)
                .then(response => {
                    newState.model = response.data;
                    // return response;
                })
                .then(response => {
                    this.setState(newState);
                    // return response;
                });
        } else {
            this.setState(newState);
        }})
    }

    // check if option is default option
    checkDefault = (value, key) => {
        return value === this.state.model[key];
    }; 

    // updating state after clicking on the next button
    onClickNext = (id, e, key) => {
        e.preventDefault();
        const newState = this.state;
        newState.display[id].value = "none";
        newState.display[id+1].value = "flex";
        newState.model[key] = e.target.form.elements[key].value;
        // console.log(e.target.form.elements[key].value);
        this.setState(newState);
    }

    // updating state after selecting option
    onChange = (e, key) => {
        const newState = this.state;
        newState.model[key] = e.target.form.elements[key].value;
        this.setState(newState);
    }

    // changing the state back to the previous options
    onClickLast = (id, e) => {
        e.preventDefault();
        const newState = this.state;
        newState.display[id].value = "none";
        newState.display[id-1].value = "flex";
        this.setState(newState);
    }

    // saves current model and route to the result page
    onSumbit = (e) => {
        // console.log(e.target.age.value);
        e.preventDefault();
        if (this.props.match.params.modelId) {
            axios.put(`${API_URL}/model/${this.props.match.params.modelId}`, {
                style: this.state.model.style, 
                land: this.state.model.land, 
                location: this.state.model.location, 
                age: e.target.age.value, 
                userId: sessionStorage.getItem("id")
            })
        .then(response => {
            // console.log("changed model "+response.data)
            this.props.history.push(`/result/${sessionStorage.getItem("id")}/${this.props.match.params.modelId}`)
        });
        } else {
            axios.post(`${API_URL}/model`, {
                style: this.state.model.style, 
                land: this.state.model.land, 
                location: this.state.model.location, 
                age: e.target.age.value, 
                userId: sessionStorage.getItem("id")
            }).then(response => {
                // console.log("created model "+response.data)
                this.props.history.push(`/result/${sessionStorage.getItem("id")}/${response.data[0]}`)
            });
        }
    }

    

    render() {
        if (!this.state.prices) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="build">
                <h3 className="build__notice">You can use WASD/mouse to move the model and scroll wheel to zoom</h3>
                <Canvas style={{ touchAction: "none" }}>
                    <Model render={this.state.model}/>
                </Canvas>
                <form action="" className="build__form" id="model__info" onSubmit={e => this.onSumbit(e)}>
                    <div className="build__group" style={{display: this.state.display[0].value}}>
                        <label className="build__label">
                            <input type="radio" value="house" name="style" defaultChecked={this.checkDefault("house", "style")} onChange={(e) => this.onChange(e, "style")}/>
                            House
                        </label>
                        <label className="build__label">
                            <input type="radio" value="townhouse" name="style" defaultChecked={this.checkDefault("townhouse", "style")} onChange={(e) => this.onChange(e, "style")} />
                            Townhouse
                        </label>
                        <label className="build__label">
                            <input type="radio" value="apartment" name="style" defaultChecked={this.checkDefault("apartment", "style")} onChange={(e) => this.onChange(e, "style")} />
                            Apartment
                        </label>
                        <button className="build__next" type="button" onClick={(e) => this.onClickNext(0, e, "style")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[1].value}}>
                        <button className="build__prev" type="button" onClick={(e) => this.onClickLast(1, e)}>Previous</button>
                        <label className="build__label">
                            <input type="radio" value="large" name="land" defaultChecked={this.checkDefault("large", "land")} onChange={(e) => this.onChange(e, "land")}/>
                            Large land
                        </label>
                        <label className="build__label">
                            <input type="radio" value="small" name="land" defaultChecked={this.checkDefault("small", "land")} onChange={(e) => this.onChange(e, "land")}/>
                            Small land
                        </label>
                        <button className="build__next" type="button" onClick={(e) => this.onClickNext(1, e, "land")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[2].value}}>
                        <button className="build__prev" type="button" onClick={(e) => this.onClickLast(2, e)}>Previous</button>
                        <label className="build__label">
                            <input type="radio" value="vancouver" name="location" defaultChecked={this.checkDefault("vancouver", "location")} onChange={(e) => this.onChange(e, "location")}/>
                            Vancouver
                        </label>
                        <label className="build__label">
                            <input type="radio" value="toronto" name="location" defaultChecked={this.checkDefault("toronto", "location")} onChange={(e) => this.onChange(e, "location")}/>
                            Toronto
                        </label>
                        <button className="build__next" type="button" onClick={(e) => this.onClickNext(2, e, "location")}>Next</button>
                    </div>
                    <div className="build__group" style={{display: this.state.display[3].value}}>
                        <button className="build__prev" type="button" onClick={(e) => this.onClickLast(3, e)}>Previous</button>
                        <label className="build__label">
                            <input type="radio" value="60" name="age" defaultChecked={this.checkDefault(60, "age")} onChange={(e) => this.onChange(e, "age")}/>
                            Older higher than 50 years
                        </label>
                        <label className="build__label">
                            <input type="radio" value="30" name="age" defaultChecked={this.checkDefault(30, "age")} onChange={(e) => this.onChange(e, "age")}/>
                            Age between 50 years and 20 years
                        </label>
                        <label className="build__label">
                            <input type="radio" value="10" name="age" defaultChecked={this.checkDefault(10, "age")} onChange={(e) => this.onChange(e, "age")}/>
                            Newer than 20 years
                        </label>
                        <button type="submit" form="model__info" className="build__submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
