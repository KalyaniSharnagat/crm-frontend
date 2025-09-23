import React from 'react';
import { TrendingUp, Users, DollarSign, FileText, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Leads', value: '156', change: '+12%', color: 'bg-blue-500', icon: Users },
    { title: 'Positive Leads', value: '89', change: '+8%', color: 'bg-green-500', icon: TrendingUp },
    { title: 'Quotations', value: '23', change: '+15%', color: 'bg-purple-500', icon: FileText },
    { title: 'Revenue', value: '$45,280', change: '+22%', color: 'bg-orange-500', icon: DollarSign },
  ];

  const recentActivities = [
    { id: 1, action: 'New lead generated', client: 'John Smith', time: '2 minutes ago', status: 'new' },
    { id: 2, action: 'Quotation sent', client: 'Sarah Johnson', time: '1 hour ago', status: 'sent' },
    { id: 3, action: 'Payment received', client: 'Mike Davis', time: '3 hours ago', status: 'completed' },
    { id: 4, action: 'Follow-up scheduled', client: 'Lisa Wilson', time: '5 hours ago', status: 'scheduled' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className="text-green-600 text-sm font-medium mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status Chart */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Lead Progress</h3>
            <button className="text-teal-600 hover:text-teal-700 font-medium">View all</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">New Leads</span>
              <span className="text-gray-800 font-bold">67</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '67%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">In Progress</span>
              <span className="text-gray-800 font-bold">45</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Converted</span>
              <span className="text-gray-800 font-bold">89</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition-colors font-medium">
                Add New Lead
              </button>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Generate Quotation
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium">
                View Reports
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">DON'T FORGET</h3>
            <h2 className="text-xl font-bold mb-4">Setup training for next week</h2>
            <button className="bg-white text-teal-600 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Go to training center
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'sent' ? 'bg-blue-500' :
                  activity.status === 'scheduled' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.client}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}