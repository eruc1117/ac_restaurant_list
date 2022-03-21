const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
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
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('userModel', userSchema)