const express = require('express')
const router = express.Router()
const userModel = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//登入路由
router.get('/login', (req, res) => {
  res.render('login',)
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureMessage: true
}))

//註冊路由
router.get('/register', (req, res) => {
  res.render('register', {
    cssStyle: '/stylesheets/register.css'
  })
})

router.post('/register', (req, res) => {
  async function register(req) {
    const newUser = req.body
    const totalInfo = await userModel.find().lean()
    const userInfo = totalInfo.filter(item => item.email === newUser.email)
    if (userInfo.length === 1) {
      console.log('User already exists.')
      const errorMsg = '這個 Email 已經註冊過了。'
      return res.render('register', { userInfo: userInfo[0], error_msg: errorMsg })
    }
    totalInfo.length !== 0 ?
      newUser['id'] = Number(totalInfo[totalInfo.length - 1].id) + 1 :
      newUser['id'] = 1
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash
    await userModel.create(newUser)
    res.redirect('/user/login')
  }
  register(req)
})

//登出路由
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/user/login')
})

module.exports = router