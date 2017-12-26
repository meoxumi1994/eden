const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  id: { type : String },
  text: { type : String },
  background: { type : String },
  background_music: { type : String},
  role: { type : String },
  speech: { type : Boolean },
  audio: { type: String },
  next_id: { type: String },
  name: { type: String }
});

module.exports = mongoose.model("Data", DataSchema);
