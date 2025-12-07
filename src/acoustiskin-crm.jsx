import React, { useState, useEffect } from 'react';
import { 
  Users, Package, ShoppingCart, Calendar, TrendingUp, 
  Settings, Search, Plus, Trash2, Edit2, Save, X, 
  ChevronRight, Phone, Mail, MapPin, Truck, DollarSign,
  AlertCircle, CheckSquare, Gift, CreditCard, PieChart, ArrowLeft
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

// --- CONSTANTS & DATA ---

const US_HOLIDAYS = [
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-01-20', name: "MLK Jr. Day" },
  { date: '2025-05-26', name: "Memorial Day" },
  { date: '2025-07-04', name: "Independence Day" },
  { date: '2025-09-01', name: "Labor Day" },
  { date: '2025-11-27', name: "Thanksgiving" },
  { date: '2025-12-25', name: "Christmas Day" }
];

const TAX_RATES = {
  'MA': 0.0625, 'RI': 0.07, 'NY': 0.04, 'CA': 0.0725, 'TX': 0.0625, 'FL': 0.06
};

const SHIPPING_CARRIERS = [
  "UPS Ground", "UPS 2nd Day Air", "FedEx Ground", "FedEx Overnight", "USPS Priority", "USPS First Class"
];

// --- COMPONENTS ---

// 1. DASHBOARD
const Dashboard = ({ data, navigateTo }) => {
  const { customers, orders, referrals } = data;
  
  const totalRevenue = orders.reduce((sum, order) => order.status !== 'Returned' ? sum + (parseFloat(order.total) || 0) : sum, 0);
  const returnedOrders = orders.filter(o => o.status === 'Returned').length;
  const activeReferrals = referrals.filter(r => r.status === 'Converted').length;
  
  const revenueData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, 
    { name: 'Wed', sales: 2000 }, { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-800">AcoustiSkin Executive Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div onClick={() => navigateTo('orders')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
            <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-500 flex items-center mt-2"><TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs last month</p>
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

        <div onClick={() => navigateTo('referrals')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Referral Program</h3>
            <div className="p-2 bg-orange-100 rounded-lg"><Gift className="w-5 h-5 text-orange-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{activeReferrals} / {referrals.length}</p>
          <p className="text-xs text-slate-400 mt-2">Converted / Leads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Marketing & Referral Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                {name: 'Email', value: 40}, {name: 'Social', value: 30}, 
                {name: 'Referral', value: 20}, {name: 'Direct', value: 10}
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. CALENDAR
const CalendarView = ({ tasks, setTasks }) => {
  const [currentDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', type: 'Meeting' });

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setShowTaskModal(false);
    setNewTask({ title: '', date: '', type: 'Meeting' });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <Calendar className="mr-2" /> Calendar & Tasks
        </h2>
        <button onClick={() => setShowTaskModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow-lg hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="font-bold text-center text-slate-400 py-2">{d}</div>
        ))}
        {days.map(day => {
          const dateStr = `2025-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const dayTasks = tasks.filter(t => t.date === dateStr);
          const holiday = US_HOLIDAYS.find(h => h.date === dateStr);

          return (
            <div key={day} className="bg-white min-h-[100px] border border-slate-200 rounded-lg p-2 hover:shadow-md transition-all">
              <div className="font-semibold text-slate-700 mb-2 flex justify-between">
                <span>{day}</span>
                {holiday && <span className="text-xs bg-red-100 text-red-600 px-1 rounded font-bold" title={holiday.name}>HOLIDAY</span>}
              </div>
              <div className="space-y-1">
                {dayTasks.map(task => (
                  <div key={task.id} className={`text-xs p-1 rounded truncate text-white ${task.type === 'Meeting' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Schedule New Task</h3>
            <input type="text" placeholder="Event Title" className="w-full mb-3 p-2 border rounded" 
                   value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
            <input type="date" className="w-full mb-3 p-2 border rounded" 
                   value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} />
            <select className="w-full mb-4 p-2 border rounded" 
                    value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})}>
              <option value="Meeting">Meeting</option>
              <option value="Task">Task</option>
              <option value="Follow-up">Follow-up</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowTaskModal(false)} className="px-4 py-2 text-slate-600">Cancel</button>
              <button onClick={handleAddTask} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. CUSTOMER MANAGER
const CustomerManager = ({ customers, setCustomers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null); 

  const emptyCustomer = {
    firstName: '', lastName: '', company: '', email: '', phone: '', mobile: '',
    billStreet: '', billCity: '', billState: '', billZip: '',
    shipStreet: '', shipCity: '', shipState: '', shipZip: '',
    sameAsBilling: false
  };

  const [formData, setFormData] = useState(emptyCustomer);

  const handleSave = () => {
    if (currentCustomer) {
      setCustomers(customers.map(c => c.id === currentCustomer.id ? { ...formData, id: c.id } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const toggleSameAddress = (checked) => {
    setFormData(prev => ({
      ...prev,
      sameAsBilling: checked,
      shipStreet: checked ? prev.billStreet : prev.shipStreet,
      shipCity: checked ? prev.billCity : prev.shipCity,
      shipState: checked ? prev.billState : prev.shipState,
      shipZip: checked ? prev.billZip : prev.shipZip,
    }));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Customer Profiles</h2>
        <button onClick={() => { setCurrentCustomer(null); setFormData(emptyCustomer); setIsModalOpen(true); }} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Company</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Location</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map(customer => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{customer.firstName} {customer.lastName}</td>
                <td className="p-4 text-slate-600">{customer.company || '-'}</td>
                <td className="p-4 text-slate-600 text-sm">
                  <div className="flex items-center"><Mail className="w-3 h-3 mr-1"/>{customer.email}</div>
                  <div className="flex items-center mt-1"><Phone className="w-3 h-3 mr-1"/>{customer.phone}</div>
                </td>
                <td className="p-4 text-slate-600">{customer.billCity}, {customer.billState}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => { setCurrentCustomer(customer); setFormData(customer); setIsModalOpen(true); }} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => { if(window.confirm("Delete customer?")) setCustomers(customers.filter(c => c.id !== customer.id)); }} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white p-8 rounded-xl w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between border-b pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-800">{currentCustomer ? 'Edit Profile' : 'New Customer Profile'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First Name" className="border p-2 rounded" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <input placeholder="Last Name" className="border p-2 rounded" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  <input placeholder="Company" className="border p-2 rounded" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                  <input placeholder="Email" className="border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input placeholder="Phone" className="border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  <input placeholder="Mobile" className="border p-2 rounded" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Billing Address</h4>
                <div className="space-y-2">
                  <input placeholder="Street Address" className="w-full border p-2 rounded" value={formData.billStreet} onChange={e => setFormData({...formData, billStreet: e.target.value})} />
                  <input placeholder="City" className="w-full border p-2 rounded" value={formData.billCity} onChange={e => setFormData({...formData, billCity: e.target.value})} />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="State (e.g. MA)" className="border p-2 rounded" value={formData.billState} onChange={e => setFormData({...formData, billState: e.target.value})} />
                    <input placeholder="Zip" className="border p-2 rounded" value={formData.billZip} onChange={e => setFormData({...formData, billZip: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                   <h4 className="text-sm font-bold text-slate-500 uppercase">Shipping Address</h4>
                   <label className="text-xs flex items-center cursor-pointer select-none">
                     <input type="checkbox" className="mr-1" checked={formData.sameAsBilling} onChange={e => toggleSameAddress(e.target.checked)} />
                     Same as Billing
                   </label>
                </div>
                {!formData.sameAsBilling ? (
                  <div className="space-y-2">
                    <input placeholder="Street Address" className="w-full border p-2 rounded" value={formData.shipStreet} onChange={e => setFormData({...formData, shipStreet: e.target.value})} />
                    <input placeholder="City" className="w-full border p-2 rounded" value={formData.shipCity} onChange={e => setFormData({...formData, shipCity: e.target.value})} />
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="State" className="border p-2 rounded" value={formData.shipState} onChange={e => setFormData({...formData, shipState: e.target.value})} />
                      <input placeholder="Zip" className="border p-2 rounded" value={formData.shipZip} onChange={e => setFormData({...formData, shipZip: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 italic text-sm p-4 border rounded bg-slate-50 text-center">Using Billing Address</div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3 border-t pt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-indigo-600 text-white font-medium rounded shadow-lg hover:bg-indigo-700">Save Customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. ORDER MANAGER
const OrderManager = ({ orders, setOrders, customers, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    customerId: '', items: [], carrier: 'UPS Ground', shippingCost: 0, status: 'Pending'
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);

  const customer = customers.find(c => c.id.toString() === newOrder.customerId);
  const subtotal = newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = customer ? (TAX_RATES[customer.shipState] || 0.05) : 0;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + parseFloat(newOrder.shippingCost || 0);

  const addItem = () => {
    const prod = products.find(p => p.id.toString() === selectedProduct);
    if (!prod) return;
    setNewOrder({ ...newOrder, items: [...newOrder.items, { ...prod, quantity: parseInt(selectedQty) }] });
  };

  const saveOrder = () => {
    setOrders([...orders, { ...newOrder, id: Date.now(), date: new Date().toISOString().split('T')[0], total: total.toFixed(2), tax: taxAmount.toFixed(2) }]);
    setIsModalOpen(false);
    setNewOrder({ customerId: '', items: [], carrier: 'UPS Ground', shippingCost: 0, status: 'Pending' });
  };

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center shadow">
          <Plus className="w-4 h-4 mr-2" /> Create New Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm uppercase">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map(order => {
              const cust = customers.find(c => c.id.toString() === order.customerId);
              return (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-sm">#{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4 font-medium">{cust ? `${cust.firstName} ${cust.lastName}` : 'Unknown'}</td>
                  <td className="p-4">${order.total}</td>
                  <td className="p-4">
                    <select 
                      className={`px-2 py-1 rounded text-xs border-none outline-none cursor-pointer ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Returned' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-400">
                    <button className="hover:text-red-500" onClick={() => updateStatus(order.id, 'Returned')} title="Process Return"><ArrowLeft className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-xl w-[900px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 border-b pb-4">New Order Entry</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-1">
                <label className="block text-sm font-bold text-slate-600 mb-2">Select Customer</label>
                <select className="w-full border p-2 rounded" onChange={e => setNewOrder({...newOrder, customerId: e.target.value})}>
                  <option value="">-- Choose Customer --</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                </select>
                {customer && (
                  <div className="mt-4 p-3 bg-slate-50 rounded border text-sm">
                    <p className="font-bold">Ship To:</p>
                    <p>{customer.shipStreet}</p>
                    <p>{customer.shipCity}, {customer.shipState} {customer.shipZip}</p>
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-600 mb-2">Add Items</label>
                <div className="flex space-x-2 mb-4">
                  <select className="flex-1 border p-2 rounded" onChange={e => setSelectedProduct(e.target.value)}>
                    <option value="">-- Select Product --</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>)}
                  </select>
                  <input type="number" min="1" className="w-20 border p-2 rounded" value={selectedQty} onChange={e => setSelectedQty(e.target.value)} />
                  <button onClick={addItem} className="bg-indigo-600 text-white px-4 rounded">Add</button>
                </div>

                <table className="w-full text-sm border">
                  <thead className="bg-slate-100"><tr><th className="p-2">Item</th><th className="p-2">Qty</th><th className="p-2">Line Total</th></tr></thead>
                  <tbody>
                    {newOrder.items.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t pt-6">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Shipping Carrier</label>
                <select className="w-full border p-2 rounded mb-4" onChange={e => setNewOrder({...newOrder, carrier: e.target.value})}>
                  {SHIPPING_CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <label className="block text-sm font-bold text-slate-600 mb-2">Shipping Cost ($)</label>
                <input type="number" className="w-full border p-2 rounded" value={newOrder.shippingCost} onChange={e => setNewOrder({...newOrder, shippingCost: e.target.value})} />
              </div>

              <div className="text-right space-y-2">
                <div className="flex justify-between"><span>Subtotal:</span> <span className="font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Tax ({customer?.shipState || 'NA'}):</span> <span>${taxAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Shipping:</span> <span>${parseFloat(newOrder.shippingCost || 0).toFixed(2)}</span></div>
                <div className="flex justify-between text-xl font-bold text-indigo-700 pt-2 border-t"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600">Cancel</button>
              <button onClick={saveOrder} className="px-5 py-2 bg-indigo-600 text-white font-bold rounded shadow">Submit Order</button>
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
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('acoustiskin_data');
    return saved ? JSON.parse(saved) : {
      customers: [
        { id: 1, firstName: 'Dana', lastName: 'Lurie', company: 'AcoustiSkin LLC', email: 'dana@acoustiskin.com', phone: '555-0100', mobile: '555-0200', billCity: 'Boston', billState: 'MA', shipState: 'MA', sameAsBilling: true }
      ],
      products: [
        { id: 101, name: 'AcoustiSkin Pro Paddle', price: 120, stock: 50 },
        { id: 102, name: 'Silent Skin Overlay', price: 45, stock: 200 }
      ],
      orders: [],
      referrals: [
        { id: 1, source: 'John Doe', code: 'JOHND20', status: 'Converted' },
        { id: 2, source: 'Mike Smith', code: 'MIKES55', status: 'Pending' }
      ],
      tasks: []
    };
  });

  useEffect(() => {
    localStorage.setItem('acoustiskin_data', JSON.stringify(data));
  }, [data]);

  const updateSection = (section, newData) => {
    setData(prev => ({ ...prev, [section]: newData }));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard data={data} navigateTo={setCurrentView} />;
      case 'customers': return <CustomerManager customers={data.customers} setCustomers={(d) => updateSection('customers', d)} />;
      case 'orders': return <OrderManager orders={data.orders} setOrders={(d) => updateSection('orders', d)} customers={data.customers} products={data.products} />;
      case 'calendar': return <CalendarView tasks={data.tasks} setTasks={(d) => updateSection('tasks', d)} />;
      case 'referrals': return <div className="p-10 font-bold text-2xl text-slate-500">Referral Program (Analytics Visible on Dashboard)</div>;
      default: return <Dashboard data={data} navigateTo={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-700 flex items-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg mr-3 flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold text-white tracking-tight">AcoustiSkin CRM</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<PieChart />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={<Users />} label="Customers" active={currentView === 'customers'} onClick={() => setCurrentView('customers')} />
          <SidebarItem icon={<ShoppingCart />} label="Orders" active={currentView === 'orders'} onClick={() => setCurrentView('orders')} />
          <SidebarItem icon={<Calendar />} label="Calendar" active={currentView === 'calendar'} onClick={() => setCurrentView('calendar')} />
          <SidebarItem icon={<Gift />} label="Referrals" active={currentView === 'referrals'} onClick={() => setCurrentView('referrals')} />
        </nav>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
           <div className="flex items-center text-slate-400">
             <Search className="w-5 h-5 mr-3" />
             <input placeholder="Global Search..." className="bg-transparent outline-none text-slate-600" />
           </div>
           <div className="flex items-center space-x-4">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">DL</div>
           </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);
