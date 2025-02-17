"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
      >
        Sign In
      </button>
    </div>
  );
}
