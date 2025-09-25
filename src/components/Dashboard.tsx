import React from "react";
import { Users, TrendingUp, FileText, CheckCircle, Calendar, Bell } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Leads", value: 156, change: 12, color: "bg-blue-500", icon: Users },
    { title: "Positive Leads", value: 89, change: 8, color: "bg-green-500", icon: TrendingUp },
    { title: "Total Quotations", value: 23, change: 15, color: "bg-purple-500", icon: FileText },
    { title: "Completed Projects", value: 18, change: 10, color: "bg-orange-500", icon: CheckCircle },
  ];

  const tasks = [
    { title: "Follow up with John Doe", due: "Today 3 PM", color: "from-blue-500 to-teal-500", icon: Calendar },
    { title: "Prepare quotation for Sarah", due: "Tomorrow 11 AM", color: "from-purple-500 to-pink-500", icon: FileText },
    { title: "Call Mike about payment", due: "Today 5 PM", color: "from-yellow-500 to-orange-500", icon: Bell },
    { title: "Schedule training session", due: "Friday 10 AM", color: "from-green-500 to-teal-400", icon: Calendar },
  ];

  const funnelData = [
    { stage: "New Leads", value: 67, color: "bg-blue-500" },
    { stage: "In Progress", value: 45, color: "bg-yellow-500" },
    { stage: "Converted", value: 30, color: "bg-purple-500" },
    { stage: "Completed Projects", value: 18, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8">

      {/* Top Stats Cards: 2x2 Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 justify-items-center">
      {stats.map((stat, index) => {
        const Icon = stat.icon; 
        const progress = stat.change;

        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:scale-105 transition-transform max-w-[400px] w-full"
          >
            {/* Circular Progress */}
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
                <circle
                  className={`${stat.color} stroke-current`}
                  strokeWidth="8"
                  strokeDasharray={276}
                  strokeDashoffset={276 - (276 * progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon className="text-gray-800 mb-1" size={20} />
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>

            <p className="text-gray-600 font-medium">{stat.title}</p>
            <p className="text-sm text-gray-500 mt-1">+{stat.change}% from last week</p>
          </div>
        );
      })}
    </div>

      

      {/* Bottom: Lead Funnel */}
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/30">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Lead Funnel</h3>
        <div className="space-y-4">
          {funnelData.map((stage, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 font-medium">{stage.stage}</span>
                <span className="text-gray-800 font-bold">{stage.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`${stage.color} h-4 rounded-full`} style={{ width: `${(stage.value / 67) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
