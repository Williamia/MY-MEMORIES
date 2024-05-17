require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Photo } = require('./src/models/Photo');

const app = express();
const port = 3000;
const secretKey = process.env.SECRET_KEY || '3cf6d6bfbe1b420bdd511e2d9a5e1fd3179e228b39a7bb76026b95ca2a987a79';

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
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login Successful!', token, user: { id: user._id, username: user.username } });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const userExists = await User.exists({ username });
    if (userExists) {
      return res.status(409).json({ message: 'Username is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', newUser });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post('/api/photos', verifyToken, async (req, res) => {
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

app.get('/api/photos', verifyToken, async (req, res) => {
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
    const users = await User.find({}, '-password'); // Não incluir a senha na resposta
    res.json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário excluído com sucesso!', deletedUser });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
