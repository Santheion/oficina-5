const express = require('express');
const app = express.Router();

const { 
    UsersController, 
    PostsController,
    CommentsController,
    AlbumsController
} = require("../controllers");

// User
// Login
app.post("/users/login", UsersController.login);
// List
app.get("/users", UsersController.index);
// Find
app.get("/users/:id", UsersController.find);
//Create
app.post("/users", UsersController.create);
// Update
app.post("/users/:id", UsersController.update);
// Delete
app.delete("/users/:id", UsersController.delete);

// Posts
// List
app.get("/posts", PostsController.index);
// Find
app.get("/posts/:id", PostsController.find);
//Create
app.post("/posts", PostsController.create);
// Update
app.post("/posts/:id", PostsController.update);
// Delete
app.delete("/posts/:id", PostsController.delete);

// Comments
// List
app.get("/posts/:id/comments", CommentsController.index);
//Create
app.post("/posts/:id/comments", CommentsController.create);
// Update
app.post("/posts/:id/comments/:c_id", CommentsController.update);
// Delete
app.delete("/posts/:id/comments/:c_id", CommentsController.delete);

// Albums
// List
app.get("/users/:id/albums", AlbumsController.index);
//Create
app.post("/users/:id/albums", AlbumsController.create);
// Update
app.post("/users/:id/albums/:a_id", AlbumsController.update);
// Delete
app.delete("/users/:id/albums/:a_id", AlbumsController.delete);

module.exports = app;