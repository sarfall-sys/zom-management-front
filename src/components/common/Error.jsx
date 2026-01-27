import React from "react";
import { Link } from "react-router-dom";
function Error({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="p-8 border-l-4 border-red-500 rounded-lg shadow-lg bg-red-50 dark:bg-red-900 dark:border-red-400">
        <p className="mb-8 text-lg text-red-700 dark:text-red-100">
          {children || "Something went wrong. Please try again later."}
        </p>
        <Link
          to="/"
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Error;
