const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
      }
    }
  ));

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}