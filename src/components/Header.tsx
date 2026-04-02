'use client';

import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 border-b border-zinc-800 bg-[#0a0a0b]/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-zinc-400" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="font-semibold text-sm hidden sm:block">MaxKB</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search knowledge base..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
          <User className="w-5 h-5 text-zinc-400" />
        </button>
      </div>
    </header>
  );
}
