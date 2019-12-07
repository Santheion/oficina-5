import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";

export default class PostItem extends Component{
    constructor(props){
        super(props)
        this.state = { deleted: false };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        const { post } = this.props;
        axios.delete(`/posts/${post.id}`)
            .then(() => {
                this.setState({deleted: true})
            })
    }

    render(){
        const { post } = this.props;
        const { deleted } = this.state;

        if(deleted)
            return false;

        return (
            <Link to={`/posts/${post.id}`}>
                <div className="post-item">
                    <div className="image-wrapper">
                        <img src={require("../img/broken-1.png")} />
                    </div>
                    <div className="post-content">
                        <a onClick={this.handleDelete} className="delete"><img src={require("../img/delete.svg")}/></a>
                        <h1>{ post.title }</h1>
                        <p>{ post.body }</p>
                    </div>
                </div>
            </Link>
        )
    }
}