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


router.post('/add-review', async (req, res) => {

    try{

        let productId = parseInt(req.body.productId)


        console.log(productId)

        const review  = await db.review.create({

            title: req.body.title,
            content: req.body.content,
            stars: req.body.stars,
            userId: parseInt(req.body.userId),
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



module.exports = router
