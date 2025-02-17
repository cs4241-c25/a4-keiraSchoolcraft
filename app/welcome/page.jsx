"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <h1 className="text-white text-4xl font-bold">Welcome</h1>
    </div>
  );
}
