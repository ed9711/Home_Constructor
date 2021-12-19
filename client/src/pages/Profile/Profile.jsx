import axios from 'axios';
import React, { Component } from 'react'
import Input from '../../components/Input/Input';
import "./Profile.scss"

export default class Profile extends Component {
    state = {userId:null, models:[]};

    getUser = (id) => {
        // console.log(this.props.match.params.userId, id);
        const uId = this.props.match.params.userId || id;
        axios.get("http://localhost:8080/model/"+uId)
            .then(response => {
                // console.log(response.data);
                this.setState({userId:uId, models:response.data});
            })
    }

    componentDidMount = () => {
        // console.log("profile did mount");
        if (localStorage.getItem("profile")) {
            this.props.history.push(`/profile/${localStorage.getItem("profile")}`)
            this.getUser(localStorage.getItem("profile"));
        }
    }

    onDelete = (e, id) => {
        e.preventDefault();
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        axios.delete("http://localhost:8080/model/"+id)
        .then(response => {
            this.getUser();
        });
    };

    onEdit = (e, id) => {
        e.preventDefault();
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        this.props.history.push(`/build/${id}`);
    };
    onResult = (id) => {
        this.props.history.push(`/result/${this.state.userId}/${id}`);
    };

    render() {
        if (!this.state.userId){
            return (
                <>
                    <div className="profile__title">You haven't entered a salary yet</div>
                    <Input history={this.props.history}/>
                </>
            );
        }
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
