import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, DollarSign, Calendar, User, Filter } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  client: string;
  workStatus: 'not-started' | 'in-progress' | 'under-review' | 'completed' | 'on-hold';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  startDate: string;
  dueDate: string;
  progress: number;
  totalAmount: number;
  paidAmount: number;
  lastUpdate: string;
  assignedTo: string;
}

export default function StatusTracking() {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Development',
      client: 'John Smith - Tech Corp',
      workStatus: 'in-progress',
      paymentStatus: 'partial',
      startDate: '2024-01-10',
      dueDate: '2024-02-10',
      progress: 65,
      totalAmount: 6050,
      paidAmount: 3000,
      lastUpdate: '2024-01-16',
      assignedTo: 'Andrea Pirlo'
    },
    {
      id: 2,
      name: 'Custom Solution',
      client: 'Sarah Johnson - Design Studio',
      workStatus: 'not-started',
      paymentStatus: 'pending',
      startDate: '2024-01-20',
      dueDate: '2024-02-20',
      progress: 0,
      totalAmount: 3300,
      paidAmount: 0,
      lastUpdate: '2024-01-15',
      assignedTo: 'Team Lead'
    },
    {
      id: 3,
      name: 'Mobile App',
      client: 'Mike Davis - Marketing Inc',
      workStatus: 'completed',
      paymentStatus: 'paid',
      startDate: '2024-01-01',
      dueDate: '2024-01-31',
      progress: 100,
      totalAmount: 8500,
      paidAmount: 8500,
      lastUpdate: '2024-01-31',
      assignedTo: 'Development Team'
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      client: 'Lisa Wilson - Retail Co',
      workStatus: 'under-review',
      paymentStatus: 'overdue',
      startDate: '2024-01-05',
      dueDate: '2024-02-05',
      progress: 85,
      totalAmount: 12000,
      paidAmount: 5000,
      lastUpdate: '2024-01-14',
      assignedTo: 'Senior Developer'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getWorkStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'under-review': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'on-hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-500';
      case 'partial': return 'bg-yellow-500';
      case 'paid': return 'bg-green-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getWorkStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started': return <Clock className="text-gray-600" size={20} />;
      case 'in-progress': return <Clock className="text-blue-600" size={20} />;
      case 'under-review': return <AlertCircle className="text-yellow-600" size={20} />;
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'on-hold': return <AlertCircle className="text-red-600" size={20} />;
      default: return <Clock className="text-gray-600" size={20} />;
    }
  };

  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(project => project.workStatus === filterStatus);

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Status Tracking</h2>
          <p className="text-gray-600 mt-1">Monitor work progress and payment status</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/50 border border-white/30 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="under-review">Under Review</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {projects.filter(p => p.workStatus === 'in-progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {projects.filter(p => p.workStatus === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                ${projects.reduce((sum, p) => sum + p.paidAmount, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Project</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Work Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Progress</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Payment Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Timeline</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{project.name}</p>
                      <p className="text-sm text-gray-600">{project.client}</p>
                      <p className="text-xs text-gray-500 mt-1">Last update: {project.lastUpdate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getWorkStatusIcon(project.workStatus)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getWorkStatusColor(project.workStatus)}`}></div>
                          <span className="capitalize font-medium text-gray-800">
                            {project.workStatus.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getPaymentStatusColor(project.paymentStatus)}`}></div>
                        <span className="capitalize font-medium text-gray-800">{project.paymentStatus}</span>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-800 font-medium">
                          ${project.paidAmount.toLocaleString()} / ${project.totalAmount.toLocaleString()}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              project.paymentStatus === 'paid' ? 'bg-green-500' :
                              project.paymentStatus === 'partial' ? 'bg-yellow-500' :
                              project.paymentStatus === 'overdue' ? 'bg-red-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${(project.paidAmount / project.totalAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-800 font-medium flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Start: {project.startDate}
                      </p>
                      <p className="text-gray-600 mt-1">Due: {project.dueDate}</p>
                      {new Date(project.dueDate) < new Date() && project.workStatus !== 'completed' && (
                        <p className="text-red-600 font-medium mt-1">Overdue</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-600" />
                      <span className="text-gray-800 font-medium">{project.assignedTo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {projects.filter(p => p.paymentStatus === 'pending').length}
            </div>
            <div className="text-gray-700 font-medium mt-1">Pending Payments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter(p => p.paymentStatus === 'partial').length}
            </div>
            <div className="text-gray-700 font-medium mt-1">Partial Payments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {projects.filter(p => p.paymentStatus === 'overdue').length}
            </div>
            <div className="text-gray-700 font-medium mt-1">Overdue Payments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.paymentStatus === 'paid').length}
            </div>
            <div className="text-gray-700 font-medium mt-1">Paid Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
}