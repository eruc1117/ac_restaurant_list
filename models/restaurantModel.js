const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cusFunction = require('../function/customizeFun')
const restaurantSchema = new Schema({
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
  name_en: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: [true, 'Where is the restaurant?'],
    trim: true
  },
  phone: {
    type: String,
    set: cusFunction.phoneSet,
    validate: {
      validator: function (phoneNumber) {
        return /\d{2}-\d{4}-\d{4}/.test(phoneNumber);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  },
  google_map: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    man: 0,
    max: 5,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sameName: {
    type: Boolean,
    required: false
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('restaurantModel', restaurantSchema)