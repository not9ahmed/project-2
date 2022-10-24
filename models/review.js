'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.belongsTo(models.user)
      models.review.belongsTo(models.product)
    }
  }
  review.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    stars: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};