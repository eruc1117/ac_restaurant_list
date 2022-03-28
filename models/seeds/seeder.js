const db = require('../../config/mongoose')

const bcrypt = require('bcryptjs')

//設定user資料
const userList = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }]

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
db.once('open', () => {
  async function createUser(list) {
    const salt = await bcrypt.genSalt(10)
    Promise.all(Array.from(list, (user => {
      bcrypt.hash(user.password, salt)
        .then(hash => User.create({
          email: user.email,
          password: hash
        }))

    })))
  }
  createUser(userList)
    .then(() => {
      Array.from(restaurantList, restaurant => {
        switch (restaurant.id) {
          case 1:
          case 2:
          case 3:
            const emailOne = 'user1@example.com'
            createRestaurant(emailOne, restaurant)
            break;
          case 4:
          case 5:
          case 6:
            const emailTwo = 'user2@example.com'
            createRestaurant(emailTwo, restaurant)
            break;
        }
      })
    })
})

async function createRestaurant(email, restaurant) {
  try {
    const why = await User.findOne({ email })
    const user = await User.findOne({ email })
    restaurant.userId = user._id
    await RestaurantModel.create(restaurant)
  } catch (err) {
    console.log(err)
  }
}