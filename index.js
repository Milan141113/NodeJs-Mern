import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './modules/User.js';

mongoose
  .connect(`mongodb+srv://milan:61-606mir@cluster0.w9rhs99.mongodb.net/blog`)
  .then(() => {
    console.log('Подключение к Mongo успешно');
  })
  .catch((err) => console.log("Database can't connect!", err));
const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();

  res.json(user);
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server ok');
});
