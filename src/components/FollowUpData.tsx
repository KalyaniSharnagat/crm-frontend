import React, { useState } from 'react';
import { Eye, Edit, Plus } from 'lucide-react';

interface Lead {
  id: number;
  followUpDate: string;
  remarks: string;
  nextFollowUp: string;
  followUpBy: string;
}

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      followUpDate: '2024-01-15',
      remarks: 'Called client, interested',
      nextFollowUp: '2024-01-20',
      followUpBy: 'John Doe',
    },
    {
      id: 2,
      followUpDate: '2024-01-18',
      remarks: 'Sent email',
      nextFollowUp: '2024-01-25',
      followUpBy: 'Sarah Smith',
    },
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState<Omit<Lead, 'id'>>({
    followUpDate: '',
    remarks: '',
    nextFollowUp: '',
    followUpBy: '',
  });

  // Open Add Modal
  const handleAddLead = () => {
    setFormData({
      followUpDate: '',
      remarks: '',
      nextFollowUp: '',
      followUpBy: '',
    });
    setEditLead(null);
    setShowFormModal(true);
  };

  // Open Edit Modal
  const handleEditLead = (lead: Lead) => {
    setFormData({
      followUpDate: lead.followUpDate,
      remarks: lead.remarks,
      nextFollowUp: lead.nextFollowUp,
      followUpBy: lead.followUpBy,
    });
    setEditLead(lead);
    setShowFormModal(true);
  };

  // Save Lead
  const handleSaveLead = () => {
    if (editLead) {
      setLeads(
        leads.map((l) =>
          l.id === editLead.id ? { ...editLead, ...formData } : l
        )
      );
    } else {
      const newLead: Lead = {
        id: leads.length + 1,
        ...formData,
      };
      setLeads([...leads, newLead]);
    }
    setShowFormModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Follow Up Management</h2>
          <p className="text-gray-600 mt-1">Create, edit and manage Follow Up Data</p>
        </div>
        <button
          onClick={handleAddLead}
          className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
        >
          <Plus size={20} />
          <span>Add Follow-Up</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/20 text-lg">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Sr. No</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Follow-up Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Remarks</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Next Follow-up Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Follow-up By</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.map((lead, index) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{lead.followUpDate}</td>
                <td className="px-6 py-3">{lead.remarks}</td>
                <td className="px-6 py-3">{lead.nextFollowUp}</td>
                <td className="px-6 py-3">{lead.followUpBy}</td>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fadeIn z-50">
          <div className="bg-white rounded-none w-[500px] shadow-2xl border border-gray-300">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-white">📝 Lead Details</h3>
            </div>
            <div className="p-6 bg-white grid grid-cols-1 gap-2 text-gray-700">
              <p><strong>Follow-up Date:</strong> {selectedLead.followUpDate}</p>
              <p><strong>Remarks:</strong> {selectedLead.remarks}</p>
              <p><strong>Next Follow-up Date:</strong> {selectedLead.nextFollowUp}</p>
              <p><strong>Follow-up By:</strong> {selectedLead.followUpBy}</p>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-none w-[500px] shadow-2xl border border-gray-300">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-white">{editLead ? "Edit Follow-Up" : "Add Follow-Up"}</h3>
            </div>
            <div className="p-6 space-y-4 bg-white">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up Date</label>
                <input
                  type="date"
                  value={formData.nextFollowUp}
                  onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up By</label>
                <input
                  type="text"
                  value={formData.followUpBy}
                  onChange={(e) => setFormData({ ...formData, followUpBy: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
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
