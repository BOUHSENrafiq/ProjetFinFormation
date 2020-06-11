const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const markerSchema = new Schema({
  lat: String,
  lng: String,
});
module.exports = mongoose.model('marker', markerSchema, 'marker');
