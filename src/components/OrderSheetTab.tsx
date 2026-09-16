import React, { useState } from 'react';
import { OrderItem } from '../types';
import { FileSpreadsheet, Plus, Upload, Download, Search, RefreshCw, CheckCircle2, Clock, ExternalLink, Trash2, Edit3 } from 'lucide-react';
import * as XLSX from 'xlsx';

interface OrderSheetTabProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  onStartSimulation: () => void;
}

export const OrderSheetTab: React.FC<OrderSheetTabProps> = ({
  orders,
  setOrders,
  onStartSimulation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New order form state
  const [newOrder, setNewOrder] = useState({
    orderId: `EB-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: '',
    address: '',
    phone: '',
    productLink: 'https://www.ebay.com/itm/sample-item',
    supplierLink: 'https://www.supplier-portal.com/product/item',
    sku: 'SKU-SAMPLE',
    quantity: 1,
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.address) return;

    const item: OrderItem = {
      id: `ord-${Date.now()}`,
      ...newOrder,
      status: 'Pending',
    };

    setOrders([item, ...orders]);
    setNewOrder({
      orderId: `EB-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: '',
      address: '',
      phone: '',
      productLink: 'https://www.ebay.com/itm/sample-item',
      supplierLink: 'https://www.supplier-portal.com/product/item',
      sku: 'SKU-SAMPLE',
      quantity: 1,
    });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleResetStatus = () => {
    setOrders(orders.map((o) => ({ ...o, status: 'Pending' })));
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheetData = orders.map((o) => ({
      'OrderID': o.orderId,
      'Customer Name': o.customerName,
      'Address': o.address,
      'Phone': o.phone,
      'Product Link': o.productLink,
      'Supplier Link': o.supplierLink,
      'SKU': o.sku,
      'Quantity': o.quantity,
      'Status': o.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'eBay Orders');
    XLSX.writeFile(workbook, 'ebay_orders_demo.xlsx');
  };

  // Import from Excel / CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws);

        const importedOrders: OrderItem[] = data.map((row, idx) => ({
          id: `imp-${Date.now()}-${idx}`,
          orderId: String(row['OrderID'] || row['Order ID'] || `EB-${90000 + idx}`),
          customerName: String(row['Customer Name'] || row['Customer'] || 'Unknown Customer'),
          address: String(row['Address'] || row['Shipping Address'] || '123 Main St'),
          phone: String(row['Phone'] || row['Phone Number'] || '+1 555-0100'),
          productLink: String(row['Product Link'] || 'https://www.ebay.com'),
          supplierLink: String(row['Supplier Link'] || 'https://www.supplier-portal.com'),
          sku: String(row['SKU'] || 'SKU-GENERAL'),
          quantity: Number(row['Quantity'] || 1),
          status: 'Pending',
        }));

        if (importedOrders.length > 0) {
          setOrders(importedOrders);
        }
      } catch (err) {
        console.error('Error parsing uploaded file:', err);
        alert('Could not parse Excel/CSV file. Please ensure columns match OrderID, Customer Name, Address, Supplier Link.');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">eBay Order Sheet</h2>
            <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-200">
              Excel / CSV Data Source
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Orders imported from eBay awaiting sequential browser automation and supplier fulfillment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Order</span>
          </button>

          <label className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-xl text-sm font-medium shadow-xs transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Import Sheet</span>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-xl text-sm font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={onStartSimulation}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Run Automation Demo</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order ID, customer, address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            {['All', 'Pending', 'Processed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetStatus}
            className="text-xs text-slate-500 hover:text-slate-700 underline px-2 py-1"
            title="Reset all statuses to Pending"
          >
            Reset Statuses
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Shipping Address</th>
                <th className="py-3.5 px-4">Product / Supplier Links</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {order.orderId}
                      <div className="text-xs font-normal text-slate-500">SKU: {order.sku} (Qty: {order.quantity})</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.phone}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs truncate text-slate-600 text-xs">
                      {order.address}
                    </td>
                    <td className="py-4 px-4 space-y-1">
                      <a
                        href={order.productLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                      >
                        eBay Item <ExternalLink className="w-3 h-3" />
                      </a>
                      <br />
                      <a
                        href={order.supplierLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline"
                      >
                        Supplier Page <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {order.status === 'Processed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Order Placed / Processed
                        </span>
                      ) : order.status === 'Running' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Automating...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Demo Order</h3>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Order ID</label>
                <input
                  type="text"
                  required
                  value={newOrder.orderId}
                  onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Shipping Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street, City, State, Zip"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier Product Link</label>
                <input
                  type="text"
                  value={newOrder.supplierLink}
                  onChange={(e) => setNewOrder({ ...newOrder, supplierLink: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
