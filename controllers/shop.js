const { render } = require('ejs')
const express = require('express')
const db = require('../models')
const router = express.Router()
require('dotenv').config()
const { Op } = require("sequelize");


// this is the controller for the main shop page
// display the products for sale only
router.get('/', async (req, res) => {


    let context = {}


    console.log(req.query.q)

    // if user makes a search
    if(typeof req.query.q !== 'undefined'){

        const products = await db.product.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.q}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${req.query.q}%`
                            }
                        }
                    ],
                    forSale: true
                }
            }
        )


        context.products = products
    } else {
        // user does not make a search
        // get all the products from the database
        const products = await db.product.findAll(
            {
                where: {
                    forSale: true
                }
            }
        )
        context.products = products

    }


    res.render('shop/index.ejs', context)



})



// this is the controller for the main shop page
// display the products just for display and not for sale
router.get('/blog', async (req, res) => {


    let context = {}


    console.log(req.query.q)

    // if user makes a search
    if(typeof req.query.q !== 'undefined'){

        const products = await db.product.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.q}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${req.query.q}%`
                            }
                        }
                    ],
                    forSale: false
                }
            }
        )


        context.products = products
    } else {
        // user does not make a search
        // get all the products from the database
        const products = await db.product.findAll(
            {
                where: {
                    forSale: false
                }
            }
        )
        context.products = products

    }

    res.render('shop/blog.ejs', context)


})



router.get('/:id', async (req, res) => {

    let context = {}

    let productId = parseInt(req.params.id)

    try {

    // get all the products from the database
    const product = await db.product.findOne({
        where: {
            id: productId
        },
        // include: [db.review]

        // nested join
        include: [{
            model: db.review,
            include: [db.user]
        }]
    })

    // console.log(product.reviews)


    // console.log(product.reviews)

    context.product = product

    res.render('shop/shop-single.ejs', context)

    }catch(err){
        console.log(err)
        res.send('ERROR!', err)
    }

})


module.exports = router
