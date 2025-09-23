import React, { useState } from 'react';
import { Plus, Search, Download, Edit, Eye, Trash2, FileText } from 'lucide-react';

interface QuotationItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Quotation {
  id: number;
  leadName: string;
  company: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  notes: string;
}

export default function QuotationManager() {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: 1,
      leadName: 'John Smith',
      company: 'Tech Corp',
      quotationNumber: 'QT-2024-001',
      date: '2024-01-15',
      validUntil: '2024-02-15',
      items: [
        { id: 1, description: 'Premium Package', quantity: 1, rate: 5000, amount: 5000 },
        { id: 2, description: 'Setup Fee', quantity: 1, rate: 500, amount: 500 }
      ],
      subtotal: 5500,
      tax: 550,
      total: 6050,
      status: 'sent',
      notes: 'Premium package with full setup'
    },
    {
      id: 2,
      leadName: 'Sarah Johnson',
      company: 'Design Studio',
      quotationNumber: 'QT-2024-002',
      date: '2024-01-14',
      validUntil: '2024-02-14',
      items: [
        { id: 1, description: 'Custom Solution', quantity: 1, rate: 3000, amount: 3000 }
      ],
      subtotal: 3000,
      tax: 300,
      total: 3300,
      status: 'draft',
      notes: 'Custom solution as per requirements'
    }
  ]);

  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'sent': return 'bg-blue-500';
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const exportToPDF = (quotation: Quotation) => {
    // This would integrate with a PDF generation library
    alert(`Exporting quotation ${quotation.quotationNumber} to PDF...`);
  };

  const QuotationEditor = ({ quotation }: { quotation: Quotation }) => {
    const [editData, setEditData] = useState({ ...quotation });

    const addItem = () => {
      const newItem: QuotationItem = {
        id: Date.now(),
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      };
      setEditData({
        ...editData,
        items: [...editData.items, newItem]
      });
    };

    const updateItem = (itemId: number, field: keyof QuotationItem, value: any) => {
      const updatedItems = editData.items.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updated.amount = updated.quantity * updated.rate;
          }
          return updated;
        }
        return item;
      });
      
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
      
      setEditData({
        ...editData,
        items: updatedItems,
        subtotal,
        tax,
        total
      });
    };

    const removeItem = (itemId: number) => {
      const updatedItems = editData.items.filter(item => item.id !== itemId);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
      
      setEditData({
        ...editData,
        items: updatedItems,
        subtotal,
        tax,
        total
      });
    };

    const saveQuotation = () => {
      setQuotations(quotations.map(q => q.id === editData.id ? editData : q));
      setShowEditor(false);
      setEditingQuotation(null);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Edit Quotation</h3>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Name</label>
                <input
                  type="text"
                  value={editData.leadName}
                  onChange={(e) => setEditData({...editData, leadName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) => setEditData({...editData, company: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                <input
                  type="date"
                  value={editData.validUntil}
                  onChange={(e) => setEditData({...editData, validUntil: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Items</h4>
                <button
                  onClick={addItem}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Item
                </button>
              </div>
              
              <div className="space-y-3">
                {editData.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-lg">
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.amount}
                        readOnly
                        className="w-full px-2 py-1 border rounded bg-gray-100"
                      />
                    </div>
                    <div className="col-span-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2 max-w-md ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${editData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">${editData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${editData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={editData.notes}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Additional notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowEditor(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveQuotation}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quotation Manager</h2>
          <p className="text-gray-600 mt-1">Create, edit and manage quotations</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center space-x-2 font-medium">
          <Plus size={20} />
          <span>New Quotation</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search quotations..."
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Quotation #</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Client</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Valid Until</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {quotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{quotation.quotationNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{quotation.leadName}</p>
                      <p className="text-sm text-gray-600">{quotation.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800">{quotation.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800">{quotation.validUntil}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">${quotation.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(quotation.status)}`}></div>
                      <span className="capitalize font-medium text-gray-800">{quotation.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedQuotation(quotation)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuotation(quotation);
                          setShowEditor(true);
                        }}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => exportToPDF(quotation)}
                        className="text-purple-600 hover:text-purple-800 p-1"
                        title="Export to PDF"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-gray-600">{quotations.filter(q => q.status === 'draft').length}</div>
          <div className="text-gray-700 font-medium mt-2">Draft</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-blue-600">{quotations.filter(q => q.status === 'sent').length}</div>
          <div className="text-gray-700 font-medium mt-2">Sent</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-green-600">{quotations.filter(q => q.status === 'accepted').length}</div>
          <div className="text-gray-700 font-medium mt-2">Accepted</div>
        </div>
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-center">
          <div className="text-3xl font-bold text-purple-600">{quotations.reduce((sum, q) => sum + q.total, 0).toFixed(0)}</div>
          <div className="text-gray-700 font-medium mt-2">Total Value</div>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && editingQuotation && (
        <QuotationEditor quotation={editingQuotation} />
      )}
    </div>
  );
}