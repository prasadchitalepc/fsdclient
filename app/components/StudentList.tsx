"use client";

import { useState, useEffect } from "react";

interface Student {
  id: number | string;
  name: string;
  city: string;
}
const API_URL = "http://localhost:3000/record";

export default function StudentList() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApi(): Promise<void> {
      try {
     
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const text = await res.text();
        console.log("Raw response text:", text);

        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
        console.log("Parsed response:", parsed);

        let list: any[] = [];
        list = parsed

        // normalize items to Student shape
        const normalized: Student[] = list.map((item: any, idx: number) => {
          return {
            id: item._id,
            name:
              item.name ,
            city: item.city ,
          };
        });

        setStudents(normalized);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, []);

  console.log("Current state:", { students, loading, error });

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!students || students.length === 0) return <p>No students available</p>;

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Students</h2>

      <table className="min-w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-3 py-1 text-left">Id</th>
            <th className="border px-3 py-1 text-left">Name</th>
            <th className="border px-3 py-1 text-left">City</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={String(s.id)}>
              <td className="border px-3 py-1">{s.id}</td>
              <td className="border px-3 py-1">{s.name}</td>
              <td className="border px-3 py-1">{s.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
