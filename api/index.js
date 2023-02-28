const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());

mongoose.connect(
  'mongodb+srv://pautuop:1Smt88ldrDjFx90R@cluster0.2trjjhw.mongodb.net/?retryWrites=true&w=majority '
);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const salt = bcrypt.genSaltSync(10);
const secret = 'sakasjlkqjwopwqjdsasadlqwoqwqowo';
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json('ok');
    });
  } else {
    res.status(400).json({ message: 'Wrong password' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 1Smt88ldrDjFx90R

//mongodb+srv://pautuop:1Smt88ldrDjFx90R@cluster0.2trjjhw.mongodb.net/?retryWrites=true&w=majority
