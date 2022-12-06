import makeApp from './app';
import mongoose from 'mongoose';
import { createExercise, getExerciseById, getAllExercises } from './database';

const port = process.env.PORT || 8080;

const app = makeApp({ createExercise, getExerciseById, getAllExercises });

mongoose.connect('mongodb://127.0.0.1:27017/myapp').then(() => {
  app.listen(port, () => {
    console.log(`App listening to port ${port}`);
  });
});