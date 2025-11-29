"use client";

import TestDatabaseComponent from "@/components/TestDatabaseComponent";

export default function TestDatabasePage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Database Connection Test</h1>
        <TestDatabaseComponent />
      </div>
    </div>
  );
}
