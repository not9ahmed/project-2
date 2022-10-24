const db = require('../models')


const createProduct = async () => {

    // const jane = await User.create({ firstName: "Jane", lastName: "Doe" });

    /*
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
    */

    try {
        const product = await db.product.create({
            name: "Saint Laurent L17 Two-Tone Leather Biker Jacket",
            category: "Outerwear",
            categoryDesc: "Leather Jackets",
            size: "S",
            userId: 1,
            color: "Black",
            description: "Gently Used",
            price: 2790.00,
            forSale: true,
            gender: 'male'
        })

        console.log(product)

    } catch (err){
        console.log(err)
    }
}

createProduct()