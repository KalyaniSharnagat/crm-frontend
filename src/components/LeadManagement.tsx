import React, { useState } from 'react';
import { Eye, Edit, PlusCircle, FileText, Plus } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'positive';
  source: string;
  lastFollowUp: string;
}

interface LeadManagementProps {
  setActiveTab: (tab: string) => void;
}

export default function LeadManagement({ setActiveTab }: LeadManagementProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1-555-0123',
      company: 'Tech Corp',
      status: 'positive',
      source: 'Website',
      lastFollowUp: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0124',
      company: 'Design Studio',
      status: 'new',
      source: 'Referral',
      lastFollowUp: '2024-01-18',
    },
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState<Omit<Lead, "id" | "lastFollowUp">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    status: "new",
  });

  const updateLeadStatus = (id: number, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const handleAddLead = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "Website",
      status: "new",
    });
    setEditLead(null);
    setShowFormModal(true);
  };

  const handleEditLead = (lead: Lead) => {
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      status: lead.status,
    });
    setEditLead(lead);
    setShowFormModal(true);
  };

  const handleSaveLead = () => {
    if (editLead) {
      setLeads(leads.map(l => l.id === editLead.id ? { ...editLead, ...formData, lastFollowUp: l.lastFollowUp } : l));
    } else {
      const newLead: Lead = {
        id: leads.length + 1,
        ...formData,
        lastFollowUp: new Date().toISOString().split("T")[0],
      };
      setLeads([...leads, newLead]);
    }
    setShowFormModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
          <p className="text-gray-600 mt-1">Create, edit and manage Leads</p>
        </div>
        <button
          onClick={handleAddLead}
          className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
        >
          <Plus size={20} />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/20 text-lg">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Company</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Contact No</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Source</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Last Follow-up</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{lead.name}</td>
                <td className="px-6 py-3">{lead.company}</td>
                <td className="px-6 py-3">{lead.phone}</td>
                <td className="px-6 py-3">{lead.email}</td>
                <td className="px-6 py-3">{lead.source}</td>
                <td className="px-6 py-3">{lead.lastFollowUp}</td>
                <td className="px-6 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                    className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-400 transition-all"
                  >
                    <option value="new">🟠 New</option>
                    <option value="positive">🟢 Positive</option>
                  </select>
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEditLead(lead)}
                    >
                      <Edit size={18} />
                    </button>

                    {/* Add Follow-up */}
                    {lead.status === 'new' && (
                      <div className="relative group">
                        <button
                          className="text-orange-600 hover:text-orange-800"
                          onClick={() => setActiveTab('follow')}
                        >
                          <PlusCircle size={18} />
                        </button>
                        <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Add Follow-up
                        </span>
                      </div>
                    )}

                    {/* Generate Quotation */}
                    {lead.status === 'positive' && (
                      <div className="relative group">
                        <button
                          className="text-purple-600 hover:text-purple-800"
                          onClick={() => setActiveTab('quotations')} // Redirect to Quotations tab
                        >
                          <FileText size={18} />
                        </button>
                        <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Generate Quotation
                        </span>
                      </div>
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fadeIn z-50">
          <div className="bg-white rounded-2xl w-[500px] shadow-2xl border border-gray-300">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-white">📝 Lead Details</h3>
              <p className="text-xs text-teal-100 mt-1">Complete information about the lead</p>
            </div>
            <div className="p-6 bg-white grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {selectedLead.name}</p>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Phone:</strong> {selectedLead.phone}</p>
              <p><strong>Company:</strong> {selectedLead.company}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Source:</strong> {selectedLead.source}</p>
              <p><strong>Last Follow-up:</strong> {selectedLead.lastFollowUp}</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showFormModal && (
       <div className="fixed inset-0 bg-black/40 rounded-2xl backdrop-blur-sm flex items-center justify-center animate-fadeIn">
  <div className="bg-white w-[700px] shadow-2xl border border-gray-300">
    <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 border-b border-gray-200">
      <h3 className="text-2xl font-bold text-white">{editLead ? " Edit Lead" : " Add Lead"}</h3>
      <p className="text-xs text-teal-100 mt-1">Fill in the details below to continue</p>
    </div>

    {/* Form */}
    <div className="p-6 space-y-4 bg-white">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            placeholder="+91 XXXXX XXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            placeholder="Company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
          <select
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="Website">🌐 Website</option>
            <option value="Referral">🤝 Referral</option>
            <option value="Cold Call">📞 Cold Call</option>
            <option value="LinkedIn">💼 LinkedIn</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option value="new">🟠 New</option>
            <option value="positive">🟢 Positive</option>
          </select>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
      <button
        onClick={() => setShowFormModal(false)}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
      >
        Cancel
      </button>
      <button
        onClick={handleSaveLead}
        className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm"
      >
        Save
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
}
