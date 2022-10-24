'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.product.belongsTo(models.user)
      models.product.hasMany(models.review)
    }
  }
  product.init({
    name: DataTypes.STRING,
    category: DataTypes.ENUM('Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Tailoring', 'Accessories', 'Jewelry'),
    categoryDesc: DataTypes.STRING,
    size: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    color: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    forSale: DataTypes.BOOLEAN,
    gender: DataTypes.ENUM('male', 'female'),

    // will be many pictures
    // picture: DataTypes.STRING

    picture: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};