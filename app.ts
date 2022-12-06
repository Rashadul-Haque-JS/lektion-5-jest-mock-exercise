import express, { json } from "express";
import { isValidId } from "./database";
import fetchWeather from "./weather";
const makeApp = ({ createExercise, getExerciseById, getAllExercises }: any) => {
  const app = express();
  app.use(json());

  app.post("/exercise", async (req, res) => {
    
    const {startTime ,durationInSeconds, activityType} = req.body
    const errors = [];

    if (!startTime ||startTime.length === 0) {
      errors.push({
        error: "You must provide a startTime",
      });
    }

    if (!durationInSeconds || isNaN(Number(durationInSeconds))) {
      errors.push({
        error: "You must provide a durationInSeconds",
      });
    }

    if (!activityType ||activityType === 0) {
      errors.push({
        error: "You must provide a activityType",
      });
    }

    if (errors.length) {
     
      res.status(400).json(errors);
    } else {
      const exercise = await createExercise(req.body);

      res.json(exercise);
    }
  });

  app.get("/exercise/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).send();
    } else {
      const exercise = await getExerciseById(req.params.id);
    
      if (exercise === undefined) {
        res.status(404).send();
      } else {
        const weatherAPI = await fetchWeather();
        res.json({
          startTime: exercise.startTime,
          durationInSeconds: exercise.durationInSeconds,
          activityType: exercise.activityType,
          temperature: weatherAPI.data.daily.temperature_2m_max[0],
        });
      }
    }
  });

  app.get("/exercises", async (req, res) => {
    const exercises = await getAllExercises();
    if (!exercises.length) {
      res.status(404).send();
    } else {
      res.json(exercises);
    }
  });

  return app;
};
export default makeApp;
