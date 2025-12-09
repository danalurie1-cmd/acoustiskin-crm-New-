import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Package, ShoppingCart, Calendar as CalendarIcon, TrendingUp, 
  Search, Plus, Trash2, Edit2, Download, Upload,
  Phone, Mail, DollarSign, Printer, Gift, 
  AlertCircle, PieChart, BarChart2, Settings, Bell, 
  CheckSquare, Globe, Truck, CreditCard, FileText, X, ChevronLeft, ChevronRight, QrCode, Share2, Copy
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';

// --- CONSTANTS ---
const US_HOLIDAYS = [
  { date: '01-01', name: "New Year's Day" },
  { date: '01-20', name: "MLK Jr. Day" },
  { date: '05-26', name: "Memorial Day" },
  { date: '07-04', name: "Independence Day" },
  { date: '09-01', name: "Labor Day" },
  { date: '11-27', name: "Thanksgiving" },
  { date: '12-25', name: "Christmas Day" }
];

const TAX_RATES = { 'MA': 0.0625, 'RI': 0.07, 'NY': 0.04, 'CA': 0.0725, 'TX': 0.0625, 'FL': 0.06 };
const CARRIERS = ["UPS", "FedEx", "USPS", "DHL", "Other"];
const PAYMENT_METHODS = ["Credit Card", "Check", "Wire", "Cash", "Net 30"];
const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Returned", "Cancelled"];
const LEAD_SOURCES = ["Google", "Facebook", "Instagram", "Email", "Referral", "Trade Show", "Direct"];
const REFERRAL_TIERS = ["Tier 1 (Standard)", "Tier 2 (Silver)", "Tier 3 (Gold)", "VIP Partner"];

// --- COMPONENTS ---

// 1. DASHBOARD
const Dashboard = ({ data, navigateTo }) => {
  const { customers, orders, products, referrals } = data;
  const totalRevenue = orders.reduce((sum, order) => order.status !== 'Returned' && order.status !== 'Cancelled' ? sum + (parseFloat(order.total) || 0) : sum, 0);
  const returnedOrders = orders.filter(o => o.status === 'Returned').length;
  const lowStockItems = products.filter(p => p.quantity < 10);
  const activeReferrals = referrals.filter(r => r.status === 'Converted').length;
  
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

        <div onClick={() => navigateTo('referrals')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Referral Success</h3>
            <div className="p-2 bg-orange-100 rounded-lg"><Gift className="w-5 h-5 text-orange-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{activeReferrals} / {referrals.length}</p>
          <p className="text-xs text-slate-400 mt-1">Converted / Total</p>
        </div>

        <div onClick={() => navigateTo('orders')} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Returns</h3>
            <div className="p-2 bg-red-100 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{returnedOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{name:'Mon',val:4000},{name:'Tue',val:3000},{name:'Wed',val:5000},{name:'Thu',val:2780},{name:'Fri',val:1890}]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Marketing Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                {name: 'Email', value: 40}, {name: 'Social', value: 30}, 
                {name: 'Referral', value: 25}, {name: 'Direct', value: 10}
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. REFERRAL PROGRAM (Multi-Tier & Marketing)
const ReferralManager = ({ referrals, setReferrals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRef, setCurrentRef] = useState(null);
  const [formData, setFormData] = useState({ 
    source: '', code: '', status: 'Pending', tier: 'Tier 1 (Standard)', 
    itemsSold: 0, rewardPerSale: 20, totalRewards: 0 
  });

  const handleSave = () => {
    if (currentRef) {
      setReferrals(referrals.map(r => r.id === currentRef.id ? { ...formData, id: r.id } : r));
    } else {
      setReferrals([...referrals, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setCurrentRef(null);
    setFormData({ source: '', code: '', status: 'Pending', tier: 'Tier 1 (Standard)', itemsSold: 0, rewardPerSale: 20, totalRewards: 0 });
  };

  const handleEdit = (ref) => {
    setCurrentRef(ref);
    setFormData(ref);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Referral Program (Multi-Tier)</h2>
        <button onClick={() => { setCurrentRef(null); setIsModalOpen(true); }} className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center shadow"><Plus className="w-4 h-4 mr-2"/> Add Partner</button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100"><tr><th className="p-4">Partner</th><th className="p-4">Tier</th><th className="p-4">Code</th><th className="p-4">Sales</th><th className="p-4">Reward/Sale</th><th className="p-4">Total Earned</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {referrals.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-4 font-bold">{r.source}</td>
                <td className="p-4"><span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">{r.tier}</span></td>
                <td className="p-4 font-mono bg-slate-100 rounded w-fit px-2">{r.code}</td>
                <td className="p-4">{r.itemsSold}</td>
                <td className="p-4">${r.rewardPerSale}</td>
                <td className="p-4 text-green-600 font-bold">${(r.itemsSold * r.rewardPerSale).toFixed(2)}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-blue-500"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => setReferrals(referrals.filter(x => x.id !== r.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[500px]">
            <h3 className="text-xl font-bold mb-4">{currentRef ? 'Edit Partner' : 'New Referral Partner'}</h3>
            <div className="space-y-3">
              <input placeholder="Partner Name" className="w-full p-2 border rounded" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                 <input placeholder="Unique Code" className="p-2 border rounded" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
                 <select className="p-2 border rounded" value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})}>
                   {REFERRAL_TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div>
                   <label className="text-xs font-bold text-slate-500">Items Sold</label>
                   <input type="number" className="w-full p-2 border rounded" value={formData.itemsSold} onChange={e => setFormData({...formData, itemsSold: e.target.value})} />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500">Reward Per Sale ($)</label>
                   <input type="number" className="w-full p-2 border rounded" value={formData.rewardPerSale} onChange={e => setFormData({...formData, rewardPerSale: e.target.value})} />
                 </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. CUSTOMER MANAGER (Enterprise Profile + Marketing Kit)
const CustomerManager = ({ customers, setCustomers, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCust, setCurrentCust] = useState(null);
  
  const emptyCustomer = { 
    id: '', firstName: '', lastName: '', jobTitle: '', company: '', email: '', phone: '', mobile: '', website: '',
    source: '', referredBy: '', referralCode: '', rewardStatus: '', optIn: false, campaign: '',
    status: 'Active', type: 'Retail', industry: '', salesRep: '', paymentTerms: 'Due on Receipt', creditLimit: '', taxId: '',
    sameAsBilling: false, 
    billStreet: '', billStreet2: '', billCity: '', billState: '', billZip: '', billCountry: 'USA',
    shipStreet: '', shipStreet2: '', shipCity: '', shipState: '', shipZip: '', shipCountry: 'USA',
    notes: ''
  };

  const [formData, setFormData] = useState(emptyCustomer);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('identity'); // Tabs in Modal

  const filteredCustomers = customers.filter(c => 
    c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSameAddress = (checked) => {
    setFormData(prev => ({
      ...prev, sameAsBilling: checked,
      shipStreet: checked ? prev.billStreet : prev.shipStreet,
      shipStreet2: checked ? prev.billStreet2 : prev.shipStreet2,
      shipCity: checked ? prev.billCity : prev.shipCity,
      shipState: checked ? prev.billState : prev.shipState,
      shipZip: checked ? prev.billZip : prev.shipZip,
      shipCountry: checked ? prev.billCountry : prev.shipCountry
    }));
  };

  const handleSave = () => {
    if (currentCust) {
      setCustomers(customers.map(c => c.id === currentCust.id ? { ...formData, id: c.id } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setCurrentCust(null);
  };

  const handleEdit = (customer) => {
    setCurrentCust(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const bulkDelete = () => {
    if(window.confirm(`Delete ${selectedIds.length} customers?`)) {
      setCustomers(customers.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  // QR Code Placeholder Generator
  const generateMarketingKit = () => {
    alert(`Marketing Kit Generated for ${formData.firstName}!\n\n1. QR Code Created: [QR-${formData.id || 'NEW'}]\n2. Share Link: acoustiskin.com/ref/${formData.lastName.toLowerCase()}20\n3. Email Template Copied to Clipboard.`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Profiles</h2>
        <div className="flex space-x-2">
           {selectedIds.length > 0 && <button onClick={bulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow"><Trash2 className="w-4 h-4 mr-2"/> Delete ({selectedIds.length})</button>}
          <button onClick={() => { setCurrentCust(null); setFormData(emptyCustomer); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"><Plus className="w-4 h-4 mr-2" /> Add Customer</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredCustomers.map(c => c.id) : [])} /></th>
              <th className="p-4">Name</th><th className="p-4">Company</th><th className="p-4">Contact</th><th className="p-4">Type</th><th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(c => (
              <tr key={c.id} className="border-t hover:bg-slate-50">
                <td className="p-4"><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => { if(selectedIds.includes(c.id)) setSelectedIds(selectedIds.filter(x=>x!==c.id)); else setSelectedIds([...selectedIds, c.id]); }} /></td>
                <td className="p-4 font-bold">{c.firstName} {c.lastName}</td>
                <td className="p-4 text-slate-500">{c.company}</td>
                <td className="p-4 text-sm">
                  <div><Mail className="w-3 h-3 inline mr-1"/>{c.email}</div>
                  <div><Phone className="w-3 h-3 inline mr-1"/>{c.mobile || c.phone}</div>
                </td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{c.type}</span></td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEdit(c)} className="text-blue-500"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => setCustomers(customers.filter(x => x.id !== c.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[900px] h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center bg-white">
               <h3 className="text-2xl font-bold">{currentCust ? 'Edit Profile' : 'New Customer Profile'}</h3>
               <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-slate-400"/></button>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-slate-50 border-b px-6">
              {['identity', 'business', 'addresses', 'marketing'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 font-bold text-sm uppercase ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="p-8 overflow-y-auto flex-1 bg-white">
              
              {activeTab === 'identity' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input placeholder="First Name" className="w-full p-2 border rounded" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    <input placeholder="Last Name" className="w-full p-2 border rounded" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    <input placeholder="Job Title" className="w-full p-2 border rounded" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
                    <input placeholder="Company Name" className="w-full p-2 border rounded" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <input placeholder="Email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input placeholder="Work Phone" className="w-full p-2 border rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input placeholder="Mobile Phone" className="w-full p-2 border rounded" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                    <input placeholder="Website URL" className="w-full p-2 border rounded" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                  </div>
                </div>
              )}

              {activeTab === 'business' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <select className="w-full p-2 border rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Retail">Retail</option><option value="Wholesale">Wholesale</option><option value="Distributor">Distributor</option>
                    </select>
                    <input placeholder="Industry" className="w-full p-2 border rounded" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
                    <input placeholder="Sales Rep" className="w-full p-2 border rounded" value={formData.salesRep} onChange={e => setFormData({...formData, salesRep: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <select className="w-full p-2 border rounded" value={formData.paymentTerms} onChange={e => setFormData({...formData, paymentTerms: e.target.value})}>
                      {PAYMENT_METHODS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input placeholder="Credit Limit ($)" className="w-full p-2 border rounded" value={formData.creditLimit} onChange={e => setFormData({...formData, creditLimit: e.target.value})} />
                    <input placeholder="Tax Exempt ID" className="w-full p-2 border rounded" value={formData.taxId} onChange={e => setFormData({...formData, taxId: e.target.value})} />
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-600 uppercase mb-3 border-b">Billing Address</h4>
                    <input placeholder="Street 1" className="w-full mb-2 p-2 border rounded" value={formData.billStreet} onChange={e => setFormData({...formData, billStreet: e.target.value})} />
                    <input placeholder="Street 2 (Suite)" className="w-full mb-2 p-2 border rounded" value={formData.billStreet2} onChange={e => setFormData({...formData, billStreet2: e.target.value})} />
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="City" className="p-2 border rounded" value={formData.billCity} onChange={e => setFormData({...formData, billCity: e.target.value})} />
                      <input placeholder="State" className="p-2 border rounded" value={formData.billState} onChange={e => setFormData({...formData, billState: e.target.value})} />
                      <input placeholder="Zip" className="p-2 border rounded" value={formData.billZip} onChange={e => setFormData({...formData, billZip: e.target.value})} />
                      <input placeholder="Country" className="p-2 border rounded" value={formData.billCountry} onChange={e => setFormData({...formData, billCountry: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center border-b mb-3">
                      <h4 className="text-sm font-bold text-slate-600 uppercase">Shipping Address</h4>
                      <label className="text-xs flex items-center cursor-pointer"><input type="checkbox" className="mr-1" checked={formData.sameAsBilling} onChange={e => toggleSameAddress(e.target.checked)}/> Same as Billing</label>
                    </div>
                    {!formData.sameAsBilling ? (
                      <>
                      <input placeholder="Street 1" className="w-full mb-2 p-2 border rounded" value={formData.shipStreet} onChange={e => setFormData({...formData, shipStreet: e.target.value})} />
                      <input placeholder="Street 2" className="w-full mb-2 p-2 border rounded" value={formData.shipStreet2} onChange={e => setFormData({...formData, shipStreet2: e.target.value})} />
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="City" className="p-2 border rounded" value={formData.shipCity} onChange={e => setFormData({...formData, shipCity: e.target.value})} />
                        <input placeholder="State" className="p-2 border rounded" value={formData.shipState} onChange={e => setFormData({...formData, shipState: e.target.value})} />
                        <input placeholder="Zip" className="p-2 border rounded" value={formData.shipZip} onChange={e => setFormData({...formData, shipZip: e.target.value})} />
                        <input placeholder="Country" className="p-2 border rounded" value={formData.shipCountry} onChange={e => setFormData({...formData, shipCountry: e.target.value})} />
                      </div>
                      </>
                    ) : <div className="p-8 bg-slate-50 text-center text-slate-400 italic rounded">Using Billing Address</div>}
                  </div>
                </div>
              )}

              {activeTab === 'marketing' && (
                <div className="space-y-6">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-700 mb-2 flex items-center"><QrCode className="w-4 h-4 mr-2"/> Marketing Kit Generator</h4>
                    <p className="text-sm text-purple-600 mb-4">Generate custom marketing materials for this partner.</p>
                    <div className="flex space-x-2">
                       <button onClick={generateMarketingKit} className="bg-purple-600 text-white px-4 py-2 rounded text-sm flex items-center"><QrCode className="w-3 h-3 mr-2"/> Generate QR Code</button>
                       <button className="bg-white border border-purple-300 text-purple-700 px-4 py-2 rounded text-sm flex items-center"><Share2 className="w-3 h-3 mr-2"/> Copy Share Link</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-1">Acquisition Source</label>
                      <select className="w-full p-2 border rounded" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                        <option value="">-- Select Source --</option>
                        {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-1">Referred By (Person)</label>
                      <input className="w-full p-2 border rounded" value={formData.referredBy} onChange={e => setFormData({...formData, referredBy: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-slate-50 flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded hover:bg-white">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-bold">Save Customer Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. INVENTORY MANAGER
const InventoryManager = ({ products, setProducts, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProd, setCurrentProd] = useState(null);
  const [formData, setFormData] = useState({ name: '', sku: '', upc: '', price: '', quantity: '' });
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = () => {
    if(currentProd) {
      setProducts(products.map(p => p.id === currentProd.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setCurrentProd(null);
    setFormData({ name: '', sku: '', upc: '', price: '', quantity: '' });
  };
  
  const handleEdit = (prod) => {
    setCurrentProd(prod);
    setFormData(prod);
    setIsModalOpen(true);
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
          {selectedIds.length > 0 && <button onClick={bulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow"><Trash2 className="w-4 h-4 mr-2"/> Delete ({selectedIds.length})</button>}
          <button onClick={() => {setCurrentProd(null); setFormData({ name: '', sku: '', upc: '', price: '', quantity: '' }); setIsModalOpen(true);}} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow"><Plus className="w-4 h-4 mr-2" /> Add Product</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 uppercase text-sm">
            <tr><th className="p-4 w-10"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredProducts.map(p => p.id) : [])} /></th><th className="p-4">Name</th><th className="p-4">SKU</th><th className="p-4">Price</th><th className="p-4">Qty</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} className="border-t hover:bg-slate-50">
                <td className="p-4"><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => { if(selectedIds.includes(p.id)) setSelectedIds(selectedIds.filter(x=>x!==p.id)); else setSelectedIds([...selectedIds, p.id]); }} /></td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 font-mono text-sm">{p.sku}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.quantity < 10 ? <span className="text-red-500 font-bold">{p.quantity} (Low)</span> : p.quantity}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-500"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">{currentProd ? 'Edit Product' : 'Add New Product'}</h3>
            <input placeholder="Product Name" className="w-full mb-2 p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input placeholder="SKU" className="w-full mb-2 p-2 border rounded" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
            <input placeholder="UPC" className="w-full mb-2 p-2 border rounded" value={formData.upc} onChange={e => setFormData({...formData, upc: e.target.value})} />
            <div className="grid grid-cols-2 gap-2 mb-4">
              <input type="number" placeholder="Price" className="p-2 border rounded" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <input type="number" placeholder="Qty" className="p-2 border rounded" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="flex justify-end space-x-2"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. CALENDAR (FIXED Navigation & Holidays)
const CalendarView = ({ tasks, setTasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', type: 'Meeting' });

  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
    setShowTaskModal(false);
    setNewTask({ title: '', date: '', type: 'Meeting' });
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center"><CalendarIcon className="mr-2" /> Calendar</h2>
        <div className="flex items-center bg-white rounded-lg shadow border px-2">
           <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded"><ChevronLeft className="w-5 h-5"/></button>
           <span className="w-48 text-center font-bold">{monthName}</span>
           <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded"><ChevronRight className="w-5 h-5"/></button>
        </div>
        <button onClick={() => setShowTaskModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow"><Plus className="w-4 h-4 mr-2" /> Add Task</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center font-bold text-slate-400">{d}</div>)}
        {days.map(day => {
          const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const mmdd = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; 
          const holiday = US_HOLIDAYS.find(h => h.date === mmdd);
          const dayTasks = tasks.filter(t => t.date === dateStr);
          return (
            <div key={day} className="bg-white min-h-[100px] border rounded p-2 hover:shadow-md">
              <div className="flex justify-between font-semibold mb-1">
                <span>{day}</span>
                {holiday && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">{holiday.name}</span>}
              </div>
              {dayTasks.map(t => (
                <div key={t.id} className="group relative text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 flex justify-between items-center">
                  <span>{t.title}</span>
                  <button onClick={() => deleteTask(t.id)} className="hidden group-hover:block text-red-500 font-bold ml-1">x</button>
                </div>
              ))}
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

// 6. ANALYTICS
const Analytics = ({ data }) => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-8">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow h-96">
          <h3 className="mb-4 font-bold">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[{name:'Mon',val:4000},{name:'Tue',val:3000},{name:'Wed',val:5000},{name:'Thu',val:2780},{name:'Fri',val:1890}]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow h-96">
          <h3 className="mb-4 font-bold">Order Volume</h3>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{name:'Jan',val:10},{name:'Feb',val:20},{name:'Mar',val:15},{name:'Apr',val:30}]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="val" fill="#8884d8" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 7. SETTINGS
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
      reader.onload = (event) => { setData(JSON.parse(event.target.result)); alert('Data Restored!'); };
      reader.readAsText(file);
    }
  };
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">Backup Data</h3>
          <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"><Download className="w-4 h-4 mr-2" /> Export JSON</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">Restore Data</h3>
          <label className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center w-fit cursor-pointer"><Upload className="w-4 h-4 mr-2" /> Import JSON<input type="file" className="hidden" onChange={handleImport} /></label>
        </div>
      </div>
    </div>
  );
};

// 8. ORDER MANAGER (FIXED)
const OrderManager = ({ orders, setOrders, customers, products, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const emptyOrder = { 
    id: '', customerId: '', poNumber: '', status: 'Pending', 
    items: [], 
    subtotal: 0, discount: 0, taxRate: 0, shippingCost: 0, total: 0,
    shipCarrier: '', tracking: '', 
    billAddrOverride: '', billZip: '', shipAddrOverride: '', shipZip: '',
    paymentMethod: '', paymentStatus: 'Unpaid'
  };

  const [newOrder, setNewOrder] = useState(emptyOrder);
  const filteredOrders = orders.filter(o => o.id.toString().includes(searchTerm) || o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()));
  
  useEffect(() => {
    const sub = newOrder.items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const taxVal = (sub - newOrder.discount) * newOrder.taxRate;
    const final = (sub - newOrder.discount) + taxVal + parseFloat(newOrder.shippingCost || 0);
    setNewOrder(prev => ({ ...prev, subtotal: sub, total: final }));
  }, [newOrder.items, newOrder.discount, newOrder.taxRate, newOrder.shippingCost]);

  const handleCustomerSelect = (custId) => {
    const c = customers.find(x => x.id == custId);
    if(c) {
      setNewOrder(prev => ({
        ...prev, customerId: custId,
        billAddrOverride: `${c.billStreet}, ${c.billCity}, ${c.billState}`,
        billZip: c.billZip,
        shipAddrOverride: c.sameAsBilling ? `${c.billStreet}, ${c.billCity}, ${c.billState}` : `${c.shipStreet}, ${c.shipCity}, ${c.shipState}`,
        shipZip: c.sameAsBilling ? c.billZip : c.shipZip,
        taxRate: TAX_RATES[c.shipState] || 0.05
      }));
    }
  };

  const addItem = (prodId) => {
    const p = products.find(x => x.id == prodId);
    if(p) setNewOrder(prev => ({...prev, items: [...prev.items, { ...p, quantity: 1 }]}));
  };

  const handleSave = () => {
    const c = customers.find(x => x.id == newOrder.customerId);
    const orderToSave = { 
      ...newOrder, 
      id: newOrder.id || Date.now(), 
      date: newOrder.date || new Date().toISOString().split('T')[0], 
      customerName: c?.firstName + ' ' + c?.lastName 
    };
    if(newOrder.id) { setOrders(orders.map(o => o.id === newOrder.id ? orderToSave : o)); } else { setOrders([...orders, orderToSave]); }
    setIsModalOpen(false);
  };

  const handleEdit = (order) => { setNewOrder(order); setIsModalOpen(true); };

  const handlePrint = (order) => {
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`<html><body style="font-family:sans-serif; padding:40px;"><h1>Invoice #${order.id}</h1><hr/><h3>Customer: ${order.customerName}</h3><p>PO: ${order.poNumber || 'N/A'}</p><table style="width:100%; text-align:left; margin-top:20px;"><tr><th>Item</th><th>Qty</th><th>Price</th></tr>${order.items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>$${i.price}</td></tr>`).join('')}</table><hr/><h3>Total: $${parseFloat(order.total).toFixed(2)}</h3><script>window.print();</script></body></html>`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders</h2>
        <button onClick={() => { setNewOrder(emptyOrder); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg"><Plus className="inline w-4 h-4 mr-2"/> New Order</button>
      </div>
      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-slate-100"><tr><th className="p-4">ID</th><th className="p-4">Date</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id} className="border-t hover:bg-slate-50 cursor-pointer" onClick={() => handleEdit(o)}>
                <td className="p-4">#{o.id}</td><td className="p-4">{o.date}</td><td className="p-4">{o.customerName}</td><td className="p-4">${parseFloat(o.total).toFixed(2)}</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{o.status}</span></td>
                <td className="p-4 flex space-x-2" onClick={e => e.stopPropagation()}>
                  <button onClick={() => handlePrint(o)} className="text-slate-500 hover:text-indigo-600"><Printer className="w-4 h-4" /></button>
                  <button onClick={() => setOrders(orders.filter(x => x.id !== o.id))} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[900px] h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold mb-6 border-b pb-2">{newOrder.id ? 'Edit Order' : 'New Order Entry'}</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
               <div>
                 <label className="text-xs font-bold text-slate-500">Customer</label>
                 <select className="w-full p-2 border rounded" value={newOrder.customerId} onChange={e => handleCustomerSelect(e.target.value)}>
                   <option>-- Select Customer --</option>
                   {customers.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.company})</option>)}
                 </select>
               </div>
               <div><label className="text-xs font-bold text-slate-500">PO Number</label><input className="w-full p-2 border rounded" value={newOrder.poNumber} onChange={e => setNewOrder({...newOrder, poNumber: e.target.value})} /></div>
               <div>
                 <label className="text-xs font-bold text-slate-500">Status</label>
                 <select className="w-full p-2 border rounded" value={newOrder.status} onChange={e => setNewOrder({...newOrder, status: e.target.value})}>
                   {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded">
               <div>
                 <label className="text-xs font-bold">Billing Address</label>
                 <input className="w-full p-1 border rounded mb-1" placeholder="Street, City, State" value={newOrder.billAddrOverride} onChange={e => setNewOrder({...newOrder, billAddrOverride: e.target.value})} />
                 <input className="w-1/2 p-1 border rounded" placeholder="Zip Code" value={newOrder.billZip} onChange={e => setNewOrder({...newOrder, billZip: e.target.value})} />
               </div>
               <div>
                 <label className="text-xs font-bold">Shipping Address</label>
                 <input className="w-full p-1 border rounded mb-1" placeholder="Street, City, State" value={newOrder.shipAddrOverride} onChange={e => setNewOrder({...newOrder, shipAddrOverride: e.target.value})} />
                 <input className="w-1/2 p-1 border rounded" placeholder="Zip Code" value={newOrder.shipZip} onChange={e => setNewOrder({...newOrder, shipZip: e.target.value})} />
               </div>
            </div>
            <div className="mb-6">
              <h4 className="font-bold mb-2">Order Items</h4>
              <select className="w-full p-2 border rounded mb-2" onChange={e => addItem(e.target.value)}>
                <option>+ Add Product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
              </select>
              <table className="w-full text-sm border">
                <thead className="bg-slate-100"><tr><th className="p-2">Item</th><th className="p-2">Price</th><th className="p-2">Qty</th><th className="p-2">Total</th><th className="p-2"></th></tr></thead>
                <tbody>
                  {newOrder.items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">${item.price}</td>
                      <td className="p-2"><input type="number" className="w-12 border rounded p-1" value={item.quantity} onChange={e => {
                        const newItems = [...newOrder.items]; newItems[idx].quantity = e.target.value;
                        setNewOrder({...newOrder, items: newItems});
                      }} /></td>
                      <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-2"><button onClick={() => setNewOrder({...newOrder, items: newOrder.items.filter((_,i) => i!==idx)})} className="text-red-500">x</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t pt-4">
               <div className="space-y-3">
                  <h4 className="font-bold text-sm uppercase text-slate-500">Shipping Info</h4>
                  <select className="w-full p-2 border rounded" value={newOrder.shipCarrier} onChange={e => setNewOrder({...newOrder, shipCarrier: e.target.value})}>
                     <option value="">Select Carrier...</option>
                     {CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input placeholder="Tracking Number" className="w-full p-2 border rounded" value={newOrder.tracking} onChange={e => setNewOrder({...newOrder, tracking: e.target.value})} />
                  <h4 className="font-bold text-sm uppercase text-slate-500 mt-4">Payment</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="p-2 border rounded" value={newOrder.paymentMethod} onChange={e => setNewOrder({...newOrder, paymentMethod: e.target.value})}>{PAYMENT_METHODS.map(p => <option key={p} value={p}>{p}</option>)}</select>
                    <select className="p-2 border rounded" value={newOrder.paymentStatus} onChange={e => setNewOrder({...newOrder, paymentStatus: e.target.value})}><option>Unpaid</option><option>Paid</option></select>
                  </div>
               </div>
               <div className="text-right space-y-2">
                  <div className="flex justify-between"><span>Subtotal:</span><span>${newOrder.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-red-500"><span>Discount:</span><input type="number" className="w-20 border rounded text-right" value={newOrder.discount} onChange={e => setNewOrder({...newOrder, discount: e.target.value})} /></div>
                  <div className="flex justify-between text-slate-500"><span>Tax Rate:</span><input type="number" step="0.01" className="w-20 border rounded text-right" value={newOrder.taxRate} onChange={e => setNewOrder({...newOrder, taxRate: e.target.value})} /></div>
                  <div className="flex justify-between text-slate-500"><span>Shipping:</span><input type="number" className="w-20 border rounded text-right" value={newOrder.shippingCost} onChange={e => setNewOrder({...newOrder, shippingCost: e.target.value})} /></div>
                  <div className="flex justify-between font-bold text-xl pt-2 border-t"><span>Total:</span><span>${parseFloat(newOrder.total).toFixed(2)}</span></div>
               </div>
            </div>
            <div className="flex justify-end mt-8 space-x-2">
               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
               <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Save Order</button>
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
      customers: [{id:1, firstName:'Dana', lastName:'Lurie', email:'dana@test.com', billState:'MA', company: 'AcoustiSkin', phone: '555-0199', billZip: '02110'}],
      products: [{id:1, name:'AcoustiSkin Paddle', sku:'AS-001', price:120, quantity:50, upc:'123456789'}],
      orders: [],
      tasks: [],
      referrals: [{id:1, source:'Dr. Smith', code:'SMITH20', status:'Converted', rewardPerSale:100, itemsSold:1, tier:'Tier 1 (Standard)'}]
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
      case 'referrals': return <ReferralManager referrals={data.referrals} setReferrals={d => update('referrals', d)} />;
      case 'analytics': return <Analytics data={data} />;
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
          <SidebarItem icon={<CalendarIcon/>} label="Calendar" onClick={() => setCurrentView('calendar')} active={currentView==='calendar'}/>
          <SidebarItem icon={<Users/>} label="Customers" onClick={() => setCurrentView('customers')} active={currentView==='customers'}/>
          <SidebarItem icon={<ShoppingCart/>} label="Orders" onClick={() => setCurrentView('orders')} active={currentView==='orders'}/>
          <SidebarItem icon={<Gift/>} label="Referrals" onClick={() => setCurrentView('referrals')} active={currentView==='referrals'}/>
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
