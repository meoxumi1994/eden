const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  id: { type : String },
  text: { type : String },
  background: { type : String },
  role: { type : String },
  speech: { type : Boolean },
  audio: { type: String }
});

module.exports = mongoose.model("Data", DataSchema);
