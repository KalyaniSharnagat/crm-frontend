import React, { useState } from "react";
import { Eye, Edit, UserPlus, Plus, Trash2, Search } from "lucide-react";

interface assign {
  id: number;
  clientName: string;
  email: string;
  contact: string;
  projectName: string;
  assigntask: string;
  status: "New" | "Positive";
  source: string;
  lastFollowUp: string;
  assignTo: string;
}

interface assignManagementProps {
  setActiveTab: (tab: string) => void;
}

export default function assignManagement({ setActiveTab }: assignManagementProps) {
  const [assigns, setassigns] = useState<assign[]>([
    {
      id: 1,
      clientName: "John Smith",
      email: "john@example.com",
      contact: "+1-555-0123",
      projectName: "CRM System",
      assigntask: " data analysis",
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
      assigntask: "UI Design",
      status: "New",
      source: "Referral",
      lastFollowUp: "2024-01-18",
      assignTo: "Priya Singh",
    },
  ]);

  // Form Modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [editassign, setEditassign] = useState<assign | null>(null);
  const [formData, setFormData] = useState<Omit<assign, "id">>({
    clientName: "",
    email: "",
    contact: "",
    projectName: "",
    assigntask: "",
    status: "New",
    source: "",
    lastFollowUp: "",
    assignTo: "",
  });

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteassign, setDeleteassign] = useState<assign | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Search & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const assignsPerPage = 5;

  const filteredassigns = assigns.filter((assign) =>
    [assign.clientName, assign.email, assign.contact, assign.projectName].join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredassigns.length / assignsPerPage), 1);
  const indexOfLastassign = currentPage * assignsPerPage;
  const indexOfFirstassign = indexOfLastassign - assignsPerPage;
  const currentassigns = filteredassigns.slice(indexOfFirstassign, indexOfLastassign);

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
    if (!formData.assigntask.trim()) newErrors.assigntask = "Assign Task is required.";
    if (!formData.assignTo.trim()) newErrors.assignTo = "Assign To is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add/Edit/Delete Handlers
  const handassigndassign = () => {
    setFormData({
      clientName: "",
      email: "",
      contact: "",
      projectName: "",
      assigntask: "",
      status: "New",
      source: "",
      lastFollowUp: "",
      assignTo: "",
    });
    setEditassign(null);
    setErrors({});
    setShowFormModal(true);
  };

  const handleEditassign = (assign: assign) => {
    setFormData({ ...assign });
    setEditassign(assign);
    setErrors({});
    setShowFormModal(true);
  };

  const handleSaveassign = () => {
    if (!validateForm()) return; // Stop if validation fails

    if (editassign) {
      setassigns(assigns.map((l) => (l.id === editassign.id ? { ...editassign, ...formData } : l)));
    } else {
      const newassign: assign = { id: assigns.length + 1, ...formData };
      setassigns([...assigns, newassign]);
    }
    setShowFormModal(false);
  };

  const handleDeleteassign = (assign: assign) => {
    setDeleteassign(assign);
    setShowDeleteModal(true);
  };

  const confirmDeleteassign = () => {
    if (deleteassign) {
      setassigns(assigns.filter((l) => l.id !== deleteassign.id));
      setDeleteassign(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Assign Management</h2>
          <p className="text-gray-600 mt-1">Create, edit and manage Assigns</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search assigns..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          {/* Add assign */}
          <button
            onClick={handassigndassign}
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={20} />
            <span>Add assign</span>
          </button>
          {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm transition-transform transform hover:scale-105"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 ${currentPage === i + 1 ? "bg-teal-600 text-white font-semibold shadow-lg" : "bg-white text-gray-700 hover:bg-teal-100"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm transition-transform transform hover:scale-105"
        >
          Next
        </button>
      </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/20 text-lg sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Sr. No</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Contact</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Project Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Assign Task</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentassigns.length > 0 ? (
              currentassigns.map((assign, index) => (
                <tr key={assign.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{indexOfFirstassign + index + 1}</td>
                  <td className="px-6 py-3"  onClick={() => setActiveTab("follow")}>{assign.clientName}</td>
                  <td className="px-6 py-3">{assign.contact}</td>
                  <td className="px-6 py-3">{assign.email}</td>
                  <td className="px-6 py-3">{assign.projectName}</td>
                  <td className="px-6 py-3">{assign.assigntask}</td>
                 
                  <td className="px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-teal-600" onClick={() => handleEditassign(assign)}>
                        <Edit size={22} />
                      </button>
                      {/* <button className="text-orange-600" onClick={() => setActiveTab("follow")}>
                        <Calendar size={22} />
                      </button> */}
                      <button className="text-red-600" onClick={() => handleDeleteassign(assign)}>
                        <Trash2 size={22} />
                      </button>
                       
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No assigns found
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
              <h3 className="text-2xl font-bold text-white">{editassign ? "Edit assign" : "Add assign"}</h3>
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
                type="text"
                placeholder="Assign Task"
                value={formData.assigntask}
                onChange={(e) => setFormData({ ...formData, assigntask:(e.target.value) })}
                className={`w-full border px-3 py-2 rounded-lg ${errors.assigntask ? "border-red-500" : ""}`}
              />
              {errors.assigntask && <p className="text-red-500 text-sm">{errors.assigntask}</p>}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowFormModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSaveassign} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && deleteassign && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[500px] shadow-2xl border border-gray-300 rounded-xl">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">Confirm Delete</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete <span className="font-semibold">{deleteassign.clientName}</span>?
              </p>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button onClick={confirmDeleteassign} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
