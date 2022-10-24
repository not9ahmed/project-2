'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.ENUM('Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Tailoring', 'Accessories', 'Jewelry')
      },
      categoryDesc: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      description :{
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DOUBLE
      },
      forSale: {
        type: Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.ENUM('male', 'female')
      },
      picture: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
