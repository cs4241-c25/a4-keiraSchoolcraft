"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl">Welcome, {session?.user?.name || "User"}!</h1>
      </div>
      <div className="flex flex-col h-screen items-center justify-center bg-black">
      <h1 className="text-white text-5xl font-extrabold font-mono p-5">FITNESS TRACKER</h1>

      <div id="user-info">
        <button onClick={() => signOut()}
          className="border border-white rounded-full px-5 py-1 mb-3 hover:bg-red-700">
          Logout
        </button>
      </div>
        <form className="bg-black p-6 rounded border border-white w-4/5 mb-4">
          <div className="mb-4 flex flex-row">
            <label htmlFor="heartrate" className="block text-white font-bold mb-2 w-1/5">
              Heart Rate (bpm):
            </label>
            <input type="number" id="heartrate" 
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline" />
          </div>

          <div className="mb-4 flex flex-row">
            <label htmlFor="time" className="block text-white font-bold mb-2 w-1/5">
              Workout Length (minutes):
            </label>
            <input type="number" id="time" 
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline" />
          </div>

          <div className="mb-4 flex flex-row">
            <label htmlFor="age" className="block text-white font-bold mb-2 w-1/5">
              Age (years):
            </label>
            <input type="number" id="age" name="age" 
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline" />
          </div>

          <div className="mb-4 flex flex-row">
            <label htmlFor="weight" className="block text-white font-bold mb-2 w-1/5">
              Weight (lbs):
            </label>
            <input type="number" id="weight" name="weight" 
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline" />
          </div>

          <div className="mb-4 flex flex-row">
            <label htmlFor="meters" className="block text-white font-bold mb-2 w-1/5">
              Meters Rowed (m):
            </label>
            <input type="number" id="meters" name="meters" 
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline" />
          </div>

          <div className="mb-4 flex flex-row">
            <label htmlFor="description" className="block text-white font-bold mb-2 w-1/5">
              Workout Description:
            </label>
            <textarea id="description" name="description" rows="4" cols="50" 
              placeholder="Describe the practice..."
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-red-700 focus:shadow-outline">
            </textarea>
          </div>

          <fieldset className="mb-4 border border-white rounded p-2">
            <legend className="text-white font-bold mb-2">Delete last entry?</legend>
            <div className="flex items-center">
              <label className="mr-4">
                <input type="radio" name="deleteEntry" value="yes" className="mr-2" /> Yes
              </label>
              <label>
                <input type="radio" name="deleteEntry" value="no" defaultChecked className="mr-2" /> No
              </label>
            </div>
          </fieldset>

          <button type="submit" id="submit-workout" 
            className="border border-white rounded-full px-5 py-1 mb-3 hover:bg-red-700 justify-center w-full mx-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
