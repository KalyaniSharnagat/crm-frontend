import React, { useState } from "react";
import { Plus, Edit, FileDown, Trash2, Search } from "lucide-react";

interface Payment {
    id: number;
    paymentQuotation: string;
    clientName: string;
    projectName: string;
    mode: "Cash" | "Bank Transfer" | "Online";
    installmentCount: number;
    paidCount: number;
    remainingCount: number;
    givenTo: string;
    totalAmount: number;
    status: "Pending" | "Paid" | "Partial";
    date: string;
}

const Payments: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([
        {
            id: 1,
            paymentQuotation: "Quotation #Q001",
            clientName: "ABC Pvt Ltd",
            projectName: "Project A",
            mode: "Bank Transfer",
            installmentCount: 2,
            paidCount: 1,
            remainingCount: 1,
            givenTo: "John Doe",
            totalAmount: 50000,
            status: "Pending",
            date: "2025-09-25",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editPayment, setEditPayment] = useState<Payment | null>(null);
    const [deletePayment, setDeletePayment] = useState<Payment | null>(null);

    const initialFormData: Omit<Payment, "id"> = {
        paymentQuotation: "",
        clientName: "",
        projectName: "",
        mode: "Cash",
        installmentCount: 0,
        paidCount: 0,
        remainingCount: 0,
        givenTo: "",
        totalAmount: 0,
        status: "Pending",
        date: "",
    };

    const [formData, setFormData] = useState<Omit<Payment, "id">>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof initialFormData, string>>>({});

    // Search & Pagination
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 5;

    const filteredpayments = payments.filter((payment) =>
        [payment.clientName, payment.projectName].join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.max(Math.ceil(filteredpayments.length / paymentsPerPage), 1);
    const indexOfLastpayment = currentPage * paymentsPerPage;
    const indexOfFirstpayment = indexOfLastpayment - paymentsPerPage;
    const currentpayments = filteredpayments.slice(indexOfFirstpayment, indexOfLastpayment);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };


    // Validation Function
    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.paymentQuotation.trim()) newErrors.paymentQuotation = "Quotation ID is required";
        if (!formData.clientName.trim()) newErrors.clientName = "Client Name is required";
        if (!formData.projectName.trim()) newErrors.projectName = "Project Name is required";
        if (!formData.givenTo.trim()) newErrors.givenTo = "Given To is required";
        if (formData.installmentCount <= 0) newErrors.installmentCount = "Installments must be greater than 0";
        if (formData.paidCount < 0) newErrors.paidCount = "Paid count cannot be negative";
        if (formData.remainingCount < 0) newErrors.remainingCount = "Remaining cannot be negative";
        if (formData.totalAmount <= 0) newErrors.totalAmount = "Total Amount must be greater than 0";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return; // ❌ Validation fail → stop save

        if (editPayment) {
            setPayments((prev) =>
                prev.map((p) => (p.id === editPayment.id ? { ...editPayment, ...formData } : p))
            );
        } else {
            const newPayment: Payment = {
                id: payments.length + 1,
                ...formData,
            };
            setPayments((prev) => [...prev, newPayment]);
        }
        setShowModal(false);
        setEditPayment(null);
        setFormData(initialFormData);
        setErrors({});
    };

    const handleEdit = (payment: Payment) => {
        setEditPayment(payment);
        setFormData(payment);
        setErrors({});
        setShowModal(true);
    };

    // Delete
    const handleDelete = () => {
        if (deletePayment) {
            setPayments((prev) => prev.filter((p) => p.id !== deletePayment.id));
            setDeletePayment(null);
        }
    };

    const handleDownload = (payment: Payment) => {
        alert(`Download logic for Payment ID: ${payment.id}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Payment List</h2>
                    <p className="text-gray-600 mt-1">Cash flow looking good Paid, Partial, still waiting.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search Payment..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                    >
                        <Plus size={18} /> Add Payment
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
                    <thead className="bg-white/20 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Sr. No</th>
                             <th className="px-4 py-2 text-left font-semibold text-gray-700">Project Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Client Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Payment Method</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Installments</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Paid</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Remaining</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Given To</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Total Amount</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{payment.projectName}</td>
                                <td className="px-4 py-2">{payment.clientName}</td>                             
                                <td className="px-4 py-2">{payment.mode}</td>
                                <td className="px-4 py-2">{payment.installmentCount}</td>
                                <td className="px-4 py-2">{payment.paidCount}</td>
                                <td className="px-4 py-2">{payment.remainingCount}</td>
                                <td className="px-4 py-2">{payment.givenTo}</td>
                                <td className="px-4 py-2">₹{payment.totalAmount}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(payment)}
                                        className="text-teal-600 hover:underline flex items-center gap-1"
                                    >
                                        <Edit size={22} />
                                    </button>
                                    <button
                                        onClick={() => setDeletePayment(payment)}
                                        className="text-red-600 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                    <button
                                        onClick={() => handleDownload(payment)}
                                        className="text-gray-600 hover:underline flex items-center gap-1"
                                    >
                                        <FileDown size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white w-[700px] shadow-2xl rounded-lg border border-gray-200 animate-fadeIn">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 rounded-t-lg">
                            <h3 className="text-xl font-bold text-white">
                                {editPayment ? "Edit Payment" : "Add Payment"}
                            </h3>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={formData.projectName}
                                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.projectName ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.projectName && <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>}
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.clientName ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                    <select
                                        value={formData.mode}
                                        onChange={(e) => setFormData({ ...formData, mode: e.target.value as any })}
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Cash">💵 Cash</option>
                                        <option value="Bank Transfer">🏦 Bank Transfer</option>
                                        <option value="Online">🌐 Online</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Installments</label>
                                    <input
                                        type="number"
                                        value={formData.installmentCount}
                                        onChange={(e) => setFormData({ ...formData, installmentCount: Number(e.target.value) })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.installmentCount ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.installmentCount && <p className="text-red-500 text-xs mt-1">{errors.installmentCount}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Paid</label>
                                    <input
                                        type="number"
                                        value={formData.paidCount}
                                        onChange={(e) => setFormData({ ...formData, paidCount: Number(e.target.value) })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.paidCount ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.paidCount && <p className="text-red-500 text-xs mt-1">{errors.paidCount}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Remaining</label>
                                    <input
                                        type="number"
                                        value={formData.remainingCount}
                                        onChange={(e) => setFormData({ ...formData, remainingCount: Number(e.target.value) })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.remainingCount ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.remainingCount && <p className="text-red-500 text-xs mt-1">{errors.remainingCount}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Given To</label>
                                    <input
                                        type="text"
                                        value={formData.givenTo}
                                        onChange={(e) => setFormData({ ...formData, givenTo: e.target.value })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.givenTo ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.givenTo && <p className="text-red-500 text-xs mt-1">{errors.givenTo}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                    <input
                                        type="number"
                                        value={formData.totalAmount}
                                        onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                                        className={`w-full border px-3 py-2 outline-none focus:ring-2 ${errors.totalAmount ? "border-red-500 focus:ring-red-500" : "focus:ring-teal-500"
                                            }`}
                                    />
                                    {errors.totalAmount && <p className="text-red-500 text-xs mt-1">{errors.totalAmount}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {deletePayment && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white w-[500px] shadow-2xl border border-gray-300 rounded-xl">
                        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-xl">
                            <h3 className="text-2xl font-bold text-white">Confirm Delete</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 mt-2">
                                Are you sure you want to delete payment{" "}
                                <span className="font-semibold">#{deletePayment.id}</span> for{" "}
                                <span className="font-semibold">{deletePayment.clientName}</span>?
                            </p>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                            <button
                                onClick={() => setDeletePayment(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;
