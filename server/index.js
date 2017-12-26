const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const Data = require('./models/Data')

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

app.use(cors());
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
        if(!data || data.length < 8) {
          log.push("error in row " + line_index + " data null")
          return;
        }

        return Data.create({
          id: data[0],
          role: data[1],
          name: data[2],
          speech: data[3],
          audio: data[4],
          background: data[5],
          text: data[6],
          background_music: data[7],
          next_id: data[8],
        })
        .then(data => {})
        .catch(err => log.push("error in row " + line_index + " " + err))

      }))
    })
    .then(() => res.send({ status: 'all is update except log', log: log }) )
    .catch((error) => res.status(403).send(error))
})



app.get('/check', (req,res) => {
  res.send("Success")
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
