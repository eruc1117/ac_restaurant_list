const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

//餐廳排列方式
router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router