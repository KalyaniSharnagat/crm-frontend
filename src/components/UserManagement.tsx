import React, { useState } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Team Leader" | "Sales Head" | "CEO" | "Director" | "Sales Team" | "Admin";
  status: "Enabled" | "Disabled";
}

interface UserManagementProps {
  setActiveTab: (tab: string) => void;
}

export default function UserManagement({ setActiveTab }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Amit Sharma", email: "amit@example.com", phone: "9876543210", role: "Admin", status: "Enabled" },
    { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "9123456780", role: "Sales Team", status: "Disabled" },
    // Add more users if needed for testing pagination
  ]);

  // Search & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.phone, user.role].join(" ").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredUsers.length / usersPerPage), 1);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const [showFormModal, setShowFormModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phone: "",
    role: "Sales Team",
    status: "Enabled",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    setFormData({ name: "", email: "", phone: "", role: "Sales Team", status: "Enabled" });
    setEditUser(null);
    setErrors({});
    setShowFormModal(true);
  };

  const handleEditUser = (user: User) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status });
    setEditUser(user);
    setErrors({});
    setShowFormModal(true);
  };

  const handleSaveUser = () => {
    if (!validateForm()) return;
    if (editUser) {
      setUsers(users.map(u => (u.id === editUser.id ? { ...editUser, ...formData } : u)));
    } else {
      const newUser: User = { id: users.length + 1, ...formData };
      setUsers([...users, newUser]);
    }
    setShowFormModal(false);
  };

  const handleConfirmDelete = (user: User) => {
    setDeleteUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (deleteUser) {
      setUsers(users.filter(user => user.id !== deleteUser.id));
      setDeleteUser(null);
      setShowDeleteModal(false);
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: user.status === "Enabled" ? "Disabled" : "Enabled" } : user)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">Manage system users and roles</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search User..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={20} /> <span>Add User</span>
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
          <thead className="bg-white/20 text-lg">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Sr.No</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{indexOfFirstUser + index + 1}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.phone}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${user.status === "Enabled" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 flex items-center space-x-3">
                  <button onClick={() => handleEditUser(user)} className="text-teal-600 hover:text-teal-700"><Edit size={22} /></button>
                  <button onClick={() => handleConfirmDelete(user)} className="text-red-600 hover:text-red-700"><Trash2 size={22} /></button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 focus:outline-none ${user.status === "Enabled" ? "bg-teal-600" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-300 ${user.status === "Enabled" ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && deleteUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[500px] shadow-2xl border border-gray-300 rounded-xl">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">Confirm Delete</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg">
                Are you sure you want to delete <span className="font-semibold">{deleteUser.name}</span>?
              </p>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">Cancel</button>
              <button onClick={handleDeleteUser} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[600px] shadow-2xl border border-gray-300 rounded-xl">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-4 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">{editUser ? "Edit User" : "Add User"}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none ${errors.name ? "border-red-500" : ""}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={`w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none ${errors.email ? "border-red-500" : ""}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={`w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none ${errors.phone ? "border-red-500" : ""}`} />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as User["role"] })} className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option value="Team Leader">Team Leader</option>
                  <option value="Sales Head">Sales Head</option>
                  <option value="CEO">CEO</option>
                  <option value="Director">Director</option>
                  <option value="Sales Team">Sales Team</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
              <button onClick={() => setShowFormModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">Cancel</button>
              <button onClick={handleSaveUser} className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
