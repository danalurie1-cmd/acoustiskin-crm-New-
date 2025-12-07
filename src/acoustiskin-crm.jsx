import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Package, Users, DollarSign, Gift, TrendingUp, X, Save, Calendar as CalendarIcon, Target, BarChart3, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Star, Award, QrCode, Share2, Download, Upload, Settings, ChevronLeft, ChevronRight, MessageSquare, ClipboardList, ShoppingCart, Filter, Zap } from 'lucide-react';

// US State Sales Tax Rates (2025)
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
  'UPS Ground', 'UPS 2nd Day Air', 'UPS Next Day Air',
  'FedEx Ground', 'FedEx 2Day', 'FedEx Priority Overnight',
  'USPS Priority Mail', 'USPS First Class', 'USPS Priority Mail Express',
  'DHL Express', 'Other'
];

const PADDLE_BRANDS = [
  'CRBN', 'Selkirk', 'Joola', 'Engage', 'Paddletek', 'ProKennex', 
  'Onix', 'Head', 'Gamma', 'Franklin', 'Electrum', 'Vulcan',
  'SLK by Selkirk', 'Bantam', 'Legacy Pro', 'Other'
].sort();

const LEAD_SOURCES = [
  'Google Search', 'Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok',
  'Customer Referral', 'Pickleball Tournament', 'Pickleball Club', 'Direct Website',
  'Email Campaign', 'Event/Trade Show', 'Retail Store', 'Partner/Affiliate', 'Other'
];

const EVENT_TYPES = ['Meeting', 'Call', 'Task', 'Event', 'Holiday', 'Other'];

const COMMUNICATION_TYPES = ['Email', 'Phone', 'Text', 'Meeting', 'Note'];

const TASK_TYPES = ['Call', 'Email', 'Meeting', 'Follow-up', 'Other'];

// US Holidays 2024-2026
const US_HOLIDAYS = [
  // 2024
  { date: '2024-01-01', name: "New Year's Day" },
  { date: '2024-01-15', name: 'Martin Luther King Jr. Day' },
  { date: '2024-02-19', name: "Presidents' Day" },
  { date: '2024-05-27', name: 'Memorial Day' },
  { date: '2024-07-04', name: 'Independence Day' },
  { date: '2024-09-02', name: 'Labor Day' },
  { date: '2024-10-14', name: 'Columbus Day' },
  { date: '2024-11-11', name: 'Veterans Day' },
  { date: '2024-11-28', name: 'Thanksgiving' },
  { date: '2024-12-25', name: 'Christmas' },
  // 2025
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-01-20', name: 'Martin Luther King Jr. Day' },
  { date: '2025-02-17', name: "Presidents' Day" },
  { date: '2025-05-26', name: 'Memorial Day' },
  { date: '2025-07-04', name: 'Independence Day' },
  { date: '2025-09-01', name: 'Labor Day' },
  { date: '2025-10-13', name: 'Columbus Day' },
  { date: '2025-11-11', name: 'Veterans Day' },
  { date: '2025-11-27', name: 'Thanksgiving' },
  { date: '2025-12-25', name: 'Christmas' },
  // 2026
  { date: '2026-01-01', name: "New Year's Day" },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day' },
  { date: '2026-02-16', name: "Presidents' Day" },
  { date: '2026-05-25', name: 'Memorial Day' },
  { date: '2026-07-03', name: 'Independence Day (Observed)' },
  { date: '2026-09-07', name: 'Labor Day' },
  { date: '2026-10-12', name: 'Columbus Day' },
  { date: '2026-11-11', name: 'Veterans Day' },
  { date: '2026-11-26', name: 'Thanksgiving' },
  { date: '2026-12-25', name: 'Christmas' }
];

// Initial Sample Data
const initialCustomers = [
  {
    id: 1,
    // Basic Info
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'Tech Innovations Inc',
    email: 'sarah.johnson@techinnovations.com',
    homePhone: '(555) 123-4567',
    mobilePhone: '(555) 987-6543',
    
    // Address
    billingAddress: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    },
    shippingAddress: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
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
    
    // Lead Information
    leadSource: 'Google Search',
    potentialReferrals: 5,
    
    // Social Media
    socialPlatforms: ['Instagram', 'LinkedIn'],
    socialHandle: '@sarahjtech',
    socialEngagement: 'Very Active',
    
    // Pickleball Profile
    skillLevel: 'Intermediate',
    playFrequency: '3-5 times/week',
    paddleBrand: 'Selkirk',
    groupName: 'SF Pickleball Club',
    productInterests: ['Performance', 'Durability'],
    
    // Communication Preferences
    contactMethod: 'Email',
    contactTime: 'Morning',
    emailOptIn: true,
    smsOptIn: true,
    referralInterest: 'Yes',
    discountInterest: true,
    
    // Referral Data
    referredBy: null,
    referralCode: 'SARAH2023',
    referralRewards: 250,
    totalReferrals: 3,
    
    // AI Score
    aiScore: 85,
    
    // Phase 1 Data
    communications: [],
    tasks: [],
    
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
const initialEvents = [];

// Referral Program Settings
const initialReferralSettings = {
  creditPerReferral: 25,
  tiers: {
    bronze: { min: 1, max: 2, reward: 25 },
    silver: { min: 3, max: 5, reward: 50 },
    gold: { min: 6, max: 10, reward: 100 },
    platinum: { min: 11, max: 999, reward: 200 }
  }
};

const AcoustiSkinCRM = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [customers, setCustomers] = useState(initialCustomers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [referralSettings, setReferralSettings] = useState(initialReferralSettings);
  const [showReferralSettings, setShowReferralSettings] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pipelineFilter, setPipelineFilter] = useState('all');

  // Calculate AI Score for customer
  const calculateAIScore = (customer) => {
    let score = 0;
    
    // Has complete contact info (+15)
    if (customer.email && customer.mobilePhone) score += 15;
    
    // Social media presence (+20)
    if (customer.socialPlatforms?.length > 0) score += 10;
    if (customer.socialEngagement === 'Very Active') score += 10;
    
    // Engagement metrics (+25)
    if (customer.emailOptIn) score += 10;
    if (customer.smsOptIn) score += 5;
    if (customer.referralInterest === 'Yes') score += 10;
    
    // Purchase history (+20)
    const customerOrders = orders.filter(o => o.customerId === customer.id);
    if (customerOrders.length > 0) score += 10;
    if (customerOrders.length > 3) score += 10;
    
    // Referral activity (+20)
    if (customer.totalReferrals > 0) score += 10;
    if (customer.totalReferrals > 2) score += 10;
    
    return Math.min(score, 100);
  };

  // Update AI scores when data changes
  useEffect(() => {
    const updatedCustomers = customers.map(c => ({
      ...c,
      aiScore: calculateAIScore(c)
    }));
    if (JSON.stringify(updatedCustomers) !== JSON.stringify(customers)) {
      setCustomers(updatedCustomers);
    }
  }, [orders]);

  // Dashboard Statistics
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const referralRewards = customers.reduce((sum, c) => sum + (c.referralRewards || 0), 0);
    const todaysTasks = customers.flatMap(c => c.tasks || []).filter(t => 
      t.status === 'Pending' && new Date(t.dueDate).toDateString() === new Date().toDateString()
    );
    
    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'Active').length,
      prospectCustomers: customers.filter(c => c.status === 'Prospect').length,
      inactiveCustomers: customers.filter(c => c.status === 'Inactive').length,
      totalOrders: orders.length,
      totalRevenue,
      referralRewards,
      avgOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      todaysTasks: todaysTasks.length,
      upcomingEvents: events.filter(e => new Date(e.date) >= new Date()).length
    };
  }, [customers, orders, events]);

  // Filter functions
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        customer.firstName?.toLowerCase().includes(search) ||
        customer.lastName?.toLowerCase().includes(search) ||
        customer.email?.toLowerCase().includes(search) ||
        customer.homePhone?.includes(search) ||
        customer.mobilePhone?.includes(search) ||
        customer.company?.toLowerCase().includes(search) ||
        customer.billingAddress?.zip?.includes(search)
      );
      
      if (pipelineFilter === 'all') return matchesSearch;
      return matchesSearch && customer.status === pipelineFilter;
    });
  }, [customers, searchTerm, pipelineFilter]);

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
        case 'event':
          setEvents(events.filter(e => e.id !== id));
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
          setCustomers([...customers, { ...data, id: Date.now(), communications: [], tasks: [] }]);
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
      case 'event':
        if (editingItem) {
          setEvents(events.map(e => e.id === editingItem.id ? { ...data, id: editingItem.id } : e));
        } else {
          setEvents([...events, { ...data, id: Date.now() }]);
        }
        break;
    }
    setShowModal(false);
  };

  // Communication & Task Management
  const handleAddCommunication = (customerId, communication) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          communications: [...(c.communications || []), { ...communication, id: Date.now() }]
        };
      }
      return c;
    }));
  };

  const handleAddTask = (customerId, task) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          tasks: [...(c.tasks || []), { ...task, id: Date.now(), status: 'Pending' }]
        };
      }
      return c;
    }));
  };

  const handleToggleTask = (customerId, taskId) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          tasks: c.tasks.map(t => 
            t.id === taskId 
              ? { ...t, status: t.status === 'Pending' ? 'Complete' : 'Pending', completedDate: t.status === 'Pending' ? new Date().toISOString() : null }
              : t
          )
        };
      }
      return c;
    }));
  };

  const handleDeleteCommunication = (customerId, commId) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          communications: c.communications.filter(comm => comm.id !== commId)
        };
      }
      return c;
    }));
  };

  const handleDeleteTask = (customerId, taskId) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          tasks: c.tasks.filter(t => t.id !== taskId)
        };
      }
      return c;
    }));
  };

  // Data Export/Import
  const handleExportData = () => {
    const data = {
      customers,
      products,
      orders,
      events,
      referralSettings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `acoustiskin-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.customers) setCustomers(data.customers);
          if (data.products) setProducts(data.products);
          if (data.orders) setOrders(data.orders);
          if (data.events) setEvents(data.events);
          if (data.referralSettings) setReferralSettings(data.referralSettings);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Calendar Functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEvents = events.filter(e => e.date === dateStr);
    const holiday = US_HOLIDAYS.find(h => h.date === dateStr);
    if (holiday) {
      dayEvents.push({ id: `holiday-${dateStr}`, type: 'Holiday', title: holiday.name, date: dateStr });
    }
    return dayEvents;
  };

  return (
    <div className="crm-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: #0a0e1a;
          color: #e8eaed;
          min-height: 100vh;
        }
        
        .crm-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 24px;
        }
        
        .header {
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 32px 40px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .logo-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 26px;
          color: white;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
        }
        
        .logo-text h1 {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }
        
        .logo-text p {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .header-actions {
          display: flex;
          gap: 12px;
        }
        
        .btn {
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(99, 102, 241, 0.5);
        }
        
        .btn-secondary {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        
        .btn-secondary:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
        }
        
        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }
        
        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(16, 185, 129, 0.4);
        }
        
        .nav-tabs {
          display: flex;
          gap: 8px;
          background: rgba(26, 31, 53, 0.6);
          padding: 8px;
          border-radius: 16px;
          margin-bottom: 32px;
          border: 1px solid rgba(99, 102, 241, 0.15);
          overflow-x: auto;
        }
        
        .nav-tab {
          padding: 12px 20px;
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }
        
        .nav-tab:hover {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        
        .nav-tab.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }
        
        .search-bar {
          position: relative;
          margin-bottom: 32px;
        }
        
        .search-input {
          width: 100%;
          padding: 16px 20px 16px 50px;
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 14px;
          color: #e8eaed;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          background: rgba(26, 31, 53, 0.95);
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
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
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
          height: 3px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.25);
          border-color: rgba(99, 102, 241, 0.4);
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
          background: rgba(99, 102, 241, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
        }
        
        .stat-label {
          font-size: 13px;
          color: #9ca3af;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        
        .stat-value {
          font-size: 36px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
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
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .table-header {
          padding: 24px 32px;
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .table-title {
          font-size: 22px;
          font-weight: 800;
          color: #e8eaed;
          font-family: 'Playfair Display', serif;
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
          background: rgba(99, 102, 241, 0.12);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        th {
          padding: 16px 20px;
          text-align: left;
          font-size: 12px;
          font-weight: 800;
          color: #818cf8;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(99, 102, 241, 0.25);
        }
        
        tbody tr {
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          transition: all 0.2s ease;
        }
        
        tbody tr:hover {
          background: rgba(99, 102, 241, 0.08);
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
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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
        
        .badge-prospect {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .ai-score {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .icon-btn:hover {
          background: rgba(99, 102, 241, 0.25);
          border-color: #6366f1;
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
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          overflow-y: auto;
          padding: 20px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal {
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 24px;
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
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
          padding: 32px;
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
          z-index: 10;
        }
        
        .modal-title {
          font-size: 26px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          color: #e8eaed;
        }
        
        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
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
          padding: 32px;
        }
        
        .phase1-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 2px solid rgba(99, 102, 241, 0.2);
        }
        
        .phase1-tab {
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .phase1-tab:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
        }
        
        .phase1-tab.active {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          border-bottom: 2px solid #6366f1;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          font-size: 12px;
          font-weight: 700;
          color: #818cf8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        
        .form-input, .form-select, .form-textarea {
          padding: 12px 16px;
          background: rgba(10, 14, 26, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          color: #e8eaed;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          background: rgba(10, 14, 26, 0.8);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .form-section {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .form-section-title {
          font-size: 20px;
          font-weight: 800;
          color: #e8eaed;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .checkbox-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #6366f1;
        }
        
        .checkbox-item label {
          font-size: 14px;
          color: #d1d5db;
          cursor: pointer;
        }
        
        .modal-footer {
          padding: 24px 32px;
          border-top: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          position: sticky;
          bottom: 0;
          background: linear-gradient(135deg, #1a1f35 0%, #0f1424 100%);
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
          background: rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6366f1;
        }
        
        .empty-state h3 {
          font-size: 20px;
          font-weight: 700;
          color: #9ca3af;
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        
        .empty-state p {
          font-size: 14px;
          color: #6b7280;
        }
        
        .calendar-container {
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 24px;
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .calendar-title {
          font-size: 24px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          color: #e8eaed;
        }
        
        .calendar-nav {
          display: flex;
          gap: 8px;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        
        .calendar-day-header {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #818cf8;
          padding: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 8px;
          background: rgba(26, 31, 53, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .calendar-day:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: #6366f1;
        }
        
        .calendar-day.today {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
        }
        
        .calendar-day-number {
          font-size: 14px;
          font-weight: 600;
          color: #e8eaed;
        }
        
        .calendar-day-events {
          margin-top: 4px;
          font-size: 10px;
          color: #818cf8;
        }
        
        .pipeline-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        .pipeline-column {
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 20px;
        }
        
        .pipeline-column-header {
          font-size: 16px;
          font-weight: 800;
          color: #e8eaed;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(99, 102, 241, 0.2);
        }
        
        .pipeline-card {
          background: rgba(10, 14, 26, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .pipeline-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
        }
        
        .pipeline-card-name {
          font-size: 15px;
          font-weight: 700;
          color: #e8eaed;
          margin-bottom: 8px;
        }
        
        .pipeline-card-info {
          font-size: 13px;
          color: #9ca3af;
        }
        
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }
        
        .chart-container {
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 24px;
        }
        
        .chart-title {
          font-size: 18px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          color: #e8eaed;
          margin-bottom: 20px;
        }
        
        .marketing-section {
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .marketing-title {
          font-size: 20px;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          color: #e8eaed;
          margin-bottom: 20px;
        }
        
        .marketing-list {
          list-style: none;
          padding: 0;
        }
        
        .marketing-list-item {
          padding: 12px;
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .referral-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .referral-card {
          background: rgba(26, 31, 53, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 24px;
        }
        
        .tier-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        
        .tier-bronze {
          background: rgba(205, 127, 50, 0.2);
          color: #cd7f32;
          border: 1px solid rgba(205, 127, 50, 0.3);
        }
        
        .tier-silver {
          background: rgba(192, 192, 192, 0.2);
          color: #c0c0c0;
          border: 1px solid rgba(192, 192, 192, 0.3);
        }
        
        .tier-gold {
          background: rgba(255, 215, 0, 0.2);
          color: #ffd700;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }
        
        .tier-platinum {
          background: rgba(229, 228, 226, 0.2);
          color: #e5e4e2;
          border: 1px solid rgba(229, 228, 226, 0.3);
        }
        
        .comm-item, .task-item {
          background: rgba(10, 14, 26, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
        
        .comm-header, .task-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 8px;
        }
        
        .comm-type, .task-type {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }
        
        .comm-date, .task-date {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .comm-subject, .task-title {
          font-size: 15px;
          font-weight: 600;
          color: #e8eaed;
          margin-bottom: 8px;
        }
        
        .comm-content, .task-description {
          font-size: 13px;
          color: #d1d5db;
          line-height: 1.5;
        }
        
        .task-item.complete {
          opacity: 0.6;
        }
        
        .task-item.complete .task-title {
          text-decoration: line-through;
        }
        
        .task-priority {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          margin-left: 8px;
        }
        
        .priority-high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .priority-medium {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }
        
        .priority-low {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
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
          
          .pipeline-columns {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .nav-tabs {
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
              <p>Complete Customer Relationship Management System</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={handleExportData}>
              <Download size={18} />
              Export
            </button>
            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
              <Upload size={18} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
            <button className="btn btn-primary" onClick={() => handleAdd(
              activeView === 'customers' ? 'customer' :
              activeView === 'products' ? 'product' :
              activeView === 'orders' ? 'order' :
              activeView === 'calendar' ? 'event' : 'customer'
            )}>
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
          <ShoppingCart size={18} />
          Orders
        </button>
        <button className={`nav-tab ${activeView === 'calendar' ? 'active' : ''}`} onClick={() => setActiveView('calendar')}>
          <CalendarIcon size={18} />
          Calendar
        </button>
        <button className={`nav-tab ${activeView === 'pipeline' ? 'active' : ''}`} onClick={() => setActiveView('pipeline')}>
          <Target size={18} />
          Pipeline
        </button>
        <button className={`nav-tab ${activeView === 'analytics' ? 'active' : ''}`} onClick={() => setActiveView('analytics')}>
          <BarChart3 size={18} />
          Analytics
        </button>
        <button className={`nav-tab ${activeView === 'marketing' ? 'active' : ''}`} onClick={() => setActiveView('marketing')}>
          <Mail size={18} />
          Marketing
        </button>
        <button className={`nav-tab ${activeView === 'referrals' ? 'active' : ''}`} onClick={() => setActiveView('referrals')}>
          <Gift size={18} />
          Referrals
        </button>
      </div>

      {/* Search Bar (except dashboard) */}
      {activeView !== 'dashboard' && activeView !== 'calendar' && activeView !== 'pipeline' && activeView !== 'analytics' && activeView !== 'marketing' && (
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
                    <CheckCircle size={16} />
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
                  <div className="stat-label">Pipeline</div>
                  <div className="stat-value">{stats.prospectCustomers}</div>
                  <div className="stat-change">
                    <Target size={16} />
                    Prospects
                  </div>
                </div>
                <div className="stat-icon">
                  <Target size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Total Orders</div>
                  <div className="stat-value">{stats.totalOrders}</div>
                  <div className="stat-change">
                    <CheckCircle size={16} />
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
                  <div className="stat-label">Today's Tasks</div>
                  <div className="stat-value">{stats.todaysTasks}</div>
                  <div className="stat-change">
                    <Clock size={16} />
                    Pending
                  </div>
                </div>
                <div className="stat-icon">
                  <ClipboardList size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Events</div>
                  <div className="stat-value">{stats.upcomingEvents}</div>
                  <div className="stat-change">
                    <CalendarIcon size={16} />
                    Upcoming
                  </div>
                </div>
                <div className="stat-icon">
                  <CalendarIcon size={24} />
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

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <div className="stat-label">Products</div>
                  <div className="stat-value">{products.length}</div>
                  <div className="stat-change">
                    <Package size={16} />
                    In Catalog
                  </div>
                </div>
                <div className="stat-icon">
                  <Package size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">Recent Customers</h2>
            </div>
            {customers.length > 0 ? (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>AI Score</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.slice(0, 5).map(customer => (
                      <tr key={customer.id}>
                        <td style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>
                          <span className={`badge badge-${customer.status?.toLowerCase() || 'active'}`}>
                            {customer.status || 'Active'}
                          </span>
                        </td>
                        <td>
                          <div className="ai-score">
                            <Zap size={14} />
                            {customer.aiScore || 0}
                          </div>
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
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <TrendingUp size={40} />
                </div>
                <h3>Welcome to AcoustiSkin CRM</h3>
                <p>Start by adding customers to see your dashboard populate</p>
              </div>
            )}
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
                    <th>AI Score</th>
                    <th>Referrals</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                      <td>{customer.company || '-'}</td>
                      <td>{customer.email}</td>
                      <td>{customer.mobilePhone || customer.homePhone || '-'}</td>
                      <td>{customer.billingAddress?.city}, {customer.billingAddress?.state}</td>
                      <td>
                        <span className={`badge badge-${customer.status?.toLowerCase() || 'active'}`}>
                          {customer.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <div className="ai-score">
                          <Zap size={14} />
                          {customer.aiScore || 0}
                        </div>
                      </td>
                      <td>{customer.totalReferrals || 0}</td>
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
                    <th>ASIN</th>
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
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>Carrier</th>
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
                  <ShoppingCart size={40} />
                </div>
                <h3>No orders found</h3>
                <p>{searchTerm ? 'Try adjusting your search' : 'Create your first order to get started'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="calendar-container">
          <div className="calendar-header">
            <h2 className="calendar-title">
              {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="calendar-nav">
              <button 
                className="btn btn-secondary"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setCalendarDate(new Date())}
              >
                Today
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
              >
                <ChevronRight size={18} />
              </button>
              <button className="btn btn-primary" onClick={() => handleAdd('event')}>
                <Plus size={18} />
                New Event
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {getDaysInMonth(calendarDate).map((day, index) => {
              if (!day) return <div key={`empty-${index}`} />;
              
              const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={day} 
                  className={`calendar-day ${isToday ? 'today' : ''}`}
                  onClick={() => handleAdd('event')}
                >
                  <div className="calendar-day-number">{day}</div>
                  {dayEvents.length > 0 && (
                    <div className="calendar-day-events">
                      {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pipeline View */}
      {activeView === 'pipeline' && (
        <>
          <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
            <button 
              className={`btn ${pipelineFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setPipelineFilter('all')}
            >
              All Customers
            </button>
            <button 
              className={`btn ${pipelineFilter === 'Prospect' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setPipelineFilter('Prospect')}
            >
              Prospects ({stats.prospectCustomers})
            </button>
            <button 
              className={`btn ${pipelineFilter === 'Active' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setPipelineFilter('Active')}
            >
              Active ({stats.activeCustomers})
            </button>
            <button 
              className={`btn ${pipelineFilter === 'Inactive' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setPipelineFilter('Inactive')}
            >
              Inactive ({stats.inactiveCustomers})
            </button>
          </div>

          <div className="pipeline-columns">
            <div className="pipeline-column">
              <div className="pipeline-column-header">
                🎯 Prospects ({customers.filter(c => c.status === 'Prospect').length})
              </div>
              {customers.filter(c => c.status === 'Prospect').map(customer => (
                <div key={customer.id} className="pipeline-card" onClick={() => handleEdit(customer, 'customer')}>
                  <div className="pipeline-card-name">{customer.firstName} {customer.lastName}</div>
                  <div className="pipeline-card-info">{customer.email}</div>
                  <div className="pipeline-card-info">
                    <div className="ai-score" style={{ marginTop: '8px' }}>
                      <Zap size={12} />
                      {customer.aiScore || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pipeline-column">
              <div className="pipeline-column-header">
                ✅ Active ({customers.filter(c => c.status === 'Active').length})
              </div>
              {customers.filter(c => c.status === 'Active').map(customer => (
                <div key={customer.id} className="pipeline-card" onClick={() => handleEdit(customer, 'customer')}>
                  <div className="pipeline-card-name">{customer.firstName} {customer.lastName}</div>
                  <div className="pipeline-card-info">{customer.email}</div>
                  <div className="pipeline-card-info">
                    <div className="ai-score" style={{ marginTop: '8px' }}>
                      <Zap size={12} />
                      {customer.aiScore || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pipeline-column">
              <div className="pipeline-column-header">
                ⏸️ Inactive ({customers.filter(c => c.status === 'Inactive').length})
              </div>
              {customers.filter(c => c.status === 'Inactive').map(customer => (
                <div key={customer.id} className="pipeline-card" onClick={() => handleEdit(customer, 'customer')}>
                  <div className="pipeline-card-name">{customer.firstName} {customer.lastName}</div>
                  <div className="pipeline-card-info">{customer.email}</div>
                  <div className="pipeline-card-info">
                    <div className="ai-score" style={{ marginTop: '8px' }}>
                      <Zap size={12} />
                      {customer.aiScore || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="analytics-grid">
          <div className="chart-container">
            <h3 className="chart-title">Lead Source Distribution</h3>
            <div className="empty-state">
              <p>Lead source pie chart would appear here<br/>(Chart.js integration)</p>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Social Media Engagement</h3>
            <div className="empty-state">
              <p>Social media bar chart would appear here<br/>(Chart.js integration)</p>
            </div>
          </div>

          <div className="chart-container" style={{ gridColumn: '1 / -1' }}>
            <h3 className="chart-title">Revenue Trend</h3>
            <div className="empty-state">
              <p>Revenue line chart would appear here<br/>(Chart.js integration)</p>
            </div>
          </div>

          <div className="chart-container" style={{ gridColumn: '1 / -1' }}>
            <h3 className="chart-title">AI-Powered Insights</h3>
            <div style={{ padding: '20px', color: '#d1d5db' }}>
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                <li>📊 Top Lead Source: {customers.reduce((acc, c) => {
                  acc[c.leadSource || 'Unknown'] = (acc[c.leadSource || 'Unknown'] || 0) + 1;
                  return acc;
                }, {}) && Object.entries(customers.reduce((acc, c) => {
                  acc[c.leadSource || 'Unknown'] = (acc[c.leadSource || 'Unknown'] || 0) + 1;
                  return acc;
                }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}</li>
                <li>⭐ Average AI Score: {customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + (c.aiScore || 0), 0) / customers.length) : 0}/100</li>
                <li>📱 Social Media Active: {customers.filter(c => c.socialPlatforms?.length > 0).length} customers</li>
                <li>🎁 Referral Program: {customers.filter(c => c.totalReferrals > 0).length} active referrers</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Marketing View */}
      {activeView === 'marketing' && (
        <>
          <div className="marketing-section">
            <h3 className="marketing-title">📧 Email Campaigns</h3>
            <ul className="marketing-list">
              <li className="marketing-list-item">
                <span>High-Value Customers (Spent ${'>'}500)</span>
                <button className="btn btn-secondary">
                  Export {customers.filter(c => {
                    const custOrders = orders.filter(o => o.customerId === c.id);
                    return custOrders.reduce((sum, o) => sum + o.total, 0) > 500;
                  }).length} Emails
                </button>
              </li>
              <li className="marketing-list-item">
                <span>Active Social Media Users</span>
                <button className="btn btn-secondary">
                  Export {customers.filter(c => c.socialPlatforms?.length > 0).length} Emails
                </button>
              </li>
              <li className="marketing-list-item">
                <span>Email Opt-In Subscribers</span>
                <button className="btn btn-secondary">
                  Export {customers.filter(c => c.emailOptIn).length} Emails
                </button>
              </li>
            </ul>
          </div>

          <div className="marketing-section">
            <h3 className="marketing-title">💬 SMS Campaigns</h3>
            <ul className="marketing-list">
              <li className="marketing-list-item">
                <span>SMS Opt-In Subscribers</span>
                <button className="btn btn-secondary">
                  Export {customers.filter(c => c.smsOptIn).length} Numbers
                </button>
              </li>
              <li className="marketing-list-item">
                <span>High Engagement Customers</span>
                <button className="btn btn-secondary">
                  Export {customers.filter(c => c.socialEngagement === 'Very Active').length} Numbers
                </button>
              </li>
            </ul>
          </div>

          <div className="marketing-section">
            <h3 className="marketing-title">📱 Social Media Outreach</h3>
            <ul className="marketing-list">
              <li className="marketing-list-item">
                <span>Instagram Users</span>
                <button className="btn btn-secondary">
                  View {customers.filter(c => c.socialPlatforms?.includes('Instagram')).length} Profiles
                </button>
              </li>
              <li className="marketing-list-item">
                <span>Facebook Users</span>
                <button className="btn btn-secondary">
                  View {customers.filter(c => c.socialPlatforms?.includes('Facebook')).length} Profiles
                </button>
              </li>
              <li className="marketing-list-item">
                <span>LinkedIn Users</span>
                <button className="btn btn-secondary">
                  View {customers.filter(c => c.socialPlatforms?.includes('LinkedIn')).length} Profiles
                </button>
              </li>
            </ul>
          </div>

          <div className="marketing-section">
            <h3 className="marketing-title">🎁 Referral Opportunities</h3>
            <ul className="marketing-list">
              <li className="marketing-list-item">
                <span>Interested in Referrals</span>
                <button className="btn btn-secondary">
                  Contact {customers.filter(c => c.referralInterest === 'Yes').length} Customers
                </button>
              </li>
              <li className="marketing-list-item">
                <span>High AI Score (80+)</span>
                <button className="btn btn-secondary">
                  Contact {customers.filter(c => (c.aiScore || 0) >= 80).length} Customers
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Referrals View */}
      {activeView === 'referrals' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 className="table-title">Referral Program</h2>
            <button className="btn btn-secondary" onClick={() => setShowReferralSettings(true)}>
              <Settings size={18} />
              Settings
            </button>
          </div>

          <div className="referral-grid">
            <div className="referral-card">
              <span className="tier-badge tier-bronze">🥉 Bronze</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e8eaed', marginBottom: '8px' }}>
                {referralSettings.tiers.bronze.min}-{referralSettings.tiers.bronze.max} Referrals
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
                Earn ${referralSettings.tiers.bronze.reward} per referral
              </p>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                {customers.filter(c => (c.totalReferrals || 0) >= referralSettings.tiers.bronze.min && (c.totalReferrals || 0) <= referralSettings.tiers.bronze.max).length} customers
              </div>
            </div>

            <div className="referral-card">
              <span className="tier-badge tier-silver">🥈 Silver</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e8eaed', marginBottom: '8px' }}>
                {referralSettings.tiers.silver.min}-{referralSettings.tiers.silver.max} Referrals
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
                Earn ${referralSettings.tiers.silver.reward} per referral
              </p>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                {customers.filter(c => (c.totalReferrals || 0) >= referralSettings.tiers.silver.min && (c.totalReferrals || 0) <= referralSettings.tiers.silver.max).length} customers
              </div>
            </div>

            <div className="referral-card">
              <span className="tier-badge tier-gold">🥇 Gold</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e8eaed', marginBottom: '8px' }}>
                {referralSettings.tiers.gold.min}-{referralSettings.tiers.gold.max} Referrals
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
                Earn ${referralSettings.tiers.gold.reward} per referral
              </p>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                {customers.filter(c => (c.totalReferrals || 0) >= referralSettings.tiers.gold.min && (c.totalReferrals || 0) <= referralSettings.tiers.gold.max).length} customers
              </div>
            </div>

            <div className="referral-card">
              <span className="tier-badge tier-platinum">💎 Platinum</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e8eaed', marginBottom: '8px' }}>
                {referralSettings.tiers.platinum.min}+ Referrals
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px' }}>
                Earn ${referralSettings.tiers.platinum.reward} per referral
              </p>
              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                {customers.filter(c => (c.totalReferrals || 0) >= referralSettings.tiers.platinum.min).length} customers
              </div>
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">Referral Leaderboard</h2>
            </div>
            <div className="table-scroll">
              {customers.filter(c => (c.totalReferrals || 0) > 0).length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Customer</th>
                      <th>Referral Code</th>
                      <th>Total Referrals</th>
                      <th>Tier</th>
                      <th>Rewards Earned</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers
                      .filter(c => (c.totalReferrals || 0) > 0)
                      .sort((a, b) => (b.totalReferrals || 0) - (a.totalReferrals || 0))
                      .map((customer, index) => {
                        const getTier = (refs) => {
                          if (refs >= 11) return 'platinum';
                          if (refs >= 6) return 'gold';
                          if (refs >= 3) return 'silver';
                          return 'bronze';
                        };
                        
                        return (
                          <tr key={customer.id}>
                            <td style={{ fontWeight: 700, fontSize: '18px' }}>#{index + 1}</td>
                            <td style={{ fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                            <td><code style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '4px 8px', borderRadius: '6px', color: '#818cf8' }}>{customer.referralCode}</code></td>
                            <td>{customer.totalReferrals}</td>
                            <td>
                              <span className={`tier-badge tier-${getTier(customer.totalReferrals)}`}>
                                {getTier(customer.totalReferrals).toUpperCase()}
                              </span>
                            </td>
                            <td>${customer.referralRewards || 0}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="icon-btn" onClick={() => handleEdit(customer, 'customer')}>
                                  <Edit2 size={16} />
                                </button>
                                <button className="icon-btn">
                                  <QrCode size={16} />
                                </button>
                                <button className="icon-btn">
                                  <Share2 size={16} />
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
                    <Gift size={40} />
                  </div>
                  <h3>No referrals yet</h3>
                  <p>Customers will appear here once they start referring others</p>
                </div>
              )}
            </div>
          </div>
        </>
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
          onAddCommunication={handleAddCommunication}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteCommunication={handleDeleteCommunication}
          onDeleteTask={handleDeleteTask}
          orders={orders}
        />
      )}

      {/* Referral Settings Modal */}
      {showReferralSettings && (
        <ReferralSettingsModal
          settings={referralSettings}
          onSave={setReferralSettings}
          onClose={() => setShowReferralSettings(false)}
        />
      )}
    </div>
  );
};

// Continue in next message due to length...
export default AcoustiSkinCRM;
// PART 2: Modal Components
// This continues from AcoustiSkinCRM_Complete.jsx

// Modal Component with Phase 1 Integration
const ModalComponent = ({ type, item, onSave, onClose, customers, products, onAddCommunication, onAddTask, onToggleTask, onDeleteCommunication, onDeleteTask, orders }) => {
  const [formData, setFormData] = useState(item || getDefaultFormData(type));
  const [activePhase1Tab, setActivePhase1Tab] = useState('details');
  const [newComm, setNewComm] = useState({ type: 'Email', subject: '', content: '', date: '', time: '', outcome: '' });
  const [newTask, setNewTask] = useState({ taskType: 'Call', title: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '' });
  const [orderItems, setOrderItems] = useState(item?.items || []);

  function getDefaultFormData(type) {
    switch(type) {
      case 'customer':
        return {
          // Basic Info
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          homePhone: '',
          mobilePhone: '',
          
          // Address
          billingAddress: {
            street: '',
            city: '',
            state: '',
            zip: ''
          },
          shippingAddress: {
            street: '',
            city: '',
            state: '',
            zip: ''
          },
          
          // CRM Fields
          customerType: 'Individual',
          industry: '',
          customerSince: new Date().toISOString().split('T')[0],
          status: 'Prospect',
          salesRep: '',
          creditLimit: 0,
          paymentTerms: 'Net 30',
          taxExempt: false,
          
          // Lead Information
          leadSource: '',
          potentialReferrals: 0,
          
          // Social Media
          socialPlatforms: [],
          socialHandle: '',
          socialEngagement: '',
          
          // Pickleball Profile
          skillLevel: '',
          playFrequency: '',
          paddleBrand: '',
          groupName: '',
          productInterests: [],
          
          // Communication Preferences
          contactMethod: 'Email',
          contactTime: 'Morning',
          emailOptIn: false,
          smsOptIn: false,
          referralInterest: 'Maybe',
          discountInterest: false,
          
          // Referral Data
          referredBy: null,
          referralCode: '',
          referralRewards: 0,
          totalReferrals: 0,
          
          // AI Score (calculated)
          aiScore: 0,
          
          // Phase 1 Data
          communications: [],
          tasks: [],
          
          // Notes
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
          shippingAddress: {
            street: '',
            city: '',
            state: '',
            zip: ''
          },
          shippingCarrier: 'UPS Ground',
          trackingNumber: '',
          status: 'Pending',
          notes: ''
        };
      case 'event':
        return {
          type: 'Meeting',
          title: '',
          date: new Date().toISOString().split('T')[0],
          time: '',
          customerId: null,
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

  const handleArrayToggle = (field, value) => {
    const currentArray = formData[field] || [];
    if (currentArray.includes(value)) {
      handleChange(field, currentArray.filter(v => v !== value));
    } else {
      handleChange(field, [...currentArray, value]);
    }
  };

  const handleCustomerChange = (customerId) => {
    handleChange('customerId', parseInt(customerId));
    const customer = customers.find(c => c.id === parseInt(customerId));
    if (customer && type === 'order') {
      setFormData(prev => ({
        ...prev,
        customerId: parseInt(customerId),
        shippingAddress: {
          street: customer.shippingAddress?.street || customer.billingAddress?.street || '',
          city: customer.shippingAddress?.city || customer.billingAddress?.city || '',
          state: customer.shippingAddress?.state || customer.billingAddress?.state || '',
          zip: customer.shippingAddress?.zip || customer.billingAddress?.zip || ''
        }
      }));
      
      // Calculate tax if state is available
      const state = customer.shippingAddress?.state || customer.billingAddress?.state;
      if (state && US_SALES_TAX_RATES[state]) {
        const taxRate = (US_SALES_TAX_RATES[state].rate + US_SALES_TAX_RATES[state].avgLocal) / 100;
        const tax = formData.subtotal * taxRate;
        setFormData(prev => ({
          ...prev,
          tax,
          total: prev.subtotal + tax + prev.shipping
        }));
      }
    }
  };

  const handleAddOrderItem = () => {
    const newItem = { productId: '', quantity: 1, price: 0, subtotal: 0 };
    setOrderItems([...orderItems, newItem]);
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    
    // Auto-fill price if product is selected
    if (field === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        updatedItems[index].price = product.price;
        updatedItems[index].subtotal = product.price * updatedItems[index].quantity;
      }
    }
    
    // Recalculate subtotal
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].subtotal = updatedItems[index].price * updatedItems[index].quantity;
    }
    
    setOrderItems(updatedItems);
    
    // Update order totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const customer = customers.find(c => c.id === formData.customerId);
    const state = formData.shippingAddress?.state;
    let tax = 0;
    
    if (state && US_SALES_TAX_RATES[state] && !customer?.taxExempt) {
      const taxRate = (US_SALES_TAX_RATES[state].rate + US_SALES_TAX_RATES[state].avgLocal) / 100;
      tax = subtotal * taxRate;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total: subtotal + tax + (prev.shipping || 0)
    }));
  };

  const handleRemoveOrderItem = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
    
    const subtotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const state = formData.shippingAddress?.state;
    let tax = 0;
    
    if (state && US_SALES_TAX_RATES[state]) {
      const taxRate = (US_SALES_TAX_RATES[state].rate + US_SALES_TAX_RATES[state].avgLocal) / 100;
      tax = subtotal * taxRate;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total: subtotal + tax + (prev.shipping || 0)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'order') {
      onSave({ ...formData, items: orderItems }, type);
    } else {
      onSave(formData, type);
    }
  };

  const handleSaveComm = () => {
    if (newComm.subject && newComm.content) {
      onAddCommunication(formData.id, newComm);
      setNewComm({ type: 'Email', subject: '', content: '', date: '', time: '', outcome: '' });
      // Refresh the formData to show new communication
      const updatedCustomer = { ...formData };
      updatedCustomer.communications = [...(updatedCustomer.communications || []), { ...newComm, id: Date.now() }];
      setFormData(updatedCustomer);
    }
  };

  const handleSaveTask = () => {
    if (newTask.title) {
      onAddTask(formData.id, newTask);
      setNewTask({ taskType: 'Call', title: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '' });
      // Refresh the formData to show new task
      const updatedCustomer = { ...formData };
      updatedCustomer.tasks = [...(updatedCustomer.tasks || []), { ...newTask, id: Date.now(), status: 'Pending' }];
      setFormData(updatedCustomer);
    }
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
            {/* CUSTOMER FORM WITH PHASE 1 TABS */}
            {type === 'customer' && (
              <>
                {/* Phase 1 Tabs - Only show when editing existing customer */}
                {item && (
                  <div className="phase1-tabs">
                    <button
                      type="button"
                      className={`phase1-tab ${activePhase1Tab === 'details' ? 'active' : ''}`}
                      onClick={() => setActivePhase1Tab('details')}
                    >
                      <Users size={16} />
                      Customer Details
                    </button>
                    <button
                      type="button"
                      className={`phase1-tab ${activePhase1Tab === 'communications' ? 'active' : ''}`}
                      onClick={() => setActivePhase1Tab('communications')}
                    >
                      <MessageSquare size={16} />
                      Communications ({formData.communications?.length || 0})
                    </button>
                    <button
                      type="button"
                      className={`phase1-tab ${activePhase1Tab === 'tasks' ? 'active' : ''}`}
                      onClick={() => setActivePhase1Tab('tasks')}
                    >
                      <ClipboardList size={16} />
                      Tasks ({formData.tasks?.filter(t => t.status === 'Pending').length || 0})
                    </button>
                    <button
                      type="button"
                      className={`phase1-tab ${activePhase1Tab === 'purchases' ? 'active' : ''}`}
                      onClick={() => setActivePhase1Tab('purchases')}
                    >
                      <ShoppingCart size={16} />
                      Purchases ({orders.filter(o => o.customerId === formData.id).length})
                    </button>
                  </div>
                )}

                {/* Customer Details Tab */}
                {activePhase1Tab === 'details' && (
                  <>
                    {/* Basic Information */}
                    <div className="form-section-title">
                      <Users size={20} />
                      Basic Information
                    </div>
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
                        <label className="form-label">Home Phone</label>
                        <input
                          className="form-input"
                          value={formData.homePhone}
                          onChange={(e) => handleChange('homePhone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mobile Phone</label>
                        <input
                          className="form-input"
                          value={formData.mobilePhone}
                          onChange={(e) => handleChange('mobilePhone', e.target.value)}
                          placeholder="(555) 987-6543"
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

                    {/* Billing Address */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <MapPin size={20} />
                        Billing Address
                      </div>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label className="form-label">Street Address</label>
                          <input
                            className="form-input"
                            value={formData.billingAddress.street}
                            onChange={(e) => handleChange('billingAddress.street', e.target.value)}
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
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <MapPin size={20} />
                        Shipping Address
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ marginLeft: 'auto', fontSize: '12px', padding: '8px 16px' }}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.billingAddress }
                            }));
                          }}
                        >
                          Same as Billing
                        </button>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label className="form-label">Street Address</label>
                          <input
                            className="form-input"
                            value={formData.shippingAddress.street}
                            onChange={(e) => handleChange('shippingAddress.street', e.target.value)}
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
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <DollarSign size={20} />
                        Business Information
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                          >
                            <option>Prospect</option>
                            <option>Active</option>
                            <option>Inactive</option>
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

                    {/* Lead Information */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <Target size={20} />
                        Lead Information
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Lead Source</label>
                          <select
                            className="form-select"
                            value={formData.leadSource}
                            onChange={(e) => handleChange('leadSource', e.target.value)}
                          >
                            <option value="">Select Source</option>
                            {LEAD_SOURCES.map(source => (
                              <option key={source} value={source}>{source}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Potential Referrals</label>
                          <input
                            className="form-input"
                            type="number"
                            value={formData.potentialReferrals}
                            onChange={(e) => handleChange('potentialReferrals', parseInt(e.target.value) || 0)}
                            placeholder="Estimate"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <Share2 size={20} />
                        Social Media
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Active Platforms</label>
                        <div className="checkbox-group">
                          {['Instagram', 'Facebook', 'Twitter/X', 'TikTok', 'YouTube', 'LinkedIn'].map(platform => (
                            <div key={platform} className="checkbox-item">
                              <input
                                type="checkbox"
                                id={`social-${platform}`}
                                checked={formData.socialPlatforms?.includes(platform)}
                                onChange={() => handleArrayToggle('socialPlatforms', platform)}
                              />
                              <label htmlFor={`social-${platform}`}>{platform}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Social Handle</label>
                          <input
                            className="form-input"
                            value={formData.socialHandle}
                            onChange={(e) => handleChange('socialHandle', e.target.value)}
                            placeholder="@username"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Engagement Level</label>
                          <select
                            className="form-select"
                            value={formData.socialEngagement}
                            onChange={(e) => handleChange('socialEngagement', e.target.value)}
                          >
                            <option value="">Select Level</option>
                            <option value="Very Active">Very Active (Daily)</option>
                            <option value="Active">Active (Few times/week)</option>
                            <option value="Moderate">Moderate (Weekly)</option>
                            <option value="Low">Low (Rarely)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Pickleball Profile */}
                    <div className="form-section">
                      <div className="form-section-title">
                        🏓 Pickleball Profile
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Skill Level</label>
                          <select
                            className="form-select"
                            value={formData.skillLevel}
                            onChange={(e) => handleChange('skillLevel', e.target.value)}
                          >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner (1.0-2.5)</option>
                            <option value="Intermediate">Intermediate (3.0-3.5)</option>
                            <option value="Advanced">Advanced (4.0-4.5)</option>
                            <option value="Professional">Professional (5.0+)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Play Frequency</label>
                          <select
                            className="form-select"
                            value={formData.playFrequency}
                            onChange={(e) => handleChange('playFrequency', e.target.value)}
                          >
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="3-5 times/week">3-5 times/week</option>
                            <option value="1-2 times/week">1-2 times/week</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Occasionally">Occasionally</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Paddle Brand</label>
                          <select
                            className="form-select"
                            value={formData.paddleBrand}
                            onChange={(e) => handleChange('paddleBrand', e.target.value)}
                          >
                            <option value="">Select Brand</option>
                            {PADDLE_BRANDS.map(brand => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Group/Club Name</label>
                          <input
                            className="form-input"
                            value={formData.groupName}
                            onChange={(e) => handleChange('groupName', e.target.value)}
                            placeholder="Team or club name"
                          />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label className="form-label">Product Interests</label>
                        <div className="checkbox-group">
                          {['Noise Reduction', 'Performance', 'Durability', 'Customization', 'Gifts'].map(interest => (
                            <div key={interest} className="checkbox-item">
                              <input
                                type="checkbox"
                                id={`interest-${interest}`}
                                checked={formData.productInterests?.includes(interest)}
                                onChange={() => handleArrayToggle('productInterests', interest)}
                              />
                              <label htmlFor={`interest-${interest}`}>{interest}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Communication Preferences */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <Phone size={20} />
                        Communication Preferences
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Preferred Contact Method</label>
                          <select
                            className="form-select"
                            value={formData.contactMethod}
                            onChange={(e) => handleChange('contactMethod', e.target.value)}
                          >
                            <option>Email</option>
                            <option>Phone</option>
                            <option>Text/SMS</option>
                            <option>Social Media</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Best Time to Contact</label>
                          <select
                            className="form-select"
                            value={formData.contactTime}
                            onChange={(e) => handleChange('contactTime', e.target.value)}
                          >
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Anytime</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Opt-In</label>
                          <select
                            className="form-select"
                            value={formData.emailOptIn}
                            onChange={(e) => handleChange('emailOptIn', e.target.value === 'true')}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">SMS Opt-In</label>
                          <select
                            className="form-select"
                            value={formData.smsOptIn}
                            onChange={(e) => handleChange('smsOptIn', e.target.value === 'true')}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Referral Interest</label>
                          <select
                            className="form-select"
                            value={formData.referralInterest}
                            onChange={(e) => handleChange('referralInterest', e.target.value)}
                          >
                            <option>Yes</option>
                            <option>Maybe</option>
                            <option>No</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Discount Interest</label>
                          <select
                            className="form-select"
                            value={formData.discountInterest}
                            onChange={(e) => handleChange('discountInterest', e.target.value === 'true')}
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Referral Program */}
                    <div className="form-section">
                      <div className="form-section-title">
                        <Gift size={20} />
                        Referral Program
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Referral Code</label>
                          <input
                            className="form-input"
                            value={formData.referralCode}
                            onChange={(e) => handleChange('referralCode', e.target.value)}
                            placeholder="AUTO-GENERATED"
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
                            {customers.filter(c => c.id !== formData.id).map(c => (
                              <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Total Referrals Made</label>
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

                    {/* Notes */}
                    <div className="form-section">
                      <div className="form-group full-width">
                        <label className="form-label">Notes</label>
                        <textarea
                          className="form-textarea"
                          value={formData.notes}
                          onChange={(e) => handleChange('notes', e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* PHASE 1: Communications Tab */}
                {activePhase1Tab === 'communications' && item && (
                  <>
                    <div className="form-section-title">
                      <MessageSquare size={20} />
                      Communication History
                    </div>

                    {/* Add New Communication */}
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                      <h4 style={{ color: '#818cf8', marginBottom: '16px', fontSize: '14px', fontWeight: '700' }}>Add New Communication</h4>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <select
                            className="form-select"
                            value={newComm.type}
                            onChange={(e) => setNewComm({...newComm, type: e.target.value})}
                          >
                            {COMMUNICATION_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Date</label>
                          <input
                            className="form-input"
                            type="date"
                            value={newComm.date}
                            onChange={(e) => setNewComm({...newComm, date: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Time</label>
                          <input
                            className="form-input"
                            type="time"
                            value={newComm.time}
                            onChange={(e) => setNewComm({...newComm, time: e.target.value})}
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Subject</label>
                          <input
                            className="form-input"
                            value={newComm.subject}
                            onChange={(e) => setNewComm({...newComm, subject: e.target.value})}
                            placeholder="Brief subject line"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Content/Notes</label>
                          <textarea
                            className="form-textarea"
                            value={newComm.content}
                            onChange={(e) => setNewComm({...newComm, content: e.target.value})}
                            rows={3}
                            placeholder="Details of the communication..."
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Outcome</label>
                          <input
                            className="form-input"
                            value={newComm.outcome}
                            onChange={(e) => setNewComm({...newComm, outcome: e.target.value})}
                            placeholder="Result or next steps"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveComm}
                        style={{ marginTop: '12px' }}
                      >
                        <Plus size={16} />
                        Add Communication
                      </button>
                    </div>

                    {/* Communications List */}
                    <div>
                      {formData.communications && formData.communications.length > 0 ? (
                        formData.communications.map(comm => (
                          <div key={comm.id} className="comm-item">
                            <div className="comm-header">
                              <div>
                                <span className="comm-type">{comm.type}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span className="comm-date">{comm.date} {comm.time}</span>
                                <button
                                  type="button"
                                  className="icon-btn delete"
                                  onClick={() => onDeleteCommunication(formData.id, comm.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="comm-subject">{comm.subject}</div>
                            <div className="comm-content">{comm.content}</div>
                            {comm.outcome && (
                              <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981' }}>
                                <strong>Outcome:</strong> {comm.outcome}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <p>No communications yet. Add your first interaction above.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* PHASE 1: Tasks Tab */}
                {activePhase1Tab === 'tasks' && item && (
                  <>
                    <div className="form-section-title">
                      <ClipboardList size={20} />
                      Tasks & Follow-ups
                    </div>

                    {/* Add New Task */}
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                      <h4 style={{ color: '#818cf8', marginBottom: '16px', fontSize: '14px', fontWeight: '700' }}>Add New Task</h4>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Task Type</label>
                          <select
                            className="form-select"
                            value={newTask.taskType}
                            onChange={(e) => setNewTask({...newTask, taskType: e.target.value})}
                          >
                            {TASK_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Due Date</label>
                          <input
                            className="form-input"
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Priority</label>
                          <select
                            className="form-select"
                            value={newTask.priority}
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                          >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Title</label>
                          <input
                            className="form-input"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            placeholder="Brief task title"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-textarea"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            rows={3}
                            placeholder="Task details..."
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Assigned To</label>
                          <input
                            className="form-input"
                            value={newTask.assignedTo}
                            onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                            placeholder="Team member name"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveTask}
                        style={{ marginTop: '12px' }}
                      >
                        <Plus size={16} />
                        Add Task
                      </button>
                    </div>

                    {/* Tasks List */}
                    <div>
                      {formData.tasks && formData.tasks.length > 0 ? (
                        formData.tasks.map(task => (
                          <div key={task.id} className={`task-item ${task.status === 'Complete' ? 'complete' : ''}`}>
                            <div className="task-header">
                              <div>
                                <span className="task-type">{task.taskType}</span>
                                <span className={`task-priority priority-${task.priority?.toLowerCase()}`}>{task.priority}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span className="task-date">Due: {task.dueDate}</span>
                                <button
                                  type="button"
                                  className="icon-btn"
                                  onClick={() => onToggleTask(formData.id, task.id)}
                                  title={task.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
                                >
                                  <CheckCircle size={14} />
                                </button>
                                <button
                                  type="button"
                                  className="icon-btn delete"
                                  onClick={() => onDeleteTask(formData.id, task.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                            {task.assignedTo && (
                              <div style={{ marginTop: '8px', fontSize: '12px', color: '#9ca3af' }}>
                                <strong>Assigned to:</strong> {task.assignedTo}
                              </div>
                            )}
                            {task.status === 'Complete' && task.completedDate && (
                              <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981' }}>
                                ✓ Completed: {new Date(task.completedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <p>No tasks yet. Add your first task above.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* PHASE 1: Purchases Tab */}
                {activePhase1Tab === 'purchases' && item && (
                  <>
                    <div className="form-section-title">
                      <ShoppingCart size={20} />
                      Purchase History
                    </div>

                    {orders.filter(o => o.customerId === formData.id).length > 0 ? (
                      <div>
                        <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Total Orders</div>
                              <div style={{ fontSize: '24px', fontWeight: '700', color: '#e8eaed' }}>
                                {orders.filter(o => o.customerId === formData.id).length}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Total Spent</div>
                              <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                                ${orders.filter(o => o.customerId === formData.id).reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Avg Order Value</div>
                              <div style={{ fontSize: '24px', fontWeight: '700', color: '#818cf8' }}>
                                ${(orders.filter(o => o.customerId === formData.id).reduce((sum, o) => sum + o.total, 0) / orders.filter(o => o.customerId === formData.id).length).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {orders.filter(o => o.customerId === formData.id).map(order => (
                          <div key={order.id} style={{ background: 'rgba(10, 14, 26, 0.6)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                              <div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#e8eaed' }}>{order.orderNumber}</div>
                                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                                  {new Date(order.orderDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>${order.total.toFixed(2)}</div>
                                <span className={`badge badge-${order.status === 'Delivered' ? 'active' : order.status === 'Pending' ? 'pending' : 'inactive'}`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
                              <div><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</div>
                              <div><strong>Tax:</strong> ${order.tax.toFixed(2)}</div>
                              <div><strong>Shipping:</strong> ${order.shipping.toFixed(2)} via {order.shippingCarrier}</div>
                              {order.trackingNumber && (
                                <div><strong>Tracking:</strong> {order.trackingNumber}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <ShoppingCart size={40} />
                        </div>
                        <h3>No purchases yet</h3>
                        <p>This customer hasn't placed any orders</p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* PRODUCT FORM */}
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
                      rows={3}
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

            {/* ORDER FORM WITH PROPER SHIPPING */}
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
                      onChange={(e) => handleCustomerChange(e.target.value)}
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

                {/* Order Items */}
                <div className="form-section">
                  <div className="form-section-title">
                    <Package size={20} />
                    Order Items
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ marginLeft: 'auto', fontSize: '12px', padding: '8px 16px' }}
                      onClick={handleAddOrderItem}
                    >
                      <Plus size={14} />
                      Add Item
                    </button>
                  </div>

                  {orderItems.map((item, index) => (
                    <div key={index} style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Product</label>
                          <select
                            className="form-select"
                            value={item.productId || ''}
                            onChange={(e) => handleOrderItemChange(index, 'productId', e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {products.map(p => (
                              <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Quantity</label>
                          <input
                            className="form-input"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleOrderItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Price</label>
                          <input
                            className="form-input"
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => handleOrderItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Subtotal</label>
                          <input
                            className="form-input"
                            value={`$${item.subtotal.toFixed(2)}`}
                            disabled
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '8px' }}
                        onClick={() => handleRemoveOrderItem(index)}
                      >
                        <Trash2 size={14} />
                        Remove Item
                      </button>
                    </div>
                  ))}

                  {orderItems.length === 0 && (
                    <div className="empty-state">
                      <p>No items added. Click "Add Item" to start building the order.</p>
                    </div>
                  )}
                </div>

                {/* Shipping Information with Separate Fields */}
                <div className="form-section">
                  <div className="form-section-title">
                    <MapPin size={20} />
                    Shipping Information
                  </div>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Street Address</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress?.street || ''}
                        onChange={(e) => handleChange('shippingAddress.street', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input
                        className="form-input"
                        value={formData.shippingAddress?.city || ''}
                        onChange={(e) => handleChange('shippingAddress.city', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select
                        className="form-select"
                        value={formData.shippingAddress?.state || ''}
                        onChange={(e) => {
                          handleChange('shippingAddress.state', e.target.value);
                          // Recalculate tax
                          if (US_SALES_TAX_RATES[e.target.value]) {
                            const taxRate = (US_SALES_TAX_RATES[e.target.value].rate + US_SALES_TAX_RATES[e.target.value].avgLocal) / 100;
                            const tax = formData.subtotal * taxRate;
                            setFormData(prev => ({
                              ...prev,
                              tax,
                              total: prev.subtotal + tax + prev.shipping
                            }));
                          }
                        }}
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
                        value={formData.shippingAddress?.zip || ''}
                        onChange={(e) => handleChange('shippingAddress.zip', e.target.value)}
                      />
                    </div>
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
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Shipping Cost ($)</label>
                      <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={formData.shipping}
                        onChange={(e) => {
                          const shipping = parseFloat(e.target.value) || 0;
                          handleChange('shipping', shipping);
                          setFormData(prev => ({
                            ...prev,
                            shipping,
                            total: prev.subtotal + prev.tax + shipping
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="form-section">
                  <div className="form-section-title">
                    <DollarSign size={20} />
                    Order Totals
                  </div>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '16px' }}>
                      <span style={{ color: '#9ca3af' }}>Subtotal:</span>
                      <span style={{ fontWeight: '700', color: '#e8eaed' }}>${formData.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '16px' }}>
                      <span style={{ color: '#9ca3af' }}>Tax:</span>
                      <span style={{ fontWeight: '700', color: '#e8eaed' }}>${formData.tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '16px' }}>
                      <span style={{ color: '#9ca3af' }}>Shipping:</span>
                      <span style={{ fontWeight: '700', color: '#e8eaed' }}>${formData.shipping.toFixed(2)}</span>
                    </div>
                    <div style={{ borderTop: '2px solid rgba(99, 102, 241, 0.3)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
                      <span style={{ fontWeight: '700', color: '#e8eaed' }}>TOTAL:</span>
                      <span style={{ fontWeight: '800', color: '#10b981' }}>${formData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="form-section">
                  <div className="form-group full-width">
                    <label className="form-label">Order Notes</label>
                    <textarea
                      className="form-textarea"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </>
            )}

            {/* EVENT FORM */}
            {type === 'event' && (
              <>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Event Type *</label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      required
                    >
                      {EVENT_TYPES.filter(t => t !== 'Holiday').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      className="form-input"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      className="form-input"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input
                      className="form-input"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Link to Customer</label>
                    <select
                      className="form-select"
                      value={formData.customerId || ''}
                      onChange={(e) => handleChange('customerId', e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">None</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-textarea"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      rows={3}
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

// Referral Settings Modal
const ReferralSettingsModal = ({ settings, onSave, onClose }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (tier, field, value) => {
    setFormData(prev => ({
      ...prev,
      tiers: {
        ...prev.tiers,
        [tier]: {
          ...prev.tiers[tier],
          [field]: parseInt(value) || 0
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Referral Program Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Default Credit Per Referral ($)</label>
              <input
                className="form-input"
                type="number"
                value={formData.creditPerReferral}
                onChange={(e) => setFormData({...formData, creditPerReferral: parseInt(e.target.value) || 0})}
              />
            </div>

            <div className="form-section">
              <div className="form-section-title">🥉 Bronze Tier</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Min Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.bronze.min}
                    onChange={(e) => handleChange('bronze', 'min', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.bronze.max}
                    onChange={(e) => handleChange('bronze', 'max', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Reward ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.bronze.reward}
                    onChange={(e) => handleChange('bronze', 'reward', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">🥈 Silver Tier</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Min Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.silver.min}
                    onChange={(e) => handleChange('silver', 'min', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.silver.max}
                    onChange={(e) => handleChange('silver', 'max', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Reward ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.silver.reward}
                    onChange={(e) => handleChange('silver', 'reward', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">🥇 Gold Tier</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Min Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.gold.min}
                    onChange={(e) => handleChange('gold', 'min', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.gold.max}
                    onChange={(e) => handleChange('gold', 'max', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Reward ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.gold.reward}
                    onChange={(e) => handleChange('gold', 'reward', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">💎 Platinum Tier</div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Min Referrals</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.platinum.min}
                    onChange={(e) => handleChange('platinum', 'min', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Reward ($)</label>
                  <input
                    className="form-input"
                    type="number"
                    value={formData.tiers.platinum.reward}
                    onChange={(e) => handleChange('platinum', 'reward', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the component
export default AcoustiSkinCRM;
