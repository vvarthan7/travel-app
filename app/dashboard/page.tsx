'use client';

import { DashboardStats } from "@/types";
import { useState, useEffect } from "react";

// Mock stats data
const MOCK_STATS: DashboardStats = {
  total_users: 1234,
  total_destinations: 156,
  total_itineraries: 3456,
  recent_signups: 89,
};

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>(MOCK_STATS);

  // In a real app, fetch data from Supabase
  useEffect(() => {
    // Placeholder for future data fetching
    // const fetchStats = async () => {
    //   const data = await supabase.from('stats').select();
    //   setStats(data);
    // };
    // fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your Tourvisto platform performance and statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-3xl font-bold text-gray-900">
                      {stats.total_users.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Destinations
                    </dt>
                    <dd className="text-3xl font-bold text-gray-900">
                      {stats.total_destinations.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📋</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Itineraries
                    </dt>
                    <dd className="text-3xl font-bold text-gray-900">
                      {stats.total_itineraries.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📈</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Recent Signups
                    </dt>
                    <dd className="text-3xl font-bold text-gray-900">
                      {stats.recent_signups.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 pb-4 border-b">
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New user registration</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pb-4 border-b">
                <div className="w-2 h-2 bg-primary-purple rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New itinerary created</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pb-4 border-b">
                <div className="w-2 h-2 bg-secondary-blue rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Destination added</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary-purple rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">User feedback received</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Paris, France</p>
                    <p className="text-xs text-gray-500">Europe</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-blue">1,234 views</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-secondary rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tokyo, Japan</p>
                    <p className="text-xs text-gray-500">Asia</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-blue">987 views</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-accent rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bali, Indonesia</p>
                    <p className="text-xs text-gray-500">Asia</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-blue">876 views</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New York, USA</p>
                    <p className="text-xs text-gray-500">North America</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary-blue">765 views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-primary-blue/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">➕</span>
                <span className="text-sm font-medium text-gray-900">Add Destination</span>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-primary-blue/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">👥</span>
                <span className="text-sm font-medium text-gray-900">Manage Users</span>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-primary-blue/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm font-medium text-gray-900">View Analytics</span>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-primary-blue/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">⚙️</span>
                <span className="text-sm font-medium text-gray-900">Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
