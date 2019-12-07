'use strict';
const { fieldValidation } = require("../lib");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    hooks: {
      beforeSave: fieldValidation({user_id: "required"})
    }
  });
  Post.associate = function(models) {
    models.Post.belongsTo(models.User, { foreignKey: 'user_id', as: "author" });
    models.Post.hasMany(models.Comment, { foreignKey: 'post_id', as: "comments" });
  };
  return Post;
};