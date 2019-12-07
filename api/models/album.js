'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    models.Comment.belongsTo(models.User, { foreignKey: 'user_id' })
    // associations can be defined here
  };
  return Album;
};