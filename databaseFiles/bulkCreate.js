const Sequelize = require("sequelize");
const db = require('../models')
db.product.bulkCreate(
    [
        {
            "field1": "value1",
            "field2": "value2"
         }
    ],
   
  ).then(() => console.log("Data got created"));