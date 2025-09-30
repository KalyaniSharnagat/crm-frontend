import React, { useState } from "react";
import { Eye, Edit, UserPlus, Plus, Trash2, Search } from "lucide-react";

interface Lead {
  id: number;
  clientName: string;
  email: string;
  contact: string;
  projectName: string;
  interestedPercent: number;
  status: "New" | "Positive";
  source: string;
  lastFollowUp: string;
  assignTo: string;
}

interface LeadManagementProps {
  setActiveTab: (tab: string) => void;
}

export default function LeadManagement({ setActiveTab }: LeadManagementProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      clientName: "John Smith",
      email: "john@example.com",
      contact: "+1-555-0123",
      projectName: "CRM System",
      interestedPercent: 80,
      status: "Positive",
      source: "Website",
      lastFollowUp: "2024-01-15",
      assignTo: "Amit Sharma",
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      email: "sarah@example.com",
      contact: "+1-555-0124",
      projectName: "Mobile App",
      interestedPercent: 60,
      status: "New",
      source: "Referral",
      lastFollowUp: "2024-01-18",
      assignTo: "Priya Singh",
    },
  ]);

  // Form Modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Omit<Lead, "id">>({
    clientName: "",
    email: "",
    contact: "",
    projectName: "",
    interestedPercent: 0,
    status: "New",
    source: "",
    lastFollowUp: "",
    assignTo: "",
  });

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Search & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const filteredLeads = leads.filter((lead) =>
    [lead.clientName, lead.email, lead.contact, lead.projectName].join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredLeads.length / leadsPerPage), 1);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required.";
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required.";
    if (formData.interestedPercent < 0 || formData.interestedPercent > 100)
      newErrors.interestedPercent = "Enter a valid percentage (0-100).";
    if (!formData.assignTo.trim()) newErrors.assignTo = "Assign To is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add/Edit/Delete Handlers
  const handleAddLead = () => {
    setFormData({
      clientName: "",
      email: "",
      contact: "",
      projectName: "",
      interestedPercent: 0,
      status: "New",
      source: "",
      lastFollowUp: "",
      assignTo: "",
    });
    setEditLead(null);
    setErrors({});
    setShowFormModal(true);
  };

  const handleEditLead = (lead: Lead) => {
    setFormData({ ...lead });
    setEditLead(lead);
    setErrors({});
    setShowFormModal(true);
  };

  const handleSaveLead = () => {
    if (!validateForm()) return; // Stop if validation fails

    if (editLead) {
      setLeads(leads.map((l) => (l.id === editLead.id ? { ...editLead, ...formData } : l)));
    } else {
      const newLead: Lead = { id: leads.length + 1, ...formData };
      setLeads([...leads, newLead]);
    }
    setShowFormModal(false);
  };

  const handleDeleteLead = (lead: Lead) => {
    setDeleteLead(lead);
    setShowDeleteModal(true);
  };

  const confirmDeleteLead = () => {
    if (deleteLead) {
      setLeads(leads.filter((l) => l.id !== deleteLead.id));
      setDeleteLead(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
          <p className="text-gray-600 mt-1">Create, edit and manage Leads</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          {/* Add Lead */}
          <button
            onClick={handleAddLead}
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={20} />
            <span>Add Lead</span>
          </button>
         {/* Pagination */}
<div className="flex justify-center items-center space-x-3">
  {/* First Page */}
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 shadow-sm transition-all transform hover:scale-105"
  >
    First
  </button>

  {/* Current Page */}
  <span className="px-5 py-2 rounded-full bg-teal-600 text-white font-semibold shadow-md">
    {currentPage}
  </span>
     <p>OF</p> 
  {/* Last Page */}
  <span className="px-5 py-2 rounded-full bg-gray-50 text-gray-700 border border-gray-300 shadow-sm">
    {totalPages}
  </span>

  {/* Last Page Button */}
  <button
    onClick={() => handlePageChange(totalPages)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 shadow-sm transition-all transform hover:scale-105"
  >
    Last
  </button>
</div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/20 text-lg">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Sr. No</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Client Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Contact</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Project Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Interested %</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentLeads.length > 0 ? (
              currentLeads.map((lead, index) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{indexOfFirstLead + index + 1}</td>
                  <td className="px-6 py-3 cursor-pointer"  onClick={() => setActiveTab("follow")}>{lead.clientName}</td>
                  <td className="px-6 py-3">{lead.contact}</td>
                  <td className="px-6 py-3">{lead.email}</td>
                  <td className="px-6 py-3">{lead.projectName}</td>
                  <td className="px-6 py-3">{lead.interestedPercent}%</td>
                 
                  <td className="px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-teal-600" onClick={() => handleEditLead(lead)}>
                        <Edit size={22} />
                      </button>
                      {/* <button className="text-orange-600" onClick={() => setActiveTab("follow")}>
                        <Calendar size={22} />
                      </button> */}
                      <button className="text-red-600" onClick={() => handleDeleteLead(lead)}>
                        <Trash2 size={22} />
                      </button>
                        <button className="text-indigo-600 hover:text-indigo-800" onClick={() => setActiveTab("assign")} title="Assign">
                          <UserPlus size={22} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[600px] shadow-2xl border border-gray-300 rounded-xl">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">{editLead ? "Edit Lead" : "Add Lead"}</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Client Name */}
              <input
                type="text"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.clientName ? "border-red-500" : ""}`}
              />
              {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              {/* Contact */}
              <input
                type="text"
                placeholder="Contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.contact ? "border-red-500" : ""}`}
              />
              {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}

              {/* Project Name */}
              <input
                type="text"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.projectName ? "border-red-500" : ""}`}
              />
              {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}

              {/* Interested % */}
              <input
                type="number"
                placeholder="Interested %"
                value={formData.interestedPercent}
                onChange={(e) => setFormData({ ...formData, interestedPercent: Number(e.target.value) })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.interestedPercent ? "border-red-500" : ""}`}
              />
              {errors.interestedPercent && <p className="text-red-500 text-sm">{errors.interestedPercent}</p>}

              {/* Assign To */}
              <input
                type="text"
                placeholder="Assign To"
                value={formData.assignTo}
                onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.assignTo ? "border-red-500" : ""}`}
              />
              {errors.assignTo && <p className="text-red-500 text-sm">{errors.assignTo}</p>}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowFormModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSaveLead} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && deleteLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[500px] shadow-2xl border border-gray-300 rounded-xl">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">Confirm Delete</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete <span className="font-semibold">{deleteLead.clientName}</span>?
              </p>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={confirmDeleteLead} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
