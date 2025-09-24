import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'positive' | 'negative' | 'converted';
  source: string;
  value: number;
  lastContact: string;
  followUpDate: string;
  notes: string;
}

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0123',
      company: 'Tech Corp',
      status: 'positive',
      source: 'Website',
      value: 5000,
      lastContact: '2024-01-15',
      followUpDate: '2024-01-20',
      notes: 'Interested in premium package'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0124',
      company: 'Design Studio',
      status: 'qualified',
      source: 'Referral',
      value: 3000,
      lastContact: '2024-01-14',
      followUpDate: '2024-01-18',
      notes: 'Needs custom solution'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      company: 'Marketing Inc',
      status: 'new',
      source: 'LinkedIn',
      value: 7500,
      lastContact: '2024-01-16',
      followUpDate: '2024-01-19',
      notes: 'Initial inquiry about services'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-gray-500';
      case 'contacted': return 'bg-blue-500';
      case 'qualified': return 'bg-yellow-500';
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      case 'converted': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const updateLeadStatus = (leadId: number, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
          <p className="text-gray-600 mt-1">Manage your leads and track follow-ups</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
        >
          <Plus size={20} />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search leads by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button className="bg-white/50 border border-white/30 px-4 py-3 rounded-xl hover:bg-white/70 transition-colors flex items-center space-x-2">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Lead</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Company</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Value</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Follow-up</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-sm text-gray-600">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{lead.company}</p>
                    <p className="text-sm text-gray-600">{lead.source}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(lead.status)}`}></div>
                      <span className="capitalize font-medium text-gray-800">{lead.status}</span>
                    </div>
                    <div className="mt-2 space-x-1">
                      {lead.status !== 'positive' && (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'positive')}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                        >
                          Mark Positive
                        </button>
                      )}
                      {lead.status !== 'negative' && (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'negative')}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                        >
                          Mark Negative
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">${lead.value.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">{lead.followUpDate}</p>
                    <p className="text-xs text-gray-600">Last: {lead.lastContact}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Edit size={16} />
                      </button>
                      <button className="text-teal-600 hover:text-teal-800 p-1">
                        <Phone size={16} />
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 p-1">
                        <Mail size={16} />
                      </button>
                      {lead.status === 'positive' && (
                        <button className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-teal-700 transition-colors font-medium">
                          Generate Quote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</div>
          <div className="text-gray-700 font-medium mt-2">New Leads</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-yellow-600">{leads.filter(l => l.status === 'qualified').length}</div>
          <div className="text-gray-700 font-medium mt-2">Qualified</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-green-600">{leads.filter(l => l.status === 'positive').length}</div>
          <div className="text-gray-700 font-medium mt-2">Positive</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-purple-600">{leads.filter(l => l.status === 'converted').length}</div>
          <div className="text-gray-700 font-medium mt-2">Converted</div>
        </div>
      </div>
    </div>
  );
}