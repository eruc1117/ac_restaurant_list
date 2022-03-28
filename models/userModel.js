const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  //如果給User id編號，後面序列化會出現錯誤
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  confirmPassword: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('userModel', userSchema)