import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components";
import { PostList, PostDetailed, PostForm } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <div className="content">
        <Switch>
          <Route exact path="/posts">
            <PostList />
          </Route>
          <Route exact path="/posts/create">
            <PostForm />
          </Route>
          <Route exact path="/posts/:id">
            <PostDetailed />
          </Route>
          <Redirect to="/posts" />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
