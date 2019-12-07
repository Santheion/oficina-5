import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from '../lib/axios';

import { PostItem } from "../components";

export default class PostList extends Component{
    constructor(props){
        super(props);
        this.state = { posts: false, isLoading: false };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get("/posts").then(({data}) => {
            this.setState({posts: data, isLoading: false});
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        const { posts, isLoading } = this.state;

        if(isLoading)
            return <p className="loading-message">Carregando...</p>

        let loadedPosts = false;

        if(posts && posts.length)
            loadedPosts = posts.map(post => <PostItem key={`post-item${post.id}`} post={post} />);
        else
            loadedPosts = <p>Não existe nenhum post cadastrado</p>
            
        return (
            <Fragment>
                <Link className="button" to="/posts/create" >Criar nova postagem</Link>
                <ul className="post-list">
                    {loadedPosts}
                </ul>
            </Fragment>
        )
    }
}