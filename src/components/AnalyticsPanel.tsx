'use client';

import { useState } from 'react';

export function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const stats = [
    { label: 'Total Queries', value: '12,847', change: '+23%', positive: true },
    { label: 'Avg Response Time', value: '1.8s', change: '-15%', positive: true },
    { label: 'User Satisfaction', value: '94%', change: '+4%', positive: true },
    { label: 'Knowledge Coverage', value: '836 docs', change: '+12%', positive: true },
  ];

  const topQueries = [
    { query: 'Genesis GV60 charging port location', count: 342 },
    { query: 'Hyundai Tucson hybrid battery warranty', count: 289 },
    { query: 'G80 service schedule 30,000 miles', count: 256 },
    { query: 'Blue Link app reset password', count: 198 },
    { query: 'Genesis collision repair certification', count: 176 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className={`text-sm mt-2 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change} from previous period
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Query Volume */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="font-semibold mb-4">Query Volume</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[45, 62, 38, 75, 55, 89, 72].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 bg-blue-600/80 rounded-t hover:bg-blue-500 transition-colors"
                style={{ height: `${height}%` }}
                title={`Day ${idx + 1}: ${height * 100} queries`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="font-semibold mb-4">Top Queries</h3>
          <div className="space-y-3">
            {topQueries.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-800 rounded text-center text-sm leading-6 text-gray-400">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm truncate">{item.query}</p>
                </div>
                <span className="text-sm text-gray-400">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="font-semibold mb-4">System Health</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-2xl">✓</span>
            </div>
            <div>
              <p className="font-medium">API Server</p>
              <p className="text-sm text-gray-400">Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-2xl">✓</span>
            </div>
            <div>
              <p className="font-medium">Knowledge Base</p>
              <p className="text-sm text-gray-400">2,147 chunks indexed</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 text-2xl">◐</span>
            </div>
            <div>
              <p className="font-medium">Ingestion Queue</p>
              <p className="text-sm text-gray-400">766 pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
