"use client";

import { useState } from "react";

interface Props {
  onAdded?: () => void;
}

const API_URL = "http://localhost:3000/record";

export default function CreateStudent({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !city.trim()) {
      setError("Name and City are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), city: city.trim() }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setSuccess("Student added.");
      setName("");
      setCity("");
      onAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleAdd} className="p-4 border rounded-lg shadow-sm max-w-md">
      <h3 className="text-lg font-medium mb-3">Add Student</h3>

      <label className="block mb-2">
        <span className="text-sm">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border px-2 py-1 rounded"
          disabled={loading}
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm">City</span>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full border px-2 py-1 rounded"
          disabled={loading}
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>

        {error && <span className="text-red-600 text-sm">{error}</span>}
        {success && <span className="text-green-600 text-sm">{success}</span>}
      </div>
    </form>
  );
}
