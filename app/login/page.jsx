"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      localStorage.setItem("loggedIn", "true");
      router.push("/welcome");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <form onSubmit={handleLogin} className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">
          Log In
        </button>
      </form>
    </div>
  );
}
