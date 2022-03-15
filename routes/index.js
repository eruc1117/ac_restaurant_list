// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//載入路由
const index = require('./modules/index')

// 將網址結構符合 / 字串的 request 導向 index 模組 
router.use('/', index)

// 匯出路由器
module.exports = router