'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    post_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, { foreignKey: 'post_id' })
    // associations can be defined here
  };
  return Comment;
};