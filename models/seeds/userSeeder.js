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

//載入userModel
const User = require('../userModel.js')

//製作種子資料

db.once('open', () => {
  for (let index = 0; index < userList.length; index++) {
    createUser(userList[index], index, userList.length)
  }
})

//結束時印出提示訊息
process.on('exit', (code) => {
  console.log("User's data is created!")
})

async function createUser(user, index, listLength) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    await User.create({
      email: user.email,
      password: hash
    })
    if ((index + 1) === listLength) {
      process.exit()
    }
  } catch (err) {
    console.log(err)
  }
}