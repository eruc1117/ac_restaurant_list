const db = require('../../config/mongoose')

//載入modules，使用自製模組
const cusFunction = require('../../function/customizeFun')
//載入restaurantModel
const RestaurantModel = require('../restaurantModel.js')

//載入userModel
const User = require('../userModel.js')

//載入restaurant.json
const restaurantListJson = require('./restaurant.json')
const restaurantList = cusFunction.predataEdit(restaurantListJson)



//製作種子資料
db.once('open', async () => {
  const userOne = await User.findOne({ email: 'user1@example.com' })
  const userTwo = await User.findOne({ email: 'user2@example.com' })
  restaurantList.splice(6, 2)
  restaurantList.forEach(restaurant => {
    switch (restaurant.id) {
      case 1:
      case 2:
      case 3:
        restaurant.userId = userOne._id
        break;
      case 4:
      case 5:
      case 6:
        restaurant.userId = userTwo._id
        break;
    }
  })
  await RestaurantModel.create(restaurantList)
  process.exit()
})

//結束時印出提示訊息
process.on('exit', () => {
  console.log("Restaurant's data is created!")
})