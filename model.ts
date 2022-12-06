import { model, Schema } from "mongoose";
export type IExercise = {
  startTime: Date;
  durationInSeconds: Number;
  activityType: "running" | "walking" | "biking";
  
};
const exerciseSchema = new Schema<IExercise>({
  startTime: Date,
  durationInSeconds: Number,
  activityType: String,
  
});

const ExerciseModel = model("exercise", exerciseSchema);
export default ExerciseModel;
