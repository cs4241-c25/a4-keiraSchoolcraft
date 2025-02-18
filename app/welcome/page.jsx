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
      fetchWorkouts(); //refresh after submit
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "DELETE", // Ensure the method is DELETE
      });
  
      if (!res.ok) {
        console.error("Failed to delete workout. Status:", res.status);
        throw new Error("Failed to delete workout");
      }
  
      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
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

      <div className="w-4/5 mt-6 mb-5">
        <h2 className="text-white text-2xl mb-2">Workout History</h2>
        <table className="w-full border border-white text-white">
          <thead>
            <tr className="bg-red-600 border border-white">
              <th className="p-2 border border-white">Heart Rate</th>
              <th className="p-2 border border-white">Time</th>
              <th className="p-2 border border-white">Age</th>
              <th className="p-2 border border-white">Weight</th>
              <th className="p-2 border border-white">Meters Rowed</th>
              <th className="p-2 border border-white">Description</th>
              <th className="p-2 border border-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id} className="border-b border-white">
                <td className="p-2 text-center border border-white">{workout.heartrate}</td>
                <td className="p-2 text-center border border-white">{workout.time}</td>
                <td className="p-2 text-center border border-white">{workout.age}</td>
                <td className="p-2 text-center border border-white">{workout.weight}</td>
                <td className="p-2 text-center border border-white">{workout.meters}</td>
                <td className="p-2 border border-white">{workout.description}</td>
                <td className="p-2 text-center">
                <button 
                  onClick={() => handleDelete(workout._id)} 
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                  Delete
                </button>
          </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
