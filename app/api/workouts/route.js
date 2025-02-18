import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Workout from "@/models/Workout";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newWorkout = await Workout.create(body);
    return NextResponse.json({ success: true, data: newWorkout }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/workouts:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const workouts = await Workout.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: workouts }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/workouts:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
