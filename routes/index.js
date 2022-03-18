// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//載入路由
const restaurantList = require('./modules/restaurantList')
const crud = require('./modules/crud')
const sort = require('./modules/sort')
const search = require('./modules/search')

// 將網址結構符合 / 字串的 request 導向 restaurantList 模組 
router.use('/', restaurantList)
// 將網址結構符合 /crud 字串的 request 導向 crud 模組 
router.use('/crud', crud)
// 將網址結構符合 /sort 字串的 request 導向 sort 模組 
router.use('/sort', sort)
// 將網址結構符合 /search 字串的 request 導向 search 模組 
router.use('/search', search)


// 匯出路由器
module.exports = router