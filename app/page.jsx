"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 transition"
      >
        Sign In
      </button>
    </div>
  );
}
