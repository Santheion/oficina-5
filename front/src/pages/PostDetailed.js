import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import axios from '../lib/axios';
import { Loader, CommentBox } from "../components"

class PostDetailed extends Component{
    constructor(props){
        super(props);
        this.state = { post: false, isLoading: false };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const postId = this.props.match.params.id
        axios.get(`/posts/${postId}`).then(({data}) => {
            this.setState({post: data, isLoading: false});
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        const { post, isLoading } = this.state;

        if(isLoading)
            return <Loader/>

        return (
            <Fragment>
                <div className="detailed-content">
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
                <hr/>
                <h3>Comentários</h3>
                <CommentBox post_id={post.id} />
            </Fragment>
        );
    }
}

export default withRouter(PostDetailed)