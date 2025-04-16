"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      if (isLogin) {
        localStorage.setItem("token", data.token);
        redirect("/dashboard");
      } else {
        alert("Signup successful! You can now log in.");
        setIsLogin(true); // switch to login mode
      }
    } else {
      alert(data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <h2 className="text-xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
      <input
        placeholder="Username"
        className="border p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        type="button"
        className="text-sm text-blue-600 underline mt-2"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </button>
    </form>
  );
}
