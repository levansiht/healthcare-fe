"use client";

import { useUsers, useExercises, usePlans } from "@/hooks/useHealthcareApi";
import { MUSCLE_GROUPS } from "@/lib/constants";

export default function Dashboard() {
  const { users, loading: usersLoading } = useUsers();
  const { exercises, loading: exercisesLoading } = useExercises();
  const { plans, loading: plansLoading } = usePlans();

  if (usersLoading || exercisesLoading || plansLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Healthcare Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">👥 Users</h2>
          <p className="text-3xl font-bold">{users.length}</p>
          <p className="text-gray-600">Total registered users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-green-600">
            💪 Exercises
          </h2>
          <p className="text-3xl font-bold">{exercises.length}</p>
          <p className="text-gray-600">Available exercises</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-purple-600">
            📋 Plans
          </h2>
          <p className="text-3xl font-bold">{plans.length}</p>
          <p className="text-gray-600">Workout plans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-600">
                    {user.membershipTier} Member
                  </p>
                </div>
                <span className="text-sm text-gray-500">ID: {user.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Exercise Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(MUSCLE_GROUPS).map((muscle) => {
              const count = exercises.filter(
                (ex) => ex.muscle === muscle
              ).length;
              return (
                <div
                  key={muscle}
                  className="p-3 bg-gray-50 rounded text-center"
                >
                  <p className="font-medium">{muscle}</p>
                  <p className="text-sm text-gray-600">{count} exercises</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium">Manage Users</div>
          </button>
          <button className="p-4 bg-green-100 hover:bg-green-200 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">💪</div>
            <div className="font-medium">Manage Exercises</div>
          </button>
          <button className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">View Analytics</div>
          </button>
        </div>
      </div>
    </div>
  );
}
