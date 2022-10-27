const { render } = require('ejs')
const express = require('express')
const db = require('../models')
const router = express.Router()
require('dotenv').config()

// this is the controller for the main shop page
router.get('/', async (req, res) => {



    try {

        // get all the products from the database
        const products = await db.product.findAll()

        // console.log(products)

        console.log(products[0].picture)

        res.render('shop/index.ejs', {products: products})

    }catch(err){
        console.log(err)
        res.send('ERROR!', err)
    }

})



router.post('/add-review', async (req, res) => {

    try{

        let productId = parseInt(req.body.productId)

        let userId = parseInt(res.locals.user.id)


        console.log(productId)

        const review  = await db.review.create({

            title: req.body.title,
            content: req.body.content,
            stars: req.body.stars,
            userId: userId,
            productId: productId
        })

        console.log(review)


        // res.redirect('/')

        res.redirect('/shop/'+productId)

    } catch(err){
        console.log(err)
        res.send('ERROR!', err)
    }
})


// add new product
router.get('/add-product', async (req, res) => {

    let context = {}

    const categories = await db.product.getAttributes().category.values


    context.categories = categories


    res.render('shop/add-product', context)
})


// form to get the new product data get it from the update
router.post('/add-product', async (req, res) => {


    console.log(req.body)

    let userId = parseInt(res.locals.user.id)


    let picturesArray = req.body['picture[]']

    console.log('picturesArray', picturesArray)

    const filteredArrays = picturesArray.filter(element => {
        return element !== ''
    })

    console.log('filteredArrays', filteredArrays)

    
    const product = await db.product.create({
        name: req.body.name,
        category: req.body.category,
        categoryDesc: req.body.categoryDesc,
        size: req.body.size,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        forSale: JSON.parse(req.body.forSale),
        gender:  req.body.gender,
        userId: userId

    
        // add the pictures
        ,picture: filteredArrays
    })
    res.redirect('/shop')

})




router.get('/:id', async (req, res) => {


    try {

    // get all the products from the database
    const product = await db.product.findOne({
        where: {
            id: req.params.id
        },
        // include: [db.review]

        // nested join
        include: [{
            model: db.review,
            include: [db.user]
        }]
    })

    console.log(product.reviews)


    // console.log(product.reviews)

    res.render('shop/shop-single.ejs', {product: product})

    }catch(err){
        console.log(err)
        res.send('ERROR!', err)
    }

})


module.exports = router
