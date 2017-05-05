/*jshint esversion: 6*/
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Gallery);
      }
    }
  });
  return User;
};