"use client";

import { useSearchParams } from "next/navigation";
import StudentDetail from "./../components/StudentDetail";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <p>No student ID provided. Please add ?id=123 to the URL.</p>;
  }

  return <StudentDetail id={id} />;
}