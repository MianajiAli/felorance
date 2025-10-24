import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        در حال بارگذاری فروشگاه...
      </h1>

      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-12"></div>

      {/* Fake long list */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="h-56 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
