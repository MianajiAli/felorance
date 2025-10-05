"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mobile, setMobile] = useState<number | "">(""); // number or empty string
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mobile === "") return alert("Mobile is required");

    // Convert mobile to number if it's not already
    await login(Number(mobile), password);
    // router.push("/checkout");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      <input
        type="number"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
