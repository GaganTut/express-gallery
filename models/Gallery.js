module.exports = function(sequelize, DataTypes) {
  let Gallery = sequelize.define("Gallery", {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'No Description Currently'
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Gallery;
};