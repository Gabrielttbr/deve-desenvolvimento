"use client";

import { useState } from "react";

export default function TestDatabaseComponent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTestConnection = async () => {
    console.log('🧪 Test connection clicked!');
    setLoading(true);
    setResult(null);

    try {
      console.log('📡 Fetching /api/test-db...');
      
      const response = await fetch("/api/test-db");
      const data = await response.json();

      console.log('✅ Response received:', data);
      
      setResult(data);
    } catch (error) {
      console.error('❌ Error:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to test connection",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleTestConnection}
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? "Testing..." : "Test Database Connection"}
      </button>

      {result && (
        <div
          className={`p-4 rounded-lg border-2 ${
            result.success
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">
              {result.success ? "✅" : "❌"}
            </span>
            <div>
              <h3 className="font-bold mb-2">
                {result.success ? "Success!" : "Failed!"}
              </h3>
              <p>{result.message}</p>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="p-4 bg-gray-100 rounded-lg text-gray-600 text-center">
          Click the button above to test your MongoDB connection
        </div>
      )}
    </div>
  );
}
