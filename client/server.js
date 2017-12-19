const express = require('express')
const app = express()
const speech = require('./src/speech')

app.use(express.static(__dirname + '/build'))

console.log("GOOGLE_APPLICATION_CREDENTIALS", process.env.GOOGLE_APPLICATION_CREDENTIALS)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/build/index.html");
// })

app.listen(3000, () => console.log('Example app listening on port 3000!'))
