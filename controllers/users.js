const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {

    res.render('users/index')
})


router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})

router.post('/', async (req, res)=>{
    const [newUser, created] = await db.user.findOrCreate({where:{email: req.body.email}})
    if(!created){
        console.log('user already exists')
        res.render('users/login.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/login', (req, res)=>{
    res.render('users/login.ejs')
})

router.post('/login', async (req, res)=>{
    const user = await db.user.findOne({where: {email: req.body.email}})
    if(!user){
        console.log('user not found')
        res.render('users/login', { error: "Invalid email/password" })
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('password incorrect')
        res.render('users/login', { error: "Invalid email/password" })
    } else {
        console.log('logging in the user!!!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', (req, res)=>{
    res.render('users/profile.ejs')
})

router.get('/my-stuff', async (req, res)=>{
    let context = {}

    let userId = parseInt(res.locals.user.id)

    const products = await db.product.findAll({
        where: {
            userId: userId
        }
    })

    context.products = products

    res.render('users/my-stuff.ejs', context)
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
router.get('/my-stuff/add-product', async (req, res) => {

    let context = {}

    const categories = await db.product.getAttributes().category.values


    context.categories = categories


    res.render('users/add-product', context)
})


// form to get the new product data get it from the update
router.post('/my-stuff/add-product', async (req, res) => {


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
        price: parseFloat(req.body.price),
        forSale: JSON.parse(req.body.forSale),
        gender:  req.body.gender,
        userId: userId,

    
        // add the pictures
        picture: filteredArrays
    })
    res.redirect('/my-stuff')

})



// update the user stuff
router.put('/my-stuff/update/:id', async (req, res) => {

        
    let productId = parseInt(req.params.id)


    // console.log(req.body)
    // console.log(req.body['picture[]'])

    let picturesArray = req.body['picture[]']

    console.log(picturesArray)

    const filteredArrays = picturesArray.filter(element => {
        return element !== ''
    })

    console.log(filteredArrays)


    const product = await db.product.update({
        name: req.body.name,
        category: req.body.category,
        categoryDesc: req.body.categoryDesc,
        size: req.body.size,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        forSale: JSON.parse(req.body.forSale),
        gender:  req.body.gender
    
    
        // update the pictures
        ,picture: filteredArrays
    }, {
        where: {
            id: productId
        }
    })

    // console.log(product)

    res.redirect(`/users/my-stuff/${productId}`)




})


//router to delete my stuff
router.delete('/my-stuff/delete/:id', async (req, res) => {


    let productId = req.params.id


    const user = await db.product.destroy({
        where: {
            id: productId
        }
    })


    res.redirect(`/users/my-stuff/`)
})



router.get('/my-stuff/:productId', async (req, res)=>{
    let context = {}

    let userId = parseInt(res.locals.user.id)

    let productId = parseInt(req.params.productId)

    console.log(productId)

    const product = await db.product.findOne({
        where: {
            id: productId,
            userId: userId
        },
        // include: [db.review]

        // nested join
        include: [{
            model: db.review,
            include: [db.user]
        }]
    })

    const genders = db.product.getAttributes().gender.values
    const categories = db.product.getAttributes().category.values

    // console.log(genders)
    // console.log(categories)

    console.log(product.picture)


    context.product = product
    context.genders = genders
    context.categories = categories


    res.render('users/single-stuff', context)
})




module.exports = router