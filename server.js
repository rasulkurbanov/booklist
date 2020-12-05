const express = require('express')
const app = express()
const PORT = process.env.PORT || 8100
const bodyParser = require('body-parser')
const { title } = require('process')
const ejs = require('ejs').renderFile


app.use(bodyParser.urlencoded({ extended: false }))
app.engine('html', ejs)
app.set('view engine', 'html')
app.set('views')


const data = [
  {
    title: 'Pride and prejudice',
    author: 'Jane Austin',
    genre: 'Dram'
  }
]

app.get('/', (_, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const {title, author, genre} = req.body
  data.push({
    title,
    author,
    genre
  })

  console.log(data)
  res.status(201).json('Successfully added').end()
})




app.listen(PORT, () => console.log(`Server running port on ${PORT}`))