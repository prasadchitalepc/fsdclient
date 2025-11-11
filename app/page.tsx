import StudentList from "./components/StudentList";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">List of Students</h1>
      <StudentList />
    </main>
  );
}
