const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User, Photo } = require('./src/models/Photo'); 

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect('mongodb+srv://wiusk8:mO2GUCxL6YAlVqPm@photosdb.qejoepq.mongodb.net/?retryWrites=true&w=majority&appName=PhotosDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são necessários.' });
  }

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    res.json({ message: 'Login bem-sucedido!', user });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são necessários.' });
  }

  try {
    const userExists = await User.exists({ username });
    if (userExists) {
      return res.status(409).json({ message: 'Nome de usuário já está em uso.' });
    }
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso!', newUser });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.post('/api/photos', async (req, res) => {
  const { imagem, nome, data } = req.body;

  if (!imagem || !nome || !data) {
    return res.status(400).json({ message: 'Imagem, nome e data são necessários.' });
  }

  try {
    const newPhoto = await Photo.create({ imagem, nome, data });
    res.status(201).json({ message: 'Foto criada com sucesso!', newPhoto });
  } catch (error) {
    console.error('Erro ao criar foto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    console.error('Erro ao obter fotos:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
