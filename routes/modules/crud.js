const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

router.get('/:id', (req, res) => {
  const id = req.params.id
  async function createShowPage(id) {
    try {
      const restaurantInfo = await RestaurantModel.findOne({ id }).lean()
      res.render('show', {cssStyle: '/stylesheets/show.css', restaurantInfo})
    } catch (err) {
      console.log(err)
    }
  }
  createShowPage(id)
})

module.exports = router