import React from 'react';
import { Search, Bell, Settings, LogOut, User } from 'lucide-react';

interface NavbarProps {
  userName: string;
  userRole: string;
}

export default function Navbar({ userName, userRole }: NavbarProps) {
  const notifications = [
    { id: 1, message: 'New lead generated from website', time: '2 min ago', unread: true },
    { id: 2, message: 'Payment received from John Smith', time: '1 hour ago', unread: true },
    { id: 3, message: 'Quotation approved by Sarah Johnson', time: '3 hours ago', unread: false },
    { id: 4, message: 'Follow-up reminder for Mike Davis', time: '5 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="px-6 py-2 bg-[#ebedfa] rounded-2xl mt-4 mr-4 mb-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Welcome Section */}
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          {/* Notifications - Hover Dropdown */}
          <div className="relative group">
            <button className="relative p-2 bg-white/30 rounded-xl hover:bg-white/40 transition-colors">
              <Bell size={20} className="text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown (hover se show hoga) */}
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button className="w-full text-center text-teal-600 hover:text-teal-700 text-sm font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          </div>

          {/* Profile - Hover Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/40 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {userName.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800">{userName}</p>
                <p className="text-xs text-gray-600">{userRole}</p>
              </div>
            </button>

            {/* Dropdown (hover se show hoga) */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {userName.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-sm text-gray-600">{userRole}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                  <User size={18} className="text-gray-600" />
                  <span className="text-gray-800">My Profile</span>
                </button>
              </div>

              <div className="border-t border-gray-100 py-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-left">
                  <LogOut size={18} className="text-red-600" />
                  <span className="text-red-600">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>
    </nav>
  );
}
