const express = require('express')
const router = express.Router()
const userModel = require('../../models/userModel')
const passport = require('passport')

//登入路由
router.get('/login', (req, res) => {
  res.render('login',)
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
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
      return res.render('register', { userInfo: userInfo[0] })
    }
    totalInfo.length !== 0 ?
      newUser['id'] = Number(totalInfo[totalInfo.length - 1].id) + 1 :
      newUser['id'] = 1
    await userModel.create(newUser)
    res.redirect('/user/login')
  }
  register(req)
})

//登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router