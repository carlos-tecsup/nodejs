const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  nombre: String,
  area:String,
  precio: Number,
  profesor:String,
  descripcion: String,
});

module.exports = mongoose.model('curso', CourseSchema);
