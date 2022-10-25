const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {

    res.render('admin/index.ejs')
})



module.exports = router