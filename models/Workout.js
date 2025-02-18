import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    heartrate: Number,
    time: Number,
    age: Number,
    weight: Number,
    meters: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
