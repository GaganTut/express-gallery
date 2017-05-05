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
    }
  }, {
    classMethods: {
      associate: function(models) {
        Gallery.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Gallery;
};