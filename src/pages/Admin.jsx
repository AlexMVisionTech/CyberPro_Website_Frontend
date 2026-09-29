import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  LogOut, 
  Plus, 
  RefreshCw, 
  Edit, 
  Trash2, 
  X, 
  BookOpen, 
  AlertTriangle, 
  Search, 
  Users,
  ArrowRight,
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Link as LinkIcon,
  Building2,
  BarChart3,
  Inbox
} from 'lucide-react';
import './Admin.css';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;

const api = async (path, options = {}) => {
  const token = localStorage.getItem('cyberpro_admin_token');
  const isMultipart = options.body instanceof FormData;
  const headers = { 
    ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 
    ...options.headers 
  };
  
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  
  if (res.status === 401) { 
    localStorage.removeItem('cyberpro_admin_token'); 
    window.location.reload(); 
  }
  
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const payload = await res.json();
      message = payload.detail || message;
    } catch {
      // Keep the default message when the response is not JSON.
    }
    throw new Error(message);
  }
  
  // Handle 204 No Content for deletes
  if (res.status === 204) return null;
  
  return res.json();
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Dashboard state
  const [activeSection, setActiveSection] = useState('dashboard');
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ programs: 0, events: 0, articles: 0, applications: 0, contacts: 0 });
  const [loading, setLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [sectionError, setSectionError] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [mediaMessage, setMediaMessage] = useState('');
  const [copiedMediaId, setCopiedMediaId] = useState(null);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [applicantPreview, setApplicantPreview] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Delete confirm state
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Extra dashboard data
  const [recentApps, setRecentApps] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('cyberpro_admin_token');
      if (!token) {
        setAuthLoading(false);
        return;
      }
      
      try {
        const user = await api('/admin/me');
        setAdminUser(user);
        setIsAuthenticated(true);
        fetchStats();
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('cyberpro_admin_token');
      } finally {
        setAuthLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Fetch stats for dashboard
  const fetchStats = async () => {
    setDashboardError('');
    try {
      const [progs, evts, arts, apps, conts] = await Promise.all([
        api('/programs'), api('/events'), api('/articles'), api('/applications'), api('/contact')
      ]);
      
      setStats({
        programs: progs.length || 0,
        events: evts.length || 0,
        articles: arts.length || 0,
        applications: apps.length || 0,
        contacts: conts.length || 0
      });

      // Set recent for dashboard view
      setRecentApps(apps.slice(0, 5));
      setRecentContacts(conts.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardError(error.message || 'Dashboard data could not be loaded.');
    }
  };

  // Fetch active section data
  useEffect(() => {
    if (!isAuthenticated) return;
    
    if (activeSection === 'dashboard') {
      fetchStats();
      return;
    }
    
    fetchSectionData();
  }, [activeSection, isAuthenticated]);

  const fetchSectionData = async () => {
    setLoading(true);
    setSectionError('');
    try {
      let endpoint = '';
      if (activeSection === 'programs') endpoint = '/programs';
      else if (activeSection === 'events') endpoint = '/events';
      else if (activeSection === 'articles') endpoint = '/articles';
      else if (activeSection === 'applications') endpoint = '/applications';
      else if (activeSection === 'contacts') endpoint = '/contact';
      else if (activeSection === 'media') endpoint = '/media';
      else if (activeSection === 'corporate-services') endpoint = '/corporate/services';
      else if (activeSection === 'corporate-metrics') endpoint = '/corporate/metrics';
      else if (activeSection === 'corporate-inquiries') endpoint = '/corporate/inquiries';
      
      if (endpoint) {
        const result = await api(endpoint);
        setData(result);
      }
    } catch (err) {
      console.error(`Failed to fetch ${activeSection}:`, err);
      setSectionError(err.message || `Could not load ${activeSection}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const username = loginUsername.trim().toLowerCase();
    if (!username.endsWith('@cyberpro.ke')) {
      setLoginError('Use your @cyberpro.ke administrator email.');
      return;
    }
    setLoginLoading(true);
    
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: loginPassword })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      
      localStorage.setItem('cyberpro_admin_token', data.access_token);
      
      // Get user info
      const user = await api('/admin/me');
      setAdminUser(user);
      setIsAuthenticated(true);
      fetchStats();
      
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cyberpro_admin_token');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingItem(null);
    setFormData({}); // empty form
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setEditingItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const corporateEndpoints = {
        'corporate-services': '/corporate/services',
        'corporate-metrics': '/corporate/metrics',
      };
      let endpoint = corporateEndpoints[activeSection] || `/${activeSection}`;
      let method = 'POST';
      
      if (modalMode === 'edit') {
        endpoint = `${corporateEndpoints[activeSection] || `/${activeSection}`}/${editingItem.id}`;
        method = 'PUT';
      }
      
      // For contacts API uses /contact, but state is contacts
      if (activeSection === 'contacts') endpoint = modalMode === 'edit' ? `/contact/${editingItem.id}` : '/contact';
      
      await api(endpoint, {
        method,
        body: JSON.stringify(formData)
      });
      
      setModalOpen(false);
      fetchSectionData();
      fetchStats();
    } catch (err) {
      console.error('Save failed:', err);
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  const confirmDelete = (item) => {
    setDeleteConfirm(item);
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    
    setDeleteLoading(true);
    try {
      const corporateEndpoints = {
        'corporate-services': '/corporate/services',
        'corporate-metrics': '/corporate/metrics',
        'corporate-inquiries': '/corporate/inquiries',
      };
      let endpoint = `${corporateEndpoints[activeSection] || `/${activeSection}`}/${deleteConfirm.id}`;
      // Special case for contacts
      if (activeSection === 'contacts') endpoint = `/contact/${deleteConfirm.id}`;
      
      await api(endpoint, { method: 'DELETE' });
      
      setDeleteConfirm(null);
      fetchSectionData();
      fetchStats();
    } catch (err) {
      console.error('Delete failed:', err);
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('file', uploadFile);
    setSaveLoading(true);
    setSectionError('');
    setMediaMessage('');
    try {
      await api('/media', { method: 'POST', body: formData });
      setUploadFile(null);
      setMediaMessage('Image uploaded. Copy the URL below to use it in your content.');
      await fetchSectionData();
    } catch (err) {
      setSectionError(err.message || 'Image upload failed.');
    } finally {
      setSaveLoading(false);
    }
  };

  const copyMediaUrl = async (asset) => {
    try {
      await navigator.clipboard.writeText(asset.url);
      setCopiedMediaId(asset.id);
      window.setTimeout(() => setCopiedMediaId(null), 1800);
    } catch {
      setSectionError('Could not copy the link. Select and copy it from the URL field.');
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString; // fallback to raw string
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }).format(d);
    } catch (e) {
      return dateString;
    }
  };

  // --- Render Functions ---

  if (authLoading) {
    return (
      <div className="admin-login-page">
        <div className="admin-loading">
          <RefreshCw className="spin" size={32} />
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        {/* Decorative background */}
        <div className="admin-login-bg"></div>
        <div className="admin-login-grid"></div>
        <div className="admin-login-orb admin-login-orb--one"></div>
        <div className="admin-login-orb admin-login-orb--two"></div>

        <div className="admin-login-panel">
            <div className="admin-login-card">
              <div className="admin-login-card-inner">
                <div className="admin-login-logo">
                  <img src="/logo.jpg" alt="CyberPro Global" className="admin-login-logo-img" />
                </div>
                <div className="admin-login-kicker"><span /> ADMINISTRATOR PORTAL</div>
                <div className="admin-login-heading">
                  <h1 className="admin-login-title">Welcome back</h1>
                  <p className="admin-login-subtitle">Sign in to manage CyberPro Global content and enquiries.</p>
                </div>

                <form className="admin-login-form" onSubmit={handleLogin}>
                  {loginError && (
                    <div className="admin-login-error" role="alert">
                      <AlertTriangle size={15} />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="admin-input-group">
                    <label htmlFor="admin-username">Work email</label>
                    <div className="admin-input-wrapper">
                      <Users size={17} />
                      <input
                        id="admin-username"
                        type="email"
                        value={loginUsername}
                        onChange={e => setLoginUsername(e.target.value)}
                        required
                        placeholder="name@cyberpro.ke"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="admin-password">Password</label>
                    <div className="admin-input-wrapper">
                      <Shield size={17} />
                      <input
                        id="admin-password"
                        type="password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                    </div>
                  </div>

                  <button type="submit" className="admin-login-btn" disabled={loginLoading}>
                    {loginLoading ? (
                      <>
                        <RefreshCw className="spin" size={16} />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="admin-login-divider">
                  <span>Authorized personnel only</span>
                </div>

                <p className="admin-login-support">
                  Having trouble signing in? Contact the platform administrator for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Generate forms dynamically based on section
  const renderFormFields = () => {
    if (activeSection === 'programs') {
      return (
        <>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleFormChange} required />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category</label>
              <select name="cat" value={formData.cat || 'foundation'} onChange={handleFormChange}>
                <option value="foundation">Foundation</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Duration</label>
              <input type="text" name="dur" value={formData.dur || ''} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Start Date</label>
              <input type="text" name="date" value={formData.date || ''} onChange={handleFormChange} required />
            </div>
            <div className="admin-form-group">
              <label>Level</label>
              <input type="text" name="lvl" value={formData.lvl || ''} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Fee</label>
              <input type="text" name="fee" value={formData.fee || ''} onChange={handleFormChange} required />
            </div>
            <div className="admin-form-group">
              <label>Certifications</label>
              <input type="text" name="certs" value={formData.certs || ''} onChange={handleFormChange} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Image URL</label>
            <input type="text" name="img" value={formData.img || ''} onChange={handleFormChange} />
          </div>
          <div className="admin-form-group">
            <label>Source URL (Link)</label>
            <input type="text" name="sourceUrl" value={formData.sourceUrl || ''} onChange={handleFormChange} />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="desc" value={formData.desc || ''} onChange={handleFormChange} required></textarea>
          </div>
        </>
      );
    }
    
    if (activeSection === 'events') {
      return (
        <>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleFormChange} required />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Date & Time</label>
              <input type="text" name="date" value={formData.date || ''} onChange={handleFormChange} required />
            </div>
            <div className="admin-form-group">
              <label>Type (e.g. Online, In-Person)</label>
              <input type="text" name="type" value={formData.type || ''} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category</label>
              <select name="cat" value={formData.cat || 'ctf'} onChange={handleFormChange}>
                <option value="ctf">CTF</option>
                <option value="webinar">Webinar</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="conference">Conference</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Badge Color Class</label>
              <select name="color" value={formData.color || 'badge-blue'} onChange={handleFormChange}>
                <option value="badge-blue">Blue</option>
                <option value="badge-orange">Orange</option>
                <option value="badge-green">Green</option>
              </select>
            </div>
          </div>
          <div className="admin-form-group">
            <label>Image URL</label>
            <input type="text" name="img" value={formData.img || ''} onChange={handleFormChange} />
          </div>
          <div className="admin-form-group">
            <label>Link / URL</label>
            <input type="text" name="link" value={formData.link || ''} onChange={handleFormChange} />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="desc" value={formData.desc || ''} onChange={handleFormChange} required></textarea>
          </div>
        </>
      );
    }
    
    if (activeSection === 'articles') {
      return (
        <>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleFormChange} required />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category Slug</label>
              <select name="cat" value={formData.cat || 'security'} onChange={handleFormChange}>
                <option value="security">Security</option>
                <option value="ai">AI</option>
                <option value="career">Career</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Category Label</label>
              <input type="text" name="catLabel" value={formData.catLabel || ''} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Date (e.g. Oct 24, 2023)</label>
              <input type="text" name="date" value={formData.date || ''} onChange={handleFormChange} required />
            </div>
            <div className="admin-form-group">
              <label>Read Time</label>
              <input type="text" name="read" value={formData.read || ''} onChange={handleFormChange} required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Author</label>
              <input type="text" name="author" value={formData.author || ''} onChange={handleFormChange} required />
            </div>
            <div className="admin-form-group admin-form-checkbox" style={{ marginTop: '28px' }}>
              <input type="checkbox" id="featured" name="featured" checked={!!formData.featured} onChange={handleFormChange} />
              <label htmlFor="featured">Featured Article</label>
            </div>
          </div>
          <div className="admin-form-group">
            <label>Image URL</label>
            <input type="text" name="img" value={formData.img || ''} onChange={handleFormChange} />
          </div>
          <div className="admin-form-group">
            <label>Excerpt (Short Description)</label>
            <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleFormChange} required style={{ minHeight: '60px' }}></textarea>
          </div>
          <div className="admin-form-group">
            <label>Content (Markdown or HTML)</label>
            <textarea name="content" value={formData.content || ''} onChange={handleFormChange} required style={{ minHeight: '200px' }}></textarea>
          </div>
        </>
      );
    }

    if (activeSection === 'corporate-services') {
      return (
        <>
          <div className="admin-form-group">
            <label>Service title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleFormChange} required />
          </div>
          <div className="admin-form-group">
            <label>Icon</label>
            <select name="icon" value={formData.icon || 'Building2'} onChange={handleFormChange}>
              <option value="Shield">Shield</option>
              <option value="Building2">Building</option>
              <option value="Users">People</option>
              <option value="BarChart3">Analytics</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="desc" value={formData.desc || ''} onChange={handleFormChange} required />
          </div>
        </>
      );
    }

    if (activeSection === 'corporate-metrics') {
      return (
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label>Metric value</label>
            <input type="text" name="value" value={formData.value || ''} onChange={handleFormChange} required placeholder="45+" />
          </div>
          <div className="admin-form-group">
            <label>Metric label</label>
            <input type="text" name="label" value={formData.label || ''} onChange={handleFormChange} required placeholder="Corporate Partners" />
          </div>
        </div>
      );
    }
    
    return <p>Form not configured for this section.</p>;
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <div className="admin-loading">
          <RefreshCw className="spin" size={32} />
          <p>Loading data...</p>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="admin-empty">
          <Search size={48} />
          <h3>No records found</h3>
          <p>There are no {activeSection} in the database.</p>
        </div>
      );
    }

    if (activeSection === 'programs') {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td className="cell-truncate"><strong>{item.title}</strong></td>
                  <td><span className="admin-badge admin-badge-blue">{item.cat}</span></td>
                  <td>{item.dur}</td>
                  <td>{item.fee}</td>
                  <td>
                    <div className="table-actions">
                      <button className="admin-btn-icon" onClick={() => openEditModal(item)} title="Edit"><Edit size={16} /></button>
                      <button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeSection === 'events') {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td className="cell-truncate"><strong>{item.title}</strong></td>
                  <td><span className="admin-badge admin-badge-orange">{item.cat}</span></td>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>
                    <div className="table-actions">
                      <button className="admin-btn-icon" onClick={() => openEditModal(item)} title="Edit"><Edit size={16} /></button>
                      <button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeSection === 'articles') {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td className="cell-truncate"><strong>{item.title}</strong></td>
                  <td><span className="admin-badge admin-badge-green">{item.catLabel}</span></td>
                  <td>{item.author}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className="table-actions">
                      <button className="admin-btn-icon" onClick={() => openEditModal(item)} title="Edit"><Edit size={16} /></button>
                      <button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeSection === 'corporate-services') {
      return (
        <div className="admin-table-wrapper"><table className="admin-table">
          <thead><tr><th>Service</th><th>Description</th><th>Icon</th><th>Actions</th></tr></thead>
          <tbody>{data.map(item => <tr key={item.id}>
            <td><strong>{item.title}</strong></td><td className="cell-truncate">{item.desc}</td><td>{item.icon}</td>
            <td><div className="table-actions"><button className="admin-btn-icon" onClick={() => openEditModal(item)} title="Edit"><Edit size={16} /></button><button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button></div></td>
          </tr>)}</tbody>
        </table></div>
      );
    }

    if (activeSection === 'corporate-metrics') {
      return (
        <div className="admin-table-wrapper"><table className="admin-table">
          <thead><tr><th>Value</th><th>Label</th><th>Actions</th></tr></thead>
          <tbody>{data.map(item => <tr key={item.id}>
            <td><strong>{item.value}</strong></td><td>{item.label}</td>
            <td><div className="table-actions"><button className="admin-btn-icon" onClick={() => openEditModal(item)} title="Edit"><Edit size={16} /></button><button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button></div></td>
          </tr>)}</tbody>
        </table></div>
      );
    }

    if (activeSection === 'corporate-inquiries') {
      return (
        <div className="admin-table-wrapper"><table className="admin-table">
          <thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>Team size</th><th>Received</th><th>Actions</th></tr></thead>
          <tbody>{data.map(item => <tr key={item.id}>
            <td><strong>{item.company}</strong></td><td>{item.contact_name}</td><td>{item.email}</td><td>{item.team_size}</td><td>{formatDate(item.created_at)}</td>
            <td><div className="table-actions"><button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button></div></td>
          </tr>)}</tbody>
        </table></div>
      );
    }

    if (activeSection === 'applications') {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email / Phone</th>
                <th>Program</th>
                <th>Class Format</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.fullName}</strong></td>
                  <td>
                    <div className="cell-truncate-sm">{item.email}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.phone}</div>
                  </td>
                  <td>{item.program}</td>
                  <td>{item.classFormat}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="admin-btn-icon" onClick={() => setApplicantPreview(item)} title="Preview applicant details" aria-label={`Preview ${item.fullName}'s application`}><Search size={16} /></button>
                      <button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeSection === 'contacts') {
      return (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Info</th>
                <th>Message</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>
                    <div className="cell-truncate-sm">{item.email}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.phone || 'No phone'}</div>
                  </td>
                  <td className="cell-truncate" title={item.message}>{item.message}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="admin-btn-icon delete" onClick={() => confirmDelete(item)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  const renderDashboard = () => (
    <>
      {dashboardError && <div className="admin-alert" role="alert"><AlertTriangle size={17} />{dashboardError}</div>}
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">ADMIN WORKSPACE</span>
          <h2>Welcome back{adminUser?.username ? `, ${adminUser.username}` : ''}</h2>
          <p>Here’s the latest snapshot of your content and incoming enquiries.</p>
        </div>
        <div className="dashboard-live-label"><span />Live overview</div>
      </section>
      <div className="admin-stats">
        <div className="admin-stat-card" onClick={() => setActiveSection('programs')} style={{cursor: 'pointer'}}>
          <div className="admin-stat-icon blue">
            <BookOpen size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.programs}</h3>
            <p>Programs</p>
          </div>
        </div>
        
        <div className="admin-stat-card" onClick={() => setActiveSection('events')} style={{cursor: 'pointer'}}>
          <div className="admin-stat-icon green">
            <Calendar size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.events}</h3>
            <p>Events</p>
          </div>
        </div>
        
        <div className="admin-stat-card" onClick={() => setActiveSection('articles')} style={{cursor: 'pointer'}}>
          <div className="admin-stat-icon orange">
            <FileText size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.articles}</h3>
            <p>Articles</p>
          </div>
        </div>
        
        <div className="admin-stat-card" onClick={() => setActiveSection('applications')} style={{cursor: 'pointer'}}>
          <div className="admin-stat-icon purple">
            <ClipboardList size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.applications}</h3>
            <p>Applications</p>
          </div>
        </div>
        
        <div className="admin-stat-card" onClick={() => setActiveSection('contacts')} style={{cursor: 'pointer'}}>
          <div className="admin-stat-icon rose">
            <MessageSquare size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>{stats.contacts}</h3>
            <p>Messages</p>
          </div>
        </div>
      </div>

      {(() => {
        const distribution = [
          { label: 'Programs', value: stats.programs, color: '#3977c5' },
          { label: 'Events', value: stats.events, color: '#1e9b78' },
          { label: 'Articles', value: stats.articles, color: '#e29436' },
          { label: 'Applications', value: stats.applications, color: '#8068c8' },
          { label: 'Messages', value: stats.contacts, color: '#df536b' }
        ];
        const total = distribution.reduce((sum, item) => sum + item.value, 0);
        let cursor = 0;
        const gradient = total
          ? `conic-gradient(${distribution.map(item => {
              const start = cursor;
              cursor += (item.value / total) * 100;
              return `${item.color} ${start}% ${cursor}%`;
            }).join(', ')})`
          : 'conic-gradient(#e8edf3 0% 100%)';

        return (
          <section className="dashboard-visual-card" aria-labelledby="dashboard-distribution-title">
            <div className="dashboard-visual-heading">
              <div>
                <h2 id="dashboard-distribution-title">Workspace distribution</h2>
                <p>A live breakdown of records across your portal.</p>
              </div>
              <span className="dashboard-total-label">{total.toLocaleString()} total records</span>
            </div>
            <div className="dashboard-distribution">
              <div className="dashboard-donut" style={{ '--dashboard-donut': gradient }} aria-label={`${total} total records`}>
                <div><strong>{total.toLocaleString()}</strong><span>Total records</span></div>
              </div>
              <div className="dashboard-legend">
                {distribution.map(item => (
                  <div className="dashboard-legend-row" key={item.label}>
                    <span className="dashboard-legend-name"><i style={{ background: item.color }} />{item.label}</span>
                    <strong>{item.value.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <div className="dashboard-tables">
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Recent Applications</h2>
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setActiveSection('applications')}>View All</button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.length > 0 ? (
                  recentApps.map(app => (
                    <tr key={app.id}>
                      <td><strong>{app.fullName}</strong></td>
                      <td className="cell-truncate-sm">{app.program}</td>
                      <td>{formatDate(app.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="dashboard-empty-cell">No recent applications yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Recent Messages</h2>
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setActiveSection('contacts')}>View All</button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentContacts.length > 0 ? (
                  recentContacts.map(msg => (
                    <tr key={msg.id}>
                      <td><strong>{msg.name}</strong></td>
                      <td className="cell-truncate-sm">{msg.message}</td>
                      <td>{formatDate(msg.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="dashboard-empty-cell">No recent messages yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const renderMediaLibrary = () => (
    <section className="media-library">
      {sectionError && <div className="admin-alert" role="alert"><AlertTriangle size={17} />{sectionError}</div>}
      {mediaMessage && <div className="media-success" role="status"><Check size={17} />{mediaMessage}</div>}
      <form className="media-upload-panel" onSubmit={handleMediaUpload}>
        <div className="media-upload-copy">
          <span className="media-upload-icon"><UploadCloud size={21} /></span>
          <div>
            <h2>Upload an image</h2>
            <p>Upload a JPEG, PNG, WebP, or GIF up to 10 MB. We’ll generate a reusable public link.</p>
          </div>
        </div>
        <div className="media-upload-controls">
          <label className="media-file-picker">
            <input key={uploadFile ? uploadFile.name : 'empty'} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => setUploadFile(e.target.files?.[0] || null)} />
            <ImageIcon size={16} />
            <span>{uploadFile?.name || 'Choose image'}</span>
          </label>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={!uploadFile || saveLoading}>
            <UploadCloud size={16} />{saveLoading ? 'Uploading…' : 'Upload image'}
          </button>
        </div>
      </form>

      <div className="media-library-heading">
        <div><h2>Image library</h2><p>{data.length} uploaded {data.length === 1 ? 'image' : 'images'}</p></div>
      </div>

      {loading ? <div className="admin-loading">Loading images…</div> : data.length === 0 ? (
        <div className="media-empty"><ImageIcon size={25} /><strong>No images yet</strong><span>Upload your first image to create a link.</span></div>
      ) : (
        <div className="media-grid">
          {data.map(asset => (
            <article className="media-card" key={asset.id}>
              <div className="media-card-preview"><img src={asset.url} alt={asset.original_name} loading="lazy" /></div>
              <div className="media-card-info">
                <strong title={asset.original_name}>{asset.original_name}</strong>
                <span>{(asset.size_bytes / 1024 / 1024).toFixed(2)} MB</span>
                <div className="media-url-field"><LinkIcon size={14} /><input aria-label="Image URL" readOnly value={asset.url} onFocus={e => e.target.select()} /></div>
                <button className="admin-btn admin-btn-secondary media-copy-btn" type="button" onClick={() => copyMediaUrl(asset)}>
                  {copiedMediaId === asset.id ? <Check size={15} /> : <Copy size={15} />}
                  {copiedMediaId === asset.id ? 'Copied' : 'Copy image URL'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src="/logo.jpg" alt="CyberPro Global" className="admin-sidebar-logo" />
          <h2>ADMINISTRATION</h2>
        </div>
        
        <nav className="admin-sidebar-nav">
          <span className="admin-nav-section-label">Workspace</span>
          <button 
            className={`admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <span className="admin-nav-section-label">Content management</span>
          
          <button 
            className={`admin-nav-item ${activeSection === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveSection('programs')}
          >
            <GraduationCap size={18} />
            Programs
            <span className="nav-badge">{stats.programs}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'events' ? 'active' : ''}`}
            onClick={() => setActiveSection('events')}
          >
            <Calendar size={18} />
            Events
            <span className="nav-badge">{stats.events}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeSection === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveSection('articles')}
          >
            <FileText size={18} />
            Articles
            <span className="nav-badge">{stats.articles}</span>
          </button>

          <span className="admin-nav-section-label">Admissions & enquiries</span>
          
          <button 
            className={`admin-nav-item ${activeSection === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveSection('applications')}
          >
            <ClipboardList size={18} />
            Applications
            <span className="nav-badge">{stats.applications}</span>
          </button>
          
          <button 
            className={`admin-nav-item ${activeSection === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveSection('contacts')}
          >
            <MessageSquare size={18} />
            Messages
            <span className="nav-badge">{stats.contacts}</span>
          </button>

          <span className="admin-nav-section-label">Corporate</span>
          <button className={`admin-nav-item ${activeSection === 'corporate-services' ? 'active' : ''}`} onClick={() => setActiveSection('corporate-services')}>
            <Building2 size={18} /> Corporate Services
          </button>
          <button className={`admin-nav-item ${activeSection === 'corporate-metrics' ? 'active' : ''}`} onClick={() => setActiveSection('corporate-metrics')}>
            <BarChart3 size={18} /> Corporate Metrics
          </button>
          <button className={`admin-nav-item ${activeSection === 'corporate-inquiries' ? 'active' : ''}`} onClick={() => setActiveSection('corporate-inquiries')}>
            <Inbox size={18} /> Proposal Inquiries
          </button>

          <span className="admin-nav-section-label">Tools</span>
          <button
            className={`admin-nav-item ${activeSection === 'media' ? 'active' : ''}`}
            onClick={() => setActiveSection('media')}
          >
            <ImageIcon size={18} />
            Media Library
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>
            {activeSection === 'dashboard' && 'Dashboard Overview'}
            {activeSection === 'programs' && 'Manage Programs'}
            {activeSection === 'events' && 'Manage Events'}
            {activeSection === 'articles' && 'Manage Articles'}
            {activeSection === 'applications' && 'Course Applications'}
            {activeSection === 'contacts' && 'Contact Messages'}
            {activeSection === 'media' && 'Media Library'}
            {activeSection === 'corporate-services' && 'Corporate Services'}
            {activeSection === 'corporate-metrics' && 'Corporate Impact Metrics'}
            {activeSection === 'corporate-inquiries' && 'Corporate Proposal Inquiries'}
          </h1>
          
          <div className="admin-topbar-actions">
            {['programs', 'events', 'articles', 'corporate-services', 'corporate-metrics'].includes(activeSection) && (
              <button className="admin-btn admin-btn-primary" onClick={openCreateModal}>
                <Plus size={16} /> Add New
              </button>
            )}
            <button className="admin-btn admin-btn-secondary" onClick={activeSection === 'dashboard' ? fetchStats : fetchSectionData} title="Refresh Data">
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </div>
        
          {activeSection === 'dashboard' ? (
            renderDashboard()
          ) : activeSection === 'media' ? (
            renderMediaLibrary()
          ) : (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2>All {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            </div>
            {sectionError ? <div className="admin-alert admin-alert--table" role="alert"><AlertTriangle size={17} />{sectionError}</div> : renderTableContent()}
          </div>
        )}
      </main>

      {applicantPreview && (
        <div className="admin-modal-overlay" onClick={(e) => { if (e.target.classList.contains('admin-modal-overlay')) setApplicantPreview(null); }}>
          <section className="admin-modal applicant-preview-modal" role="dialog" aria-modal="true" aria-labelledby="applicant-preview-title">
            <div className="admin-modal-header">
              <div>
                <span className="applicant-preview-kicker">APPLICATION DETAILS</span>
                <h2 id="applicant-preview-title">{applicantPreview.fullName}</h2>
              </div>
              <button className="admin-modal-close" onClick={() => setApplicantPreview(null)} aria-label="Close applicant preview"><X size={20} /></button>
            </div>
            <div className="admin-modal-body">
              <div className="applicant-preview-grid">
                {[
                  ['Email address', applicantPreview.email],
                  ['Phone number', applicantPreview.phone],
                  ['Location', applicantPreview.location],
                  ['Program', applicantPreview.program],
                  ['Class format', applicantPreview.classFormat],
                  ['Study mode', applicantPreview.studyMode],
                  ['Payment plan', applicantPreview.paymentPlan],
                  ['Preferred start date', applicantPreview.startDate],
                  ['Experience level', applicantPreview.experienceLevel],
                  ['Submitted', applicantPreview.created_at ? formatDate(applicantPreview.created_at) : null],
                  ['Application ID', applicantPreview.id]
                ].map(([label, value]) => (
                  <div className="applicant-preview-field" key={label}>
                    <span>{label}</span>
                    <strong>{value || 'Not provided'}</strong>
                  </div>
                ))}
              </div>
              <div className="applicant-preview-notes">
                <span>Additional notes</span>
                <p>{applicantPreview.notes?.trim() || 'No additional notes provided.'}</p>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setApplicantPreview(null)}>Close preview</button>
              <a className="admin-btn admin-btn-primary applicant-email-link" href={`mailto:${encodeURIComponent(applicantPreview.email || '')}`}><MessageSquare size={15} /> Email applicant</a>
            </div>
          </section>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={(e) => { if (e.target.classList.contains('admin-modal-overlay')) setModalOpen(false); }}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>{modalMode === 'create' ? 'Add New' : 'Edit'} {activeSection === 'corporate-services' ? 'Corporate Service' : activeSection === 'corporate-metrics' ? 'Corporate Metric' : activeSection.slice(0, -1).charAt(0).toUpperCase() + activeSection.slice(0, -1).slice(1)}</h2>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              {renderFormFields()}
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)} disabled={saveLoading}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saveLoading}>
                {saveLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-body admin-confirm">
              <AlertTriangle />
              <h2>Confirm Delete</h2>
              <p>
                Are you sure you want to delete this record? This action cannot be undone.
                <strong>{deleteConfirm.title || deleteConfirm.name || deleteConfirm.fullName || `Item ID: ${deleteConfirm.id}`}</strong>
              </p>
              <div className="admin-confirm-actions">
                <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteConfirm(null)} disabled={deleteLoading}>Cancel</button>
                <button className="admin-btn admin-btn-danger" onClick={executeDelete} disabled={deleteLoading}>
                  {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
