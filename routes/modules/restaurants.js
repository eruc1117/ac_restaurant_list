const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')
const cusFunction = require('../../function/customizeFun')

router.get('/read/:id', (req, res) => {
  async function createShowPage(req) {
    try {
      const id = req.params.id
      const userId = req.user._id
      const restaurantInfo = await RestaurantModel.findOne({ id, userId }).lean()
      res.render('show', { cssStyle: '/stylesheets/show.css', restaurantInfo })
    } catch (err) {
      console.log(err)
    }
  }
  createShowPage(req)
})

//修改餐廳資料相關路由
router.get('/edit/:id', (req, res) => {
  async function createEditPage(req) {
    try {
      const id = req.params.id
      const userId = req.user._id
      const restaurant = await RestaurantModel.findOne({ id, userId }).lean()
      res.render('edit', { cssStyle: '/stylesheets/edit.css', restaurant })
    } catch (err) {
      console.log(err)
    }
  }
  createEditPage(req)
})

router.put('/edit/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const body = (req.body)
  let newBody = cusFunction.bodyDataEdit(body)
  return RestaurantModel.findOneAndUpdate({ id, userId }, newBody)
    .then(() => res.redirect(`/restaurants/read/${id}`))
    .catch(error => console.log(error))
})

//新增餐廳相關路由
router.get('/create', (req, res) => {
  res.render('new', {
    cssStyle: '/stylesheets/edit.css'
  })
})

router.post('/create', (req, res) => {
  async function createRestaurant(req) {
    try {
      const newRestaurant = req.body
      const totalInfo = await RestaurantModel.find()
      totalInfo.length !== 0 ?
        newRestaurant['id'] = Number(totalInfo[totalInfo.length - 1].id) + 1 :
        newRestaurant['id'] = 1
      const userId = req.user._id
      newRestaurant['userId'] = userId
      await RestaurantModel.create(newRestaurant)
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
  createRestaurant(req)
})

//刪除餐廳相關路由
router.get('/delete/:id', (req, res) => {
  async function deleteAccount() {
    try {
      const id = req.params.id
      await RestaurantModel.findOneAndDelete({ id })
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
  deleteAccount()
})

module.exports = router