"use client";
import { useEffect, useState } from "react";

interface Company {
  _id: string;
  name: string;
  matchScore: number;
  status: "Target" | "Not Target";
}

export default function Dashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/accounts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  async function updateStatus(id: string, newStatus: "Target" | "Not Target") {
    const token = localStorage.getItem("token");
    await fetch(`/api/accounts/${id}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setCompanies((companies) =>
      companies.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      {companies.map((company) => (
        <div
          key={company._id}
          className="border p-3 my-2 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{company.name}</h2>
            <p>Match Score: {company.matchScore}</p>
            <p>Status: {company.status}</p>
          </div>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() =>
              updateStatus(
                company._id,
                company.status === "Target" ? "Not Target" : "Target"
              )
            }
          >
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
}
