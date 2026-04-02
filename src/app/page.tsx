'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { DocumentUpload } from '@/components/DocumentUpload';
import { AnalyticsPanel } from '@/components/AnalyticsPanel';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'chat' | 'documents' | 'analytics'>('chat');
  const [dealerName] = useState('Genesis of Anaheim');

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
              M
            </div>
            <h1 className="text-xl font-semibold">MaxKB Enterprise</h1>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">{dealerName}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              System Online
            </div>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="flex gap-1 px-6">
          {[
            { id: 'chat', label: '💬 Knowledge Chat', icon: '' },
            { id: 'documents', label: '📄 Documents', icon: '' },
            { id: 'analytics', label: '📊 Analytics', icon: '' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'chat' | 'documents' | 'analytics')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'documents' && <DocumentUpload />}
        {activeTab === 'analytics' && <AnalyticsPanel />}
      </main>
    </div>
  );
}
