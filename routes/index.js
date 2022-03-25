// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

//載入路由
const restaurantList = require('./modules/restaurantList')
const restaurants = require('./modules/restaurants')
const sort = require('./modules/sort')
const search = require('./modules/search')
const user = require('./modules/user')
const auth = require('./modules/auth')


// 將網址結構符合 /restaurants 字串的 request 導向 crud 模組 
router.use('/restaurants', authenticator, restaurants)
// 將網址結構符合 /sort 字串的 request 導向 sort 模組 
router.use('/sort', authenticator, sort)
// 將網址結構符合 /search 字串的 request 導向 search 模組 
router.use('/search', authenticator, search)
// 將網址結構符合 /user 字串的 request 導向 user 模組 
router.use('/user', user)
//FB登入路由
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 restaurantList 模組 
router.use('/', authenticator, restaurantList)


// 匯出路由器
module.exports = router