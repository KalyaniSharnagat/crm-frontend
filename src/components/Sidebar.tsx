import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Calendar,
  DollarSign,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'follow', label: 'FollowUpRecords', icon: Users },
    { id: 'quotations', label: 'Quotations', icon: FileText },
    { id: 'status', label: 'Status Tracking', icon: BarChart3 },
    { id: 'messenger', label: 'Messenger', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#E1F3F3] to-[#C6E0E0] p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">CRM Pro</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#278f9b] text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white/30'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}