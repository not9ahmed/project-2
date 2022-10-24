const { render } = require('ejs')
const express = require('express')
const db = ('../models')
const router = express.Router()
require('dotenv').config()


router.get('/', async (req, res) => {


    // // get all the products from the database
    // const products = await db.product.findAll()

    // console.log(products)

    res.render('shop/index.ejs')
})


module.exports = router
