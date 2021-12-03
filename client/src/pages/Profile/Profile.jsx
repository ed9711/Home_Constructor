import axios from 'axios';
import React, { Component } from 'react'
import Input from '../../components/Input/Input';

export default class Profile extends Component {
    state = {userId:null, models:[]};

    getUser = () => {
        axios.get("http://localhost:8080/model/"+this.props.match.params.userId)
            .then(response => {
                this.setState({userId:this.props.match.params.userId, models:response.data});
            })
    }

    componentDidMount = () => {
        console.log("profile did mount");
        if (localStorage.getItem("profile")) {
            this.props.history.push(`/profile/${localStorage.getItem("profile")}`)
            this.getUser();
        }
        // if (this.props.match.params.userId){
        //     this.getUser();
        // }
    }

    render() {
        if (!this.state.userId){
            return (
                <>
                    <div className="profile__title">You haven't entered a salary yet</div>
                    <Input props={this.props}/>
                </>
            );
        }
        return (
            <>
                <div className="profile__title">My Models</div>
            </>
        )
    }
}
