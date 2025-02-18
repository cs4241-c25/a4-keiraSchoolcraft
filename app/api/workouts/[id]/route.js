import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Workout from "@/models/Workout";

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return NextResponse.json({ success: false, error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedWorkout }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/workouts/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return NextResponse.json({ success: false, error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: workout }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/workouts/[id]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
