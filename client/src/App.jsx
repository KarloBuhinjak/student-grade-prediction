import { useState } from "react";
import StudentForm from "./StudentForm";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="p-6">
      <StudentForm onResult={setResult} />

      {result && (
        <div className="mt-6 p-6 bg-white shadow rounded-lg max-w-md mx-auto text-center">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-2">Predicted Grade</h3>
              <p className="text-gray-700">Decimal (0–20): {result.decimal}</p>
              <p className="text-gray-700">Croatian Grade (1–5): {result.hr}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
