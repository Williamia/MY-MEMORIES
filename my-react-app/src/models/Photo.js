const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const photoSchema = new mongoose.Schema({
  imagem: String,
  nome: String,
  data: Date
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Photo: mongoose.model('Photo', photoSchema)
};
