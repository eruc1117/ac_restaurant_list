const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')
const cusFunction = require('../../function/customizeFun')

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

//修改餐廳資料相關路由
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  async function createEditPage(id) {
    try {
      const restaurant = await RestaurantModel.findOne({ id }).lean()
      res.render('edit', {cssStyle: '/stylesheets/edit.css', restaurant})
    } catch (err) {
      console.log(err)
    }
  }
  createEditPage(id)
}) 

router.post('/edit/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const body = (req.body)
  let newBody = cusFunction.bodyDataEdit(body)
  return RestaurantModel.findOneAndUpdate({ id }, newBody)
    .then(() => res.redirect(`/crud/${id}`))
    .catch(error => console.log(error))
})

module.exports = router