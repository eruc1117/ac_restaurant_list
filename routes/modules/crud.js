const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')
const cusFunction = require('../../function/customizeFun')

router.get('/read/:id', (req, res) => {
  const id = req.params.id
  async function createShowPage(id) {
    try {
      const restaurantInfo = await RestaurantModel.findOne({ id }).lean()
      res.render('show', { cssStyle: '/stylesheets/show.css', restaurantInfo })
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
      res.render('edit', { cssStyle: '/stylesheets/edit.css', restaurant })
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

//新增餐廳相關路由
router.get('/create', (req, res) => {
  res.render('new', {
    cssStyle: '/stylesheets/edit.css'
  })
})

router.post('/create', (req, res) => {
  async function createRestaurant() {
    try {
      const newRestaurant = req.body
      const totalInfo = await RestaurantModel.find()
      totalInfo.length !== 0 ?
        newRestaurant['id'] = Number(totalInfo[totalInfo.length - 1].id) + 1 :
        newRestaurant['id'] = 1
      await RestaurantModel.create(newRestaurant)
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
  createRestaurant()
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