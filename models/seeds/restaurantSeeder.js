const db = require('../../config/mongoose')
//載入modules，使用自製模組
const cusFunction = require('../../function/customizeFun')
//載入restaurantModel
const RestaurantModel = require('../restaurantModel')

//載入restaurant.json
const restaurantListJson = require('./restaurant.json')
const restaurantList = cusFunction.predataEdit(restaurantListJson)

//製作種子資料
db.once('open', () => {
  Promise.all(Array.from(
    restaurantList,
    (element) => RestaurantModel.create(element)
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})




