import React from "react";
import { Users, TrendingUp, FileText, CheckCircle, Calendar } from "lucide-react";

export default function Dashboard() {
const stats = [
  { title: "Total Leads", value: 156, change: 12, color: "from-indigo-100 to-purple-100", icon: Users },
  { title: "Positive Leads", value: 89, change: 8, color: "from-green-100 to-teal-100", icon: TrendingUp },
  { title: "Total Quotations", value: 23, change: 15, color: "from-pink-100 to-rose-100", icon: FileText },
  { title: "Completed Projects", value: 18, change: 10, color: "from-yellow-100 to-orange-100", icon: CheckCircle },
  { title: "Total Follow-ups", value: 72, change: 9, color: "from-cyan-100 to-blue-100", icon: Calendar },
];


  return (
    <div className="space-y-12">

      {/* First Row: 3 Cards */}
      <div className="flex justify-center gap-10 flex-wrap mt-12 ">
        {stats.slice(0, 3).map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center p-6 w-80 rounded-3xl bg-gradient-to-br ${stat.color}  shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl`}
            >
              <div className="absolute -top-8 flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-md rounded-full shadow-lg">
                <Icon size={28} />
              </div>

              <div className="mt-12 text-center">
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-lg font-semibold mt-1">{stat.title}</p>
                <p className= "text-sm mt-2">
                  {stat.change >= 0 ? `+${stat.change}%` : `${stat.change}%`} from last week
                </p>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20 blur-xl pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Second Row: Remaining Cards Centered */}
      {stats.length > 3 && (
        <div className="flex justify-center gap-6 flex-wrap">
          {stats.slice(3).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center p-6 w-80 rounded-3xl bg-gradient-to-br ${stat.color}    shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl`}
              >
                <div className="absolute -top-8 flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-md rounded-full shadow-lg">
                  <Icon size={28} />
                </div>
                <div className="mt-12 text-center">
                  <p className="text-3xl font-extrabold">{stat.value}</p>
                  <p className="text-lg font-semibold mt-1">{stat.title}</p>
                  <p className="text-sm mt-2 ">
                    {stat.change >= 0 ? `+${stat.change}%` : `${stat.change}%`} from last week
                  </p>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20 blur-xl pointer-events-none"></div>
              </div>
            ); 
          })}
        </div>
      )}
    </div>
  );
}
