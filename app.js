const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')//require template engine
const path = require('path')
const sassMiddleware = require('node-sass-middleware')//require scss


//連線mongoose
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
)
app.use(express.static('public'))

const restaurantModel = require('./models/restaurantModel')

app.get('/', (req, res) => {
  async function createIndexPage() {
    try {
      const restaurantList = await restaurantModel.find().lean()
      res.render('index', { restaurantList })
    } catch (err) {
      console.log(err)
    }
  }
  createIndexPage()
})

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})