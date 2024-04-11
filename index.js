import express, { json } from 'express';

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as userControlers from './controlers/userControlers.js';

mongoose
  .connect(
    `mongodb+srv://milan:61-606mir@cluster0.w9rhs99.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('Подключение к Mongo успешно');
  })
  .catch((err) => console.log("Database can't connect!", err));
const app = express();

app.use(express.json());

app.post('/auth/login', userControlers.login);

app.get('/auth/me', checkAuth, userControlers.getMe);

app.post('/auth/register', registerValidation, userControlers.register);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server ok');
});
