import React, { useState } from "react";
import { Plus, Edit, FileDown, Trash2 } from "lucide-react";

interface Payment {
    id: number;
    leadQuotation: string;
    clientName: string;
    amount: number;
    status: "Pending" | "Paid" | "Partial";
    date: string;
    mode: "Cash" | "Bank Transfer" | "Online";
}

const Payments: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([
        {
            id: 1,
            leadQuotation: "Quotation #Q001",
            clientName: "ABC Pvt Ltd",
            amount: 50000,
            status: "Pending",
            date: "2025-09-25",
            mode: "Bank Transfer",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editPayment, setEditPayment] = useState<Payment | null>(null);

    const [formData, setFormData] = useState<Omit<Payment, "id">>({
        leadQuotation: "",
        clientName: "",
        amount: 0,
        status: "Pending",
        date: "",
        mode: "Cash",
    });

    // delete confirmation state
    const [deletePayment, setDeletePayment] = useState<Payment | null>(null);

    const handleSave = () => {
        if (editPayment) {
            // Edit case
            setPayments((prev) =>
                prev.map((p) =>
                    p.id === editPayment.id ? { ...editPayment, ...formData } : p
                )
            );
        } else {
            // Add case
            const newPayment: Payment = {
                id: payments.length + 1,
                ...formData,
            };
            setPayments((prev) => [...prev, newPayment]);
        }
        setShowModal(false);
        setEditPayment(null);
        setFormData({
            leadQuotation: "",
            clientName: "",
            amount: 0,
            status: "Pending",
            date: "",
            mode: "Cash",
        });
    };

    const handleEdit = (payment: Payment) => {
        setEditPayment(payment);
        setFormData(payment);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (deletePayment) {
            setPayments((prev) => prev.filter((p) => p.id !== deletePayment.id));
            setDeletePayment(null);
        }
    };

    return (
       <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Payment List</h2>
                    <p className="text-gray-600 mt-1">Cash flow looking good Paid,Partial,still waiting.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                    >
                        <Plus size={18} /> Add Payment
                    </button>

                </div>
            </div>

            {/* Table */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/20 text-lg">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Payment ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Lead / Quotation</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Client Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Payment Status</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Payment Date</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 ">{payment.id}</td>
                                <td className="px-4 py-2 ">{payment.leadQuotation}</td>
                                <td className="px-4 py-2">{payment.clientName}</td>
                                <td className="px-4 py-2">₹{payment.amount}</td>
                                <td className="px-4 py-2 ">
                                    {payment.status === "Pending" && (
                                        <span className="text-orange-600 font-medium">🟠 Pending</span>
                                    )}
                                    {payment.status === "Paid" && (
                                        <span className="text-green-600 font-medium">🟢 Paid</span>
                                    )}
                                    {payment.status === "Partial" && (
                                        <span className="text-blue-600 font-medium">🔵 Partial</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 ">{payment.date}</td>
                                <td className="px-4 py-2  flex gap-3">
                                    <button
                                        onClick={() => handleEdit(payment)}
                                        className="flex items-center gap-1 text-teal-600 hover:underline"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => setDeletePayment(payment)}
                                        className="flex items-center gap-1 text-red-600 hover:underline"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="flex items-center gap-1 text-gray-600 hover:underline">
                                        <FileDown size={18} />
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
                    <div className="bg-white w-[600px] shadow-2xl rounded-lg border border-gray-200 animate-fadeIn">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 rounded-t-lg">
                            <h3 className="text-xl font-bold text-white">
                                {editPayment ? "Edit Payment" : "Add Payment"}
                            </h3>
                            <p className="text-xs text-teal-100 mt-1">Fill in the details below</p>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Form fields here (same as before) */}
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lead / Quotation
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.leadQuotation}
                                        onChange={(e) =>
                                            setFormData({ ...formData, leadQuotation: e.target.value })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, clientName: e.target.value })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({ ...formData, amount: Number(e.target.value) })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Mode
                                    </label>
                                    <select
                                        value={formData.mode}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                mode: e.target.value as Payment["mode"],
                                            })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Cash">💵 Cash</option>
                                        <option value="Bank Transfer">🏦 Bank Transfer</option>
                                        <option value="Online">🌐 Online</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as Payment["status"],
                                            })
                                        }
                                        className="w-full border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="Pending">🟠 Pending</option>
                                        <option value="Paid">🟢 Paid</option>
                                        <option value="Partial">🔵 Partial</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditPayment(null);
                                }}
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white w-[400px] shadow-2xl rounded-lg border border-gray-200 animate-fadeIn p-6">
                        <h3 className="text-lg font-bold text-gray-800">Confirm Delete</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to delete payment{" "}
                            <span className="font-semibold">#{deletePayment.id}</span> for{" "}
                            <span className="font-semibold">{deletePayment.clientName}</span>?
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
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
