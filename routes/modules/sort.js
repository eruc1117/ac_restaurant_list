const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

//餐廳排列方式
router.get('/:name', (req, res) => {
  const userId = req.user._id
  const [property, sortBy] = req.params.name.split('_')
  RestaurantModel.find({ userId })
    .lean()
    .sort({ [property]: sortBy })
    .then(restaurantList => res.render('index', { restaurantList, cssStyle: '/stylesheets/index.css' }))
    .catch(error => console.error(error))
})

module.exports = router