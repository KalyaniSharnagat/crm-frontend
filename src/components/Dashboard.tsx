"use client";
import React from "react";
import { Users, FileText, Briefcase, PhoneCall } from "lucide-react";

// ✅ Simple Card Components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-lg rounded-2xl p-4">{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Dashboard: React.FC = () => {
  const userName = "Rahul Sharma";
  const clientName = "ABC Pvt Ltd";

  // Example stats (API से भी ला सकते हो)
  const stats = {
    leads: { total: 120, approved: 80, pending: 25, rejected: 15 },
    quotations: { total: 45 },
    projects: { total: 30, complete: 18, pending: 7, rejected: 5 },
    followUps: { total: 60, approved: 40, rejected: 20 },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          User: <span className="font-semibold">{userName}</span> | Client:{" "}
          <span className="font-semibold">{clientName}</span>
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Users /> Total Leads ({stats.leads.total})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">Approved: {stats.leads.approved}</p>
            <p className="text-yellow-600">Pending: {stats.leads.pending}</p>
            <p className="text-red-600">Rejected: {stats.leads.rejected}</p>
          </CardContent>
        </Card>

        {/* Quotations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <FileText /> Quotations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-purple-700">
              {stats.quotations.total}
            </p>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-600">
              <Briefcase /> Projects ({stats.projects.total})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">Completed: {stats.projects.complete}</p>
            <p className="text-yellow-600">Pending: {stats.projects.pending}</p>
            <p className="text-red-600">Rejected: {stats.projects.rejected}</p>
          </CardContent>
        </Card>

        {/* Follow Ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <PhoneCall /> Follow Ups ({stats.followUps.total})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">Approved: {stats.followUps.approved}</p>
            <p className="text-red-600">Rejected: {stats.followUps.rejected}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
