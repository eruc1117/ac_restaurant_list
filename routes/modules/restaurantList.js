const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

router.get('/', (req, res) => {
  async function createIndexPage(req) {
    try {
      const userId = req.user._id
      const restaurantList = await RestaurantModel.find({ userId }).lean()
      res.render('index', { restaurantList, cssStyle: '/stylesheets/index.css' })
    } catch (err) {
      console.log(err)
    }
  }
  createIndexPage(req)
})

module.exports = router