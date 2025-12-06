import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, Package, Users, DollarSign, Gift, TrendingUp, X, Save, ChevronDown, MapPin, Phone, Mail, Calendar, CreditCard, Truck, AlertCircle, Check } from 'lucide-react';

// US State Sales Tax Rates (2025) - Based on research
const US_SALES_TAX_RATES = {
  'AL': { state: 'Alabama', rate: 4.00, avgLocal: 5.44 },
  'AK': { state: 'Alaska', rate: 0.00, avgLocal: 1.76 },
  'AZ': { state: 'Arizona', rate: 5.60, avgLocal: 2.80 },
  'AR': { state: 'Arkansas', rate: 6.50, avgLocal: 2.97 },
  'CA': { state: 'California', rate: 7.25, avgLocal: 2.47 },
  'CO': { state: 'Colorado', rate: 2.90, avgLocal: 4.96 },
  'CT': { state: 'Connecticut', rate: 6.35, avgLocal: 0.00 },
  'DE': { state: 'Delaware', rate: 0.00, avgLocal: 0.00 },
  'FL': { state: 'Florida', rate: 6.00, avgLocal: 1.05 },
  'GA': { state: 'Georgia', rate: 4.00, avgLocal: 3.37 },
  'HI': { state: 'Hawaii', rate: 4.00, avgLocal: 0.50 },
  'ID': { state: 'Idaho', rate: 6.00, avgLocal: 0.03 },
  'IL': { state: 'Illinois', rate: 6.25, avgLocal: 2.59 },
  'IN': { state: 'Indiana', rate: 7.00, avgLocal: 0.00 },
  'IA': { state: 'Iowa', rate: 6.00, avgLocal: 0.94 },
  'KS': { state: 'Kansas', rate: 6.50, avgLocal: 2.28 },
  'KY': { state: 'Kentucky', rate: 6.00, avgLocal: 0.00 },
  'LA': { state: 'Louisiana', rate: 5.00, avgLocal: 5.11 },
  'ME': { state: 'Maine', rate: 5.50, avgLocal: 0.00 },
  'MD': { state: 'Maryland', rate: 6.00, avgLocal: 0.00 },
  'MA': { state: 'Massachusetts', rate: 6.25, avgLocal: 0.00 },
  'MI': { state: 'Michigan', rate: 6.00, avgLocal: 0.00 },
  'MN': { state: 'Minnesota', rate: 6.875, avgLocal: 0.59 },
  'MS': { state: 'Mississippi', rate: 7.00, avgLocal: 0.07 },
  'MO': { state: 'Missouri', rate: 4.225, avgLocal: 4.15 },
  'MT': { state: 'Montana', rate: 0.00, avgLocal: 0.00 },
  'NE': { state: 'Nebraska', rate: 5.50, avgLocal: 1.42 },
  'NV': { state: 'Nevada', rate: 6.85, avgLocal: 1.53 },
  'NH': { state: 'New Hampshire', rate: 0.00, avgLocal: 0.00 },
  'NJ': { state: 'New Jersey', rate: 6.625, avgLocal: -0.03 },
  'NM': { state: 'New Mexico', rate: 5.125, avgLocal: 2.72 },
  'NY': { state: 'New York', rate: 4.00, avgLocal: 4.54 },
  'NC': { state: 'North Carolina', rate: 4.75, avgLocal: 2.25 },
  'ND': { state: 'North Dakota', rate: 5.00, avgLocal: 1.99 },
  'OH': { state: 'Ohio', rate: 5.75, avgLocal: 1.55 },
  'OK': { state: 'Oklahoma', rate: 4.50, avgLocal: 4.55 },
  'OR': { state: 'Oregon', rate: 0.00, avgLocal: 0.00 },
  'PA': { state: 'Pennsylvania', rate: 6.00, avgLocal: 0.34 },
  'RI': { state: 'Rhode Island', rate: 7.00, avgLocal: 0.00 },
  'SC': { state: 'South Carolina', rate: 6.00, avgLocal: 1.46 },
  'SD': { state: 'South Dakota', rate: 4.20, avgLocal: 1.90 },
  'TN': { state: 'Tennessee', rate: 7.00, avgLocal: 2.55 },
  'TX': { state: 'Texas', rate: 6.25, avgLocal: 1.95 },
  'UT': { state: 'Utah', rate: 6.10, avgLocal: 1.19 },
  'VT': { state: 'Vermont', rate: 6.00, avgLocal: 0.24 },
  'VA': { state: 'Virginia', rate: 5.30, avgLocal: 0.48 },
  'WA': { state: 'Washington', rate: 6.50, avgLocal: 2.79 },
  'WV': { state: 'West Virginia', rate: 6.00, avgLocal: 0.51 },
  'WI': { state: 'Wisconsin', rate: 5.00, avgLocal: 0.44 },
  'WY': { state: 'Wyoming', rate: 4.00, avgLocal: 1.36 }
};

const SHIPPING_CARRIERS = [
  'UPS Ground',
  'UPS 2nd Day Air',
  'UPS Next Day Air',
  'FedEx Ground',
  'FedEx 2Day',
  'FedEx Priority Overnight',
  'USPS Priority Mail',
  'USPS First Class',
  'USPS Priority Mail Express',
  'DHL Express',
  'Other'
];

// Sample initial data
const initialCustomers = [
  {
    id: 1,
    // Basic Info
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'Tech Innovations Inc',
    email: 'sarah.johnson@techinnovations.com',
    phone: '(555) 123-4567',
    mobile: '(555) 987-6543',
    
    // Address
    billingAddress: {
      street1: '123 Main Street',
      street2: 'Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA'
    },
    shippingAddress: {
      street1: '123 Main Street',
      street2: 'Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA'
    },
    
    // CRM Fields
    customerType: 'Business',
    industry: 'Technology',
    customerSince: '2023-01-15',
    status: 'Active',
    salesRep: 'John Smith',
    creditLimit: 50000,
    paymentTerms: 'Net 30',
    taxExempt: false,
    
    // Referral Data
    referredBy: null,
    referralCode: 'SARAH2023',
    referralRewards: 250,
    totalReferrals: 3,
    
    // Notes
    notes: 'Preferred customer - always pays on time'
  }
];

const initialProducts = [
  {
    id: 1,
    productId: 'PROD-001',
    name: 'AcoustiSkin Premium Panel',
    sku: 'ASP-PRE-001',
    amazonASIN: 'B08XYZ1234',
    description: 'Premium acoustic treatment panel',
    price: 149.99,
    cost: 75.00,
    category: 'Acoustic Panels',
    stockQuantity: 500,
    reorderPoint: 50,
    weight: 5.2,
    dimensions: '24x48x2 inches',
    manufacturer: 'AcoustiSkin',
    active: true
  },
  {
    id: 2,
    productId: 'PROD-002',
    name: 'AcoustiSkin Bass Trap',
    sku: 'ASP-BAS-002',
    amazonASIN: 'B08ABC5678',
    description: 'Corner bass trap for low frequency control',
    price: 89.99,
    cost: 45.00,
    category: 'Bass Traps',
    stockQuantity: 300,
    reorderPoint: 30,
    weight: 3.8,
    dimensions: '12x12x48 inches',
    manufacturer: 'AcoustiSkin',
    active: true
  }
];

const initialOrders = [];

const AcoustiSkinCRM = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [customers, setCustomers] = useState(initialCustomers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Dashboard Statistics
  const stats = useMemo(() => ({
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'Active').length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    referralRewards: customers.reduce((sum, c) => sum + (c.referralRewards || 0), 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0
  }), [customers, orders]);

  // Filter functions
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const search = searchTerm.toLowerCase();
      return (
        customer.firstName?.toLowerCase().includes(search) ||
        customer.lastName?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search) ||
        customer.phone?.includes(search) ||
        customer.company?.toLowerCase().includes(search) ||
        customer.billingAddress?.zip?.includes(search)
      );
    });
  }, [customers, searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const search = searchTerm.toLowerCase();
      return (
        product.name?.toLowerCase().includes(search) ||
        product.sku?.toLowerCase().includes(search) ||
        product.productId?.toLowerCase().includes(search) ||
        product.amazonASIN?.toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const search = searchTerm.toLowerCase();
      const customer = customers.find(c => c.id === order.customerId);
      return (
        order.orderNumber?.toLowerCase().includes(search) ||
        order.trackingNumber?.toLowerCase().includes(search) ||
        customer?.firstName?.toLowerCase().includes(search) ||
        customer?.lastName?.toLowerCase().includes(search)
      );
    });
  }, [orders, searchTerm, customers]);

  // CRUD Operations
  const handleAdd = (type) => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      switch(type) {
        case 'customer':
          setCustomers(customers.filter(c => c.id !== id));
          break;
        case 'product':
          setProducts(products.filter(p => p.id !== id));
          break;
        case 'order':
          setOrders(orders.filter(o => o.id !== id));
          break;
      }
    }
  };

  const handleSave = (data, type) => {
    switch(type) {
      case 'customer':
        if (editingItem) {
          setCustomers(customers.map(c => c.id === editingItem.id ? { ...data, id: editingItem.id } : c));
        } else {
          setCustomers([...customers, { ...data, id: Date.now() }]);
        }
        break;
      case 'product':
        if (editingItem) {
          setProducts(products.map(p => p.id === editingItem.id ? { ...data, id: editingItem.id } : p));
        } else {
          setProducts([...products, { ...data, id: Date.now() }]);
        }
        break;
      case 'order':
        if (editingItem) {
          setOrders(orders.map(o => o.id === editingItem.id ? { ...data, id: editingItem.id } : o));
        } else {
          setOrders([...orders, { ...data, id: Date.now() }]);
        }
        break;
    }
    setShowModal(false);
  };

  return (
    <div className="crm-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1d35 50%, #0f1428 100%);
          color: #e8eaed;
          min-height: 100vh;
        }
        
        .crm-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          background: linear-gradient(135deg, #1e2139 0%, #252842 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          padding: 30px 40px;
          margin-bottom: 30px;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 24px;
          color: white;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
        }
        
        .logo-text h1 {
          font-family: 'Crimson Pro', serif;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }
        
        .logo-text p {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 500;
        }
        
        .header-actions {
          display: flex;
          gap: 15px;
        }
        
        .btn {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(139, 92, 246, 0.4);
        }
        
        .btn-secondary {
          background: rgba(139, 92, 246, 0.1);
          color: #a78bfa;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        .btn-secondary:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        .nav-tabs {
          display: flex;
          gap: 8px;
          background: rgba(30, 33, 57, 0.5);
          padding: 8px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .nav-tab {
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .nav-tab:hover {
          background: rgba(139, 92, 246, 0.1);
          color: #a78bfa;
        }
        
        .nav-tab.active {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
        
        .search-bar {
          position: relative;
          margin-bottom: 30px;
        }
        
        .search-input {
          width: 100%;
          padding: 16px 20px 16px 50px;
          background: rgba(30, 33, 57, 0.7);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          color: #e8eaed;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        .search-input::placeholder {
          color: #6b7280;
        }
        
        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: linear-gradient(135deg, #1e2139 0%, #252842 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%);
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
        }
        
        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        
        .stat-icon {
          width: 48px;
          height: 48px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
        }
        
        .stat-label {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          font-family: 'Crimson Pro', serif;
          color: #e8eaed;
          margin-top: 8px;
        }
        
        .stat-change {
          font-size: 13px;
          color: #10b981;
          font-weight: 600;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .table-container {
          background: rgba(30, 33, 57, 0.7);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .table-header {
          padding: 24px 30px;
          background: linear-gradient(135deg, #1e2139 0%, #252842 100%);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .table-title {
          font-size: 20px;
          font-weight: 700;
          color: #e8eaed;
          font-family: 'Crimson Pro', serif;
        }
        
        .table-scroll {
          overflow-x: auto;
          max-height: 600px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        thead {
          background: rgba(139, 92, 246, 0.1);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        th {
          padding: 16px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        tbody tr {
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          transition: all 0.2s ease;
        }
        
        tbody tr:hover {
          background: rgba(139, 92, 246, 0.05);
        }
        
        td {
          padding: 18px 20px;
          color: #d1d5db;
          font-size: 14px;
        }
        
        .badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .badge-active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .badge-inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .badge-pending {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
          color: #a78bfa;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .icon-btn:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: #8b5cf6;
          transform: scale(1.05);
        }
        
        .icon-btn.delete:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ef4444;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .modal {
          background: linear-gradient(135deg, #1e2139 0%, #252842 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .modal-header {
          padding: 30px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-title {
          font-size: 24px;
          font-weight: 700;
          font-family: 'Crimson Pro', serif;
          color: #e8eaed;
        }
        
        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
          color: #a78bfa;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ef4444;
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: 30px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .form-input, .form-select, .form-textarea {
          padding: 12px 16px;
          background: rgba(10, 14, 39, 0.5);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 10px;
          color: #e8eaed;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-section {
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .form-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #e8eaed;
          margin-bottom: 20px;
          font-family: 'Crimson Pro', serif;
        }
        
        .modal-footer {
          padding: 24px 30px;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 30px;
          color: #6b7280;
        }
        
        .empty-state-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }
        
        .empty-state h3 {
          font-size: 20px;
          font-weight: 700;
          color: #9ca3af;
          margin-bottom: 8px;
          font-family: 'Crimson Pro', serif;
        }
        
        .empty-state p {
          font-size: 14px;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 20px;
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .table-scroll {
            overflow-x: scroll;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">AS</div>
            <div className="logo-text">
              <h1>AcoustiSkin CRM</h1>
              <p>Enterprise Customer Relationship Management</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <TrendingUp size={18} />
              Analytics
            </button>
            <button className="btn btn-primary" onClick={() => handleAdd(activeView === 'customers' ? 'customer' : activeView === 'products' ? 'product' : 'order')}>
              <Plus size={18} />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button className={`nav-tab ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
          <TrendingUp size={18} />
          Dashboard
        </button>
        <button className={`nav-tab ${activeView === 'customers' ? 'active' : ''}`} onClick={() => setActiveView('customers')}>
          <Users size={18} />
          Customers
        </button>
        <button className={`nav-tab ${activeView === 'products' ? 'active' : ''}`} onClick={() => setActiveView('products')}>
          <Package size={18} />
          Products
        </button>
        <button className={`nav-tab ${activeView === 'orders' ? 'active' : ''}`} onClick={() => setActiveView('orders')}>
          <Truck size={18} />
          Orders
        </button>
        <button className={`nav-tab ${activeView === 'referrals' ? 'active' : ''}`} onClick={() => setActiveView('referrals')}>
          <Gift size={18} />
          Referral Program
        </button>
      </div>

      {/* Search Bar (except dashboard) */}
      {activeView !== 'dashboard' && (
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${activeView}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <>
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Total Customers</div>
                  <div className="stat-value">{stats.totalCustomers}</div>
                  <div className="stat-change">
                    <TrendingUp size={16} />
                    {stats.activeCustomers} Active
                  </div>
                </div>
                <div className="stat-icon">
                  <Users size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Total Orders</div>
                  <div className="stat-value">{stats.totalOrders}</div>
                  <div className="stat-change">
                    <Check size={16} />
                    All Time
                  </div>
                </div>
                <div className="stat-icon">
                  <Package size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Total Revenue</div>
                  <div className="stat-value">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="stat-change">
                    <TrendingUp size={16} />
                    ${stats.avgOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} Avg
                  </div>
                </div>
                <div className="stat-icon">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Referral Rewards</div>
                  <div className="stat-value">${stats.referralRewards.toLocaleString()}</div>
                  <div className="stat-change">
                    <Gift size={16} />
                    Outstanding
                  </div>
                </div>
                <div className="stat-icon">
                  <Gift size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">Recent Activity</h2>
            </div>
            <div className="empty-state">
              <div className="empty-state-icon">
                <TrendingUp size={40} />
              </div>
              <h3>Welcome to AcoustiSkin CRM</h3>
              <p>Start by adding customers, products, and creating orders to see your business analytics</p>
            </div>
          </div>
        </>
      )}

      {/* Customers View */}
      {activeView === 'customers' && (
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Customer Database</h2>
            <button className="btn btn-primary" onClick={() => handleAdd('customer')}>
              <Plus size={18} />
              New Customer
            </button>
          </div>
          <div className="table-scroll">
            {filteredCustomers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Referrals</th>
                    <th>Rewards</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.company || '-'}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.billingAddress.city}, {customer.billingAddress.state}</td>
                      <td>
                        <span className={`badge ${customer.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td>{customer.totalReferrals || 0}</td>
                      <td>${customer.referralRewards || 0}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" onClick={() => handleEdit(customer, 'customer')}>
                            <Edit2 size={16} />
                          </button>
                          <button className="icon-btn delete" onClick={() => handleDelete(customer.id, 'customer')}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Users size={40} />
                </div>
                <h3>No customers found</h3>
                <p>{searchTerm ? 'Try adjusting your search' : 'Add your first customer to get started'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products View */}
      {activeView === 'products' && (
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Product Catalog</h2>
            <button className="btn btn-primary" onClick={() => handleAdd('product')}>
              <Plus size={18} />
              New Product
            </button>
          </div>
          <div className="table-scroll">
            {filteredProducts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Amazon ASIN</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td style={{ fontWeight: 600 }}>{product.productId}</td>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.amazonASIN}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${product.stockQuantity > product.reorderPoint ? 'badge-active' : 'badge-pending'}`}>
                          {product.stockQuantity} units
                        </span>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <span className={`badge ${product.active ? 'badge-active' : 'badge-inactive'}`}>
                          {product.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" onClick={() => handleEdit(product, 'product')}>
                            <Edit2 size={16} />
                          </button>
                          <button className="icon-btn delete" onClick={() => handleDelete(product.id, 'product')}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Package size={40} />
                </div>
                <h3>No products found</h3>
                <p>{searchTerm ? 'Try adjusting your search' : 'Add your first product to get started'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders View */}
      {activeView === 'orders' && (
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Order Management</h2>
            <button className="btn btn-primary" onClick={() => handleAdd('order')}>
              <Plus size={18} />
              New Order
            </button>
          </div>
          <div className="table-scroll">
            {filteredOrders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>Shipping</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => {
                    const customer = customers.find(c => c.id === order.customerId);
                    return (
                      <tr key={order.id}>
                        <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                        <td>{customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.items?.length || 0}</td>
                        <td>${order.subtotal.toFixed(2)}</td>
                        <td>${order.tax.toFixed(2)}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{order.shippingCarrier}</td>
                        <td>
                          <span className={`badge badge-${order.status === 'Delivered' ? 'active' : order.status === 'Pending' ? 'pending' : 'inactive'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn" onClick={() => handleEdit(order, 'order')}>
                              <Edit2 size={16} />
                            </button>
                            <button className="icon-btn delete" onClick={() => handleDelete(order.id, 'order')}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Truck size={40} />
                </div>
                <h3>No orders found</h3>
                <p>{searchTerm ? 'Try adjusting your search' : 'Create your first order to get started'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Referrals View */}
      {activeView === 'referrals' && (
        <div className="table-container">
          <div className="table-header">
            <h2 className="table-title">Referral Program</h2>
          </div>
          <div className="table-scroll">
            {customers.filter(c => c.totalReferrals > 0 || c.referralRewards > 0).length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Referral Code</th>
                    <th>Total Referrals</th>
                    <th>Rewards Earned</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.filter(c => c.totalReferrals > 0 || c.referralRewards > 0).map(customer => (
                    <tr key={customer.id}>
                      <td style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.referralCode}</td>
                      <td>{customer.totalReferrals}</td>
                      <td>${customer.referralRewards}</td>
                      <td>
                        <span className="badge badge-active">Active</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn" onClick={() => handleEdit(customer, 'customer')}>
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Gift size={40} />
                </div>
                <h3>No referrals yet</h3>
                <p>Customers will appear here once they start referring others</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <ModalComponent
          type={modalType}
          item={editingItem}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          customers={customers}
          products={products}
        />
      )}
    </div>
  );
};

// Modal Component
const ModalComponent = ({ type, item, onSave, onClose, customers, products }) => {
  const [formData, setFormData] = useState(item || getDefaultFormData(type));

  function getDefaultFormData(type) {
    switch(type) {
      case 'customer':
        return {
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          mobile: '',
          billingAddress: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            country: 'USA'
          },
          shippingAddress: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            country: 'USA'
          },
          customerType: 'Individual',
          industry: '',
          customerSince: new Date().toISOString().split('T')[0],
          status: 'Active',
          salesRep: '',
          creditLimit: 0,
          paymentTerms: 'Net 30',
          taxExempt: false,
          referredBy: null,
          referralCode: '',
          referralRewards: 0,
          totalReferrals: 0,
          notes: ''
        };
      case 'product':
        return {
          productId: '',
          name: '',
          sku: '',
          amazonASIN: '',
          description: '',
          price: 0,
          cost: 0,
          category: '',
          stockQuantity: 0,
          reorderPoint: 0,
          weight: 0,
          dimensions: '',
          manufacturer: 'AcoustiSkin',
          active: true
        };
      case 'order':
        return {
          orderNumber: `ORD-${Date.now()}`,
          customerId: null,
          orderDate: new Date().toISOString().split('T')[0],
          items: [],
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          billToSameAsCustomer: true,
          shipToSameAsCustomer: true,
          billToAddress: {},
          shipToAddress: {},
          shippingCarrier: 'UPS Ground',
          trackingNumber: '',
          status: 'Pending',
          notes: ''
        };
      default:
        return {};
    }
  }

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, type);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {item ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `New ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {type === 'customer' && (
              <>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      className="form-input"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      className="form-input"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      className="form-input"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Customer Type</label>
                    <select
                      className="form-select"
                      value={formData.customerType}
                      onChange={(e) => handleChange('customerType', e.target.value)}
                    >
                      <option>Individual</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile</label>
                    <input
                      className="form-input"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <input
                      className="form-input"
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Billing Address</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Street Address 1</label>
                      <input
                        className="form-input"
                        value={formData.billingAddress.street1}
                        onChange={(e) => handleChange('billingAddress.street1', e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Street Address 2</label>
                      <input
                        className="form-input"
                        value={formData.billingAddress.street2}
                        onChange={(e) => handleChange('billingAddress.street2', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        className="form-input"
                        value={formData.billingAddress.city}
                        onChange={(e) => handleChange('billingAddress.city', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select
                        className="form-select"
                        value={formData.billingAddress.state}
                        onChange={(e) => handleChange('billingAddress.state', e.target.value)}
                      >
                        <option value="">Select State</option>
                        {Object.entries(US_SALES_TAX_RATES).map(([code, data]) => (
                          <option key={code} value={code}>{data.state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">ZIP Code</label>
                      <input
                        className="form-input"
                        value={formData.billingAddress.zip}
                        onChange={(e) => handleChange('billingAddress.zip', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <input
                        className="form-input"
                        value={formData.billingAddress.country}
                        onChange={(e) => handleChange('billingAddress.country', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Shipping Address</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Street Address 1</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress.street1}
                        onChange={(e) => handleChange('shippingAddress.street1', e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">Street Address 2</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress.street2}
                        onChange={(e) => handleChange('shippingAddress.street2', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress.city}
                        onChange={(e) => handleChange('shippingAddress.city', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select
                        className="form-select"
                        value={formData.shippingAddress.state}
                        onChange={(e) => handleChange('shippingAddress.state', e.target.value)}
                      >
                        <option value="">Select State</option>
                        {Object.entries(US_SALES_TAX_RATES).map(([code, data]) => (
                          <option key={code} value={code}>{data.state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">ZIP Code</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress.zip}
                        onChange={(e) => handleChange('shippingAddress.zip', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress.country}
                        onChange={(e) => handleChange('shippingAddress.country', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Business Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sales Rep</label>
                      <input
                        className="form-input"
                        value={formData.salesRep}
                        onChange={(e) => handleChange('salesRep', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Customer Since</label>
                      <input
                        className="form-input"
                        type="date"
                        value={formData.customerSince}
                        onChange={(e) => handleChange('customerSince', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Terms</label>
                      <select
                        className="form-select"
                        value={formData.paymentTerms}
                        onChange={(e) => handleChange('paymentTerms', e.target.value)}
                      >
                        <option>Net 30</option>
                        <option>Net 60</option>
                        <option>Net 90</option>
                        <option>Due on Receipt</option>
                        <option>Prepaid</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Credit Limit ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        value={formData.creditLimit}
                        onChange={(e) => handleChange('creditLimit', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tax Exempt</label>
                      <select
                        className="form-select"
                        value={formData.taxExempt}
                        onChange={(e) => handleChange('taxExempt', e.target.value === 'true')}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Referral Program</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Referral Code</label>
                      <input
                        className="form-input"
                        value={formData.referralCode}
                        onChange={(e) => handleChange('referralCode', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Referred By</label>
                      <select
                        className="form-select"
                        value={formData.referredBy || ''}
                        onChange={(e) => handleChange('referredBy', e.target.value ? parseInt(e.target.value) : null)}
                      >
                        <option value="">None</option>
                        {customers.map(c => (
                          <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Referrals</label>
                      <input
                        className="form-input"
                        type="number"
                        value={formData.totalReferrals}
                        onChange={(e) => handleChange('totalReferrals', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Referral Rewards ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        value={formData.referralRewards}
                        onChange={(e) => handleChange('referralRewards', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group full-width">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-textarea"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {type === 'product' && (
              <>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Product ID *</label>
                    <input
                      className="form-input"
                      value={formData.productId}
                      onChange={(e) => handleChange('productId', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SKU</label>
                    <input
                      className="form-input"
                      value={formData.sku}
                      onChange={(e) => handleChange('sku', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Amazon ASIN</label>
                    <input
                      className="form-input"
                      value={formData.amazonASIN}
                      onChange={(e) => handleChange('amazonASIN', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                      className="form-input"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cost ($)</label>
                    <input
                      className="form-input"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input
                      className="form-input"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      className="form-input"
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) => handleChange('stockQuantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reorder Point</label>
                    <input
                      className="form-input"
                      type="number"
                      value={formData.reorderPoint}
                      onChange={(e) => handleChange('reorderPoint', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (lbs)</label>
                    <input
                      className="form-input"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dimensions</label>
                    <input
                      className="form-input"
                      value={formData.dimensions}
                      onChange={(e) => handleChange('dimensions', e.target.value)}
                      placeholder="L x W x H"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Manufacturer</label>
                    <input
                      className="form-input"
                      value={formData.manufacturer}
                      onChange={(e) => handleChange('manufacturer', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Active</label>
                    <select
                      className="form-select"
                      value={formData.active}
                      onChange={(e) => handleChange('active', e.target.value === 'true')}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {type === 'order' && (
              <>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Order Number</label>
                    <input
                      className="form-input"
                      value={formData.orderNumber}
                      onChange={(e) => handleChange('orderNumber', e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Customer *</label>
                    <select
                      className="form-select"
                      value={formData.customerId || ''}
                      onChange={(e) => handleChange('customerId', parseInt(e.target.value))}
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Date</label>
                    <input
                      className="form-input"
                      type="date"
                      value={formData.orderDate}
                      onChange={(e) => handleChange('orderDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Shipping Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Shipping Carrier</label>
                      <select
                        className="form-select"
                        value={formData.shippingCarrier}
                        onChange={(e) => handleChange('shippingCarrier', e.target.value)}
                      >
                        {SHIPPING_CARRIERS.map(carrier => (
                          <option key={carrier} value={carrier}>{carrier}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tracking Number</label>
                      <input
                        className="form-input"
                        value={formData.trackingNumber}
                        onChange={(e) => handleChange('trackingNumber', e.target.value)}
                        placeholder="UPS Quantum View compatible"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Shipping Cost ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.shipping}
                        onChange={(e) => handleChange('shipping', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Order Totals</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Subtotal ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.subtotal}
                        onChange={(e) => handleChange('subtotal', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tax ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.tax}
                        onChange={(e) => handleChange('tax', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.total}
                        onChange={(e) => handleChange('total', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group full-width">
                    <label className="form-label">Order Notes</label>
                    <textarea
                      className="form-textarea"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={18} />
              Save {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcoustiSkinCRM;
