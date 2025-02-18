"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/welcome",
    });

    if (res?.error) {
      setError("Invalid credentials");
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
          className="w-full p-2 mb-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
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
