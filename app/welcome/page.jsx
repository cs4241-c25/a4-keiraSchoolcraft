"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    heartrate: "",
    time: "",
    age: "",
    weight: "",
    meters: "",
    description: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const res = await fetch("/api/workouts");
    const data = await res.json();
    if (data.success) {
      setWorkouts(data.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchWorkouts(); // Refresh workouts after submitting
      setFormData({
        heartrate: "",
        time: "",
        age: "",
        weight: "",
        meters: "",
        description: "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black overflow-auto">
      <h1 className="text-white text-5xl font-extrabold font-mono p-5">FITNESS TRACKER</h1>

      <button onClick={() => signOut()} className="border border-white rounded-full px-5 py-1 mb-3 hover:bg-red-700">
        Logout
      </button>

      <form onSubmit={handleSubmit} className="bg-black p-6 rounded border border-white w-4/5 mb-4">
        {["heartrate", "time", "age", "weight", "meters", "description"].map((field) => (
          <div key={field} className="mb-4 flex flex-row">
            <label htmlFor={field} className="block text-white font-bold mb-2 w-1/5">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            {field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline"
              />
            ) : (
              <input
                type="number"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline"
              />
            )}
          </div>
        ))}

        <button type="submit" className="border border-white rounded-full px-5 py-1 mb-3 hover:bg-red-700 justify-center w-full mx-auto">
          Submit
        </button>
      </form>

      <div className="w-4/5 mt-6">
        <h2 className="text-white text-2xl mb-2">Workout History</h2>
        <table className="w-full border border-white text-white">
          <thead>
            <tr className="border-b border-white">
              <th className="p-2">Heart Rate</th>
              <th className="p-2">Time</th>
              <th className="p-2">Age</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Meters Rowed</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id} className="border-b border-white">
                <td className="p-2 text-center">{workout.heartrate}</td>
                <td className="p-2 text-center">{workout.time}</td>
                <td className="p-2 text-center">{workout.age}</td>
                <td className="p-2 text-center">{workout.weight}</td>
                <td className="p-2 text-center">{workout.meters}</td>
                <td className="p-2">{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
