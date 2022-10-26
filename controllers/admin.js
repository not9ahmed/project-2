const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')
const user = require('../models/user')


router.get('/', (req, res) => {

    // if the user is admin then enter the page
    if(res.locals.user.dataValues.isAdmin){
        res.render('admin/index.ejs')

    // else redirect
    } else {
        res.redirect('/')
    }

})

// see all the user
router.get('/users-management', async (req, res) => {


    let context = {}

    // if the user is admin then enter the page
    if(res.locals.user.dataValues.isAdmin){



        const users = await db.user.findAll({
            include: [db.product]
        })


        // const users = await db.user.findAll()

        context.users = users

        res.render('admin/users-management.ejs', context)



    // else redirect
    } else {
        res.redirect('/')
    }

})


// Delete users in
router.delete('/delete-user', async (req, res) => {


    let userId = req.body.userId

    console.log(userId)

    const user = await db.user.destroy({
        where: {
            id: userId
        }
    })

    res.redirect('/admin/users-management')
})






module.exports = router