import express from 'express';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth';
import { validationResult } from 'express-validator';

mongoose
  .connect(`mongodb+srv://milan:61-606mir@cluster0.w9rhs99.mongodb.net/`)
  .then(() => {
    console.log('Подключение к Mongo успешно');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.post('/auth/regiser', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    succsess: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server ok');
});
