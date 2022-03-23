const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')//require template engine
const path = require('path')
const sassMiddleware = require('node-sass-middleware')//require scss
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')


//連線mongoose
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//表單資料處理
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
  )
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})