"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
  id: number | string;
  name: string;
  city: string;
}

interface Props {
  id: number | string;
}

const API_URL = "http://localhost:3000/record";

export default function StudentDetail({ id }: Props) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Student = await res.json();
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  const handleUpdate = async () => {
    if (!student) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setSuccess("Student updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setSuccess("Student deleted successfully.");
      setStudent(null); // Clear student data after deletion
       // Navigate to root after 1 second
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!student) return <p>No student found.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-sm max-w-md">
      <h3 className="text-lg font-medium mb-3">Student Details</h3>

      <label className="block mb-2">
        <span className="text-sm">Name</span>
        <input
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className="mt-1 block w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm">City</span>
        <input
          value={student.city}
          onChange={(e) => setStudent({ ...student, city: e.target.value })}
          className="mt-1 block w-full border px-2 py-1 rounded"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </div>
  );
}