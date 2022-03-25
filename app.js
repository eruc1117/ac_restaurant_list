const express = require('express')
const exphbs = require('express-handlebars')//require template engine
const path = require('path')
const sassMiddleware = require('node-sass-middleware')//require scss
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()
const PORT = 3000

//連線mongoose
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//session設定
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//用SCSS生成CSS
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
)
//使用method override
app.use(methodOverride('_method'))

//使用public設定
app.use(express.static('public'))

//表單資料處理
app.use(express.urlencoded({ extended: true }))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()//true or false
  res.locals.user = req.user // passport.js 中User.findOne({ email }),user回傳
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.msg = req.session.messages// passport.js 中done(null, false, { message: 'That email is not registered!' })的message回傳
  next()
})
// 將 request 導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})