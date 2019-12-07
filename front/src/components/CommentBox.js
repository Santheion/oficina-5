import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from '../lib/axios';
import { Loader, CommentItem } from "./";

class CommentBox extends Component{
    constructor(props){
        super(props);
        this.state = { comments: false, isLoading: false };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const postId = this.props.match.params.id
        axios.get(`/posts/${postId}/comments`).then(({data}) => {
            this.setState({comments: data, isLoading: false});
        }).catch(err => {
            console.log(err);
        })
    }
    
    render(){
        const { comments, isLoading } = this.state;

        if(isLoading)
            return <Loader/>

        let commentsList = false;

        if(comments && comments.length)
            commentsList = comments.map(comment => <CommentItem key={`comment-item${comment.id}`} comment={comment} />);
        else
            commentsList = <p>Não existe nenhum comentário cadastrado</p>

        return (
            <ul className="comment-list">
                { commentsList }
            </ul>
        );
    }
}


export default withRouter(CommentBox)