const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

router.get('/', (req, res) => {
  async function createIndexPage() {
    try {
      const restaurantList = await RestaurantModel.find().lean()
      res.render('index', { restaurantList })
    } catch (err) {
      console.log(err)
    }
  }
  createIndexPage()
})

module.exports = router