import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { Edit, UserPlus, Plus, Trash2, Search } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  mobile: string;
  company: string;
  status: string;
  assignedTo: string;
  leadSource: string;
  notes: string;
  projectName: string;
  interestPercentage: number;
}


interface LeadManagementProps {
  setActiveTab: (tab: string) => void;
}

export default function LeadManagement({ setActiveTab }: LeadManagementProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const cookies = new Cookies();

  const [formData, setFormData] = useState<Omit<Lead, "id">>({
    name: "",
    email: "",
    mobile: "",
    company: "",
    status: "New",
    assignedTo: "",
    leadSource: "",
    notes: "",
    projectName: "",
    interestPercentage: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const filteredLeads = leads.filter((lead) =>
    [lead.name, lead.email, lead.mobile, lead.projectName]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(
    Math.ceil(filteredLeads.length / leadsPerPage),
    1
  );
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // 🔹 Get Leads
  const getLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/get-lead-list`,
        { page: 1, searchString: "" },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("auth")}`,
          },
        }
      );
      if (res.data.status === "SUCCESS") {
        setLeads(res.data.leads || []); 
      } else {
        toast.warn(res.data.message);
        setLeads([]);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Error fetching leads.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Token:", cookies.get("auth")); // token check
    getLeads();
  }, []);

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim())
      newErrors.clientName = "Client name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.mobile.trim())
      newErrors.contact = "Contact is required.";
    if (!formData.projectName.trim())
      newErrors.projectName = "Project name is required.";
    if (
      formData.interestPercentage < 0 ||
      formData.interestPercentage > 100
    )
      newErrors.interestedPercent =
        "Enter a valid percentage (0-100).";
    if (!formData.assignedTo.trim())
      newErrors.assignTo = "Assign To is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Add / Update Lead
  const handleSaveLead = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);

      let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-lead`;
      let payload: any = { ...formData };

      if (editLead) {
        apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-lead`;
        payload = { ...formData, id: editLead.id };
      }

      const res = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("auth")}`,

        },
      });

      if (res.data.status === "SUCCESS") {
        toast.success(editLead ? "Lead updated!" : "Lead added!");
        setShowFormModal(false);
        getLeads();
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      toast.error("Error saving lead.");
    } finally {
      setLoading(false);
    }
  };

  //  Delete Lead
  const confirmDeleteLead = async () => {
    if (!deleteLead) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/delete-lead`,
        { id: deleteLead.id },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("auth")}`,

          },
        }
      );

      if (res.data.status === "SUCCESS") {
        toast.success("Lead deleted successfully!");
        setShowDeleteModal(false);
        getLeads();
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      toast.error("Error deleting lead.");
    } finally {
      setLoading(false);
    }
  };

  // Handlers for modal open/close
  const handleAddLead = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      company: "",
      status: "New",
      assignedTo: "",
      leadSource: "",
      notes: "",
      projectName: "",
      interestPercentage: 0,
    });
    setEditLead(null);
    setShowFormModal(true);
  };

  const handleEditLead = (lead: Lead) => {
    setFormData({ ...lead });
    setEditLead(lead);
    setShowFormModal(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    setDeleteLead(lead);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Lead Management
          </h2>
          <p className="text-gray-600 mt-1">
            Create, edit and manage Leads
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <Search
              className="absolute left-3 top-3 text-gray-500"
              size={18}
            />
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
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 shadow-sm transition-all transform hover:scale-105"
            >
              First
            </button>
            <span className="px-5 py-2 rounded-lg bg-teal-600 text-white font-semibold shadow-md">
              {currentPage}
            </span>
            <p>OF</p>
            <span className="px-5 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-300 shadow-sm">
              {totalPages}
            </span>
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
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Sr. No
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Client Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Company
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Contact
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Project Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Source
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Interested %
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentLeads.length > 0 ? (
              currentLeads.map((lead, index) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {indexOfFirstLead + index + 1}
                  </td>
                  <td
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => setActiveTab("follow")}
                  >
                    {lead.name}
                  </td>
                  <td className="px-6 py-3">{lead.company}</td>
                  <td className="px-6 py-3">{lead.mobile}</td>
                  <td className="px-6 py-3">{lead.email}</td>
                  <td className="px-6 py-3">{lead.projectName}</td>
                  <td className="px-6 py-3">{lead.leadSource}</td>
                  <td className="px-6 py-3">
                    {lead.interestPercentage}%
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-teal-600"
                        onClick={() => handleEditLead(lead)}
                      >
                        <Edit size={22} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDeleteLead(lead)}
                      >
                        <Trash2 size={22} />
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => setActiveTab("assign")}
                        title="Assign"
                      >
                        <UserPlus size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-6 text-gray-500"
                >
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
              <h3 className="text-2xl font-bold text-white">
                {editLead ? "Edit Lead" : "Add Lead"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Client Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.clientName ? "border-red-500" : ""
                  }`}
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm">
                  {errors.clientName}
                </p>
              )}

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.email ? "border-red-500" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                type="text"
                placeholder="Contact"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e.target.value,
                  })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.contact ? "border-red-500" : ""
                  }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">
                  {errors.contact}
                </p>
              )}

              <input
                type="text"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectName: e.target.value,
                  })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.projectName ? "border-red-500" : ""
                  }`}
              />
              {errors.projectName && (
                <p className="text-red-500 text-sm">
                  {errors.projectName}
                </p>
              )}

              <input
                type="number"
                placeholder="Interested %"
                value={formData.interestPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interestPercentage: Number(e.target.value),
                  })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.interestedPercent ? "border-red-500" : ""
                  }`}
              />
              {errors.interestedPercent && (
                <p className="text-red-500 text-sm">
                  {errors.interestedPercent}
                </p>
              )}

              <input
                type="text"
                placeholder="Assign To"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedTo: e.target.value,
                  })
                }
                className={`w-full border px-3 py-2 rounded-lg ${errors.assignTo ? "border-red-500" : ""
                  }`}
              />
              {errors.assignTo && (
                <p className="text-red-500 text-sm">
                  {errors.assignTo}
                </p>
              )}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button
                onClick={() => setShowFormModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLead}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
              >
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
              <h3 className="text-2xl font-bold text-white">
                Confirm Delete
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {deleteLead.name}
                </span>
                ?
              </p>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteLead}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
