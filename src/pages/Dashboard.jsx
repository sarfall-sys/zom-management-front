import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen p-6 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      {user && (
        <div>
          <div className="mb-6">
            <p className="mb-4 text-lg">Welcome, {user.name}!</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-blue-100 rounded-lg dark:bg-blue-900">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Total Tasks
              </h3>
              <p className="mt-2 text-2xl font-bold">12</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg dark:bg-green-900">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Completed
              </h3>
              <p className="mt-2 text-2xl font-bold">8</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg dark:bg-yellow-900">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                In Progress
              </h3>
              <p className="mt-2 text-2xl font-bold">3</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg dark:bg-red-900">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Pending
              </h3>
              <p className="mt-2 text-2xl font-bold">1</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold">Recent Tasks</h2>
              <ul className="space-y-2">
                <li className="p-2 text-sm bg-gray-100 rounded dark:bg-gray-700">
                  Task 1 - Completed
                </li>
                <li className="p-2 text-sm bg-gray-100 rounded dark:bg-gray-700">
                  Task 2 - In Progress
                </li>
                <li className="p-2 text-sm bg-gray-100 rounded dark:bg-gray-700">
                  Task 3 - Pending
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold">My Performance</h2>
              <p className="mb-2 text-sm">
                Completion Rate: <span className="font-bold">67%</span>
              </p>
              <p className="mb-2 text-sm">
                Average Response Time:{" "}
                <span className="font-bold">2.5 hours</span>
              </p>
              <p className="text-sm">
                Tasks This Month: <span className="font-bold">12</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
