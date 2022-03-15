const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

router.get('/', (req, res) => {
  async function createIndexPage() {
    try {
      const restaurantList = await RestaurantModel.find().lean()
      res.render('index', { restaurantList, cssStyle: '/stylesheets/index.css'} )
    } catch (err) {
      console.log(err)
    }
  }
  createIndexPage()
})

module.exports = router