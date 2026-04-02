'use client';

import { 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: MessageSquare, label: 'Chat', active: true },
  { icon: FileText, label: 'Documents', count: 832 },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const recentChats = [
  'Genesis GV60 charging port',
  'Hyundai Tucson warranty',
  'Service schedule 30k miles',
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#0a0a0b] border-r border-zinc-800
          transform transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="font-semibold">MaxKB Enterprise</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-zinc-800 rounded-lg"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${item.active 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <span className="text-xs text-zinc-500">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Recent
            </p>
            <div className="space-y-1">
              {recentChats.map((chat) => (
                <button
                  key={chat}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 rounded-lg transition-colors truncate"
                >
                  {chat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>
    </>
  );
}
