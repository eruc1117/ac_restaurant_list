const express = require('express')
const router = express.Router()
const RestaurantModel = require('../../models/restaurantModel')

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.toLowerCase().trim()
  const reg = new RegExp(keyword, 'i')//'i'正規表達式不分大小寫的搜索
  RestaurantModel.find({ $or: [{ name: reg }, { name_en: reg }, { category: reg }], userId })
    .lean()
    .then(restaurantList => restaurantList.length !== 0
      ? res.render('index', { restaurantList, cssStyle: '/stylesheets/index.css', keyword })
      : res.render('nonsearchResult', { cssStyle: '/stylesheets/index.css', keyword }))
    .catch(error => console.log(error))
})

module.exports = router