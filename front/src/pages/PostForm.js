import React, { Component } from "react"
import axios from "../lib/axios";
import { withRouter } from "react-router-dom";

class PostForm extends Component{
    constructor(props){
        super(props);
        this.state = { user_id: undefined, title: undefined, body: undefined, isLoading: false, users: [], sucess: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
        const { user_id, title, body } = this.state;
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("title", title);
        formData.append("body", body);
        axios.post("/posts", { user_id, title, body })
            .then(({data}) => {
                this.setState({ user_id: undefined, title: undefined, body: undefined, sucess: true});
                setTimeout(() => {
                    this.setState({sucess: false});
                }, 5000);
            })
        e.preventDefault()
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get("/users")
            .then(({data}) => {
                this.setState({users: data, isLoading: false});
            })
            .catch(err => {
                console.log(err);
            })
    }

    render(){
        const { users, title, body, user_id, isLoading, sucess } = this.state;

        return (
            <form className="post-form" onSubmit={this.handleSubmit}>
                <fieldset>
                    <label>Usuário</label><br/>
                    <select required name="user_id" onChange={(e) => this.setState({user_id: e.target.value})}>
                        <option default>Selecione um usuário</option>
                        { users && users.map(user => (
                            <option key={`user-id-${user.id}`} value={user.id}>{user.name}</option>
                        )) }
                    </select>
                </fieldset>
                <fieldset>
                    <label>Título</label><br/>
                    <input required type="text" name="title" value={title} onChange={(e) => this.setState({title: e.target.value})} />
                </fieldset>
                <fieldset>
                    <label>Comentário</label><br/>
                    <textarea required name="body" value={body} onChange={(e) => this.setState({body: e.target.value})} />
                </fieldset>
                <button type="submit">Enviar</button>
                { sucess && <p className="success">Post cadastrado com sucesso</p> }
            </form>
        );
    }
}

export default withRouter(PostForm);