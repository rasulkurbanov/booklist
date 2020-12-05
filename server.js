const express = require('express')
const app = express()
const mongo = require('mongodb')
const PORT = process.env.PORT || 8100
const bodyParser = require('body-parser')
const { title } = require('process')
const ejs = require('ejs').renderFile
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'



app.use(bodyParser.urlencoded({ extended: false }))
app.engine('html', ejs)
app.set('view engine', 'html')
app.set('views')


const data = {
    title: '',
    author: '',
    genre: ''
}

app.get('/', (_, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const {title, author, genre} = req.body

    data.title = title,
    data.author = author,
    data.genre = genre

    MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
      if(err) throw err
      console.log('Database successfully connected')
    
      let dbo = db.db('booklistdb')
      dbo.collection('customers').insertOne(data, (err, res) => {
        if(err) throw err
        console.log('1 document inserted')
        db.close()
      })

      dbo.collection('customers').find().toArray((err, result) => {
        if(err) throw err
        res.render('index', {data: result})
        db.close()
      })
    })


})    








app.listen(PORT, () => console.log(`Server running port on ${PORT}`))