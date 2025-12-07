import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Package, ShoppingCart, Calendar, TrendingUp, 
  Search, Plus, Trash2, Edit2, X, Download, Upload,
  Phone, Mail, DollarSign, Printer, CheckSquare,
  AlertCircle, Gift, PieChart, ArrowLeft, BarChart2, Settings, Bell
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

// --- CONSTANTS ---
const US_HOLIDAYS = [
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-01-20', name: "MLK Jr. Day" },
  { date: '2025-05-26', name: "Memorial Day" },
  { date: '2025-07-04', name: "Independence Day" },
  { date: '2025-09-01', name: "Labor Day" },
  { date: '2025-11-27', name: "Thanksgiving" },
  { date: '2025-12-25', name: "Christmas Day" }
];

const TAX_RATES = { 'MA': 0.0625, 'RI': 0.07, 'NY': 0.04, 'CA': 0.0725, 'TX': 0.0625, 'FL': 0.06 };
const SHIPPING_CARRIERS = ["UPS Ground", "UPS 2nd Day Air", "FedEx Ground", "FedEx Overnight", "USPS Priority", "USPS First Class"];

// --- COMPONENTS ---

// 1. DASHBOARD
const Dashboard = ({ data, navigateTo }) => {
  const { customers, orders, products } = data;
  const totalRevenue = orders.reduce((sum, order) => order.status !== 'Returned' ? sum + (parseFloat(order.total) || 0) : sum, 0);
  const returnedOrders = orders.filter(o => o.status === 'Returned').length;
  const lowStockItems = products.filter(p => p.quantity < 10);
  
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">AcoustiSkin Dashboard</h2>
        {lowStockItems.length > 0 && (
          <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg animate-pulse cursor-pointer" onClick={() => navigateTo('inventory')}>
            <Bell className="w-5 h-5 mr-2" />
            <span className="font-bold">{lowStockItems.length} Low Stock Alerts</span>
          </div>
        )}
      </div>
      
      {/* Clickable Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div onClick={() => navigateTo('orders')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
            <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
        </div>

        <div onClick={() => navigateTo('customers')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Active Customers</h3>
            <div className="p-2 bg-blue-100 rounded-lg"><Users className="w-5 h-5 text-blue-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{customers.length}</p>
        </div>

        <div onClick={() => navigateTo('orders')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Returns</h3>
            <div className="p-2 bg-red-100 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{returnedOrders}</p>
        </div>

        <div onClick={() => navigateTo('analytics')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Analytics</h3>
            <div className="p-2 bg-purple-100 rounded-lg"><BarChart2 className="w-5 h-5 text-purple-600" /></div>
          </div>
          <p className="text-sm font-bold text-slate-600">View Reports &rarr;</p>
        </div>
      </div>
    </div>
  );
};

// 2. INVENTORY MANAGER (With Bulk Delete)
const InventoryManager = ({ products, setProducts, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', upc: '', price: '', quantity: '' });
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setIsModalOpen(false);
    setNewProduct({ name: '', sku: '', upc: '', price: '', quantity: '' });
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const bulkDelete = () => {
    if(window.confirm(`Delete ${selectedIds.length} items?`)) {
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
        <div className="flex space-x-2">
          {selectedIds.length > 0 && (
            <button onClick={bulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow"><Trash2 className="w-4 h-4 mr-2"/> Delete ({selectedIds.length})</button>
          )}
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase text-sm">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredProducts.map(p => p.id) : [])} /></th>
              <th className="p-4">Product Name</th><th className="p-4">SKU</th><th className="p-4">UPC</th><th className="p-4">Price</th><th className="p-4">Qty</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} className={`border-t hover:bg-slate-50 ${selectedIds.includes(p.id) ? 'bg-blue-50' : ''}`}>
                <td className="p-4"><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 font-mono text-sm">{p.sku}</td>
                <td className="p-4 font-mono text-sm">{p.upc}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.quantity < 10 ? <span className="text-red-500 font-bold">{p.quantity} (Low)</span> : p.quantity}</td>
                <td className="p-4"><button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <input placeholder="Product Name" className="w-full mb-2 p-2 border rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            <input placeholder="SKU" className="w-full mb-2 p-2 border rounded" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} />
            <input placeholder="UPC Code" className="w-full mb-2 p-2 border rounded" value={newProduct.upc} onChange={e => setNewProduct({...newProduct, upc: e.target.value})} />
            <div className="grid grid-cols-2 gap-2 mb-4">
              <input type="number" placeholder="Price ($)" className="p-2 border rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              <input type="number" placeholder="Quantity" className="p-2 border rounded" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})} />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. CALENDAR
const CalendarView = ({ tasks, setTasks }) => {
  const [currentDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', type: 'Meeting' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setShowTaskModal(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center"><Calendar className="mr-2" /> Calendar</h2>
        <button onClick={() => setShowTaskModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow"><Plus className="w-4 h-4 mr-2" /> Add Task</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center font-bold text-slate-400">{d}</div>)}
        {days.map(day => {
          const dateStr = `2025-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const holiday = US_HOLIDAYS.find(h => h.date === dateStr);
          const dayTasks = tasks.filter(t => t.date === dateStr);
          return (
            <div key={day} className="bg-white min-h-[100px] border rounded p-2 hover:shadow-md">
              <div className="flex justify-between font-semibold mb-1">
                <span>{day}</span>
                {holiday && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">{holiday.name}</span>}
              </div>
              {dayTasks.map(t => <div key={t.id} className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1">{t.title}</div>)}
            </div>
          );
        })}
      </div>
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold mb-4">New Task</h3>
            <input placeholder="Title" className="w-full mb-3 p-2 border rounded" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
            <input type="date" className="w-full mb-3 p-2 border rounded" value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} />
            <div className="flex justify-end space-x-2"><button onClick={() => setShowTaskModal(false)} className="px-4 py-2">Cancel</button><button onClick={handleAddTask} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. CUSTOMERS (With Bulk Delete)
const CustomerManager = ({ customers, setCustomers, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', sameAsBilling: false, billStreet: '', shipStreet: '' });
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredCustomers = customers.filter(c => 
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSameAddress = (checked) => {
    setFormData(prev => ({
      ...prev, sameAsBilling: checked,
      shipStreet: checked ? prev.billStreet : prev.shipStreet,
      shipCity: checked ? prev.billCity : prev.shipCity,
      shipState: checked ? prev.billState : prev.shipState,
      shipZip: checked ? prev.billZip : prev.shipZip
    }));
  };

  const handleSave = () => {
    setCustomers([...customers, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const bulkDelete = () => {
    if(window.confirm(`Delete ${selectedIds.length} customers?`)) {
      setCustomers(customers.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customers</h2>
        <div className="flex space-x-2">
           {selectedIds.length > 0 && (
            <button onClick={bulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow"><Trash2 className="w-4 h-4 mr-2"/> Delete ({selectedIds.length})</button>
          )}
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"><Plus className="w-4 h-4 mr-2" /> Add Customer</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredCustomers.map(c => c.id) : [])} /></th>
              <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(c => (
              <tr key={c.id} className="border-t hover:bg-slate-50">
                <td className="p-4"><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => toggleSelect(c.id)} /></td>
                <td className="p-4">{c.firstName} {c.lastName}</td>
                <td className="p-4">{c.email}</td>
                <td className="p-4"><button onClick={() => setCustomers(customers.filter(x => x.id !== c.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[600px] h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">New Customer</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input placeholder="First Name" className="p-2 border rounded" onChange={e => setFormData({...formData, firstName: e.target.value})} />
              <input placeholder="Last Name" className="p-2 border rounded" onChange={e => setFormData({...formData, lastName: e.target.value})} />
              <input placeholder="Email" className="p-2 border rounded col-span-2" onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            
            <h4 className="font-bold mt-4 mb-2">Billing Address</h4>
            <input placeholder="Street" className="w-full mb-2 p-2 border rounded" onChange={e => setFormData({...formData, billStreet: e.target.value})} />
            <div className="grid grid-cols-3 gap-2">
               <input placeholder="City" className="p-2 border rounded" onChange={e => setFormData({...formData, billCity: e.target.value})} />
               <input placeholder="State" className="p-2 border rounded" onChange={e => setFormData({...formData, billState: e.target.value})} />
               <input placeholder="Zip" className="p-2 border rounded" onChange={e => setFormData({...formData, billZip: e.target.value})} />
            </div>

            <div className="flex items-center mt-4 mb-2">
              <input type="checkbox" id="sameAddr" className="mr-2" onChange={e => toggleSameAddress(e.target.checked)} />
              <label htmlFor="sameAddr" className="font-bold">Shipping Address Same as Billing?</label>
            </div>

            {!formData.sameAsBilling && (
              <div>
                <h4 className="font-bold mb-2">Shipping Address</h4>
                <input placeholder="Street" className="w-full mb-2 p-2 border rounded" onChange={e => setFormData({...formData, shipStreet: e.target.value})} />
                <div className="grid grid-cols-3 gap-2">
                   <input placeholder="City" className="p-2 border rounded" onChange={e => setFormData({...formData, shipCity: e.target.value})} />
                   <input placeholder="State" className="p-2 border rounded" onChange={e => setFormData({...formData, shipState: e.target.value})} />
                   <input placeholder="Zip" className="p-2 border rounded" onChange={e => setFormData({...formData, shipZip: e.target.value})} />
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save Customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. SETTINGS & DATA MANAGEMENT (New Feature)
const SettingsManager = ({ data, setData }) => {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `acoustiskin_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setData(parsed);
          alert('Data Imported Successfully!');
        } catch (err) {
          alert('Invalid Backup File');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold">Settings & Data Management</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-4">Backup Data</h3>
          <p className="text-sm text-slate-500 mb-4">Download a full backup of all customers, orders, and inventory.</p>
          <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center hover:bg-indigo-700">
            <Download className="w-4 h-4 mr-2" /> Export to JSON
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-4">Restore Data</h3>
          <p className="text-sm text-slate-500 mb-4">Upload a previously saved JSON backup file.</p>
          <label className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center w-fit cursor-pointer hover:bg-emerald-700">
            <Upload className="w-4 h-4 mr-2" /> Import Backup
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
          </label>
        </div>
      </div>
    </div>
  );
};

// 6. ORDER MANAGER (With Print)
const OrderManager = ({ orders, setOrders, customers, products, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ customerId: '', items: [], shippingCost: 0, status: 'Pending' });
  
  const filteredOrders = orders.filter(o => o.id.toString().includes(searchTerm) || o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()));
  const subtotal = newOrder.items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const customer = customers.find(c => c.id == newOrder.customerId);
  const tax = subtotal * (customer ? (TAX_RATES[customer.billState] || 0.05) : 0);
  const total = subtotal + tax + parseFloat(newOrder.shippingCost);

  const addItem = (prodId) => {
    const p = products.find(x => x.id == prodId);
    if(p) setNewOrder({...newOrder, items: [...newOrder.items, { ...p, quantity: 1 }]});
  };

  const handleSave = () => {
    setOrders([...orders, { ...newOrder, id: Date.now(), total: total.toFixed(2), customerName: customer?.firstName }]);
    setIsModalOpen(false);
  };

  const handlePrint = (order) => {
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`<html><head><title>Invoice #${order.id}</title></head><body style="font-family:sans-serif; padding:40px;">
      <h1>AcoustiSkin Invoice #${order.id}</h1>
      <p>Customer: ${order.customerName}</p>
      <p>Total: $${order.total}</p>
      <p>Status: ${order.status}</p>
      <script>window.print();</script>
    </body></html>`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg"><Plus className="inline w-4 h-4 mr-2"/> New Order</button>
      </div>
      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100"><tr><th className="p-4">ID</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-4">#{o.id}</td><td className="p-4">{o.customerName}</td><td className="p-4">${o.total}</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{o.status}</span></td>
                <td className="p-4"><button onClick={() => handlePrint(o)} className="text-slate-500 hover:text-indigo-600"><Printer className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[800px] h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">New Order</h3>
            <select className="w-full p-2 border rounded mb-4" onChange={e => setNewOrder({...newOrder, customerId: e.target.value})}>
              <option>Select Customer...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
            </select>
            
            <div className="mb-4">
              <h4 className="font-bold mb-2">Add Items</h4>
              <select className="w-full p-2 border rounded" onChange={e => addItem(e.target.value)}>
                <option>Select Product to Add...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
              </select>
              <div className="mt-2 space-y-1">
                {newOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between bg-slate-50 p-2 text-sm">
                    <span>{item.name}</span><span>${item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 text-right space-y-1">
              <div>Subtotal: ${subtotal.toFixed(2)}</div>
              <div>Tax: ${tax.toFixed(2)}</div>
              <div>Shipping: <input type="number" className="w-20 border rounded p-1" value={newOrder.shippingCost} onChange={e => setNewOrder({...newOrder, shippingCost: e.target.value})} /></div>
              <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
               <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Submit Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- APP SHELL ---
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('acoustiskin_data');
    return saved ? JSON.parse(saved) : {
      customers: [{id:1, firstName:'Dana', lastName:'Lurie', email:'dana@test.com', billState:'MA'}],
      products: [{id:1, name:'AcoustiSkin Paddle', sku:'AS-001', price:120, quantity:50, upc:'123456789'}],
      orders: [],
      tasks: [],
      referrals: []
    };
  });

  useEffect(() => localStorage.setItem('acoustiskin_data', JSON.stringify(data)), [data]);

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard data={data} navigateTo={setCurrentView} />;
      case 'inventory': return <InventoryManager products={data.products} setProducts={d => update('products', d)} searchTerm={searchTerm} />;
      case 'calendar': return <CalendarView tasks={data.tasks} setTasks={d => update('tasks', d)} />;
      case 'customers': return <CustomerManager customers={data.customers} setCustomers={d => update('customers', d)} searchTerm={searchTerm} />;
      case 'orders': return <OrderManager orders={data.orders} setOrders={d => update('orders', d)} customers={data.customers} products={data.products} searchTerm={searchTerm} />;
      case 'analytics': return <div className="p-6"><h2 className="text-2xl font-bold">Analytics</h2><p>Coming Soon</p></div>;
      case 'settings': return <SettingsManager data={data} setData={setData} />;
      default: return <Dashboard data={data} navigateTo={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-700 font-bold text-white text-xl">AcoustiSkin CRM</div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<PieChart/>} label="Dashboard" onClick={() => setCurrentView('dashboard')} active={currentView==='dashboard'}/>
          <SidebarItem icon={<Package/>} label="Inventory" onClick={() => setCurrentView('inventory')} active={currentView==='inventory'}/>
          <SidebarItem icon={<Calendar/>} label="Calendar" onClick={() => setCurrentView('calendar')} active={currentView==='calendar'}/>
          <SidebarItem icon={<Users/>} label="Customers" onClick={() => setCurrentView('customers')} active={currentView==='customers'}/>
          <SidebarItem icon={<ShoppingCart/>} label="Orders" onClick={() => setCurrentView('orders')} active={currentView==='orders'}/>
          <SidebarItem icon={<BarChart2/>} label="Analytics" onClick={() => setCurrentView('analytics')} active={currentView==='analytics'}/>
          <SidebarItem icon={<Settings/>} label="Settings & Data" onClick={() => setCurrentView('settings')} active={currentView==='settings'}/>
        </nav>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
           <div className="flex items-center text-slate-400 w-96">
             <Search className="w-5 h-5 mr-3" />
             <input placeholder="Search customers, products, orders..." className="bg-transparent outline-none text-slate-600 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
           </div>
           <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">DL</div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, onClick, active }) => (
  <button onClick={onClick} className={`w-full flex items-center p-3 rounded-lg transition-all ${active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
    <span className="mr-3">{icon}</span><span className="font-medium">{label}</span>
  </button>
);
