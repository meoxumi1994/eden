const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const Data = require('./models/Data')

var whitelist = ['http://localhost:3000']

var corsOptions = {
  origin: whitelist[0],
  credentials: true
}

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/eden');

app.post('/import_data', (req, res) => {
  const csv = req.body.data;

  const log = [];
  Data.deleteMany({})
    .then(() => {
      return Promise.all(csv.split(/\r\n|\n/).map((line, line_index) => {
        const data = line.split("|")
        if(!data) {
          log.push("error in row " + line_index + " data null")
          return;
        }
        if( data[2] != 'false' && data[2] != 'true' ) {
          log.push("error in row " + line_index + " column 3th expect Boolean")
          return;
        }
        return Data.create({
          id: data[0],
          role: data[1],
          speech: data[2],
          background: data[3],
          audio: data[4],
          text: data[5],
        })
        .then(data => {})
        .catch(err => log.push("error in row " + line_index + " " + err))
      }))
    })
    .then(() => res.send({ status: 'all is update except log', log: log }) )
    .catch((error) => res.status(403).send(error))
})

app.get('/', (req, res) => {
  Data.find({})
    .then(datas => {
      datas = datas.sort()
      res.json(datas)
    })
    .catch((error) => res.status(403).send(error))
})

app.listen(3333, () => console.log('Eden listening on port 3333!'))
