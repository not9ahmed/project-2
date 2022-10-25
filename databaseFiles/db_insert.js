const db = require('../models')


const createUsers = async () => {

    try {

        /*
            username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicture: DataTypes.STRING
        */


        const user1 = await db.user.create({
            username: "notahmed",
            firstName: "Ahmed",
            lastName: "Al-Thawadi",
            mobile: "33445566",
            email: "ahmed@gmail.com",
            password: "$2b$10$eG7esMUSjh6Oh7eM5TO0uOdYZ1NzQnZmkTeVanK1d17jO/xnUE02e",
            profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQ2zuxYet0UwWj2JAn3WmhGDQdnBaQjxoyA&usqp=CAU"
            ,isAdmin: true
        })

        console.log(user1)

        const user2 = await db.user.create({
            username: "ann-sordo",
            firstName: "Ann",
            lastName: "Sordo",
            mobile: "33112233",
            email: "ann@gmail.com",
            password: "$2b$10$M9/Vh.mf6yWkLqNFF45IyOicVs2qnHLEdu6HLvG4/zG4uaEW5fpQW",
            profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_zLXElT1i_xOqPmzfiC1PfFduQvIDgnM1w&usqp=CAU"
            ,isAdmin: true
        })

        console.log(user2)

    } catch (err){
        console.log(err)
    }
}

// createUsers()



const createProducts = async () => {

    try {
        const product1 = await db.product.create({
            name: "Saint Laurent L17 Two-Tone Leather Biker Jacket",
            category: "Outerwear",
            categoryDesc: "Leather Jackets",
            size: "S",
            userId: 1,
            color: "Black",
            description: "Gently Used",
            price: 2790.00,
            forSale: true,
            gender: 'male',
            picture: ['https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:335/output=quality:50/compress/RlHQieC6SNmXDZ5QhQWZ']
        })

        console.log(product1)



        const product2 = await db.product.create({
            name: "Saint Laurent Suede Leather Trucker Jacket",
            category: "Outerwear",
            categoryDesc: "Leather Jackets",
            size: "M",
            userId: 1,
            color: "Brown",
            description: "Gently Used",
            price: 2790.00,
            forSale: true,
            gender: 'male',
            picture: ['https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/resize=height:1400/output=quality:50/compress/kTHt47GETaiK3jopJNiP']
        })

    } catch (err){
        console.log(err)
    }
}

createProducts()



const createReviews = async () => {


    /*
        title: DataTypes.STRING,
    content: DataTypes.TEXT,
    stars: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
    */

    try {
        const review1 = await db.review.create({
            title: "Awesome Jacket",
            content: "I really like this jacket so much!",
            stars: "5",
            userId: 2,
            productId: 1,
        })

        console.log(review1)


        const review2 = await db.review.create({
            title: "Awesome Jacket",
            content: "I like the jacket fabric",
            stars: "5",
            userId: 2,
            productId: 2,
        })

        console.log(review2)

    } catch (err){
        console.log(err)
    }
}

createReviews()