import mongoose from "mongoose";

import ExerciseModel, { IExercise } from "./model";

export const createExercise = async (exerciseData: IExercise) => {
  return await new ExerciseModel(exerciseData).save();
};

export const getExerciseById = async (id: string) => {
  return await ExerciseModel.findById(id);
};

export const getAllExercises = async () => {
  return await ExerciseModel.find({}).exec();
};

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
