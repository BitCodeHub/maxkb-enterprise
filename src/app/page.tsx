'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
