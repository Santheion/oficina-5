'use strict';
const md5 = require("md5");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: (user, options) => {
        if(user.password){
          user.password = md5(`${user.password}${process.env.SECRET || "secret"}`)
        }
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};