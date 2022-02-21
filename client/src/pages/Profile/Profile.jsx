import axios from 'axios';
import React, { Component } from 'react'
import Input from '../../components/Input/Input';
import { API_URL } from '../../config';
import "./Profile.scss"

export default class Profile extends Component {
    state = {userId:null, models:[]};

    // get all models from single user
    getUser = (id) => {
        axios.get(`${API_URL}/model/${id}`)
            .then(response => {
                this.setState({userId:id, models:response.data});
            })
    }

    componentDidMount = () => {
        // console.log("profile did mount");
        if (sessionStorage.getItem("profile")) {
            // this.props.history.push(`/profile/${sessionStorage.getItem("profile")}`)
            axios.post(`${API_URL}/user/`, {
                token: sessionStorage.getItem("profile")
            })
            .then(response => {
                this.getUser(response.data.id);
            }).catch(err => {
                console.log("token auth failed");
            })
        } else {
            this.props.history.push("/");
        }
    }

    // delete one model from database
    onDelete = (e, id) => {
        e.preventDefault();
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        axios.delete(`${API_URL}/model/${id}`)
        .then(response => {
            this.getUser();
        });
    };

    // go to build page to edit one model
    onEdit = (e, id) => {
        e.preventDefault();
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        this.props.history.push(`/build/${id}`);
    };

    // go to result page for one model
    onResult = (id) => {
        this.props.history.push(`/result/${this.state.userId}/${id}`);
    };

    render() {
        // if (!this.state.userId){
        //     return (
        //         <>
        //             <div className="profile__title">You haven't entered a salary yet</div>
        //             <Input history={this.props.history}/>
        //         </>
        //     );
        // }
        return (
            <div className="profile">
                <div className="profile__title">My Models</div>
                <div className="profile__models">
                    {this.state.models.map((model) => {
                        return (
                            <div className="model" onClick={() => this.onResult(model.id)} key={model.id}>
                                <ul className="model__detail">
                                    {/* <li className="model__item">Model Id: {model.id}</li> */}
                                    <li className="model__item">Location: {model.location}</li>
                                    <li className="model__item">Type: {model.style}</li>
                                    <li className="model__item">Land size: {model.land}</li>
                                </ul>
                                <div className="model__buttons">
                                    <button className="model__delete" onClick={(e) => this.onDelete(e, model.id)} >Delete</button>
                                    <button className="model__edit" onClick={(e) => this.onEdit(e, model.id)} >Edit</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
