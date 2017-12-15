const express = require('express')
const app = express()
const speech = require('./src/speech')

console.log("GOOGLE_APPLICATION_CREDENTIALS", process.env.GOOGLE_APPLICATION_CREDENTIALS)

app.get('/', (req, res) => {
  speech()
  res.send('Hello World!')
})

app.listen(3333, () => console.log('Example app listening on port 3333!'))
